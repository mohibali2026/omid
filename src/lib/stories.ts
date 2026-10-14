import { productImage, products } from "./products";

export const storyCategories = [
  "Artisans",
  "Products",
  "Impact",
  "Guides",
] as const;
export type StoryCategory = (typeof storyCategories)[number];

export type Story = {
  slug: string;
  title: string;
  excerpt: string;
  category: StoryCategory;
  /** Publication date, "YYYY-MM-DD". */
  date: string;
  /** A product photo (by product slug) or a path under /public. */
  image: { product: string } | { src: string; alt: string };
  /** The shop an Artisans or Products story is about, linked at the end of the story. */
  shop?: string;
  /** Paragraphs; a line starting with "## " is a subheading. */
  body: string[];
};

/**
 * Placeholder stories: written to show the layout, not reported. Replace them with real,
 * consented accounts before launch, and keep Impact stories anonymous: no names, faces or exact places.
 */
const storyList: Story[] = [
  {
    slug: "a-rug-takes-a-season",
    title: "A rug takes a season",
    excerpt:
      "Zarghuna and her daughters knot every rug by hand, from dyeing the wool to the final wash. Here is what goes into one.",
    category: "Artisans",
    date: "2026-10-09",
    image: { product: "ivory-chobi-rug" },
    shop: "zarghuna-weavers",
    body: [
      "Zarghuna learned to weave sitting beside her mother's loom, passing wool and watching knots disappear into the pattern. Today the loom is hers, and her three daughters sit where she once did.",
      "## Colour from the garden",
      "Before a single knot is tied, the wool is dyed. Walnut husks give the browns, madder root the reds, and pomegranate rind a soft, warm yellow. Every batch comes out a little different, which is why no two of their rugs are quite the same.",
      "## Knot by knot",
      "A rug the size of a small room holds hundreds of thousands of knots. The family works in shifts, talking, singing and counting rows. A medium rug takes the four of them a full season to finish.",
      "When it comes off the loom, the rug is washed, stretched and left to dry in the sun, then the pile is clipped by hand until the pattern sits crisp and even.",
      "Selling online means the family can price their work for the months it takes, rather than for what a passing buyer offers. Every rug in their shop carries the name of the pattern and the season it was made.",
    ],
  },
  {
    slug: "stones-from-the-mountains",
    title: "Stones from the mountains",
    excerpt:
      "Sayed Jawad designs every ring around the stone in front of him, never the other way round.",
    category: "Artisans",
    date: "2026-09-30",
    image: { product: "panjshir-emerald-ring" },
    shop: "jawad-jewelry",
    body: [
      "Sayed Jawad's bench is no wider than a kitchen table. On it sit a small wheel, a row of files, a jeweller's loupe and a tray of uncut stones: green emerald, violet amethyst and the deep green of tourmaline.",
      "## The stone comes first",
      "Most jewellers choose a setting and find a stone to fit it. Jawad does the opposite. He studies each stone under the loupe, looking for its colour and its flaws, then cuts and polishes it to show the best of both.",
      "Only then does he draw the ring. A pale stone might get a thin silver band so the light comes through; a dark one, a high gold setting that lifts it up.",
      "## Made to last",
      "Each ring is shaped, soldered and polished by hand. A simple band takes a day; a ring with a carved setting can take a week. Jawad signs the inside of every piece with a small mark, so it can always be traced back to his bench.",
    ],
  },
  {
    slug: "the-turquoise-of-istalif",
    title: "The turquoise of Istalif",
    excerpt:
      "In a hillside town famous for its pottery, Ustad Rahimullah still throws on a kick wheel and fires in a wood kiln.",
    category: "Artisans",
    date: "2026-09-18",
    image: { product: "istalif-turquoise-vase" },
    shop: "istalif-clay-works",
    body: [
      "Istalif has been known for its pottery for generations, and for one colour above all: a bright, glassy turquoise you can spot across a market.",
      "Ustad Rahimullah has worked clay in the town since he was a boy. He still uses a kick wheel, turned by foot, and says the slower speed lets him feel the clay move.",
      "## From river clay to glaze",
      "The clay is dug locally, soaked, trodden and left to rest before it is thrown. Once shaped, each piece dries for days in the shade so it doesn't crack, then it's dipped in glaze made from local minerals and plant ash.",
      "## The kiln",
      "Firing is a whole day's work. The wood kiln has to be fed steadily for hours, and the temperature is judged by the colour of the flame. When the kiln is opened the next morning, every piece is a small surprise: the glaze pools and runs differently each time.",
      "Vases, teapots and bowls from the workshop are now listed on Omid, each photographed as it came out of the kiln.",
    ],
  },
  {
    slug: "carving-the-nuristani-window",
    title: "Carving the Nuristani window",
    excerpt:
      "Two sisters turn the lattice patterns of mountain houses into tables, trays and boxes.",
    category: "Artisans",
    date: "2026-09-05",
    image: { product: "panjara-side-table" },
    shop: "nuristan-woodcraft",
    body: [
      "In the mountain villages of Nuristan, houses are known for their carved wooden windows and doors, cut into lattices of stars, rosettes and interlocking squares.",
      "Gulalai and her sister grew up surrounded by that work. Now they carve the same patterns into furniture and smaller pieces for the home.",
      "## Walnut and cedar",
      "The sisters work in walnut for its dark, close grain and cedar for its scent and lightness. Each board is left to season before it's cut, so the finished piece won't warp.",
      "## No nails",
      "A lattice panel is built from dozens of small pieces that lock together by joinery alone. The sisters mark the pattern by hand, cut each piece with a saw and chisel, and fit them so tightly that the panel holds without glue.",
      "A side table takes about two weeks. A serving tray, three or four days. Everything is finished with oil and wax rather than varnish, so it darkens and deepens with use.",
    ],
  },
  {
    slug: "keeping-the-furnace-alight",
    title: "Keeping the furnace alight",
    excerpt:
      "Abdul Wakil and his sons blow recycled bottles into the cobalt and amber glass Herat has been known for for centuries.",
    category: "Artisans",
    date: "2026-08-21",
    image: { product: "cobalt-footed-bowl" },
    shop: "herat-blue-glass",
    body: [
      "Herat's blue glass is instantly recognisable: thick, bubbly and a deep cobalt that seems to glow when light comes through it. Only a few workshops still make it.",
      "## Glass from glass",
      "Abdul Wakil's family doesn't start with sand. They collect broken bottles, sort them by colour, and melt them down in a wood-fired furnace. The bubbles that give the glass its character come from that recycled melt.",
      "## A family at the furnace",
      "The furnace runs hot from early morning. Abdul Wakil gathers the glass on a long iron pipe and blows; his sons shape, reheat and add the handles and feet. A tumbler takes a few minutes. A carafe with a striped pattern can take half an hour of careful work.",
      "Each piece is cooled slowly overnight so it won't crack. In the morning the family sorts what has come out, and no two pieces are ever quite the same shape.",
    ],
  },
  {
    slug: "the-perahan-tunban-made-to-measure",
    title: "The perahan tunban, made to measure",
    excerpt:
      "A look at how a traditional outfit is cut, sewn and embroidered by hand, one order at a time.",
    category: "Products",
    date: "2026-08-08",
    image: { product: "embroidered-perahan-tunban" },
    shop: "nazila-tailors",
    body: [
      "The perahan tunban is a long shirt worn over loose, gathered trousers. It's comfortable in the heat, practical for work, and dressed up for weddings and holidays with embroidery at the collar and cuffs.",
      "## Cut to order",
      "At Nazila's workshop nothing is cut until the order arrives. Customers send their measurements, choose the cloth and the colour, and the tailors cut each panel by hand.",
      "## The embroidery",
      "The yoke, the panel across the chest, is where each piece becomes its own. It is stitched by hand in cotton or metallic thread, in geometric patterns that take two or three days for a single shirt.",
      "## Choosing yours",
      "Cotton is cool and soft and suits everyday wear. Heavier cloth holds the embroidery better for special occasions. If you're between sizes, the tailors suggest sending your chest and length measurements so they can cut to fit.",
    ],
  },
  {
    slug: "six-handmade-pieces-for-the-home",
    title: "Six handmade pieces for the home",
    excerpt:
      "From a turquoise teapot to a carved tray, a few favourites from across the Omid market.",
    category: "Products",
    date: "2026-07-24",
    image: { product: "green-glaze-teapot" },
    body: [
      "Every piece on Omid is made by hand, in small numbers, by the people whose names are on the shop. Here are a few that would bring something of that craft into any home.",
      "## A glazed teapot",
      "Thrown on a kick wheel in Istalif and dipped in a deep green glaze. It pours well, holds heat, and looks just as good empty on a shelf.",
      "## Amber glass tumblers",
      "Blown from recycled bottles in Herat, each one slightly different in shape and full of tiny bubbles. Lovely with water on a sunny table.",
      "## A lattice serving tray",
      "Carved in walnut with a Nuristani window pattern around the rim. Sturdy enough for tea for six.",
      "## A painted keepsake box",
      "Small, lidded, and painted by hand. Good for jewellery, letters or anything you want to keep.",
      "## A wool rug",
      "Hand-knotted and naturally dyed. A smaller rug is a good way to start: by a bed, in a hallway or on a wall.",
      "## A silver ring",
      "Set with an Afghan stone cut at the jeweller's own bench. A small piece with a long story.",
    ],
  },
  {
    slug: "what-1000-dollars-does",
    title: "What $1,000 does for a small business",
    excerpt:
      "Training, a small grant and the right equipment: how one donation is put to work.",
    category: "Impact",
    date: "2026-10-02",
    image: { product: "striped-carafe-set" },
    body: [
      "Be the Hope sets out to help 300 small businesses get to work. Each one is supported with the same three things, and $1,000 covers all three for one business.",
      "## Training",
      "Every business owner starts with practical classes: keeping simple accounts, pricing work fairly, and finding customers beyond their own street. The training is short, hands-on, and built around the business they already run.",
      "## A small grant",
      "Next comes a grant to cover what's holding the business back, whether that's stock, materials or a few months' rent while it finds its feet.",
      "## Equipment",
      "Finally, the tools to do the work: a sewing machine, an oven, a loom or a set of hand tools. Equipment is often the one cost a small business can never quite save up for, and the one that makes the biggest difference.",
      "Together, the three steps give a business what it needs to stand on its own. Every donation, of any size, goes towards them.",
    ],
  },
  {
    slug: "a-sewing-machine-and-a-full-order-book",
    title: "A sewing machine and a full order book",
    excerpt:
      "How a tailoring business run from home went from mending clothes to taking orders across town.",
    category: "Impact",
    date: "2026-09-11",
    image: { product: "green-perahan-tunban" },
    body: [
      "Names and places in this story have been left out to protect the people in it.",
      "For years, a tailor in a northern province worked from one room of the family home with a hand-cranked machine borrowed from a neighbour. Most of the work was mending: hems, patches, buttons.",
      "## The turning point",
      "Through Be the Hope she joined a short business course, then received a grant and a new electric sewing machine. The course taught her to price new garments properly and to keep a simple order book.",
      "## Six months on",
      "She now makes dresses and children's clothes to order and has taken on an apprentice. Customers find her by word of mouth, and the order book is full weeks ahead.",
      '"The machine is faster," she says, "but the order book changed more. Now I know what each piece costs me, and what I earn."',
    ],
  },
  {
    slug: "the-right-tools-for-the-job",
    title: "The right tools for the job",
    excerpt:
      "A small carpentry workshop traded borrowed hand tools for its own, and doubled what it could make.",
    category: "Impact",
    date: "2026-08-14",
    image: { product: "carved-side-table" },
    body: [
      "Names and places in this story have been left out to protect the people in it.",
      "A carpenter and his two sons had made doors, shelves and simple furniture for their neighbours for years, sharing a single set of hand tools between the three of them. When a big order came in, they had to turn it down or keep customers waiting for months.",
      "## Tools of their own",
      "With a Be the Hope grant, the workshop bought a workbench, clamps, planes and a full set of chisels and saws, enough for all three to work at once. The training that came with it helped them price each piece for the hours it really takes.",
      "## Twice the work",
      "The workshop now finishes in a week what used to take two. They've started making small tables and shelves to sell ready-made, alongside their orders, and have taken on a young apprentice.",
      "Equipment is often the one cost a small business can never quite save up for. It's also the one that makes the biggest difference.",
    ],
  },
  {
    slug: "how-shopping-on-omid-works",
    title: "How shopping on Omid works",
    excerpt:
      "From browsing a maker's shop to the piece arriving at your door, here's what to expect.",
    category: "Guides",
    date: "2026-07-10",
    image: { product: "lattice-serving-tray" },
    body: [
      "Omid is a market for Afghan artisans and small businesses. Every shop belongs to a maker, and every piece is made by hand.",
      "## Find a maker",
      "Browse by category or start with the artisans. Each shop page shows where the maker works, how long they've been on Omid, and everything they currently have for sale.",
      "## One of a kind",
      "Many pieces are the only one of their kind. When something says \"One of a kind\", that's the exact piece you'll receive. Made-to-order items, like tailored clothes, are started once your order arrives.",
      "## Time to make, time to travel",
      "Handmade work can't be rushed, and shipping from Afghanistan takes longer than from a warehouse. Each product shows how long it takes to make and send, so you know when to expect it.",
      "## Favourites",
      "Add a shop to your favourites to find it again and see what the maker lists next.",
    ],
  },
  {
    slug: "caring-for-handmade-pieces",
    title: "Caring for handmade pieces",
    excerpt:
      "Simple ways to keep rugs, glass, wood and ceramics looking their best for years.",
    category: "Guides",
    date: "2026-07-02",
    image: { product: "turquoise-medallion-rug" },
    body: [
      "Handmade pieces are made to be used, and with a little care they only get better with age.",
      "## Wool rugs",
      "Vacuum without the beater bar, and turn the rug every few months so it wears evenly. Blot spills straight away with cold water; never rub. Natural dyes soften gently in sunlight, so avoid hours of direct sun if you want to keep the colours deep.",
      "## Blown glass",
      "Wash by hand in warm, not hot, water. Recycled glass is full of tiny bubbles that give it character, but it doesn't like sudden changes in temperature.",
      "## Carved wood",
      "Dust with a soft, dry cloth. Once or twice a year, rub in a little beeswax or food-safe oil to keep the wood from drying out.",
      "## Glazed ceramics",
      "Wash by hand and let them dry fully before putting them away. Teapots are best rinsed with water only, so the glaze keeps no taste of soap.",
    ],
  },
];

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/** "2026-10-09" → "October 9, 2026". */
export function formatStoryDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  return `${MONTHS[month - 1]} ${day}, ${year}`;
}

export type StoryImage = {
  src: string;
  alt: string;
  background: string;
  fit: "contain" | "cover";
};

function resolveImage(image: Story["image"]): StoryImage {
  if ("src" in image) return { ...image, background: "#e9e6e1", fit: "cover" };
  const product = products.find((p) => p.slug === image.product);
  if (!product) throw new Error(`Unknown product image: ${image.product}`);
  return {
    src: productImage(product),
    alt: product.alt,
    background: product.imageBg ?? "#f5f5f5",
    fit: product.imageFit ?? "contain",
  };
}

const wordCount = (body: string[]) => body.join(" ").split(/\s+/).length;

/** Newest first, with the photo and reading time worked out. */
export const stories = storyList
  .map((story) => ({
    ...story,
    picture: resolveImage(story.image),
    readMinutes: Math.max(2, Math.round(wordCount(story.body) / 200)),
  }))
  .sort((a, b) => b.date.localeCompare(a.date));

export type StoryEntry = (typeof stories)[number];
