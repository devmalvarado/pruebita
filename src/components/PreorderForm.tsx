"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PreorderPlans } from "@/components/PreorderPlans";
import { preorderPlans } from "@/lib/data";

const preorderSchema = z.object({
  name: z
    .string()
    .min(2, "Ingresa tu nombre")
    .max(80, "Mantén el nombre debajo de 80 caracteres"),
  email: z.string().email("Correo inválido"),
  plan: z.enum(["single", "pair"], {
    required_error: "Selecciona un plan",
  }),
});

type PreorderValues = z.infer<typeof preorderSchema>;

const planOptions = preorderPlans.map((plan) => ({
  value: plan.id,
  label: `${plan.title} (${plan.price.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  })})`,
}));

export function PreorderForm() {
  const [isPending, startTransition] = useTransition();
  const form = useForm<PreorderValues>({
    resolver: zodResolver(preorderSchema),
    defaultValues: {
      plan: "single",
      name: "",
      email: "",
    },
  });

  const handleSelectPlan = (planId: string) => {
    form.setValue("plan", planId);
  };

  const onSubmit = (values: PreorderValues) => {
    startTransition(async () => {
      try {
        const response = await fetch("/api/preorder", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          throw new Error("failed");
        }

        toast.success("Tu preventa quedó registrada. Te contactaremos pronto.");
        form.reset({ plan: values.plan, name: "", email: "" });
      } catch (error) {
        console.error(error);
        toast.error("No pudimos registrar la preventa. Inténtalo más tarde.");
      }
    });
  };

  const selectedPlan = form.watch("plan");

  return (
    <div className="space-y-10">
      <PreorderPlans
        onSelect={handleSelectPlan}
        selectedPlanId={selectedPlan}
        showFooterNote
      />

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 rounded-2xl border border-ink/60 bg-black/40 p-6"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="preorder-name"
              className="text-xs uppercase tracking-[0.35em] text-gold"
            >
              Nombre completo
            </label>
            <Input
              id="preorder-name"
              placeholder="Tu nombre"
              {...form.register("name")}
              className="border border-input bg-transparent"
            />
            {form.formState.errors.name && (
              <p className="text-xs text-red-300">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="preorder-email"
              className="text-xs uppercase tracking-[0.35em] text-gold"
            >
              Correo electrónico
            </label>
            <Input
              id="preorder-email"
              type="email"
              placeholder="tucorreo@ejemplo.com"
              {...form.register("email")}
              className="border border-input bg-transparent"
            />
            {form.formState.errors.email && (
              <p className="text-xs text-red-300">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.35em] text-gold">
            Plan seleccionado
          </p>
          <div className="flex flex-wrap gap-3">
            {planOptions.map((option) => (
              <Button
                key={option.value}
                type="button"
                variant={selectedPlan === option.value ? "default" : "outline"}
                className={
                  selectedPlan === option.value
                    ? "bg-gold text-background hover:bg-gold/90"
                    : "border-gold/40 text-gold hover:bg-gold/10"
                }
                onClick={() => handleSelectPlan(option.value)}
              >
                {option.label}
              </Button>
            ))}
          </div>
          {form.formState.errors.plan && (
            <p className="text-xs text-red-300">
              {form.formState.errors.plan.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isPending || form.formState.isSubmitting}
          className="w-full bg-gold text-background hover:bg-gold/90"
        >
          Confirmar preventa
        </Button>
        <p className="text-xs text-foreground/60">
          Al registrar la preventa aceptas recibir actualizaciones de lanzamiento
          y acuerdos de entrega. Entrega estimada diciembre 2026.
        </p>
      </form>
    </div>
  );
}
