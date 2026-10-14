import { asset } from "./base-path";
// Market Place catalogue: one list shared by the Products, Categories and Artisans pages.

export type Product = {
  slug: string;
  name: string;
  category: string;
  maker: string;
  place: string;
  description: string;
  price: string;
  availability: string;
  alt: string;
  /** Filter attributes. */
  priceValue: number;
  stock: number;
  colors: string[];
  material: string;
  size: "Small" | "Medium" | "Large";
  /** Photo background, so product shots sit seamlessly in the card ("cover" photos fill it). */
  imageBg?: string;
  imageFit?: "contain" | "cover";
  /** Photo file to show when it isn't <slug>.jpg (products that reuse another product's photo). */
  image?: string;
};

export const categorySlug = (name: string) =>
  name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // drop accents: "Décor" → "decor"
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** Where a product's photo lives. */
export const productImage = (p: Product) =>
  asset(`/images/products/${p.image ?? p.slug}.jpg`);

const coreProducts: Product[] = [
  {
    slug: "ivory-chobi-rug",
    name: "Ivory Chobi Rug",
    category: "Handmade Rugs",
    maker: "Zarghuna and her daughters",
    place: "Herat",
    description:
      "Hand-knotted over eleven months, in dyes boiled from walnut and madder.",
    price: "$1,180",
    availability: "One only",
    alt: "An ivory hand-knotted rug with rows of small red, green and blue floral motifs.",
    priceValue: 1180,
    stock: 1,
    colors: ["Ivory", "Green", "Red"],
    material: "Wool",
    size: "Large",
  },
  {
    slug: "panjshir-emerald-ring",
    name: "Panjshir Emerald Ring",
    category: "Jewelry",
    maker: "Sayed Jawad",
    place: "Kabul",
    description:
      "A Panjshir emerald, haloed in white sapphire and set in eighteen-carat gold.",
    price: "$890",
    availability: "One only",
    alt: "A gold ring set with a rectangular green emerald surrounded by small white stones.",
    priceValue: 890,
    stock: 1,
    colors: ["Gold", "Green"],
    material: "Gold",
    size: "Small",
  },
  {
    slug: "istalif-turquoise-vase",
    name: "Istalif Turquoise Vase",
    category: "Pottery",
    maker: "Ustad Rahimullah",
    place: "Istalif",
    description:
      "Turquoise ishkar glaze over a hand-drawn pattern, fired in a wood kiln.",
    price: "$86",
    availability: "7 available",
    alt: "A turquoise glazed vase with a long neck, a flared rim and a dark geometric pattern.",
    priceValue: 86,
    stock: 7,
    colors: ["Turquoise", "Black"],
    material: "Ceramic",
    size: "Medium",
  },
  {
    slug: "embroidered-perahan-tunban",
    name: "Embroidered Perahan Tunban",
    category: "Menswear",
    maker: "Najibullah's tailoring house",
    place: "Kabul",
    description:
      "The everyday cut of Afghan menswear, with a yoke worked in metallic thread.",
    price: "$245",
    availability: "9 available",
    alt: "A man wearing a long black tunic and loose trousers with gold embroidery at the chest and cuff.",
    priceValue: 245,
    stock: 9,
    colors: ["Black", "Gold"],
    material: "Cotton",
    size: "Medium",
  },
  {
    slug: "panjara-side-table",
    name: "Panjara Side Table",
    category: "Woodwork",
    maker: "Gul Ahmad and his brother",
    place: "Nuristan",
    description:
      "A lattice cut the way window screens were cut, laid flat and given legs.",
    price: "$320",
    availability: "4 available",
    alt: "A square wooden side table with a geometric lattice top and four tapered splayed legs.",
    priceValue: 320,
    stock: 4,
    colors: ["Brown"],
    material: "Wood",
    size: "Large",
  },
  {
    slug: "herat-blue-glass",
    name: "Herat Blue Glass, Set of Seven",
    category: "Glassware",
    maker: "Abdul Wakil and his sons",
    place: "Herat",
    description:
      "Blown from broken bottles at the last wood-fired furnace in Herat.",
    price: "$145",
    availability: "6 available",
    alt: "A cobalt blue glass carafe with a round stopper, beside six matching stemmed glasses.",
    priceValue: 145,
    stock: 6,
    colors: ["Blue"],
    material: "Glass",
    size: "Medium",
  },
  {
    slug: "carved-side-table",
    name: "Carved Side Table",
    category: "Woodwork",
    maker: "Gul Ahmad and his brother",
    place: "Nuristan",
    description:
      "A small table with arched aprons and turned legs, carved by hand.",
    price: "$280",
    availability: "3 available",
    alt: "A square carved wooden side table with arched sides and turned legs.",
    priceValue: 280,
    stock: 3,
    colors: ["Brown"],
    material: "Wood",
    size: "Medium",
    imageBg: "#f0f0f0",
  },
  {
    slug: "painted-keepsake-box",
    name: "Painted Keepsake Box",
    category: "Woodwork",
    maker: "Gul Ahmad and his brother",
    place: "Nuristan",
    description:
      "A square box with a carved star on the lid and flowers painted on the sides.",
    price: "$65",
    availability: "12 available",
    alt: "A square wooden box with a carved star on the lid and painted pink flowers on its sides.",
    priceValue: 65,
    stock: 12,
    colors: ["Brown", "Red"],
    material: "Wood",
    size: "Small",
    imageBg: "#ffffff",
  },
  {
    slug: "lattice-serving-tray",
    name: "Lattice Serving Tray",
    category: "Woodwork",
    maker: "Gul Ahmad and his brother",
    place: "Nuristan",
    description:
      "A rectangular tray with a cut geometric lattice base and handle slots.",
    price: "$58",
    availability: "15 available",
    alt: "A rectangular wooden tray with a geometric lattice base and cut-out handles.",
    priceValue: 58,
    stock: 15,
    colors: ["Brown"],
    material: "Wood",
    size: "Medium",
    imageBg: "#f9f9fb",
  },
  {
    slug: "fluted-turquoise-vase",
    name: "Fluted Turquoise Vase",
    category: "Pottery",
    maker: "Ustad Rahimullah",
    place: "Istalif",
    description:
      "A small vase with a frilled rim, glazed deep turquoise over incised lines.",
    price: "$48",
    availability: "10 available",
    alt: "A small deep turquoise vase with a frilled rim and incised pattern.",
    priceValue: 48,
    stock: 10,
    colors: ["Turquoise"],
    material: "Ceramic",
    size: "Small",
    imageBg: "#ffffff",
  },
  {
    slug: "green-glaze-teapot",
    name: "Green Glaze Teapot",
    category: "Pottery",
    maker: "Ustad Rahimullah",
    place: "Istalif",
    description:
      "A lidded teapot with a cross-hatched body under a running green and blue glaze.",
    price: "$72",
    availability: "6 available",
    alt: "A lidded ceramic teapot in a green and blue running glaze.",
    priceValue: 72,
    stock: 6,
    colors: ["Green", "Blue"],
    material: "Ceramic",
    size: "Medium",
    imageBg: "#fbfcfe",
  },
  {
    slug: "brown-bottle-vase",
    name: "Brown Bottle Vase",
    category: "Pottery",
    maker: "Ustad Rahimullah",
    place: "Istalif",
    description:
      "A long-necked vase with a pouring lip and ribbed shoulders in dark brown glaze.",
    price: "$64",
    availability: "5 available",
    alt: "A tall dark brown glazed vase with a long neck and ribbed body.",
    priceValue: 64,
    stock: 5,
    colors: ["Brown"],
    material: "Ceramic",
    size: "Medium",
    imageBg: "#ffffff",
  },
  {
    slug: "navy-perahan-tunban",
    name: "Navy Perahan Tunban with Shawl",
    category: "Menswear",
    maker: "Najibullah's tailoring house",
    place: "Kabul",
    description:
      "A navy tunic and trousers, worn with a woven shawl in red and white check.",
    price: "$260",
    availability: "7 available",
    alt: "A man in a navy tunic and trousers with a checked woven shawl over his shoulders.",
    priceValue: 260,
    stock: 7,
    colors: ["Blue", "Red"],
    material: "Cotton",
    size: "Medium",
    imageBg: "#f7f8fe",
  },
  {
    slug: "green-perahan-tunban",
    name: "Green Perahan Tunban",
    category: "Menswear",
    maker: "Najibullah's tailoring house",
    place: "Kabul",
    description:
      "A dark green set with a contrast yoke and a matching shoulder wrap.",
    price: "$235",
    availability: "8 available",
    alt: "A man in a dark green tunic and trousers with a matching wrap over one shoulder.",
    priceValue: 235,
    stock: 8,
    colors: ["Green"],
    material: "Cotton",
    size: "Medium",
    imageBg: "#ffffff",
  },
  {
    slug: "brown-embroidered-perahan",
    name: "Brown Embroidered Perahan",
    category: "Menswear",
    maker: "Najibullah's tailoring house",
    place: "Kabul",
    description:
      "A chocolate tunic with a gold-thread yoke, worn with loose trousers.",
    price: "$255",
    availability: "6 available",
    alt: "A man in a brown tunic with gold embroidery at the chest, and loose trousers.",
    priceValue: 255,
    stock: 6,
    colors: ["Brown", "Gold"],
    material: "Cotton",
    size: "Medium",
    imageBg: "#f9fafe",
  },
  {
    slug: "red-ivory-lattice-rug",
    name: "Red and Ivory Lattice Rug",
    category: "Handmade Rugs",
    maker: "Zarghuna and her daughters",
    place: "Herat",
    description:
      "Rows of small medallions in red and ivory, inside a white patterned border.",
    price: "$960",
    availability: "One only",
    alt: "A rectangular rug with rows of red and ivory medallions inside a white border.",
    priceValue: 960,
    stock: 1,
    colors: ["Red", "Ivory"],
    material: "Wool",
    size: "Large",
    imageBg: "#f2f2f2",
  },
  {
    slug: "indigo-field-rug",
    name: "Indigo Field Rug",
    category: "Handmade Rugs",
    maker: "Zarghuna and her daughters",
    place: "Herat",
    description:
      "A deep blue field scattered with small motifs, framed in a red border.",
    price: "$1,240",
    availability: "One only",
    alt: "A rectangular rug with a deep blue field of small motifs and a red border.",
    priceValue: 1240,
    stock: 1,
    colors: ["Blue", "Red"],
    material: "Wool",
    size: "Large",
    imageBg: "#f8f8f8",
  },
  {
    slug: "turquoise-medallion-rug",
    name: "Turquoise Medallion Rug",
    category: "Handmade Rugs",
    maker: "Zarghuna and her daughters",
    place: "Herat",
    description: "A turquoise ground of repeating rosettes, bordered in navy.",
    price: "$1,050",
    availability: "One only",
    alt: "A rectangular rug with a turquoise ground of repeating rosettes and a navy border.",
    priceValue: 1050,
    stock: 1,
    colors: ["Turquoise", "Blue"],
    material: "Wool",
    size: "Large",
    imageBg: "#fefefe",
  },
  {
    slug: "emerald-silver-ring",
    name: "Emerald Silver Ring",
    category: "Jewelry",
    maker: "Sayed Jawad",
    place: "Kabul",
    description:
      "An oval Panjshir emerald set in a sterling silver band of linked ovals.",
    price: "$240",
    availability: "3 available",
    alt: "A silver ring set with an oval green emerald on a band of linked ovals.",
    priceValue: 240,
    stock: 3,
    colors: ["Green", "Silver"],
    material: "Silver",
    size: "Small",
    imageBg: "#f4f4f3",
  },
  {
    slug: "amethyst-cabochon-ring",
    name: "Amethyst Cabochon Ring",
    category: "Jewelry",
    maker: "Sayed Jawad",
    place: "Kabul",
    description: "A domed amethyst in a rope-edged silver setting.",
    price: "$180",
    availability: "4 available",
    alt: "A silver ring set with a large domed purple amethyst.",
    priceValue: 180,
    stock: 4,
    colors: ["Purple", "Silver"],
    material: "Silver",
    size: "Small",
    imageBg: "#e7e7e7",
  },
  {
    slug: "green-tourmaline-ring",
    name: "Green Tourmaline Ring",
    category: "Jewelry",
    maker: "Sayed Jawad",
    place: "Kabul",
    description: "Five baguette tourmalines in a gold-washed silver ring.",
    price: "$320",
    availability: "2 available",
    alt: "A wide silver ring with gold accents, set with five rectangular green stones.",
    priceValue: 320,
    stock: 2,
    colors: ["Green", "Gold", "Silver"],
    material: "Silver",
    size: "Small",
    imageBg: "#f0f0f0",
  },
  {
    slug: "amber-glass-tumblers",
    name: "Amber Glass Tumblers, Pair",
    category: "Glassware",
    maker: "Abdul Wakil and his sons",
    place: "Herat",
    description:
      "Two tall tumblers in amber glass, with the ripples of hand-blowing.",
    price: "$54",
    availability: "10 available",
    alt: "Two tall amber glass tumblers on a kitchen counter.",
    priceValue: 54,
    stock: 10,
    colors: ["Amber"],
    material: "Glass",
    size: "Small",
    imageFit: "cover",
  },
  {
    slug: "striped-carafe-set",
    name: "Striped Carafe Set",
    category: "Glassware",
    maker: "Abdul Wakil and his sons",
    place: "Herat",
    description: "A carafe banded in blue and gold, with three matching cups.",
    price: "$165",
    availability: "5 available",
    alt: "A carafe striped in blue and gold with three matching cups on a wooden table.",
    priceValue: 165,
    stock: 5,
    colors: ["Blue", "Gold"],
    material: "Glass",
    size: "Medium",
    imageFit: "cover",
  },
  {
    slug: "cobalt-footed-bowl",
    name: "Cobalt Footed Bowl",
    category: "Glassware",
    maker: "Abdul Wakil and his sons",
    place: "Herat",
    description: "A deep cobalt bowl on a tall foot, painted with gold bands.",
    price: "$95",
    availability: "6 available",
    alt: "A cobalt blue footed bowl with gold bands, filled with dried fruit and nuts.",
    priceValue: 95,
    stock: 6,
    colors: ["Blue", "Gold"],
    material: "Glass",
    size: "Medium",
    imageFit: "cover",
  },
  {
    slug: "emerald-velvet-dress",
    name: "Emerald Velvet Dress",
    category: "Womenswear",
    maker: "An embroidery circle of eight women",
    place: "Kandahar",
    description:
      "Green velvet with a hand-embroidered yoke and banded sleeves.",
    price: "$260",
    availability: "One only",
    alt: "A woman in a long green velvet dress with a richly embroidered purple yoke and patterned sleeves.",
    priceValue: 260,
    stock: 1,
    colors: ["Green", "Purple"],
    material: "Velvet",
    size: "Medium",
    imageBg: "#8a8985",
    imageFit: "cover",
  },
  {
    slug: "purple-mirrorwork-dress",
    name: "Purple Mirrorwork Dress",
    category: "Womenswear",
    maker: "An embroidery circle of eight women",
    place: "Kandahar",
    description:
      "Deep purple cotton with mirrorwork, patchwork sleeves and an embroidered hem.",
    price: "$290",
    availability: "One only",
    alt: "A woman in a long purple dress with colourful patchwork sleeves and a heavily embroidered skirt hem.",
    priceValue: 290,
    stock: 1,
    colors: ["Purple", "Red"],
    material: "Cotton",
    size: "Medium",
    imageBg: "#8d8988",
    imageFit: "cover",
  },
  {
    slug: "festival-patchwork-dress",
    name: "Festival Patchwork Dress",
    category: "Womenswear",
    maker: "An embroidery circle of eight women",
    place: "Kandahar",
    description:
      "A full-skirted dress pieced from embroidered panels in festival colours.",
    price: "$340",
    availability: "One only",
    alt: "A long patchwork dress in purple, pink, green and red with an embroidered hem, shown on a mannequin.",
    priceValue: 340,
    stock: 1,
    colors: ["Purple", "Red", "Green"],
    material: "Cotton",
    size: "Large",
    imageBg: "#f2f2f2",
  },
  {
    slug: "red-silk-embroidered-set",
    name: "Red Silk Embroidered Set",
    category: "Womenswear",
    maker: "Malalai",
    place: "Kunar",
    description:
      "A red silk tunic and trousers with a hand-stitched neckline and waistband.",
    price: "$210",
    availability: "2 available",
    alt: "A woman in a red silk tunic and trousers with an embroidered neckline and waistband.",
    priceValue: 210,
    stock: 2,
    colors: ["Red"],
    material: "Silk",
    size: "Medium",
    imageBg: "#a6a39e",
    imageFit: "cover",
  },
  {
    slug: "green-gold-thread-dress",
    name: "Green Gold-Thread Dress",
    category: "Womenswear",
    maker: "Malalai",
    place: "Kunar",
    description:
      "Emerald silk woven with gold thread, with bell sleeves and a V-neck.",
    price: "$230",
    availability: "3 available",
    alt: "A woman in a flowing emerald green dress patterned with gold thread and bell sleeves.",
    priceValue: 230,
    stock: 3,
    colors: ["Green", "Gold"],
    material: "Silk",
    size: "Medium",
    imageBg: "#b7b8ba",
    imageFit: "cover",
  },
  {
    slug: "embroidered-kandahari-cap",
    name: "Embroidered Kandahari Cap",
    category: "Hats & Caps",
    maker: "An embroidery circle of eight women",
    place: "Kandahar",
    description:
      "A round cap stitched in bright geometric thread, with a red tassel.",
    price: "$45",
    availability: "6 available",
    alt: "A round cap densely embroidered in red, blue and green geometric patterns with a red tassel.",
    priceValue: 45,
    stock: 6,
    colors: ["Red", "Turquoise"],
    material: "Cotton",
    size: "Small",
    imageBg: "#f2f2f2",
  },
  {
    slug: "karakul-wool-hat",
    name: "Karakul Wool Hat",
    category: "Hats & Caps",
    maker: "Ahmad Shah",
    place: "Balkh",
    description: "A classic folded hat in soft, curled grey karakul wool.",
    price: "$120",
    availability: "3 available",
    alt: "A folded grey hat made of curled karakul wool.",
    priceValue: 120,
    stock: 3,
    colors: ["Grey"],
    material: "Wool",
    size: "Small",
    imageBg: "#ffffff",
  },
  {
    slug: "grey-wool-pakol",
    name: "Grey Wool Pakol",
    category: "Hats & Caps",
    maker: "Ahmad Shah",
    place: "Balkh",
    description: "The rolled-brim wool cap of the mountains, felted by hand.",
    price: "$38",
    availability: "8 available",
    alt: "A soft grey wool pakol cap with a rolled brim.",
    priceValue: 38,
    stock: 8,
    colors: ["Grey"],
    material: "Wool",
    size: "Small",
    imageBg: "#ffffff",
  },
  {
    slug: "charcoal-felt-cap",
    name: "Charcoal Felt Cap",
    category: "Hats & Caps",
    maker: "Ahmad Shah",
    place: "Balkh",
    description: "A round, structured cap in dense charcoal felt.",
    price: "$36",
    availability: "8 available",
    alt: "A round charcoal grey felt cap.",
    priceValue: 36,
    stock: 8,
    colors: ["Grey", "Black"],
    material: "Wool",
    size: "Small",
    imageBg: "#f2f2f2",
  },
  {
    slug: "carnelian-silver-set",
    name: "Carnelian Silver Set",
    category: "Jewelry",
    maker: "Zahra",
    place: "Ghazni",
    description:
      "Necklace, earrings and ring with red carnelian in scrolled silver.",
    price: "$165",
    availability: "2 available",
    alt: "A silver necklace, pair of earrings and ring, each set with an oval red carnelian.",
    priceValue: 165,
    stock: 2,
    colors: ["Red", "Silver"],
    material: "Silver",
    size: "Small",
    imageBg: "#ffffff",
  },
  {
    slug: "green-agate-drop-set",
    name: "Green Agate Drop Set",
    category: "Jewelry",
    maker: "Mir Ahmad",
    place: "Badakhshan",
    description: "Teardrop silver frames holding polished green agate.",
    price: "$140",
    availability: "2 available",
    alt: "A silver necklace and earrings with round green agate stones in teardrop frames.",
    priceValue: 140,
    stock: 2,
    colors: ["Green", "Silver"],
    material: "Silver",
    size: "Small",
    imageBg: "#e7e7e7",
  },
  {
    slug: "peridot-fan-pendant-set",
    name: "Peridot Fan Pendant Set",
    category: "Jewelry",
    maker: "Mir Ahmad",
    place: "Badakhshan",
    description:
      "Fan-cut peridot on a fine silver chain, with matching earrings.",
    price: "$150",
    availability: "2 available",
    alt: "A silver necklace and earrings with fan-shaped green peridot stones.",
    priceValue: 150,
    stock: 2,
    colors: ["Green", "Silver"],
    material: "Silver",
    size: "Small",
    imageBg: "#f0ebef",
  },
  {
    slug: "amber-stone-halo-set",
    name: "Amber Stone Halo Set",
    category: "Jewelry",
    maker: "Zahra",
    place: "Ghazni",
    description:
      "Honey-coloured stones in silver halos: necklace, earrings and ring.",
    price: "$180",
    availability: "One only",
    alt: "A silver necklace, earrings and ring, each with a square amber stone surrounded by small clear stones.",
    priceValue: 180,
    stock: 1,
    colors: ["Amber", "Silver"],
    material: "Silver",
    size: "Small",
    imageBg: "#e7e7e7",
  },
  {
    slug: "woven-leather-satchel",
    name: "Woven Leather Satchel",
    category: "Leather Bags",
    maker: "Rahmatullah and his apprentices",
    place: "Herat",
    description: "Tan leather with a hand-woven panel and a brass clasp.",
    price: "$135",
    availability: "3 available",
    alt: "A tan leather satchel with a woven leather panel on the flap and a metal clasp.",
    priceValue: 135,
    stock: 3,
    colors: ["Brown"],
    material: "Leather",
    size: "Medium",
    imageBg: "#f2f1f7",
  },
  {
    slug: "brown-leather-briefcase",
    name: "Brown Leather Briefcase",
    category: "Leather Bags",
    maker: "Rahmatullah and his apprentices",
    place: "Herat",
    description: "A roomy briefcase with a front pocket and shoulder strap.",
    price: "$160",
    availability: "4 available",
    alt: "A dark brown leather briefcase with top handles, a front pocket and a shoulder strap.",
    priceValue: 160,
    stock: 4,
    colors: ["Brown"],
    material: "Leather",
    size: "Large",
    imageBg: "#ffffff",
  },
  {
    slug: "tan-leather-messenger",
    name: "Tan Leather Messenger",
    category: "Leather Bags",
    maker: "Rahmatullah and his apprentices",
    place: "Herat",
    description: "A soft tan messenger bag with an adjustable strap.",
    price: "$120",
    availability: "5 available",
    alt: "A tan leather messenger bag with a front pocket and an adjustable shoulder strap.",
    priceValue: 120,
    stock: 5,
    colors: ["Brown"],
    material: "Leather",
    size: "Medium",
    imageBg: "#ededed",
  },
  {
    slug: "tan-leather-weekender",
    name: "Tan Leather Weekender",
    category: "Leather Bags",
    maker: "Rahmatullah and his apprentices",
    place: "Herat",
    description: "A stitched tan holdall, sized for a weekend away.",
    price: "$190",
    availability: "2 available",
    alt: "A tan leather weekender bag with two handles and a shoulder strap.",
    priceValue: 190,
    stock: 2,
    colors: ["Brown"],
    material: "Leather",
    size: "Large",
    imageBg: "#ebebeb",
  },
  {
    slug: "blue-leaf-istalif-plate",
    name: "Blue Leaf Istalif Plate",
    category: "Pottery",
    maker: "Ustad Rahimullah",
    place: "Istalif",
    description:
      "A white-glazed plate brushed with cobalt leaves around a star centre.",
    price: "$55",
    availability: "4 available",
    alt: "A round white ceramic plate painted with blue and green leaf strokes around a blue star centre.",
    priceValue: 55,
    stock: 4,
    colors: ["Blue", "Green", "Ivory"],
    material: "Ceramic",
    size: "Medium",
    imageBg: "#ffffff",
  },
  {
    slug: "painted-medallion-plate",
    name: "Painted Medallion Plate",
    category: "Pottery",
    maker: "Ustad Ghulam Sakhi",
    place: "Herat",
    description:
      "Terracotta painted by hand with a blue and gold star medallion.",
    price: "$120",
    availability: "One only",
    alt: "A terracotta plate hand-painted with a large blue, red and gold star medallion.",
    priceValue: 120,
    stock: 1,
    colors: ["Blue", "Red", "Gold"],
    material: "Ceramic",
    size: "Large",
    imageBg: "#ffffff",
  },
  {
    slug: "speckled-amber-plate",
    name: "Speckled Amber Plate",
    category: "Pottery",
    maker: "Ustad Karim",
    place: "Kabul",
    description: "A warm amber glaze with dark speckles, fired in a wood kiln.",
    price: "$48",
    availability: "5 available",
    alt: "A round ceramic plate in a speckled amber-brown glaze.",
    priceValue: 48,
    stock: 5,
    colors: ["Brown", "Amber"],
    material: "Ceramic",
    size: "Medium",
    imageBg: "#ffffff",
  },
  {
    slug: "lattice-garden-plate",
    name: "Lattice Garden Plate",
    category: "Pottery",
    maker: "Ustad Rahimullah",
    place: "Istalif",
    description:
      "A white plate painted with a blue lattice and green garden petals.",
    price: "$60",
    availability: "3 available",
    alt: "A white ceramic plate painted with a blue lattice centre, green petals and a zigzag border.",
    priceValue: 60,
    stock: 3,
    colors: ["Blue", "Green", "Ivory"],
    material: "Ceramic",
    size: "Medium",
    imageBg: "#ffffff",
  },
];

