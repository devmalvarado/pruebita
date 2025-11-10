"use client"

import { useCallback, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2Icon, Share2Icon } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { z } from "zod"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { storyCodeSchema, storySubmissionSchema } from "@/lib/validators"
import type { StorySubmissionPayload } from "@/lib/types"

const lookupSchema = z.object({
  code: storyCodeSchema,
})

type StoryLookupFormValues = z.infer<typeof lookupSchema>
type StorySubmissionValues = z.infer<typeof storySubmissionSchema>

type StoryResponse = {
  code: string
  a: string
  b?: string
  theme: string
  requestedCode: string
  variant: "A" | "B"
  wine?: { name: string; slug: string; vintage: number; heroImage: string | null }
}

type StoryLookupProps = {
  showShareButton?: boolean
}

export const StoryLookup = ({ showShareButton = true }: StoryLookupProps) => {
  const [result, setResult] = useState<StoryResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)

  const lookupForm = useForm<StoryLookupFormValues>({
    resolver: zodResolver(lookupSchema),
    defaultValues: { code: "" },
  })

  const shareForm = useForm<StorySubmissionValues>({
    resolver: zodResolver(storySubmissionSchema),
    defaultValues: { code: "", text: "", name: "" },
  })

  const handleLookup = useCallback(
    async (values: StoryLookupFormValues) => {
      setLoading(true)
      try {
        const res = await fetch(`/api/story?code=${values.code.toUpperCase()}`, {
          method: "GET",
        })

        if (!res.ok) {
          const message = res.status === 404 ? "Código no encontrado" : "Error al buscar historia"
          throw new Error(message)
        }

        const data = (await res.json()) as StoryResponse
        setResult(data)
        toast.success("Historia encontrada", {
          description: `Código ${data.requestedCode} perteneciente a ${data.wine?.name ?? "nuestro archivo"}.`,
        })
      } catch (error) {
        const message = error instanceof Error ? error.message : "Error desconocido"
        toast.error(message)
        setResult(null)
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  const storyVariantLabel = useMemo(() => {
    if (!result) return null
    return result.variant === "A" ? "Sostienes la parte A" : "Sostienes la parte B"
  }, [result])

  const handleShare = useCallback(
    async (values: StorySubmissionValues) => {
      try {
        const payload: StorySubmissionPayload = {
          code: values.code.toUpperCase(),
          text: values.text.trim(),
          name: values.name?.trim() || undefined,
        }

        const res = await fetch("/api/stories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })

        if (!res.ok) {
          throw new Error("No pudimos guardar tu historia. Intenta más tarde.")
        }

        toast.success("Gracias por compartir", {
          description: "Revisaremos tu historia antes de publicarla en la comunidad.",
        })
        setShareOpen(false)
        shareForm.reset()
      } catch (error) {
        const message = error instanceof Error ? error.message : "Error al enviar tu historia"
        toast.error(message)
      }
    },
    [shareForm],
  )

  return (
    <div className="rounded-3xl border border-ink/60 bg-ink/40 p-6 backdrop-blur xl:p-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-end">
        <Form {...lookupForm}>
          <form
            onSubmit={lookupForm.handleSubmit(handleLookup)}
            className="flex w-full flex-col gap-3 md:flex-row md:items-end"
          >
            <FormField
              control={lookupForm.control}
              name="code"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Código A/B</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingresa tu código, ej. 037A"
                      className="h-12 uppercase tracking-[0.3em]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Los códigos incluyen tres números y la letra A o B.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={loading}
              className="h-12 bg-gold px-8 text-sm uppercase tracking-[0.3em] text-black hover:bg-[#d1b369]"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2Icon className="size-4 animate-spin" /> Buscando
                </span>
              ) : (
                "Leer historia"
              )}
            </Button>
          </form>
        </Form>

        {showShareButton && (
          <Dialog open={shareOpen} onOpenChange={setShareOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                className="h-12 gap-2 border border-ink px-6 text-sm uppercase tracking-[0.3em] text-foreground hover:border-gold hover:text-gold"
              >
                <Share2Icon className="size-4" />
                Compartir historia
              </Button>
            </DialogTrigger>
            <DialogContent className="border border-ink/60 bg-background/95 text-foreground sm:max-w-lg">
              <DialogHeader>
                <DialogTitle className="font-serif text-2xl text-gold">
                  Cuéntanos tu historia
                </DialogTitle>
                <DialogDescription>
                  Déjanos saber cómo viviste tu código A/B. Curaremos las historias para la
                  comunidad.
                </DialogDescription>
              </DialogHeader>
              <Form {...shareForm}>
                <form onSubmit={shareForm.handleSubmit(handleShare)} className="space-y-6">
                  <FormField
                    control={shareForm.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Código A/B</FormLabel>
                        <FormControl>
                          <Input placeholder="Ej. 037A" className="uppercase tracking-[0.3em]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={shareForm.control}
                    name="text"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Historia</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={5}
                            placeholder="Comparte cómo viviste tu botella."
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={shareForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre (opcional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Tu nombre o alias" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <DialogFooter className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-foreground/60">
                      Al enviar aceptas que contactemos para confirmar detalles.
                    </p>
                    <Button
                      type="submit"
                      className="bg-gold px-6 text-sm uppercase tracking-[0.3em] text-black hover:bg-[#d1b369]"
                    >
                      Enviar historia
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {result && (
        <div className="mt-10 rounded-2xl border border-ink/60 bg-background/40 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-gold">
                Código {result.requestedCode}
              </p>
              <h3 className="font-serif text-2xl tracking-[0.08em]">
                {result.wine?.name ?? "Historia Casa Intención"}
              </h3>
              <p className="text-sm uppercase tracking-[0.3em] text-foreground/60">
                {storyVariantLabel}
              </p>
            </div>
            {result.wine && (
              <Button
                asChild
                variant="ghost"
                className="border border-ink px-6 text-xs uppercase tracking-[0.3em] text-foreground hover:border-gold hover:text-gold"
              >
                <Link href={`/wine/${result.wine.slug}/${result.wine.vintage}`}>
                  Ver vino asociado
                </Link>
              </Button>
            )}
          </div>

          <Separator className="my-6 bg-ink/60" />

          <div className="grid gap-6 md:grid-cols-2">
            <article className="space-y-2 rounded-xl border border-ink/40 bg-ink/40 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-gold">Historia A</p>
              <p className="text-sm leading-relaxed text-foreground/80">{result.a}</p>
            </article>
            <article className="space-y-2 rounded-xl border border-ink/40 bg-ink/20 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-gold">Historia B</p>
              <p className="text-sm leading-relaxed text-foreground/80">
                {result.b ?? "Aún falta la botella B. Ayúdanos a encontrarla."}
              </p>
            </article>
          </div>

          {result.b ? (
            <p className="mt-6 text-xs uppercase tracking-[0.3em] text-gold">
              Comparte este dúo con quien tenga la otra botella.
            </p>
          ) : (
            <p className="mt-6 text-xs uppercase tracking-[0.3em] text-foreground/60">
              Falta la contraparte. Déjanos saber si la encuentras para completar el relato.
            </p>
          )}
        </div>
      )}
    </div>
  )
}
