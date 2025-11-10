"use client";

import { useState, useTransition } from "react";
import { z } from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const emailSchema = z.string().email();

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = emailSchema.safeParse(email);

    if (!result.success) {
      toast.error("Ingresa un correo válido.");
      return;
    }

    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 600));
      toast.success("Te avisaremos cuando lancemos nueva añada.");
      setEmail("");
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-xl border border-ink/60 bg-black/40 p-4 sm:flex-row sm:items-center"
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Correo para newsletter
      </label>
      <Input
        id="newsletter-email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Tu correo para novedades"
        className="border border-input bg-transparent"
      />
      <Button
        type="submit"
        disabled={isPending}
        className="bg-gold text-background hover:bg-gold/90"
      >
        Unirme
      </Button>
    </form>
  );
}
