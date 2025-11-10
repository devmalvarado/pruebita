import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { CommunityStory } from "@/lib/types";

type StoryQuoteProps = {
  story: CommunityStory;
};

export function StoryQuote({ story }: StoryQuoteProps) {
  return (
    <Card className="h-full border border-ink/70 bg-black/50 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-lg font-normal text-gold">
          {story.theme}
        </CardTitle>
        {story.author && (
          <CardDescription className="text-sm uppercase tracking-[0.3em] text-foreground/60">
            {story.author}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <blockquote className="text-base leading-relaxed text-foreground">
          “{story.snippet}”
        </blockquote>
      </CardContent>
    </Card>
  );
}
