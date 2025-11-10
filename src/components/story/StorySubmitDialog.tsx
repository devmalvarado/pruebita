"use client";

import { useState, useTransition } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const submissionSchema = z.object({
  code: z.string().regex(/^\d{3}[AB]$/i, "Formato de código inválido."),
  text: z.string().min(20, "Comparte al menos 20 caracteres."),
  name: z.string().optional(),
});

export function StorySubmitDialog() {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({ code: "", text: "", name: "" });
  const [isPending, startTransition] = useTransition();

  const reset = () => {
    setValues({ code: "", text: "", name: "" });
  };

  const handleSubmit = () => {
    startTransition(async () => {
      const parsed = submissionSchema.safeParse({
        code: values.code.trim().toUpperCase(),
        text: values.text.trim(),
        name: values.name.trim() || undefined,
      });

      if (!parsed.success) {
        toast.error(parsed.error.errors[0].message);
        return;
      }

      try {
        const response = await fetch("/api/stories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(parsed.data),
        });
        if (!response.ok) {
          throw new Error("Error al enviar historia");
        }
        toast.success("Gracias por compartir tu historia.");
        reset();
        setOpen(false);
      } catch {
        toast.error("No pudimos registrar tu historia. Intenta de nuevo.");
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full bg-gold px-6 py-2 text-black hover:bg-[#d1b369]">
          Share your story
        </Button>
      </DialogTrigger>
      <DialogContent className="border border-ink bg-black text-white sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-serif text-gold">
            Comparte tu historia
          </DialogTitle>
          <DialogDescription className="text-sm text-zinc-400">
            Cuéntanos qué sucedió cuando abriste tu botella. Seleccionaremos
            fragmentos para la sección de comunidad.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="story-code-dialog"
              className="text-xs uppercase tracking-[0.3em] text-zinc-500"
            >
              Código
            </Label>
            <Input
              id="story-code-dialog"
              placeholder="037A"
              value={values.code}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, code: event.target.value }))
              }
              className="border-ink bg-black/40 uppercase text-white focus:border-gold focus-visible:ring-gold"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="story-text"
              className="text-xs uppercase tracking-[0.3em] text-zinc-500"
            >
              Tu historia
            </Label>
            <Textarea
              id="story-text"
              placeholder="Describe el momento, quién estuvo, qué ocurrió..."
              value={values.text}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, text: event.target.value }))
              }
              rows={5}
              className="border-ink bg-black/40 text-white focus:border-gold focus-visible:ring-gold"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="story-name"
              className="text-xs uppercase tracking-[0.3em] text-zinc-500"
            >
              Tu nombre (opcional)
            </Label>
            <Input
              id="story-name"
              placeholder="Cómo debemos nombrarte"
              value={values.name}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, name: event.target.value }))
              }
              className="border-ink bg-black/40 text-white focus:border-gold focus-visible:ring-gold"
            />
          </div>
        </div>
        <DialogFooter className="mt-4">
          <Button
            type="button"
            className="rounded-full bg-gold px-6 py-2 text-black hover:bg-[#d1b369]"
            onClick={handleSubmit}
            disabled={isPending}
          >
            {isPending ? "Enviando..." : "Enviar historia"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
