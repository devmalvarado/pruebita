import {
  ABStory,
  CommunityQuote,
  PartnerLocation,
  StorySubmission,
  Wine,
} from "./types";

export const wines: Wine[] = [
  {
    slug: "prensa-rose",
    name: "Prensa Rosé 2026",
    style: "rosé",
    region: "Aguascalientes",
    abv: 12.5,
    notes: [
      "toronja rosa cristalizada",
      "flores de azahar",
      "almendra tostada",
      "piedra húmeda",
    ],
    storyTagline: "Un amanecer contenido en cristal cobreado.",
    heroImage: "/images/prensa-rose-2026.svg",
    vintages: [
      {
        year: 2026,
        sku: "PR-2026",
        bottles: 1400,
        abPairs: 700,
      },
    ],
  },
];

export const stories: ABStory[] = [
  {
    code: "037A",
    a: "El amanecer bañó los viñedos cuando ella dijo que sí, con las manos aún cubiertas de mosto.",
    b: "En la carta jamás enviada, él agradeció el coraje de haber partido juntos hacia lo desconocido.",
    wineSlug: "prensa-rose",
    vintage: 2026,
    theme: "Love",
  },
  {
    code: "118A",
    a: "Guardó este rosé para la noche en que el tiempo se volviera a doblar a su favor.",
    b: "Cuando el reloj marcó la medianoche, prometió escribir cada instante antes de que se esfumara.",
    wineSlug: "prensa-rose",
    vintage: 2026,
    theme: "Time",
  },
  {
    code: "501A",
    a: "En la mesa larga, las sillas vacías dejaron de doler; reencontrarse también es brindar por los ausentes.",
    b: "La botella viajó kilómetros para revelar que nadie llega tarde a su propia celebración.",
    wineSlug: "prensa-rose",
    vintage: 2026,
    theme: "Reunion",
  },
];

export const communityQuotes: CommunityQuote[] = [
  {
    id: "cq-01",
    theme: "Love",
    quote: "Brindamos por el comienzo, aunque aún no sepamos su nombre.",
    author: "María E.",
  },
  {
    id: "cq-02",
    theme: "Time",
    quote: "Este rosé sabe al verano que prometimos repetir.",
    author: "Anónimo",
  },
  {
    id: "cq-03",
    theme: "Reunion",
    quote: "Llenamos las copas y, de pronto, nadie estaba lejos.",
    author: "Lucía & Sofía",
  },
  {
    id: "cq-04",
    theme: "Farewell",
    quote: "Guardé la última gota para el adiós que merecía poesía.",
  },
  {
    id: "cq-05",
    theme: "Inspiration",
    quote: "Si la tinta se acaba, que sea porque seguimos contando historias.",
    author: "Javier R.",
  },
  {
    id: "cq-06",
    theme: "Love",
    quote: "Lo servimos frío para recordar que el fuego también puede ser sereno.",
  },
  {
    id: "cq-07",
    theme: "Time",
    quote: "Setecientos pares y solo una manera de detener el reloj: abrirlo juntos.",
  },
  {
    id: "cq-08",
    theme: "Reunion",
    quote: "Esta botella cruzó el océano con nuestros apellidos grabados en el cristal.",
  },
  {
    id: "cq-09",
    theme: "Farewell",
    quote: "Nos despedimos sin prisa; la noche guardó cada palabra.",
  },
  {
    id: "cq-10",
    theme: "Inspiration",
    quote: "Decidimos que ninguna idea debería quedarse sin brindar.",
  },
  {
    id: "cq-11",
    theme: "Love",
    quote: "Nunca antes un sorbo había sabido a promesa cumplida.",
  },
  {
    id: "cq-12",
    theme: "Reunion",
    quote: "Los abrazos se sincronizaron con el tintineo de cristal.",
  },
  {
    id: "cq-13",
    theme: "Inspiration",
    quote: "Un vino que invita a escribir hasta el amanecer.",
  },
  {
    id: "cq-14",
    theme: "Farewell",
    quote: "Nos despedimos, pero dejamos la mitad B esperando su retorno.",
  },
  {
    id: "cq-15",
    theme: "Love",
    quote: "Cada copa fue una letra; juntos deletreamos destino.",
  },
  {
    id: "cq-16",
    theme: "Time",
    quote: "Lo abrimos cuando la paciencia supo a victoria.",
  },
];

export const partnerLocations: PartnerLocation[] = [
  {
    name: "Casa del Sol",
    type: "Hotel",
    city: "San Miguel de Allende",
    region: "Guanajuato",
    highlight: "Cenas maridaje en terrazas privadas.",
  },
  {
    name: "Áurea 17",
    type: "Restaurante",
    city: "Ciudad de México",
    region: "CDMX",
    highlight: "Carta de temporada inspirada en productos del Bajío.",
  },
  {
    name: "Galería del Tiempo",
    type: "Enoteca",
    city: "Guadalajara",
    region: "Jalisco",
    highlight: "Curaduría de etiquetas latinoamericanas emergentes.",
  },
  {
    name: "La Piedra Roja",
    type: "Restaurante",
    city: "Aguascalientes",
    region: "Aguascalientes",
    highlight: "Menú degustación con vinos de altura.",
  },
];

export const storyFilters = [
  { value: "All", label: "Todas" },
  { value: "Love", label: "Amor" },
  { value: "Time", label: "Tiempo" },
  { value: "Reunion", label: "Reencuentro" },
  { value: "Farewell", label: "Despedida" },
  { value: "Inspiration", label: "Inspiración" },
] as const;

export const storySubmissions: StorySubmission[] = [];
