"use client";

import { useMemo, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { normalizeStoryCode } from "@/lib/story-utils";
import type { ABStory } from "@/lib/types";

const shareSchema = z.object({
  code: z
    .string()
    .min(3, "Introduce tu código")
    .max(6, "Máximo 6 caracteres")
    .transform((value) => normalizeStoryCode(value)),
  text: z
    .string()
    .min(20, "Cuéntanos al menos con 20 caracteres")
    .max(400, "Gracias por mantenerlo breve (400 caracteres)."),
  name: z
    .string()
    .max(60, "Máximo 60 caracteres")
    .optional()
    .transform((value) => value?.trim() || undefined),
});

type ShareFormValues = z.infer<typeof shareSchema>;

type StoryLookupProps = {
  variant?: "inline" | "full";
};

export function StoryLookup({ variant = "full" }: StoryLookupProps) {
  const [code, setCode] = useState("");
  const [story, setStory] = useState<ABStory | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<ShareFormValues>({
    resolver: zodResolver(shareSchema),
    defaultValues: {
      code: story?.code ?? "",
      text: "",
      name: "",
    },
  });

  const handleLookup = async () => {
    setError(null);
    setStory(null);

    const lookupCode = normalizeStoryCode(code);
    if (!lookupCode) {
      setError("Ingresa tu código A/B.");
      return;
    }

    startTransition(async () => {
      try {
        const response = await fetch(`/api/story?code=${lookupCode}`);
        if (!response.ok) {
          throw new Error("not-found");
        }
        const data: ABStory = await response.json();
        setStory(data);
        form.reset({ code: data.code, text: "", name: "" });
      } catch (err) {
        console.error(err);
        setError("No encontramos ese código todavía. Intenta nuevamente.");
      }
    });
  };

  const shareStory = (values: ShareFormValues) => {
    startTransition(async () => {
      try {
        const response = await fetch("/api/stories", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          throw new Error("error");
        }

        toast.success("Gracias por compartir tu historia.");
        form.reset({ code: values.code, text: "", name: "" });
      } catch (err) {
        console.error(err);
        toast.error("No se pudo enviar tu historia. Intenta más tarde.");
      }
    });
  };

  const storySections = useMemo(() => {
    if (!story) return null;

    const isPairFound = Boolean(story.b);

    return (
      <Card className="border border-gold/30 bg-black/60">
        <CardHeader>
          <p className="text-xs uppercase tracking-[0.3em] text-gold">
            Código {story.code}
          </p>
          <CardTitle className="text-2xl font-semibold text-gold">
            Historias A/B ({story.theme})
          </CardTitle>
          <CardDescription className="text-foreground/65">
            {story.wineSlug} · {story.vintage}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2 rounded-lg border border-gold/20 bg-ink/80 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-gold/70">
              Story A
            </p>
            <p className="text-sm leading-relaxed text-foreground/80">
              {story.a}
            </p>
          </div>
          <div className="space-y-2 rounded-lg border border-gold/20 bg-ink/80 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-gold/70">
              Story B
            </p>
            <p className="text-sm leading-relaxed text-foreground/80">
              {isPairFound
                ? story.b
                : "Aún no has encontrado la contraparte. Guarda tu código y compártelo cuando la encuentres."}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }, [story]);

  return (
    <div
      className={cn(
        "rounded-2xl border border-ink/70 bg-black/40 p-6 backdrop-blur-md sm:p-8",
        variant === "inline" && "sm:p-6",
      )}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex-1 space-y-2">
          <label
            htmlFor="story-code"
            className="text-xs uppercase tracking-[0.35em] text-gold"
          >
            Código A/B
          </label>
          <Input
            id="story-code"
            aria-label="Código A/B"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            placeholder="Ingresa tu código, ej. 037A"
            className="border border-input bg-transparent uppercase tracking-[0.2em] text-foreground placeholder:text-foreground/40"
          />
        </div>
        <Button
          onClick={handleLookup}
          disabled={isPending}
          className="mt-4 w-full bg-gold text-background hover:bg-gold/90 sm:mt-8 sm:w-auto"
        >
          Consultar historia
        </Button>
      </div>
      {error && (
        <p className="mt-4 text-sm text-red-300" role="alert">
          {error}
        </p>
      )}
      <div className="mt-8 space-y-6">
        {storySections}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="border-gold/40 text-gold hover:bg-gold/15"
            >
              Comparte tu historia
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg border border-gold/25 bg-background/95 text-left">
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl tracking-[0.2em] text-gold">
                Comparte tu historia
              </DialogTitle>
            </DialogHeader>
            <form
              onSubmit={form.handleSubmit(shareStory)}
              className="space-y-5 text-left"
            >
              <div className="space-y-2">
                <label
                  htmlFor="share-code"
                  className="text-xs uppercase tracking-[0.35em] text-gold/80"
                >
                  Código
                </label>
                <Input
                  id="share-code"
                  {...form.register("code")}
                  className="border border-input bg-transparent uppercase tracking-[0.2em]"
                />
                {form.formState.errors.code && (
                  <p className="text-xs text-red-300">
                    {form.formState.errors.code.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="share-text"
                  className="text-xs uppercase tracking-[0.35em] text-gold/80"
                >
                  Tu historia
                </label>
                <Textarea
                  id="share-text"
                  rows={5}
                  placeholder="Cuéntanos la historia detrás de tu código..."
                  className="border border-input bg-transparent"
                  {...form.register("text")}
                />
                {form.formState.errors.text && (
                  <p className="text-xs text-red-300">
                    {form.formState.errors.text.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="share-name"
                  className="text-xs uppercase tracking-[0.35em] text-gold/80"
                >
                  Nombre (opcional)
                </label>
                <Input
                  id="share-name"
                  placeholder="Tu nombre o alias"
                  className="border border-input bg-transparent"
                  {...form.register("name")}
                />
                {form.formState.errors.name && (
                  <p className="text-xs text-red-300">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  disabled={isPending || form.formState.isSubmitting}
                  className="bg-gold text-background hover:bg-gold/90"
                >
                  Enviar historia
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
