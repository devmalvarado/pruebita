"use client";

import { useState, useTransition } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const contactSchema = z.object({
  name: z.string().min(1, "Incluye tu nombre."),
  email: z.string().email("Correo inválido."),
  message: z.string().min(10, "Cuéntanos más detalles."),
});

export function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    startTransition(() => {
      const parsed = contactSchema.safeParse({
        name: values.name.trim(),
        email: values.email.trim(),
        message: values.message.trim(),
      });

      if (!parsed.success) {
        toast.error(parsed.error.errors[0].message);
        return;
      }

      toast.success("Gracias por escribirnos. Responderemos muy pronto.");
      setValues({ name: "", email: "", message: "" });
    });
  };

  return (
    <div className="space-y-4 rounded-3xl border border-ink/60 bg-black/60 p-6">
      <div className="space-y-1">
        <Label htmlFor="contact-name" className="text-xs uppercase tracking-[0.3em] text-zinc-500">
          Nombre
        </Label>
        <Input
          id="contact-name"
          value={values.name}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, name: event.target.value }))
          }
          className="border-ink bg-black/40 text-white focus:border-gold focus-visible:ring-gold"
          placeholder="Tu nombre completo"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="contact-email" className="text-xs uppercase tracking-[0.3em] text-zinc-500">
          Correo electrónico
        </Label>
        <Input
          id="contact-email"
          type="email"
          value={values.email}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
          className="border-ink bg-black/40 text-white focus:border-gold focus-visible:ring-gold"
          placeholder="nombre@dominio.com"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="contact-message" className="text-xs uppercase tracking-[0.3em] text-zinc-500">
          Mensaje
        </Label>
        <Textarea
          id="contact-message"
          rows={5}
          value={values.message}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, message: event.target.value }))
          }
          className="border-ink bg-black/40 text-white focus:border-gold focus-visible:ring-gold"
          placeholder="Cuéntanos cómo podemos ayudarte."
        />
      </div>
      <Button
        onClick={handleSubmit}
        className="w-full rounded-full bg-gold py-2 text-black hover:bg-[#d1b369]"
        disabled={isPending}
      >
        {isPending ? "Enviando..." : "Enviar mensaje"}
      </Button>
    </div>
  );
}
