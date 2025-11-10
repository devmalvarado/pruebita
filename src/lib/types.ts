export type Vintage = {
  year: number;
  sku?: string;
  bottles: number;
  abPairs: number;
};

export type WineStyle = "rosé" | "white" | "red" | "sparkling";

export type WineRegion = "Aguascalientes" | string;

export type Wine = {
  slug: string;
  name: string;
  style: WineStyle;
  region: WineRegion;
  abv: number;
  notes: string[];
  storyTagline: string;
  heroImage: string;
  vintages: Vintage[];
};

export type StoryTheme =
  | "Love"
  | "Time"
  | "Reunion"
  | "Farewell"
  | "Inspiration";

export type ABStory = {
  code: string;
  a: string;
  b?: string;
  wineSlug: string;
  vintage: number;
  theme: StoryTheme;
};

export type CommunityQuote = {
  id: string;
  theme: StoryTheme;
  quote: string;
  author?: string;
};

export type PartnerLocation = {
  name: string;
  type: "Restaurante" | "Hotel" | "Enoteca";
  city: string;
  region: string;
  highlight?: string;
};

export type StorySubmission = {
  code: string;
  text: string;
  name?: string;
  createdAt: string;
};
