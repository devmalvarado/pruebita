"use client";

import { useState, useTransition } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const newsletterSchema = z.object({
  email: z.string().email("Correo inválido."),
});

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    startTransition(() => {
      const parsed = newsletterSchema.safeParse({ email: email.trim() });
      if (!parsed.success) {
        toast.error(parsed.error.errors[0].message);
        return;
      }
      toast.success("Te agregamos a nuestra lista de lanzamientos.");
      setEmail("");
    });
  };

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-ink/60 bg-black/50 p-4 sm:flex-row sm:items-center sm:gap-4">
      <Input
        id="newsletter-email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="nombre@dominio.com"
        className="border-ink bg-black/40 text-white focus:border-gold focus-visible:ring-gold"
      />
      <Button
        onClick={handleSubmit}
        className="rounded-full bg-gold px-5 py-2 text-black hover:bg-[#d1b369]"
        disabled={isPending}
      >
        {isPending ? "Enviando..." : "Suscribirme"}
      </Button>
    </div>
  );
}
