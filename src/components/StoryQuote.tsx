import { CommunityQuote } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";

type StoryQuoteProps = {
  quote: CommunityQuote;
};

export function StoryQuote({ quote }: StoryQuoteProps) {
  return (
    <Card className="h-full border border-ink/60 bg-black/60 text-white transition hover:border-gold/60">
      <CardContent className="flex h-full flex-col gap-4 p-6">
        <p className="text-sm uppercase tracking-[0.3em] text-gold">
          {quote.theme}
        </p>
        <blockquote className="flex-1 text-lg leading-relaxed text-zinc-200">
          “{quote.quote}”
        </blockquote>
        {quote.author && (
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
            {quote.author}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
