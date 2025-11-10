"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

export const NewsletterSignup = () => {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!email) {
      toast.error("Ingresa tu correo para suscribirte")
      return
    }

    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 600))
      toast.success("Te suscribiste a nuestros anuncios privados.")
      setEmail("")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-2xl border border-ink/60 bg-ink/30 p-4 sm:flex-row sm:items-center"
    >
      <Input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="tu@correo.com"
        className="h-12 flex-1"
      />
      <Button
        type="submit"
        disabled={loading}
        className="h-12 bg-gold px-6 text-xs uppercase tracking-[0.3em] text-black hover:bg-[#d1b369]"
      >
        {loading ? "Enviando..." : "Suscribirme"}
      </Button>
    </form>
  )
}
