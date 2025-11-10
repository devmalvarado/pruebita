export type Vintage = {
  year: number
  sku?: string
  bottles: number
  abPairs: number
}

export type Wine = {
  slug: string
  name: string
  style: "rosé" | "white" | "red" | "sparkling"
  region: "Aguascalientes" | string
  abv: number
  notes: string[]
  storyTagline: string
  heroImage: string
  vintages: Vintage[]
  gallery?: string[]
  profile?: string
}

export type StoryTheme =
  | "Love"
  | "Time"
  | "Reunion"
  | "Farewell"
  | "Inspiration"

export type ABStory = {
  code: string
  a: string
  b?: string
  wineSlug: string
  vintage: number
  theme: StoryTheme
}

export type CommunityStory = {
  id: string
  code: string
  quote: string
  author?: string
  theme: StoryTheme
}

export type PartnerLocation = {
  id: string
  name: string
  type: "Restaurant" | "Hotel" | "Enoteca"
  city: string
  region: string
  highlight: string
  website?: string
}

export type PreorderPlan = {
  id: "single" | "pair"
  name: string
  price: number
  description: string
  perks: string[]
  limit: string
  availability: string
}

export type StorySubmissionPayload = {
  code: string
  text: string
  name?: string
}

export type PreorderPayload = {
  plan: PreorderPlan["id"]
  email: string
  name: string
}
