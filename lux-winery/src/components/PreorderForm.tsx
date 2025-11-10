"use client"

import { useCallback } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2Icon } from "lucide-react"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { PreorderPlans } from "@/components/PreorderPlans"
import { preorderSchema } from "@/lib/validators"

type PreorderFormValues = z.infer<typeof preorderSchema>

export const PreorderForm = () => {
  const form = useForm<PreorderFormValues>({
    resolver: zodResolver(preorderSchema),
    defaultValues: {
      plan: "single",
      email: "",
      name: "",
    },
  })

  const onSubmit = useCallback(
    async (values: PreorderFormValues) => {
      const controller = new AbortController()
      const request = fetch("/api/preorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
        signal: controller.signal,
      })

      toast.promise(request, {
        loading: "Confirmando tu preventa...",
        success: "Preorden registrada. Te contactaremos para la confirmación.",
        error: "No pudimos registrar tu preventa. Intenta de nuevo.",
      })

      try {
        const res = await request
        if (!res.ok) {
          throw new Error("Preorder failed")
        }
        form.reset({ ...values, email: "", name: "" })
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          toast.error("La solicitud fue cancelada.")
        }
      }
    },
    [form],
  )

  const { isSubmitting } = form.formState

  return (
    <div className="space-y-8">
      <PreorderPlans
        onSelect={(planId) => {
          form.setValue("plan", planId)
          toast.info(`Plan ${planId.toUpperCase()} seleccionado`)
        }}
      />

      <div className="rounded-3xl border border-ink/60 bg-ink/40 p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="plan"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Plan seleccionado</FormLabel>
                  <FormControl>
                    <Input
                      value={field.value.toUpperCase()}
                      readOnly
                      className="h-12 uppercase tracking-[0.3em]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Tu nombre" className="h-12" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo electrónico</FormLabel>
                  <FormControl>
                    <Input placeholder="nombre@dominio.com" className="h-12" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="md:col-span-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gold py-6 text-sm uppercase tracking-[0.3em] text-black hover:bg-[#d1b369]"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2Icon className="size-4 animate-spin" />
                    Enviando
                  </span>
                ) : (
                  "Confirmar preventa"
                )}
              </Button>
            </div>
          </form>
        </Form>
        <p className="mt-4 text-xs text-foreground/60">
          * Al confirmar, aceptarás recibir comunicaciones relevantes sobre lanzamientos y
          eventos privados.
        </p>
      </div>
    </div>
  )
}
