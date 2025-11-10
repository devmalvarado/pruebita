import { z } from "zod"
import { storyThemes } from "@/lib/data"

export const storyCodeSchema = z
  .string({ required_error: "Introduce tu código" })
  .trim()
  .min(3, "El código debe tener al menos 3 caracteres")
  .max(6, "El código es demasiado largo")
  .regex(/^\d{3}[abAB]$/, "Formato inválido, usa 3 números seguidos de A o B")

export const storySubmissionSchema = z.object({
  code: storyCodeSchema,
  text: z
    .string({ required_error: "Cuéntanos tu historia" })
    .trim()
    .min(30, "Tu historia merece al menos 30 caracteres")
    .max(600, "Mantén tu historia debajo de 600 caracteres"),
  name: z
    .string()
    .trim()
    .max(80, "El nombre debe tener menos de 80 caracteres")
    .optional(),
})

export const preorderSchema = z.object({
  plan: z.enum(["single", "pair"]),
  email: z
    .string({ required_error: "Necesitamos tu correo" })
    .trim()
    .email("Introduce un correo válido"),
  name: z
    .string({ required_error: "Dinos tu nombre" })
    .trim()
    .min(2, "El nombre es demasiado corto")
    .max(80, "El nombre debe tener menos de 80 caracteres"),
})

export const storyFilterSchema = z.object({
  theme: z
    .enum(storyThemes as [string, ...string[]])
    .optional()
    .or(z.literal("All")),
})