/*
 * More shops for the prototype. Placeholder data: names, stories and figures are invented, and each
 * product reuses an existing product photo (its category, colours and material come from that photo's
 * product). Each shop's profile picture is its first product's photo, so no faces are shown.
 */
type ExtraShop = {
  name: string;
  maker: string;
  province: string;
  story: string;
  rating: number;
  sales: number;
  years: number;
  joined: string;
  /** [photo product slug, name, description, price, stock] */
  items: [string, string, string, number, number][];
};

const extraShops: ExtraShop[] = [
  // Handmade Rugs
  {
    name: "Andkhoy Carpet House",
    maker: "Gulnar and her sisters",
    province: "Faryab",
    story:
      "Three sisters knot rugs on a family loom, using wool from their own village's flocks.",
    rating: 4.8,
    sales: 142,
    years: 19,
    joined: "2024-06",
    items: [
      [
        "ivory-chobi-rug",
        "Faryab Ivory Rug",
        "Pale wool knotted in an open floral field, washed and sun-dried.",
        960,
        1,
      ],
      [
        "red-ivory-lattice-rug",
        "Andkhoy Lattice Rug",
        "A red lattice on an ivory ground, in hand-spun wool.",
        1240,
        1,
      ],
    ],
  },
  {
    name: "Balkh Loom Collective",
    maker: "Six weavers in a shared workshop",
    province: "Balkh",
    story:
      "Six weavers share one workshop, so each can keep weaving while the others dye and finish.",
    rating: 4.7,
    sales: 211,
    years: 12,
    joined: "2025-02",
    items: [
      [
        "red-ivory-lattice-rug",
        "Balkh Garden Rug",
        "A garden pattern in madder red, knotted over seven months.",
        880,
        1,
      ],
      [
        "indigo-field-rug",
        "Indigo Prayer Runner",
        "A narrow runner in deep indigo, for a hallway or bedside.",
        540,
        1,
      ],
      [
        "turquoise-medallion-rug",
        "Small Medallion Mat",
        "A small rug with a single turquoise medallion.",
        320,
        2,
      ],
    ],
  },
  {
    name: "Bamyan Wool Studio",
    maker: "Shirin and her family",
    province: "Bamyan",
    story:
      "Shirin spins and dyes highland wool by hand, and her family weaves it into rugs through the winter.",
    rating: 4.9,
    sales: 87,
    years: 15,
    joined: "2025-09",
    items: [
      [
        "indigo-field-rug",
        "Highland Indigo Rug",
        "Indigo-dyed highland wool with a soft, dense pile.",
        720,
        1,
      ],
      [
        "ivory-chobi-rug",
        "Undyed Wool Rug",
        "Natural, undyed wool in creams and greys.",
        410,
        1,
      ],
    ],
  },
  {
    name: "Kunduz Kilim Works",
    maker: "Abdul Basir and his apprentices",
    province: "Kunduz",
    story:
      "Abdul Basir trains young weavers while they work, and every rug carries one apprentice's name.",
    rating: 4.6,
    sales: 164,
    years: 27,
    joined: "2024-11",
    items: [
      [
        "turquoise-medallion-rug",
        "Kunduz Medallion Rug",
        "A central medallion in turquoise and rust.",
        1050,
        1,
      ],
      [
        "red-ivory-lattice-rug",
        "Red Border Rug",
        "A bold red border around a quiet ivory field.",
        460,
        1,
      ],
    ],
  },
  // Jewelry
  {
    name: "Badakhshan Stoneworks",
    maker: "Mir Ahmad",
    province: "Badakhshan",
    story:
      "Mir Ahmad cuts and sets mountain stones at a small bench, one ring at a time.",
    rating: 4.9,
    sales: 96,
    years: 22,
    joined: "2024-08",
    items: [
      [
        "panjshir-emerald-ring",
        "Emerald Cushion Ring",
        "A cushion-cut emerald in a gold halo setting.",
        760,
        1,
      ],
      [
        "amethyst-cabochon-ring",
        "Violet Stone Ring",
        "A polished violet cabochon in a simple band.",
        240,
        2,
      ],
    ],
  },
  {
    name: "Kandahar Silversmiths",
    maker: "Haji Nasrullah and his sons",
    province: "Kandahar",
    story:
      "A father and his sons hammer, solder and polish silver in the workshop their grandfather opened.",
    rating: 4.7,
    sales: 302,
    years: 34,
    joined: "2024-03",
    items: [
      [
        "emerald-silver-ring",
        "Silver Leaf Ring",
        "A green stone held in a hand-cut silver leaf.",
        190,
        3,
      ],
      [
        "green-tourmaline-ring",
        "Green Drop Ring",
        "A drop of green tourmaline on a slim band.",
        280,
        1,
      ],
    ],
  },
  {
    name: "Ghazni Gem Bench",
    maker: "Zahra",
    province: "Ghazni",
    story:
      "Zahra designs every setting around the stone in front of her, sketching each one before she cuts.",
    rating: 4.8,
    sales: 58,
    years: 9,
    joined: "2026-01",
    items: [
      [
        "amethyst-cabochon-ring",
        "Amethyst Dome Ring",
        "A domed amethyst in a raised setting.",
        210,
        2,
      ],
      [
        "panjshir-emerald-ring",
        "Gold Halo Ring",
        "A green stone ringed with small white stones.",
        680,
        1,
      ],
      [
        "emerald-silver-ring",
        "Twisted Silver Band",
        "A twisted silver band with a small green stone.",
        150,
        4,
      ],
    ],
  },
  {
    name: "Panjshir Stone Studio",
    maker: "Fawad",
    province: "Panjshir",
    story:
      "Fawad grew up near the valley's emerald mines and now cuts its stones for rings of his own design.",
    rating: 4.8,
    sales: 121,
    years: 14,
    joined: "2025-04",
    items: [
      [
        "green-tourmaline-ring",
        "Tourmaline Solitaire",
        "A single green tourmaline, cut to catch the light.",
        340,
        1,
      ],
      [
        "emerald-silver-ring",
        "Valley Silver Ring",
        "Hand-finished silver with a valley-green stone.",
        175,
        2,
      ],
    ],
  },
  // Pottery
  {
    name: "Shakardara Kilns",
    maker: "Ustad Karim",
    province: "Kabul",
    story:
      "Ustad Karim throws on a kick wheel and fires in a wood kiln shared with two neighbouring potters.",
    rating: 4.7,
    sales: 245,
    years: 31,
    joined: "2024-05",
    items: [
      [
        "istalif-turquoise-vase",
        "Turquoise Bud Vase",
        "A small vase in a bright turquoise glaze.",
        70,
        4,
      ],
      [
        "green-glaze-teapot",
        "Green Kiln Teapot",
        "A wood-fired teapot in a deep green glaze.",
        85,
        2,
      ],
    ],
  },
  {
    name: "Charikar Clay Studio",
    maker: "Rahima and Yusuf",
    province: "Parwan",
    story:
      "A husband and wife share the wheel: Yusuf throws, and Rahima glazes and fires.",
    rating: 4.6,
    sales: 133,
    years: 11,
    joined: "2025-07",
    items: [
      [
        "fluted-turquoise-vase",
        "Fluted Water Jug",
        "A ribbed jug for water or flowers.",
        95,
        3,
      ],
      [
        "brown-bottle-vase",
        "Earth Bottle Vase",
        "An unglazed bottle in warm river clay.",
        60,
        5,
      ],
    ],
  },
  {
    name: "Herat Glaze Works",
    maker: "Ustad Ghulam Sakhi",
    province: "Herat",
    story:
      "Ustad Ghulam Sakhi mixes his own glazes from local minerals and keeps the recipes in a notebook.",
    rating: 4.9,
    sales: 178,
    years: 38,
    joined: "2024-02",
    items: [
      [
        "green-glaze-teapot",
        "Herati Teapot",
        "A round teapot with a deep, glassy glaze.",
        110,
        2,
      ],
      [
        "istalif-turquoise-vase",
        "Glazed Flower Vase",
        "A tall vase glazed in turquoise.",
        75,
        3,
      ],
      [
        "fluted-turquoise-vase",
        "Ribbed Turquoise Jar",
        "A ribbed jar with a pooled turquoise glaze.",
        90,
        2,
      ],
    ],
  },
  {
    name: "Laghman River Pottery",
    maker: "Noor Mohammad",
    province: "Laghman",
    story:
      "Noor Mohammad digs his clay from the riverbank and makes the everyday pots his neighbours cook and serve with.",
    rating: 4.5,
    sales: 312,
    years: 25,
    joined: "2024-10",
    items: [
      [
        "brown-bottle-vase",
        "River Clay Bottle",
        "A simple bottle in burnished river clay.",
        55,
        6,
      ],
      [
        "green-glaze-teapot",
        "Everyday Clay Teapot",
        "A sturdy teapot for every day.",
        65,
        4,
      ],
    ],
  },
  // Menswear
  {
    name: "Kandahar Khamak Stitch",
    maker: "An embroidery circle of eight women",
    province: "Kandahar",
    story:
      "Eight women stitch khamak embroidery together, each adding her own patterns to the collar and cuffs.",
    rating: 4.9,
    sales: 156,
    years: 20,
    joined: "2024-07",
    items: [
      [
        "embroidered-perahan-tunban",
        "Khamak Embroidered Set",
        "Fine hand embroidery at the collar and cuffs.",
        140,
        3,
      ],
      [
        "brown-embroidered-perahan",
        "Fine Stitch Perahan",
        "A brown perahan with tone-on-tone stitching.",
        120,
        2,
      ],
    ],
  },
  {
    name: "Mazar Tailoring House",
    maker: "Ahmad Shah",
    province: "Balkh",
    story:
      "Ahmad Shah cuts every garment to the customer's measurements and sews it the same week.",
    rating: 4.6,
    sales: 389,
    years: 17,
    joined: "2024-04",
    items: [
      [
        "navy-perahan-tunban",
        "Navy Everyday Set",
        "A navy perahan tunban in soft cotton.",
        85,
        8,
      ],
      [
        "green-perahan-tunban",
        "Sage Cotton Set",
        "A sage-green set for warm days.",
        90,
        5,
      ],
    ],
  },
  {
    name: "Jalalabad Cotton Co.",
    maker: "Zabiullah and his brothers",
    province: "Nangarhar",
    story:
      "Three brothers make light cotton clothes for the heat of the east, cut and sewn in their own shop.",
    rating: 4.7,
    sales: 274,
    years: 13,
    joined: "2025-03",
    items: [
      [
        "green-perahan-tunban",
        "Summer Cotton Set",
        "Light cotton for the hottest months.",
        75,
        10,
      ],
      [
        "navy-perahan-tunban",
        "Deep Blue Cotton Set",
        "A deep blue set in breathable cotton.",
        78,
        6,
      ],
      [
        "embroidered-perahan-tunban",
        "Festive Collar Set",
        "A white set with an embroidered collar.",
        130,
        2,
      ],
    ],
  },
  {
    name: "Kunar Weave & Sew",
    maker: "Malalai",
    province: "Kunar",
    story:
      "Malalai sews and embroiders from home and now sells her work well beyond her valley.",
    rating: 4.8,
    sales: 64,
    years: 8,
    joined: "2026-03",
    items: [
      [
        "brown-embroidered-perahan",
        "Walnut Brown Perahan",
        "A walnut-brown perahan with hand-stitched details.",
        110,
        3,
      ],
      [
        "green-perahan-tunban",
        "Mountain Green Set",
        "A green set cut for comfort.",
        95,
        4,
      ],
    ],
  },
  // Woodwork
  {
    name: "Paghman Joinery",
    maker: "Ustad Habib",
    province: "Kabul",
    story:
      "Ustad Habib builds lattice furniture without nails, fitting every joint by hand.",
    rating: 4.9,
    sales: 72,
    years: 29,
    joined: "2024-09",
    items: [
      [
        "panjara-side-table",
        "Paghman Lattice Table",
        "A side table with a carved window lattice.",
        390,
        1,
      ],
      [
        "lattice-serving-tray",
        "Star Pattern Tray",
        "A walnut tray with a star-pattern rim.",
        120,
        2,
      ],
    ],
  },
  {
    name: "Kunar Cedar Carvers",
    maker: "Sher Ali and his son",
    province: "Kunar",
    story:
      "Sher Ali and his son carve cedar from the eastern forests into tables, boxes and trays.",
    rating: 4.7,
    sales: 98,
    years: 24,
    joined: "2025-01",
    items: [
      [
        "carved-side-table",
        "Cedar Pedestal Table",
        "A carved pedestal table in fragrant cedar.",
        440,
        1,
      ],
      [
        "painted-keepsake-box",
        "Cedar Trinket Box",
        "A small lidded box for keepsakes.",
        65,
        5,
      ],
    ],
  },
  {
    name: "Ghor Painted Woods",
    maker: "Nasima",
    province: "Ghor",
    story:
      "Nasima paints flowers and birds onto small wooden pieces, each one by hand with a single fine brush.",
    rating: 4.8,
    sales: 115,
    years: 10,
    joined: "2025-06",
    items: [
      [
        "painted-keepsake-box",
        "Painted Flower Box",
        "A lidded box painted with spring flowers.",
        58,
        4,
      ],
      [
        "lattice-serving-tray",
        "Painted Rim Tray",
        "A serving tray with a hand-painted rim.",
        95,
        2,
      ],
    ],
  },
  {
    name: "Logar Woodturners",
    maker: "Hamidullah",
    province: "Logar",
    story:
      "Hamidullah turns and carves walnut on a foot-powered lathe in his courtyard workshop.",
    rating: 4.6,
    sales: 83,
    years: 18,
    joined: "2025-10",
    items: [
      [
        "lattice-serving-tray",
        "Walnut Serving Tray",
        "A walnut tray, oiled and waxed by hand.",
        105,
        3,
      ],
      [
        "carved-side-table",
        "Turned Leg Side Table",
        "A side table with hand-turned legs.",
        360,
        1,
      ],
      [
        "panjara-side-table",
        "Small Window Table",
        "A compact table with a lattice apron.",
        310,
        1,
      ],
    ],
  },
  // Glassware
  {
    name: "Old City Glass",
    maker: "Ustad Naqib",
    province: "Herat",
    story:
      "Ustad Naqib blows recycled glass into the cobalt blue the old city has been known for for centuries.",
    rating: 4.9,
    sales: 204,
    years: 36,
    joined: "2024-01",
    items: [
      [
        "herat-blue-glass",
        "Cobalt Bubble Vase",
        "Bubbly cobalt glass, blown from recycled bottles.",
        68,
        4,
      ],
      [
        "cobalt-footed-bowl",
        "Deep Blue Dish",
        "A footed dish in deep blue glass.",
        82,
        3,
      ],
    ],
  },
  {
    name: "Kabul Glass Atelier",
    maker: "Samira and Javid",
    province: "Kabul",
    story:
      "Samira and Javid melt down sorted bottles and blow them into everyday glasses and carafes.",
    rating: 4.7,
    sales: 137,
    years: 7,
    joined: "2025-11",
    items: [
      [
        "amber-glass-tumblers",
        "Amber Tea Glasses, Set of 4",
        "Small amber glasses for tea.",
        72,
        5,
      ],
      [
        "striped-carafe-set",
        "Amber Stripe Carafe",
        "A carafe with a pulled amber stripe.",
        88,
        2,
      ],
    ],
  },
  {
    name: "Jawzjan Glassblowers",
    maker: "Qadir and his nephews",
    province: "Jawzjan",
    story:
      "Qadir taught his nephews to blow glass, and the three now share one wood-fired furnace.",
    rating: 4.6,
    sales: 91,
    years: 21,
    joined: "2025-05",
    items: [
      [
        "striped-carafe-set",
        "Striped Water Set",
        "A carafe and glasses with pulled stripes.",
        120,
        2,
      ],
      [
        "herat-blue-glass",
        "Blue Bud Vases, Pair",
        "Two small vases in bubbly blue glass.",
        64,
        3,
      ],
    ],
  },
  // Leather
  {
    name: "Herat Leatherworks",
    maker: "Rahmatullah and his apprentices",
    province: "Herat",
    story:
      "Rahmatullah cuts, stitches and finishes every bag by hand, and teaches the craft to four young apprentices.",
    rating: 4.8,
    sales: 143,
    years: 16,
    joined: "2025-08",
    items: [],
  },
  {
    name: "Takhar Blue Glass",
    maker: "Hasibullah",
    province: "Takhar",
    story:
      "Hasibullah opened his furnace two years ago and makes bowls and cups in blue and amber.",
    rating: 4.5,
    sales: 46,
    years: 6,
    joined: "2026-05",
    items: [
      [
        "cobalt-footed-bowl",
        "Footed Fruit Bowl",
        "A footed bowl in cobalt glass.",
        98,
        2,
      ],
      [
        "amber-glass-tumblers",
        "Recycled Glass Cups",
        "Everyday cups in amber recycled glass.",
        46,
        8,
      ],
      [
        "herat-blue-glass",
        "Cobalt Pitcher",
        "A small pitcher in deep cobalt.",
        85,
        2,
      ],
    ],
  },
];

