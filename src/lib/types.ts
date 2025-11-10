export type Vintage = {
  year: number;
  sku?: string;
  bottles: number;
  abPairs: number;
};

export type WineStyle = "rosé" | "white" | "red" | "sparkling";

export type Wine = {
  slug: string;
  name: string;
  style: WineStyle;
  region: "Aguascalientes" | string;
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

export type CommunityStory = {
  id: string;
  snippet: string;
  author?: string;
  theme: StoryTheme;
};

export type PartnerLocation = {
  name: string;
  type: "Restaurante" | "Hotel" | "Enoteca";
  city: string;
  url?: string;
};
