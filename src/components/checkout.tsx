"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { cart, formatPrice, useCart, type CartItem } from "@/lib/cart";
import { productImage } from "@/lib/products";
import { SecurePayment } from "./secure-payment";

/*
 * Prototype checkout: everything happens in this browser. No payment is taken, and what's typed
 * here is never stored or sent anywhere. The card form mimics a real one, with test cards for
 * a successful payment and for declines.
 */

const SHIPPING = [
  {
    id: "standard",
    label: "Standard",
    detail: "8–14 business days, tracked",
    price: 25,
  },
  {
    id: "express",
    label: "Express",
    detail: "4–6 business days, tracked",
    price: 60,
  },
] as const;
const FREE_STANDARD_FROM = 500;

const COUNTRIES = [
  "United States",
  "United Kingdom",
  "Canada",
  "Germany",
  "France",
  "Netherlands",
  "Sweden",
  "Türkiye",
  "United Arab Emirates",
  "Australia",
];

const TEST_CARDS = {
  success: "4242424242424242",
  declined: "4000000000000002",
  funds: "4000000000009995",
};

type Fields = {
  email: string;
  name: string;
  address: string;
  apartment: string;
  city: string;
  postcode: string;
  country: string;
  cardNumber: string;
  cardName: string;
  expiry: string;
  cvc: string;
};
type Errors = Partial<Record<keyof Fields, string>>;

const INITIAL: Fields = {
  email: "",
  name: "",
  address: "",
  apartment: "",
  city: "",
  postcode: "",
  country: COUNTRIES[0],
  cardNumber: "",
  cardName: "",
  expiry: "",
  cvc: "",
};

const digits = (s: string) => s.replace(/\D/g, "");

function cardBrand(number: string) {
  const n = digits(number);
  if (/^4/.test(n)) return "Visa";
  if (/^(5[1-5]|2[2-7])/.test(n)) return "Mastercard";
  if (/^3[47]/.test(n)) return "Amex";
  return null;
}

function luhn(number: string) {
  let sum = 0;
  [...number].reverse().forEach((d, i) => {
    let n = Number(d);
    if (i % 2) n = n * 2 > 9 ? n * 2 - 9 : n * 2;
    sum += n;
  });
  return sum % 10 === 0;
}

function formatCardNumber(value: string) {
  const n = digits(value).slice(0, cardBrand(value) === "Amex" ? 15 : 16);
  return cardBrand(n) === "Amex"
    ? [n.slice(0, 4), n.slice(4, 10), n.slice(10)].filter(Boolean).join(" ")
    : n.replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(value: string) {
  const n = digits(value).slice(0, 4);
  return n.length > 2 ? `${n.slice(0, 2)} / ${n.slice(2)}` : n;
}

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim()))
    e.email = "Enter an email address like name@example.com.";
  if (!f.name.trim()) e.name = "Enter your full name.";
  if (!f.address.trim()) e.address = "Enter your street address.";
  if (!f.city.trim()) e.city = "Enter your city.";
  if (!f.postcode.trim()) e.postcode = "Enter your postal code.";

  const number = digits(f.cardNumber);
  const length = cardBrand(number) === "Amex" ? 15 : 16;
  if (number.length !== length || !luhn(number))
    e.cardNumber = "Enter a valid card number.";
  if (!f.cardName.trim()) e.cardName = "Enter the name on the card.";

  const [mm, yy] = [
    Number(digits(f.expiry).slice(0, 2)),
    Number(digits(f.expiry).slice(2, 4)),
  ];
  const now = new Date();
  const thisMonth = (now.getFullYear() % 100) * 12 + now.getMonth() + 1;
  if (digits(f.expiry).length !== 4 || mm < 1 || mm > 12)
    e.expiry = "Enter the expiry date as MM / YY.";
  else if (yy * 12 + mm < thisMonth) e.expiry = "This card has expired.";

  const cvcLength = cardBrand(number) === "Amex" ? 4 : 3;
  if (digits(f.cvc).length !== cvcLength)
    e.cvc = `Enter the ${cvcLength}-digit security code.`;
  return e;
}

