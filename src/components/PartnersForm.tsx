"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const partnerSchema = z.object({
  businessName: z
    .string()
    .min(2, "Escribe el nombre de tu negocio")
    .max(120, "Nombre demasiado largo"),
  contactName: z
    .string()
    .min(2, "Comparte el nombre de contacto")
    .max(80, "Nombre muy largo"),
  email: z.string().email("Correo inválido"),
  city: z.string().min(2, "Ciudad requerida").max(80, "Ciudad muy larga"),
  message: z
    .string()
    .min(20, "Cuéntanos un poco más (mínimo 20 caracteres)")
    .max(600, "Gracias por resumir tu mensaje (máximo 600 caracteres)."),
});

type PartnerValues = z.infer<typeof partnerSchema>;

export function PartnersForm() {
  const [isPending, startTransition] = useTransition();
  const form = useForm<PartnerValues>({
    resolver: zodResolver(partnerSchema),
    defaultValues: {
      businessName: "",
      contactName: "",
      email: "",
      city: "",
      message: "",
    },
  });

  const onSubmit = (values: PartnerValues) => {
    startTransition(async () => {
      try {
        const response = await fetch("/api/partners", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          throw new Error("failed");
        }

        toast.success("Gracias, te contactaremos para coordinar la alianza.");
        form.reset();
      } catch (error) {
        console.error(error);
        toast.error("No pudimos enviar tu solicitud. Inténtalo de nuevo.");
      }
    });
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6 rounded-2xl border border-ink/60 bg-black/40 p-6"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="business-name"
            className="text-xs uppercase tracking-[0.35em] text-gold"
          >
            Nombre del negocio
          </label>
          <Input
            id="business-name"
            placeholder="Restaurante, hotel o tienda"
            className="border border-input bg-transparent"
            {...form.register("businessName")}
          />
          {form.formState.errors.businessName && (
            <p className="text-xs text-red-300">
              {form.formState.errors.businessName.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label
            htmlFor="contact-name"
            className="text-xs uppercase tracking-[0.35em] text-gold"
          >
            Persona de contacto
          </label>
          <Input
            id="contact-name"
            placeholder="Nombre y apellido"
            className="border border-input bg-transparent"
            {...form.register("contactName")}
          />
          {form.formState.errors.contactName && (
            <p className="text-xs text-red-300">
              {form.formState.errors.contactName.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="partner-email"
            className="text-xs uppercase tracking-[0.35em] text-gold"
          >
            Correo electrónico
          </label>
          <Input
            id="partner-email"
            type="email"
            placeholder="tucorreo@empresa.com"
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
            htmlFor="partner-city"
            className="text-xs uppercase tracking-[0.35em] text-gold"
          >
            Ciudad
          </label>
          <Input
            id="partner-city"
            placeholder="Ej. Ciudad de México"
            className="border border-input bg-transparent"
            {...form.register("city")}
          />
          {form.formState.errors.city && (
            <p className="text-xs text-red-300">
              {form.formState.errors.city.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="partner-message"
          className="text-xs uppercase tracking-[0.35em] text-gold"
        >
          Mensaje
        </label>
        <Textarea
          id="partner-message"
          rows={5}
          placeholder="Cuéntanos cómo imaginas la colaboración, fechas clave y experiencias deseadas."
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
        Enviar solicitud
      </Button>
    </form>
  );
}
