"use client";

import { useState, useTransition } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const partnerSchema = z.object({
  name: z.string().min(1, "Incluye tu nombre."),
  company: z.string().min(1, "Especifica el nombre de tu espacio."),
  email: z.string().email("Correo inválido."),
  message: z.string().optional(),
});

export function PartnerForm() {
  const [values, setValues] = useState({
    name: "",
    company: "",
    email: "",
    message: "",
  });
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    startTransition(() => {
      const parsed = partnerSchema.safeParse({
        name: values.name.trim(),
        company: values.company.trim(),
        email: values.email.trim(),
        message: values.message.trim() || undefined,
      });

      if (!parsed.success) {
        toast.error(parsed.error.errors[0].message);
        return;
      }

      toast.success("Gracias, nos pondremos en contacto en 48 horas.");
      setValues({ name: "", company: "", email: "", message: "" });
    });
  };

  return (
    <div className="space-y-4 rounded-3xl border border-ink/60 bg-black/60 p-6">
      <div className="space-y-1">
        <Label htmlFor="partner-name" className="text-xs uppercase tracking-[0.3em] text-zinc-500">
          Tu nombre
        </Label>
        <Input
          id="partner-name"
          value={values.name}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, name: event.target.value }))
          }
          className="border-ink bg-black/40 text-white focus:border-gold focus-visible:ring-gold"
          placeholder="Nombre completo"
          required
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="partner-company" className="text-xs uppercase tracking-[0.3em] text-zinc-500">
          Espacio / compañía
        </Label>
        <Input
          id="partner-company"
          value={values.company}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, company: event.target.value }))
          }
          className="border-ink bg-black/40 text-white focus:border-gold focus-visible:ring-gold"
          placeholder="Nombre del restaurante, hotel, etc."
          required
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="partner-email" className="text-xs uppercase tracking-[0.3em] text-zinc-500">
          Correo
        </Label>
        <Input
          id="partner-email"
          type="email"
          value={values.email}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
          className="border-ink bg-black/40 text-white focus:border-gold focus-visible:ring-gold"
          placeholder="nombre@espacio.com"
          required
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="partner-message" className="text-xs uppercase tracking-[0.3em] text-zinc-500">
          Mensaje
        </Label>
        <Textarea
          id="partner-message"
          value={values.message}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, message: event.target.value }))
          }
          className="border-ink bg-black/40 text-white focus:border-gold focus-visible:ring-gold"
          rows={4}
          placeholder="Cuéntanos sobre tu programa de vinos, experiencias y cómo te gustaría colaborar."
        />
      </div>
      <Button
        onClick={handleSubmit}
        className="w-full rounded-full bg-gold py-2 text-black hover:bg-[#d1b369]"
        disabled={isPending}
      >
        {isPending ? "Enviando..." : "Solicitar alianza"}
      </Button>
      <p className="text-xs text-zinc-500">
        Compartir esta solicitud no genera contrato. Nos reservamos la selección
        de aliados y cupo por región.
      </p>
    </div>
  );
}