const extraProducts: Product[] = extraShops.flatMap((shop) =>
  shop.items.map(([photo, name, description, price, stock]) => {
    const base = coreProducts.find((p) => p.slug === photo);
    if (!base) throw new Error(`Unknown product photo: ${photo}`);
    return {
      ...base,
      slug: categorySlug(name),
      name,
      maker: shop.maker,
      place: shop.province,
      description,
      price: `$${price.toLocaleString("en-US")}`,
      priceValue: price,
      stock,
      availability: stock === 1 ? "One only" : `${stock} available`,
      image: base.image ?? base.slug,
    };
  }),
);

export const products: Product[] = [...coreProducts, ...extraProducts];

/**
 * Default "Featured" order: deals one product from each category per round and shifts the
 * starting category each round, so the grid mixes crafts instead of grouping them.
 */
export const featuredProducts: Product[] = (() => {
  const groups = Array.from(new Set(products.map((p) => p.category))).map((c) =>
    products.filter((p) => p.category === c),
  );
  const rounds = Math.max(...groups.map((g) => g.length));
  const order: Product[] = [];
  for (let r = 0; r < rounds; r++) {
    for (let i = 0; i < groups.length; i++) {
      const item = groups[(i + r) % groups.length][r];
      if (item) order.push(item);
    }
  }
  return order;
})();

