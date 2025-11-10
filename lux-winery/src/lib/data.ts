import type {
  ABStory,
  CommunityStory,
  PartnerLocation,
  PreorderPlan,
  StoryTheme,
  Wine,
} from "@/lib/types"

export const storyThemes: StoryTheme[] = [
  "Love",
  "Time",
  "Reunion",
  "Farewell",
  "Inspiration",
]

export const wines: Wine[] = [
  {
    slug: "canto-circular-rose",
    name: "Canto Circular Rosé",
    style: "rosé",
    region: "Aguascalientes",
    abv: 12.5,
    notes: ["granada blanca", "jamaica confitada", "mineralidad salina"],
    storyTagline: "Un rosé pensado como dos versos que se buscan en espiral.",
    heroImage: "/images/canto-circular-hero.svg",
    vintages: [
      {
        year: 2026,
        sku: "CIR-ROSE-26",
        bottles: 1400,
        abPairs: 700,
      },
    ],
    gallery: [
      "/images/canto-circular-gallery-1.svg",
      "/images/canto-circular-gallery-2.svg",
      "/images/canto-circular-gallery-3.svg",
    ],
    profile:
      "Prensado suave en frío, reposo sobre lías finas durante 4 meses y afinado en ánforas de arcilla negra. Cada dúo de botellas narra una tensión distinta entre destino y deseo.",
  },
]

export const abStories: ABStory[] = [
  {
    code: "037A",
    a: "La carta quedó sin firma, pero llevaba perfume de bugambilia. Él prometió abrirla solo cuando volviera la luna roja sobre los viñedos.",
    b: "Guardó la mitad de la carta en su botella. La otra, la dejó en la tuya. Cuando la abras, escucha si el viento todavía lleva su voz.",
    wineSlug: "canto-circular-rose",
    vintage: 2026,
    theme: "Love",
  },
  {
    code: "118A",
    a: "Nunca llegaron a tiempo, y desde entonces brindan solo cuando el reloj marca las 11:18, celebrando la magia de los retrasos voluntarios.",
    b: "Si tu botella no encuentra pareja, bríndala a solas a la misma hora. Hay sincronías que necesitan un testigo silencioso.",
    wineSlug: "canto-circular-rose",
    vintage: 2026,
    theme: "Time",
  },
  {
    code: "501A",
    a: "La estación se cerró en 1950, pero alguien siguió dejando flores en el andén. Cada vez que la niebla baja, el pueblo jura ver dos siluetas reuniéndose.",
    b: "Si te toca la botella B, regresa con ella al primer amanecer frío de noviembre. Dicen que así la estación vuelve a abrir, aunque solo dure un sorbo.",
    wineSlug: "canto-circular-rose",
    vintage: 2026,
    theme: "Reunion",
  },
]