type Order = {
  number: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  method: (typeof SHIPPING)[number];
  fields: Fields;
  card: string;
};

export function Checkout() {
  const { ready, items, subtotal } = useCart();
  const [fields, setFields] = useState<Fields>(INITIAL);
  const [errors, setErrors] = useState<Errors>({});
  const [method, setMethod] =
    useState<(typeof SHIPPING)[number]["id"]>("standard");
  const [status, setStatus] = useState<"idle" | "processing">("idle");
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [order, setOrder] = useState<Order | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const chosen = SHIPPING.find((s) => s.id === method)!;
  const shipping =
    chosen.id === "standard" && subtotal >= FREE_STANDARD_FROM
      ? 0
      : chosen.price;
  const total = subtotal + shipping;

  if (order) return <Confirmation order={order} />;
  if (!ready)
    return (
      <div
        aria-hidden="true"
        className="h-[640px] animate-pulse rounded-3xl bg-white"
      />
    );
  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl py-16 text-center">
        <h1 className="heading text-[40px] text-neutral-900">
          Your cart is empty.
        </h1>
        <p className="mt-3 text-[17px] text-label-2">
          Add something to your cart to check out.
        </p>
        <Link
          href="/marketplace/products"
          className="mt-8 inline-flex h-12 items-center justify-center squircle bg-ink px-7 text-[17px] font-medium text-white transition-colors hover:bg-action-hover"
        >
          Browse the shop
        </Link>
      </div>
    );
  }

  const set = (key: keyof Fields, value: string) => {
    setFields((f) => ({ ...f, [key]: value }));
    // Clear a field's error as soon as it's corrected.
    if (errors[key] && !validate({ ...fields, [key]: value })[key])
      setErrors((e) => ({ ...e, [key]: undefined }));
  };
  const check = (key: keyof Fields) => {
    const error = validate(fields)[key];
    // Only flag fields that have something in them on blur; empty ones are caught on submit.
    if (fields[key].trim()) setErrors((e) => ({ ...e, [key]: error }));
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    setPaymentError(null);
    const found = validate(fields);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("processing");
    const number = digits(fields.cardNumber);
    window.setTimeout(() => {
      setStatus("idle");
      if (number === TEST_CARDS.declined) {
        setPaymentError("Your card was declined. Try a different card.");
        return;
      }
      if (number === TEST_CARDS.funds) {
        setPaymentError(
          "Your card has insufficient funds. Try a different card.",
        );
        return;
      }
      setOrder({
        number: `OM-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
        items,
        subtotal,
        shipping,
        total,
        method: chosen,
        fields,
        card: `${cardBrand(number) ?? "Card"} ending ${number.slice(-4)}`,
      });
      cart.clear();
      window.scrollTo({ top: 0 });
    }, 1800);
  };

  const busy = status === "processing";

  return (
    <>
      <h1 className="heading text-[40px] text-neutral-900 sm:text-[48px]">
        Checkout
      </h1>

      <div className="mt-8 grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_400px]">
        <form
          ref={formRef}
          onSubmit={submit}
          noValidate
          className="flex flex-col gap-6"
        >
          <fieldset disabled={busy} className="contents">
            <Section title="Contact">
              <Field
                label="Email"
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                fields={fields}
                errors={errors}
                set={set}
                check={check}
              />
              <p className="text-[13px] text-label-2">
                We&rsquo;ll send your receipt and tracking here.
              </p>
            </Section>

            <Section title="Shipping address">
              <Field
                label="Full name"
                name="name"
                autoComplete="name"
                fields={fields}
                errors={errors}
                set={set}
                check={check}
              />
              <Field
                label="Street address"
                name="address"
                autoComplete="address-line1"
                fields={fields}
                errors={errors}
                set={set}
                check={check}
              />
              <Field
                label="Apartment, suite (optional)"
                name="apartment"
                autoComplete="address-line2"
                fields={fields}
                errors={errors}
                set={set}
                check={check}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="City"
                  name="city"
                  autoComplete="address-level2"
                  fields={fields}
                  errors={errors}
                  set={set}
                  check={check}
                />
                <Field
                  label="Postal code"
                  name="postcode"
                  autoComplete="postal-code"
                  fields={fields}
                  errors={errors}
                  set={set}
                  check={check}
                />
              </div>
              <label className="block">
                <span className="text-[14px] font-medium text-neutral-900">
                  Country
                </span>
                <span className="relative mt-1.5 block">
                  <select
                    name="country"
                    autoComplete="country-name"
                    value={fields.country}
                    onChange={(e) => set("country", e.target.value)}
                    className="h-12 w-full appearance-none rounded-xl border border-field bg-white pl-4 pr-10 text-[16px] text-neutral-900"
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    <path d="M2.5 4.5l3.5 3.5 3.5-3.5" />
                  </svg>
                </span>
              </label>
            </Section>

            <Section title="Delivery">
              <div
                role="radiogroup"
                aria-label="Delivery method"
                className="grid gap-3"
              >
                {SHIPPING.map((s) => {
                  const price =
                    s.id === "standard" && subtotal >= FREE_STANDARD_FROM
                      ? 0
                      : s.price;
                  return (
                    <label
                      key={s.id}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-action ${
                        method === s.id
                          ? "border-ink bg-ink/[0.03]"
                          : "border-neutral-300 hover:border-neutral-500"
                      }`}
                    >
                      <input
                        type="radio"
                        name="shipping"
                        value={s.id}
                        checked={method === s.id}
                        onChange={() => setMethod(s.id)}
                        className="h-4 w-4 accent-[#275264]"
                      />
                      <span className="flex-1">
                        <span className="block text-[15px] font-medium text-neutral-900">
                          {s.label}
                        </span>
                        <span className="block text-[13px] text-label-2">
                          {s.detail}
                        </span>
                      </span>
                      <span className="text-[15px] font-medium tabular-nums text-neutral-900">
                        {price === 0 ? "Free" : formatPrice(price)}
                      </span>
                    </label>
                  );
                })}
              </div>
              {subtotal < FREE_STANDARD_FROM && (
                <p className="text-[13px] text-label-2">
                  Standard shipping is free on orders over{" "}
                  {formatPrice(FREE_STANDARD_FROM)}.
                </p>
              )}
            </Section>

            <Section title="Payment">
              <Field
                label="Card number"
                name="cardNumber"
                autoComplete="cc-number"
                inputMode="numeric"
                placeholder="1234 1234 1234 1234"
                format={formatCardNumber}
                trailing={cardBrand(fields.cardNumber) ?? undefined}
                fields={fields}
                errors={errors}
                set={set}
                check={check}
              />
              <Field
                label="Name on card"
                name="cardName"
                autoComplete="cc-name"
                fields={fields}
                errors={errors}
                set={set}
                check={check}
              />
              <div className="grid grid-cols-2 gap-4">
                <Field
                  label="Expiry"
                  name="expiry"
                  autoComplete="cc-exp"
                  inputMode="numeric"
                  placeholder="MM / YY"
                  format={formatExpiry}
                  fields={fields}
                  errors={errors}
                  set={set}
                  check={check}
                />
                <Field
                  label="Security code"
                  name="cvc"
                  autoComplete="cc-csc"
                  inputMode="numeric"
                  placeholder={
                    cardBrand(fields.cardNumber) === "Amex" ? "1234" : "123"
                  }
                  format={(v) => digits(v).slice(0, 4)}
                  fields={fields}
                  errors={errors}
                  set={set}
                  check={check}
                />
              </div>
            </Section>
          </fieldset>

          {paymentError && (
            <p
              role="alert"
              className="flex items-start gap-2 rounded-xl bg-red-50 p-4 text-[15px] text-red-800"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                aria-hidden="true"
                className="mt-0.5 shrink-0"
              >
                <circle cx="9" cy="9" r="7.2" />
                <path d="M9 5.4v4.2M9 12.4v.1" />
              </svg>
              {paymentError}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="flex h-14 w-full items-center justify-center gap-2 squircle bg-ink text-[17px] font-semibold text-white transition-colors hover:bg-action-hover active:scale-[0.99] disabled:cursor-progress disabled:opacity-80"
          >
            {busy ? (
              <>
                <span
                  aria-hidden="true"
                  className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                />
                Processing payment…
              </>
            ) : (
              <>Pay {formatPrice(total)}</>
            )}
          </button>
          <SecurePayment />
          <p role="status" className="sr-only">
            {busy ? "Processing payment" : ""}
          </p>
        </form>

        <aside className="rounded-3xl bg-white p-6 shadow-[0_8px_30px_rgb(0_0_0/0.05)] lg:sticky lg:top-24 sm:p-7">
          <div className="flex items-center justify-between">
            <h2 className="text-[19px] font-semibold tracking-tight text-neutral-900">
              Order summary
            </h2>
            <Link
              href="/cart"
              className="text-[14px] font-medium text-action underline-offset-4 hover:underline"
            >
              Edit cart
            </Link>
          </div>
          <OrderLines items={items} />
          <Totals subtotal={subtotal} shipping={shipping} total={total} />
        </aside>
      </div>
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-[0_8px_30px_rgb(0_0_0/0.05)] sm:p-7">
      <h2 className="text-[19px] font-semibold tracking-tight text-neutral-900">
        {title}
      </h2>
      <div className="mt-4 flex flex-col gap-4">{children}</div>
    </section>
  );
}

