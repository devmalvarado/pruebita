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

const contactSchema = z.object({
  name: z
    .string({ required_error: "Introduce tu nombre" })
    .trim()
    .min(2, "El nombre es demasiado corto"),
  email: z
    .string({ required_error: "Introduce tu correo" })
    .trim()
    .email("Correo inválido"),
  message: z
    .string({ required_error: "Cuéntanos en qué podemos ayudarte" })
    .trim()
    .min(20, "Escribe al menos 20 caracteres"),
})

type ContactFormValues = z.infer<typeof contactSchema>

export const ContactForm = () => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  const onSubmit = useCallback(
    async (values: ContactFormValues) => {
      toast.success("Mensaje enviado", {
        description: `${values.name}, te responderemos en un máximo de 48 horas.`,
      })
      form.reset()
    },
    [form],
  )

  const { isSubmitting } = form.formState

  return (
    <div className="rounded-3xl border border-ink/60 bg-ink/40 p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Tu nombre completo" className="h-12" {...field} />
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
                  <Input placeholder="nombre@dominio.com" className="h-12" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mensaje</FormLabel>
                <FormControl>
                  <Textarea rows={6} className="resize-none" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
              "Enviar mensaje"
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}
