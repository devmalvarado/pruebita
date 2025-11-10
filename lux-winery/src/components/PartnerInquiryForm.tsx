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
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

const partnerSchema = z.object({
  name: z
    .string({ required_error: "Incluye tu nombre" })
    .trim()
    .min(2, "El nombre es demasiado corto"),
  email: z
    .string({ required_error: "Incluye un correo" })
    .trim()
    .email("Correo inválido"),
  company: z.string().trim().optional(),
  message: z
    .string({ required_error: "Cuéntanos sobre tu proyecto" })
    .trim()
    .min(20, "Comparte al menos 20 caracteres"),
})

type PartnerFormValues = z.infer<typeof partnerSchema>

export const PartnerInquiryForm = () => {
  const form = useForm<PartnerFormValues>({
    resolver: zodResolver(partnerSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    },
  })

  const onSubmit = useCallback(
    async (values: PartnerFormValues) => {
      toast.success("Gracias por tu interés", {
        description: `Revisaremos tu propuesta${values.company ? ` de ${values.company}` : ""} y te contactaremos en 48 horas.`,
      })
      form.reset()
    },
    [form],
  )

  const { isSubmitting } = form.formState

  return (
    <div className="rounded-3xl border border-ink/60 bg-ink/40 p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
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
                <FormLabel>Correo</FormLabel>
                <FormControl>
                  <Input placeholder="nombre@restaurante.com" className="h-12" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Proyecto o espacio</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre del restaurante, hotel o enoteca" className="h-12" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Mensaje</FormLabel>
                <FormControl>
                  <Textarea
                    rows={5}
                    placeholder="Cuéntanos sobre tu propuesta y cómo te gustaría colaborar."
                    className="resize-none"
                    {...field}
                  />
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
                "Enviar solicitud"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