function Field({
  label,
  name,
  fields,
  errors,
  set,
  check,
  format,
  trailing,
  ...input
}: {
  label: string;
  name: keyof Fields;
  fields: Fields;
  errors: Errors;
  set: (key: keyof Fields, value: string) => void;
  check: (key: keyof Fields) => void;
  format?: (value: string) => string;
  trailing?: string;
} & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "name" | "value" | "onChange" | "onBlur"
>) {
  const error = errors[name];
  const id = `checkout-${name}`;
  return (
    <div>
      <label htmlFor={id} className="text-[14px] font-medium text-neutral-900">
        {label}
      </label>
      <div className="relative mt-1.5">
        <input
          id={id}
          name={name}
          value={fields[name]}
          onChange={(e) =>
            set(name, format ? format(e.target.value) : e.target.value)
          }
          onBlur={() => check(name)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`h-12 w-full rounded-xl border bg-white px-4 text-[16px] text-neutral-900 placeholder:text-placeholder disabled:bg-surface-2 ${
            trailing ? "pr-24" : ""
          } ${error ? "border-red-600" : "border-field"}`}
          {...input}
        />
        {trailing && (
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[13px] font-semibold text-label-2">
            {trailing}
          </span>
        )}
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-[13px] text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

function OrderLines({ items }: { items: CartItem[] }) {
  return (
    <ul className="mt-5 flex flex-col gap-4">
      {items.map(({ product, qty, total }) => (
        <li key={product.slug} className="flex items-center gap-3">
          <span
            className="relative aspect-square w-16 shrink-0 overflow-hidden rounded-lg"
            style={{ backgroundColor: product.imageBg ?? "#f5f5f5" }}
          >
            <Image
              src={productImage(product)}
              alt=""
              fill
              sizes="64px"
              className={
                product.imageFit === "cover" ? "object-cover" : "object-contain"
              }
            />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[15px] font-medium text-neutral-900">
              {product.name}
            </span>
            <span className="block text-[13px] text-label-2">Qty {qty}</span>
          </span>
          <span className="text-[15px] tabular-nums text-neutral-900">
            {formatPrice(total)}
          </span>
        </li>
      ))}
    </ul>
  );
}

function Totals({
  subtotal,
  shipping,
  total,
}: {
  subtotal: number;
  shipping: number;
  total: number;
}) {
  return (
    <dl className="mt-5 space-y-2.5 border-t border-hairline pt-5 text-[15px]">
      <div className="flex justify-between">
        <dt className="text-label-2">Subtotal</dt>
        <dd className="tabular-nums text-neutral-900">
          {formatPrice(subtotal)}
        </dd>
      </div>
      <div className="flex justify-between">
        <dt className="text-label-2">Shipping</dt>
        <dd className="tabular-nums text-neutral-900">
          {shipping === 0 ? "Free" : formatPrice(shipping)}
        </dd>
      </div>
      <div className="flex justify-between border-t border-hairline pt-3 text-[17px] font-semibold">
        <dt className="text-neutral-900">Total</dt>
        <dd className="tabular-nums text-neutral-900">{formatPrice(total)}</dd>
      </div>
    </dl>
  );
}

function Confirmation({ order }: { order: Order }) {
  const firstName = order.fields.name.trim().split(/\s+/)[0];
  return (
    <div className="mx-auto max-w-2xl">
      <div className="text-center">
        <span className="settle mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-action text-white">
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M7.5 14.5l4.5 4.5 8.5-9" />
          </svg>
        </span>
        <h1 className="rise heading mt-6 text-balance text-[36px] text-neutral-900 sm:text-[48px]">
          Thank you, {firstName}.
        </h1>
        <p
          className="rise mt-3 text-[17px] text-label-2"
          style={{ "--delay": "80ms" } as React.CSSProperties}
        >
          Order{" "}
          <span className="font-semibold text-neutral-900">{order.number}</span>{" "}
          is confirmed. A receipt would go to {order.fields.email}.
        </p>
      </div>

      <div
        className="rise mt-10 rounded-3xl bg-white p-6 shadow-[0_8px_30px_rgb(0_0_0/0.05)] sm:p-8"
        style={{ "--delay": "160ms" } as React.CSSProperties}
      >
        <div className="grid gap-6 text-[15px] sm:grid-cols-3">
          <div>
            <p className="font-semibold text-neutral-900">Shipping to</p>
            <p className="mt-1 leading-relaxed text-label-2">
              {order.fields.name}
              <br />
              {order.fields.address}
              {order.fields.apartment && <>, {order.fields.apartment}</>}
              <br />
              {order.fields.city} {order.fields.postcode}
              <br />
              {order.fields.country}
            </p>
          </div>
          <div>
            <p className="font-semibold text-neutral-900">Delivery</p>
            <p className="mt-1 leading-relaxed text-label-2">
              {order.method.label}
              <br />
              {order.method.detail}
            </p>
          </div>
          <div>
            <p className="font-semibold text-neutral-900">Paid with</p>
            <p className="mt-1 leading-relaxed text-label-2">{order.card}</p>
          </div>
        </div>
        <div className="mt-6 border-t border-hairline pt-1">
          <OrderLines items={order.items} />
          <Totals
            subtotal={order.subtotal}
            shipping={order.shipping}
            total={order.total}
          />
        </div>
      </div>

      <p className="mt-6 text-center text-[14px] text-label-2">
        Prototype: no payment was taken and this order wasn&rsquo;t sent
        anywhere.
      </p>
      <div className="mt-6 flex justify-center">
        <Link
          href="/marketplace/products"
          className="inline-flex h-12 items-center justify-center squircle bg-ink px-7 text-[17px] font-medium text-white transition-colors hover:bg-action-hover"
        >
          Continue shopping
        </Link>
      </div>
    </div>
  );
}
