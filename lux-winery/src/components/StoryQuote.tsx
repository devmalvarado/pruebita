import { CommunityStory } from "@/lib/types"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

type StoryQuoteProps = {
  story: CommunityStory
}

export const StoryQuote = ({ story }: StoryQuoteProps) => {
  return (
    <Card className="h-full border border-ink/50 bg-ink/40 transition hover:border-gold/60">
      <CardHeader className="space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">{story.theme}</p>
        <p className="text-xs uppercase tracking-[0.3em] text-foreground/50">
          Código {story.code}
        </p>
      </CardHeader>
      <CardContent>
        <p className="font-serif text-lg leading-relaxed text-foreground/80">“{story.quote}”</p>
        {story.author && (
          <p className="mt-4 text-xs uppercase tracking-[0.3em] text-foreground/60">
            {story.author}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