export const communityStories: CommunityStory[] = [
  {
    id: "com-1",
    code: "014A",
    quote: "Guardé la botella en la cueva familiar. Cuando la abrimos, supimos que las despedidas también pueden maridar con risas.",
    theme: "Farewell",
  },
  {
    id: "com-2",
    code: "102B",
    quote: "Mi abuelo decía que un rosé bien hecho se guarda para el perdón. Hoy lo abrimos y ya no hubo palabras necesarias.",
    theme: "Love",
  },
  {
    id: "com-3",
    code: "221A",
    quote: "La nota en la etiqueta era su caligrafía. No sé cómo llegó ahí, pero desde entonces creemos en las coincidencias pacientes.",
    theme: "Time",
  },
  {
    id: "com-4",
    code: "318B",
    quote: "Traje mi botella a la costa y la compartí con desconocidos. Esa noche, todos contamos historias de reencuentros imposibles.",
    theme: "Reunion",
  },
  {
    id: "com-5",
    code: "412A",
    quote: "Dicen que todo se había planeado, pero nosotros improvisamos el brindis y eso cambió el rumbo de la velada.",
    theme: "Inspiration",
  },
  {
    id: "com-6",
    code: "509B",
    quote: "Unimos las dos botellas para inaugurar nuestro restaurante. Desde entonces, la carta siempre incluye un guiño al destino.",
    theme: "Inspiration",
  },
  {
    id: "com-7",
    code: "622A",
    quote: "La mitad A nunca llegó. La mitad B la bebí con mi hermana mientras inventábamos el final que nos hacía falta.",
    theme: "Farewell",
  },
  {
    id: "com-8",
    code: "703B",
    quote: "La botella me enseñó que el tiempo no cicatriza, pero sí pule los bordes afilados de un recuerdo.",
    theme: "Time",
  },
  {
    id: "com-9",
    code: "804A",
    quote: "La llevamos a la cima del cerro. Brindaba con el amanecer mientras hablábamos de volver a empezar.",
    theme: "Love",
  },
  {
    id: "com-10",
    code: "910B",
    quote: "Vaciamos la copa sobre la tierra para agradecer lo vivido. No hubo tristeza, solo gratitud lenta.",
    theme: "Farewell",
  },
  {
    id: "com-11",
    code: "011A",
    quote: "Nos conocimos discutiendo sobre añadas. Terminamos escribiendo un manifiesto que ahora acompaña cada servicio.",
    theme: "Inspiration",
  },
  {
    id: "com-12",
    code: "125B",
    quote: "La historia B decía que la esperanza cabía en 750 ml. Decidimos comprobarlo juntos.",
    theme: "Reunion",
  },
  {
    id: "com-13",
    code: "137A",
    quote: "Unimos A y B en un decantador. El resultado fue imperfecto, pero ahí encontramos el sabor exacto de lo que somos.",
    theme: "Love",
  },
  {
    id: "com-14",
    code: "205B",
    quote: "Cada año repito la misma carta. Ella nunca responde, pero siempre me envía una botella nueva.",
    theme: "Time",
  },
  {
    id: "com-15",
    code: "287A",
    quote: "La despedida oficial ocurrió en silencio. Esta botella nos permitió darle voz al agradecimiento.",
    theme: "Farewell",
  },
  {
    id: "com-16",
    code: "356B",
    quote: "Inspiró el estribillo que necesitaba para terminar una canción que llevaba años bloqueada.",
    theme: "Inspiration",
  },
]

export const partners: PartnerLocation[] = [
  {
    id: "partner-1",
    name: "Restaurante Horizonte",
    type: "Restaurant",
    city: "Ciudad de México",
    region: "CDMX",
    highlight: "Menú degustación inspirado en micro estaciones mexicanas.",
    website: "https://horizonte.mx",
  },
  {
    id: "partner-2",
    name: "Hotel Caldera",
    type: "Hotel",
    city: "San Miguel de Allende",
    region: "Guanajuato",
    highlight: "Oasis boutique con cava de etiquetas exclusivamente mexicanas.",
    website: "https://hotelcaldera.mx",
  },
  {
    id: "partner-3",
    name: "Enoteca La Vid",
    type: "Enoteca",
    city: "Guadalajara",
    region: "Jalisco",
    highlight: "Selección curada de vinos de baja intervención y experiencias guiadas.",
    website: "https://lavid.mx",
  },
  {
    id: "partner-4",
    name: "Restaurante Sal Marina",
    type: "Restaurant",
    city: "Tulum",
    region: "Quintana Roo",
    highlight: "Platos marinos ahumados en maderas aromáticas y menú de atardeceres.",
  },
  {
    id: "partner-5",
    name: "Casa Mirador",
    type: "Hotel",
    city: "Valle de Guadalupe",
    region: "Baja California",
    highlight: "Residencia enológica privada con experiencias de blending tailor-made.",
    website: "https://casamirador.mx",
  },
  {
    id: "partner-6",
    name: "Enoteca Origen",
    type: "Enoteca",
    city: "Monterrey",
    region: "Nuevo León",
    highlight: "Club de botellas con narrativa culinaria y programación cultural.",
  },
]

export const preorderPlans: PreorderPlan[] = [
  {
    id: "single",
    name: "Single Edition",
    price: 1200,
    description:
      "Una botella firmada por el enólogo principal con acceso anticipado al código de historia.",
    perks: [
      "Entrega estimada diciembre 2026",
      "Acceso a tasting virtual en lanzamiento",
      "Incluye certificado numerado",
    ],
    limit: "Limitado a 700 botellas A o B",
    availability: "Restan 198 botellas",
  },
  {
    id: "pair",
    name: "Pair A + B",
    price: 1600,
    description:
      "Dúo complementario para vivir la narrativa completa. Cada botella con su carta sellada.",
    perks: [
      "Incluye invitación a experiencia privada en la bodega",
      "Entrega estimada diciembre 2026",
      "Prioridad para futuras añadas",
    ],
    limit: "Limitado a 700 pares A/B",
    availability: "Quedan 124 pares",
  },
]