/** Swatch colours for the Color filter. */
export const colorSwatches: Record<string, string> = {
  Ivory: "#efe8d6",
  Green: "#2f8f5b",
  Red: "#b23a3a",
  Gold: "#d4a537",
  Turquoise: "#1fb5c6",
  Black: "#1f1f1f",
  Brown: "#8a5a35",
  Blue: "#1f3fbf",
  Silver: "#c0c4c8",
  Purple: "#7b4fb3",
  Amber: "#c98a1e",
  Grey: "#8d9196",
};

export type Category = {
  name: string;
  slug: string;
  /** Catalogue size shown on the Categories page. */
  count: number;
  image: string;
  /** Placement in the 4-column mosaic on large screens. */
  layout: string;
  /** Where the product shot sits inside the card. */
  imageBox: string;
  /** Card colour, matched to the photo's own background so the shot reads edge to edge. */
  background?: string;
  /**
   * Which products belong, for categories that cut across crafts (Kitchen & Dining, Gifts…).
   * Without it, a category holds the products whose `category` is its name.
   */
  match?: (p: Product) => boolean;
};

/** The photo a product uses, which identifies the kind of piece it is. */
const photoOf = (p: Product) => p.image ?? p.slug;
const withPhoto =
  (...photos: string[]) =>
  (p: Product) =>
    photos.includes(photoOf(p));

