"use client";

import { FormEvent, useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type StoryResult = {
  code: string;
  a: string;
  b?: string;
  theme: string;
};

export function StoryLookup({ className }: { className?: string }) {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<StoryResult | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = code.trim();
    if (!trimmed) {
      toast.warning("Ingresa un código para continuar.");
      return;
    }

    startTransition(async () => {
      try {
        const response = await fetch(`/api/story?code=${encodeURIComponent(trimmed)}`);
        if (!response.ok) {
          throw new Error("Código no encontrado");
        }
        const data = (await response.json()) as StoryResult;
        setResult(data);
        toast.success(`Historia encontrada: ${data.code}`);
      } catch {
        setResult(null);
        toast.error("No encontramos ese código. Verifica el formato (ej. 037A).");
      }
    });
  };

  return (
    <div className={cn("w-full space-y-6", className)}>
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col gap-3 rounded-2xl border border-ink/60 bg-black/50 p-4 sm:flex-row sm:items-center sm:gap-4"
      >
        <div className="flex-1 space-y-1.5">
          <label
            htmlFor="story-code"
            className="text-xs uppercase tracking-[0.3em] text-gold"
          >
            Código A/B
          </label>
          <Input
            id="story-code"
            placeholder="Ingresa tu código, ej. 037A"
            value={code}
            onChange={(event) => setCode(event.target.value.toUpperCase())}
            className="h-12 border-ink bg-black/40 text-lg uppercase tracking-[0.2em] text-white placeholder:text-zinc-500 focus:border-gold focus-visible:ring-gold"
            aria-describedby="story-code-help"
          />
          <p id="story-code-help" className="text-xs text-zinc-500">
            Usa el código impreso bajo tu botella (tres dígitos + A/B).
          </p>
        </div>
        <Button
          type="submit"
          className="h-12 rounded-full bg-gold px-6 text-black hover:bg-[#d1b369]"
          disabled={isPending}
        >
          {isPending ? "Consultando..." : "Leer historia"}
        </Button>
      </form>

      {result && (
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border border-ink/70 bg-black/70 text-white">
            <CardHeader>
              <CardTitle className="text-lg font-serif text-gold">
                Story A · {result.code.replace(/.$/, "A")}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-relaxed text-zinc-300">
              {result.a}
            </CardContent>
          </Card>
          <Card className="border border-ink/70 bg-black/70 text-white">
            <CardHeader>
              <CardTitle className="text-lg font-serif text-gold">
                Story B · {result.code.replace(/.$/, "B")}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-relaxed text-zinc-300">
              {result.b ?? (
                <span className="italic text-zinc-500">
                  Aún no descubrimos la contraparte. Registra tu historia para completar el par.
                </span>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
