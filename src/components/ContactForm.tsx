"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Ingresa tu nombre")
    .max(80, "Nombre demasiado largo"),
  email: z.string().email("Correo inválido"),
  message: z
    .string()
    .min(20, "Comparte al menos 20 caracteres")
    .max(800, "Gracias por mantenerlo conciso (máximo 800 caracteres)."),
});

type ContactValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (values: ContactValues) => {
    startTransition(async () => {
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          throw new Error("failed");
        }

        toast.success("Gracias por escribirnos. Responderemos muy pronto.");
        form.reset();
      } catch (error) {
        console.error(error);
        toast.error("No pudimos enviar el mensaje. Intenta nuevamente.");
      }
    });
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6 rounded-2xl border border-ink/60 bg-black/40 p-6"
    >
      <div className="space-y-2">
        <label
          htmlFor="contact-name"
          className="text-xs uppercase tracking-[0.35em] text-gold"
        >
          Nombre completo
        </label>
        <Input
          id="contact-name"
          placeholder="Tu nombre"
          className="border border-input bg-transparent"
          {...form.register("name")}
        />
        {form.formState.errors.name && (
          <p className="text-xs text-red-300">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="contact-email"
          className="text-xs uppercase tracking-[0.35em] text-gold"
        >
          Correo electrónico
        </label>
        <Input
          id="contact-email"
          type="email"
          placeholder="tucorreo@ejemplo.com"
          className="border border-input bg-transparent"
          {...form.register("email")}
        />
        {form.formState.errors.email && (
          <p className="text-xs text-red-300">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="contact-message"
          className="text-xs uppercase tracking-[0.35em] text-gold"
        >
          Mensaje
        </label>
        <Textarea
          id="contact-message"
          rows={5}
          placeholder="¿Cómo podemos ayudarte?"
          className="border border-input bg-transparent"
          {...form.register("message")}
        />
        {form.formState.errors.message && (
          <p className="text-xs text-red-300">
            {form.formState.errors.message.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isPending || form.formState.isSubmitting}
        className="w-full bg-gold text-background hover:bg-gold/90"
      >
        Enviar mensaje
      </Button>
    </form>
  );
}
