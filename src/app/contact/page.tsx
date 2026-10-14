import type { Metadata } from "next";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <main className="flex-1">
      <section className="px-4 pb-12 pt-28 text-center sm:px-6 sm:pt-52">
        <h1 className="heading text-balance text-[48px] text-label sm:text-[80px]">
          Let&rsquo;s talk.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-[21px] leading-snug text-label-2 sm:text-[24px]">
          Placeholder: a sentence inviting people to reach out, whether to
          volunteer, partner, or ask a question.
        </p>
      </section>

      <section className="mx-auto grid max-w-5xl gap-12 px-4 pb-24 sm:px-6 md:grid-cols-[1fr_1.4fr] md:gap-16">
        <dl className="flex flex-col gap-8 md:pt-2">
          <div>
            <dt className="text-[14px] font-semibold text-label">Email</dt>
            <dd className="mt-1 text-[19px] text-label-2">hello@example.com</dd>
          </div>
          <div>
            <dt className="text-[14px] font-semibold text-label">Location</dt>
            <dd className="mt-1 text-[19px] text-label-2">Placeholder city</dd>
          </div>
        </dl>

        <ContactForm />
      </section>
    </main>
  );
}