/** Market Place categories: two mosaics of six, each in the order wide, tall, tall / tall, tall, wide. */
export const categories: Category[] = [
  {
    name: "Glassware",
    count: 318,
    image: asset("/images/products/herat-blue-glass.jpg"),
    layout: "lg:col-span-2 lg:row-span-3",
    imageBox: "right-0 bottom-0 h-full w-1/2",
  },
  {
    name: "Menswear",
    count: 136,
    image: asset("/images/products/embroidered-perahan-tunban.jpg"),
    layout: "lg:row-span-4",
    imageBox: "inset-x-0 bottom-0 h-[62%]",
  },
  {
    name: "Pottery",
    count: 207,
    image: asset("/images/products/istalif-turquoise-vase.jpg"),
    layout: "lg:row-span-4",
    imageBox: "inset-x-0 bottom-0 h-[62%]",
  },
  {
    name: "Handmade Rugs",
    count: 742,
    image: asset("/images/products/ivory-chobi-rug.jpg"),
    layout: "lg:row-span-4",
    imageBox: "inset-x-0 bottom-0 h-[62%]",
  },
  {
    name: "Jewelry",
    count: 589,
    image: asset("/images/products/panjshir-emerald-ring.jpg"),
    layout: "lg:row-span-4",
    imageBox: "inset-x-0 bottom-0 h-[62%]",
  },
  {
    name: "Woodwork",
    count: 271,
    image: asset("/images/products/panjara-side-table.jpg"),
    layout: "lg:col-span-2 lg:row-span-3",
    imageBox: "right-0 bottom-0 h-full w-1/2",
  },
  // Second mosaic, same pattern as the first: wide, tall, tall / tall, tall, wide.
  {
    name: "Leather Bags",
    count: 164,
    image: asset("/images/products/tan-leather-weekender.jpg"),
    layout: "lg:col-span-2 lg:row-span-3",
    imageBox: "right-0 bottom-0 h-full w-1/2",
    background: "#ededed",
  },
  {
    name: "Womenswear",
    count: 213,
    image: asset("/images/products/festival-patchwork-dress.jpg"),
    layout: "lg:row-span-4",
    imageBox: "inset-x-0 bottom-0 h-[62%]",
    background: "#f2f2f2",
  },
  {
    name: "Hats & Caps",
    count: 96,
    image: asset("/images/products/embroidered-kandahari-cap.jpg"),
    layout: "lg:row-span-4",
    imageBox: "inset-x-0 bottom-0 h-[62%]",
    background: "#f2f2f2",
  },
  {
    name: "Jewelry Sets",
    count: 148,
    image: asset("/images/products/green-agate-drop-set.jpg"),
    layout: "lg:row-span-4",
    imageBox: "inset-x-0 bottom-0 h-[62%]",
    background: "#e7e7e7",
    match: withPhoto(
      "carnelian-silver-set",
      "green-agate-drop-set",
      "peridot-fan-pendant-set",
      "amber-stone-halo-set",
    ),
  },
  {
    name: "Kitchen & Dining",
    count: 164,
    image: asset("/images/products/green-glaze-teapot.jpg"),
    layout: "lg:row-span-4",
    imageBox: "inset-x-0 bottom-0 h-[62%]",
    background: "#fbfcfe",
    match: withPhoto(
      "blue-leaf-istalif-plate",
      "painted-medallion-plate",
      "speckled-amber-plate",
      "lattice-garden-plate",
      "green-glaze-teapot",
      "cobalt-footed-bowl",
      "striped-carafe-set",
      "amber-glass-tumblers",
      "lattice-serving-tray",
    ),
  },
  {
    name: "Home Décor",
    count: 233,
    image: asset("/images/products/painted-keepsake-box.jpg"),
    layout: "lg:col-span-2 lg:row-span-3",
    imageBox: "right-0 bottom-0 h-full w-1/2",
    background: "#ffffff",
    match: withPhoto(
      "painted-medallion-plate",
      "painted-keepsake-box",
      "fluted-turquoise-vase",
      "istalif-turquoise-vase",
      "brown-bottle-vase",
      "lattice-serving-tray",
      "herat-blue-glass",
    ),
  },
].map((c) => ({ ...c, slug: categorySlug(c.name) }));

