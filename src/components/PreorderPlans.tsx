"use client";

import { FormEvent, useState, useTransition } from "react";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const plans = [
  {
    id: "single" as const,
    name: "Single",
    price: "$1,200",
    description: "Una botella, una historia revelada. Ideal para compartir un momento irrepetible.",
    includes: ["Botella Prensa Rosé 2026", "Código único A/B", "Acceso prioritario a futuras ediciones"],
  },
  {
    id: "pair" as const,
    name: "Pair A+B",
    price: "$1,600",
    description: "Dos botellas con códigos complementarios para entrelazar ambas narrativas.",
    includes: ["Botella A + Botella B", "Sesión virtual de storytelling", "Grabado personalizado en estuche"],
  },
];

const preorderSchema = z.object({
  plan: z.enum(["single", "pair"]),
  name: z.string().min(1, "Incluye tu nombre."),
  email: z.string().email("Correo no válido."),
});

export function PreorderPlans({ className }: { className?: string }) {
  const [selected, setSelected] = useState<(typeof plans)[number]["id"]>("pair");
  const [formValues, setFormValues] = useState({ name: "", email: "" });
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startTransition(async () => {
      const payload = {
        plan: selected,
        name: formValues.name.trim(),
        email: formValues.email.trim(),
      };

      const parsed = preorderSchema.safeParse(payload);
      if (!parsed.success) {
        const first = parsed.error.errors[0];
        toast.error(first.message);
        return;
      }

      try {
        const response = await fetch("/api/preorder", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(parsed.data),
        });
        if (!response.ok) {
          throw new Error("Error al registrar preventa");
        }
        toast.success("Preventa registrada. Te contactaremos en breve.");
        setFormValues({ name: "", email: "" });
      } catch {
        toast.error("No pudimos registrar tu solicitud. Intenta de nuevo.");
      }
    });
  };

  return (
    <div className={cn("grid gap-10 lg:grid-cols-[2fr_1fr]", className)}>
      <div className="grid gap-6 sm:grid-cols-2">
        {plans.map((plan) => {
          const isActive = selected === plan.id;
          return (
            <Card
              key={plan.id}
              className={cn(
                "flex h-full flex-col border border-ink/70 bg-black/60 text-white transition",
                isActive && "border-gold/80 shadow-[0_0_40px_rgba(189,159,87,0.25)]"
              )}
            >
              <CardHeader className="space-y-3">
                <CardTitle className="flex items-baseline justify-between font-serif text-2xl text-gold">
                  {plan.name}
                  <span className="text-base font-sans uppercase tracking-[0.2em] text-white">
                    {plan.price} MXN
                  </span>
                </CardTitle>
                <CardDescription className="text-sm text-zinc-300">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-4">
                <ul className="space-y-2 text-sm text-zinc-300">
                  {plan.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gold" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  type="button"
                  variant={isActive ? "default" : "outline"}
                  className={cn(
                    "mt-auto rounded-full",
                    isActive
                      ? "bg-gold text-black hover:bg-[#d1b369]"
                      : "border-gold text-gold hover:bg-ink"
                  )}
                  onClick={() => setSelected(plan.id)}
                  aria-pressed={isActive}
                >
                  {isActive ? "Seleccionado" : "Elegir plan"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="border border-ink/70 bg-black/70 text-white">
        <CardHeader>
          <CardTitle className="text-xl font-serif text-gold">
            Reserva tu edición
          </CardTitle>
          <CardDescription className="text-sm text-zinc-400">
            Entrega estimada diciembre 2026. Limitado a 700 pares A + 700 B.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="preorder-plan" className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                Plan seleccionado
              </Label>
              <Input
                id="preorder-plan"
                readOnly
                value={selected === "single" ? "Single · $1,200 MXN" : "Pair A+B · $1,600 MXN"}
                className="mt-2 border-ink bg-black/40 text-white"
              />
            </div>
            <Separator className="bg-ink" />
            <div className="space-y-2">
              <Label htmlFor="preorder-name" className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                Nombre completo
              </Label>
              <Input
                id="preorder-name"
                value={formValues.name}
                onChange={(event) =>
                  setFormValues((prev) => ({ ...prev, name: event.target.value }))
                }
                placeholder="Tu nombre"
                className="border-ink bg-black/40 text-white focus:border-gold focus-visible:ring-gold"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="preorder-email" className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                Correo electrónico
              </Label>
              <Input
                id="preorder-email"
                type="email"
                value={formValues.email}
                onChange={(event) =>
                  setFormValues((prev) => ({ ...prev, email: event.target.value }))
                }
                placeholder="nombre@dominio.com"
                className="border-ink bg-black/40 text-white focus:border-gold focus-visible:ring-gold"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full rounded-full bg-gold py-3 text-black hover:bg-[#d1b369]"
              disabled={isPending}
            >
              {isPending ? "Enviando..." : "Reservar ahora"}
            </Button>
            <p className="text-xs text-zinc-500">
              Al enviar aceptas nuestros términos de preventa y la política de confidencialidad.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
