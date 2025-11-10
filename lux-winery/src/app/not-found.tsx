import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="flex min-h-[70svh] flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="text-xs uppercase tracking-[0.4em] text-gold">404</p>
      <h1 className="font-serif text-4xl tracking-[0.1em] text-foreground">
        No encontramos esa página
      </h1>
      <p className="max-w-xl text-sm text-foreground/60">
        Quizá el código que buscas pertenece a otra añada. Regresa al inicio o explora nuestras
        historias A/B.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Button
          asChild
          className="bg-gold px-8 py-6 text-xs uppercase tracking-[0.3em] text-black hover:bg-[#d1b369]"
        >
          <Link href="/">Volver al inicio</Link>
        </Button>
        <Button
          asChild
          variant="ghost"
          className="border border-ink px-8 py-6 text-xs uppercase tracking-[0.3em] text-foreground hover:border-gold hover:text-gold"
        >
          <Link href="/story">Ir al lookup A/B</Link>
        </Button>
      </div>
    </main>
  )
}