/** Whether a product belongs to the category with this slug. */
export function inCategory(p: Product, slug: string) {
  const category = categories.find((c) => c.slug === slug);
  if (!category) return false;
  return category.match ? category.match(p) : p.category === category.name;
}

export type Shop = {
  slug: string;
  name: string;
  /** Matches Product.maker. */
  maker: string;
  province: string;
  /** Placeholder story: replace with the shop's own words before launch. */
  story: string;
  /**
   * Placeholder headshot at /images/artisans/<slug>.jpg. These are stand-in photos, not the real
   * makers: replace with consented photos of each artisan (or remove) before launch.
   */
  photo?: string;
  /** Alt text for the photo when it isn't a portrait (shops shown by a product photo). */
  photoAlt?: string;
  /** Monogram for the fallback logo (shown when there's no photo), and its colours. */
  monogram: string;
  logoBg: string;
  logoFg: string;
  /** Profile card cover: a brand-colour mesh gradient. */
  cover: string;
  /** Placeholder stats for the profile card: replace with real figures before launch. */
  rating: number;
  sales: number;
  years: number;
  /** Placeholder: the month the shop joined Omid, as "YYYY-MM". */
  joined: string;
};

const shopList: Omit<Shop, "slug">[] = [
  {
    name: "Zarghuna Weavers",
    maker: "Zarghuna and her daughters",
    province: "Herat",
    story:
      "Zarghuna learned to knot rugs from her mother and now works the loom with her three daughters. Each rug takes months, dyed by hand from walnut, madder and pomegranate.",
    monogram: "ZW",
    logoBg: "#275264",
    logoFg: "#6fe3e1",
    cover:
      "radial-gradient(at 15% 20%, #6fe3e1 0, transparent 55%), radial-gradient(at 85% 80%, #0097b2 0, transparent 55%), linear-gradient(135deg, #275264, #0b2129)",
    rating: 4.9,
    sales: 186,
    years: 22,
    joined: "2024-03",
  },
  {
    name: "Jawad Jewelry",
    maker: "Sayed Jawad",
    province: "Kabul",
    story:
      "Sayed Jawad sets Afghan stones, emerald, amethyst and tourmaline, in gold and silver. He cuts and polishes each stone at his bench and designs every setting around it.",
    monogram: "JJ",
    logoBg: "#fbbd03",
    logoFg: "#275264",
    cover:
      "radial-gradient(at 20% 80%, #fbbd03 0, transparent 55%), radial-gradient(at 80% 20%, #6fe3e1 0, transparent 50%), linear-gradient(135deg, #fde49a, #f39c12)",
    rating: 4.8,
    sales: 312,
    years: 15,
    joined: "2025-01",
  },
  {
    name: "Istalif Clay Works",
    maker: "Ustad Rahimullah",
    province: "Kabul",
    story:
      "In the pottery village of Istalif, Ustad Rahimullah throws vases and teapots on a kick wheel and fires them in a wood kiln, glazed in the turquoise the town is known for.",
    monogram: "IC",
    logoBg: "#0097b2",
    logoFg: "#ffffff",
    cover:
      "radial-gradient(at 80% 30%, #6fe3e1 0, transparent 55%), radial-gradient(at 15% 85%, #275264 0, transparent 55%), linear-gradient(135deg, #0097b2, #00667a)",
    rating: 4.9,
    sales: 248,
    years: 30,
    joined: "2024-07",
  },
  {
    name: "Najibullah Tailors",
    maker: "Najibullah's tailoring house",
    province: "Kabul",
    story:
      "Najibullah's workshop cuts and sews perahan tunban to order, with yokes and cuffs embroidered by hand in cotton and metallic thread.",
    monogram: "NT",
    logoBg: "#6fe3e1",
    logoFg: "#275264",
    cover:
      "radial-gradient(at 20% 30%, #ffffff 0, transparent 50%), radial-gradient(at 85% 75%, #0097b2 0, transparent 55%), linear-gradient(135deg, #6fe3e1, #3cc6c3)",
    rating: 4.7,
    sales: 401,
    years: 12,
    joined: "2025-05",
  },
  {
    name: "Nuristan Woodcraft",
    maker: "Gul Ahmad and his brother",
    province: "Nuristan",
    story:
      "Gul Ahmad and his brother carve walnut and cedar in the lattice patterns of Nuristani windows, turning them into tables, trays and boxes for the home.",
    monogram: "NW",
    logoBg: "#8a5a35",
    logoFg: "#fdf1c9",
    cover:
      "radial-gradient(at 80% 20%, #fbbd03 0, transparent 50%), radial-gradient(at 15% 80%, #3b2414 0, transparent 55%), linear-gradient(135deg, #b07a4f, #6b4426)",
    rating: 4.8,
    sales: 154,
    years: 18,
    joined: "2025-11",
  },
  {
    name: "Herat Blue Glass",
    maker: "Abdul Wakil and his sons",
    province: "Herat",
    story:
      "Abdul Wakil and his sons keep one of Herat's last wood-fired glass furnaces alight, blowing recycled bottles into the cobalt and amber pieces the city is famous for.",
    monogram: "HB",
    logoBg: "#1f3fbf",
    logoFg: "#ffffff",
    cover:
      "radial-gradient(at 20% 25%, #6fe3e1 0, transparent 50%), radial-gradient(at 80% 80%, #fbbd03 0, transparent 45%), linear-gradient(135deg, #1f3fbf, #12236e)",
    rating: 4.9,
    sales: 527,
    years: 40,
    joined: "2024-02",
  },
];

