import type {
  ABStory,
  CommunityStory,
  PartnerLocation,
  Wine,
} from "./types";

export const wines: Wine[] = [
  {
    slug: "circulo-rose",
    name: "Círculo Rosé de Prensa",
    style: "rosé",
    region: "Aguascalientes",
    abv: 12.5,
    notes: ["Toronja rosa", "Flor de azahar", "Petrichor", "Arcilla roja"],
    storyTagline: "La luna sobre viñedos jóvenes revela un nuevo comienzo.",
    heroImage: "/images/circulo-rose-bottle.svg",
    vintages: [
      {
        year: 2026,
        sku: "VT-CR-26",
        bottles: 1400,
        abPairs: 700,
      },
    ],
  },
];

export const abStories: ABStory[] = [
  {
    code: "037A",
    a: "Observaste el amanecer antes que nadie, sosteniendo la primera botella etiquetada A. En la quietud lo prometiste: nada se desperdicia cuando todo nace con intención.",
    b: "Encontraste la mitad B cuando la luna alcanzó la torre de fermentación. Fue el recordatorio de que cada decisión compartida tiene eco en quien la acompaña.",
    wineSlug: "circulo-rose",
    vintage: 2026,
    theme: "Love",
  },
  {
    code: "118A",
    a: "Guardaste el código en tu libreta de recetas. Cada añada empieza en la cocina, donde el vapor y la sal despiertan memorias de familia y viaje.",
    b: "El código B llegó con una carta sellada. Decidiste escribir un menú completo alrededor del vino, antes incluso de probarlo.",
    wineSlug: "circulo-rose",
    vintage: 2026,
    theme: "Time",
  },
  {
    code: "501A",
    a: "Te tocó el barril 05.1 y con él la responsabilidad de probar cuando nadie mira. Aprendiste a escuchar cómo el vino respira.",
    b: "El código hermano te esperó en la puerta del cuarto frío. Entendiste que el silencio también es una celebración.",
    wineSlug: "circulo-rose",
    vintage: 2026,
    theme: "Inspiration",
  },
];

export const communityStories: CommunityStory[] = [
  {
    id: "s1",
    snippet: "Brindamos entre barricas vacías sabiendo que el sonido del corcho guardaría nuestro pacto.",
    author: "Alma & Renata",
    theme: "Love",
  },
  {
    id: "s2",
    snippet: "La letra A se quedó conmigo; la B viajó a Tokio. El vino nos recordó que la distancia también se puede saborear.",
    theme: "Reunion",
  },
  {
    id: "s3",
    snippet: "Era la última noche de vendimia y el oro líquido parecía contener cada conversación del año.",
    theme: "Time",
  },
  {
    id: "s4",
    snippet: "Prometimos no abrir la botella hasta redescubrir el cielo de Aguascalientes juntos.",
    author: "Rocío",
    theme: "Love",
  },
  {
    id: "s5",
    snippet: "Mi abuelo decía que el rosé guarda secretos de quienes se atreven a escuchar con paciencia.",
    theme: "Inspiration",
  },
  {
    id: "s6",
    snippet: "Campanas a medianoche, botella compartida, códigos intercambiados antes de partir.",
    theme: "Farewell",
  },
  {
    id: "s7",
    snippet: "El chef dibujó una espiral de salsa dorada que reflejó la luz en el mismo tono que la etiqueta.",
    theme: "Inspiration",
  },
  {
    id: "s8",
    snippet: "Nunca antes un vino me había pedido escribirle una carta antes de beberlo.",
    author: "Ernesto",
    theme: "Time",
  },
  {
    id: "s9",
    snippet: "Pintamos las iniciales sobre la caja de roble y prometimos abrirla el día del reencuentro.",
    theme: "Reunion",
  },
  {
    id: "s10",
    snippet: "El código B llegó con una playlist grabada en cassette. Aun suena la aguja cada aniversario.",
    theme: "Love",
  },
  {
    id: "s11",
    snippet: "Guardé la mitad A para mi hija. Le contaré que nació de una prensa nocturna.",
    theme: "Time",
  },
  {
    id: "s12",
    snippet: "El último sorbo se tomó mirando el desierto, agradeciendo cada paso que nos trajo de vuelta.",
    theme: "Farewell",
  },
  {
    id: "s13",
    snippet: "A+B se convirtieron en tatuajes gemelos: círculo y punto. Nunca olvidaremos la historia compartida.",
    theme: "Love",
  },
  {
    id: "s14",
    snippet: "Envié mi mitad desde un hotel en Lisboa. Al regresar, la encontramos guardando aroma a bugambilia.",
    theme: "Reunion",
  },
  {
    id: "s15",
    snippet: "El vino nos recordó que las despedidas también pueden ser futuras bienvenidas.",
    theme: "Farewell",
  },
  {
    id: "s16",
    snippet: "Cada añada despierta nuevas notas en mis bocetos. El rosé es mi tinta líquida.",
    theme: "Inspiration",
  },
];

export const partnerLocations: PartnerLocation[] = [
  {
    name: "Casa Aurelia",
    type: "Restaurante",
    city: "Ciudad de México",
    url: "https://casaurelia.mx",
  },
  {
    name: "Hotel Sombra Dorada",
    type: "Hotel",
    city: "San Miguel de Allende",
  },
  {
    name: "Enoteca Horizonte",
    type: "Enoteca",
    city: "Guadalajara",
    url: "https://enotecahorizonte.com",
  },
];

export const preorderPlans = [
  {
    id: "single",
    title: "Single",
    price: 1200,
    description: "Una botella exclusiva con certificado de origen y código único.",
    details: ["Incluye Story A", "Certificado firmado", "Acceso a cata virtual"],
  },
  {
    id: "pair",
    title: "Pair A+B",
    price: 1600,
    description:
      "Dos botellas entrelazadas para compartir la experiencia narrativa completa.",
    details: [
      "Incluye Story A y Story B",
      "Acceso prioritario a experiencias privadas",
      "Caja de colección numerada",
    ],
  },
];