const coreShops: Shop[] = shopList.map((s) => {
  const slug = categorySlug(s.name);
  return { ...s, slug, photo: asset(`/images/artisans/${slug}.jpg`) };
});

const moreShops: Shop[] = extraShops.map((s, i) => {
  const lead = products.find((p) => p.maker === s.maker)!;
  return {
    slug: categorySlug(s.name),
    name: s.name,
    maker: s.maker,
    province: s.province,
    story: s.story,
    photo: productImage(lead),
    photoAlt: lead.alt,
    monogram: s.name
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0])
      .join(""),
    logoBg: "#275264",
    logoFg: "#6fe3e1",
    // Reuse the original shops' covers in turn.
    cover: shopList[i % shopList.length].cover,
    rating: s.rating,
    sales: s.sales,
    years: s.years,
    joined: s.joined,
  };
});

/** Artisan shops, in catalogue order. */
export const shops: Shop[] = [...coreShops, ...moreShops];

/** Shops with their products, for the Artisans page. */
export const artisans = shops.map((shop) => ({
  ...shop,
  products: products.filter((p) => p.maker === shop.maker),
}));

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

/** "2024-03" → "March 2024". */
export function formatJoined(joined: string) {
  const [year, month] = joined.split("-").map(Number);
  return `${MONTHS[month - 1]} ${year}`;
}
