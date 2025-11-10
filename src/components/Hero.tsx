"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";

type HeroProps = {
  heroImage: string;
  wineName: string;
};

export function Hero({ heroImage, wineName }: HeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-ink/60">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,var(--gold)/25%,transparent_65%)]"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.5, y: 0 }}
          transition={{ duration: 1.6, ease: "easeOut", delay: 0.2 }}
          className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/50 to-transparent"
        />
      </div>
      <div className="mx-auto flex min-h-[80vh] flex-col items-center gap-12 px-4 pb-24 pt-16 text-center sm:pt-24 md:max-w-5xl md:flex-row md:items-end md:justify-between md:text-left">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6 md:max-w-md"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-gold">
            Bodega de edición limitada · México
          </p>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
            Every bottle tells a story.
          </h1>
          <p className="text-base text-foreground/70 sm:text-lg">
            Círculo Rosé nace en noches de prensa manual. Trescientas cincuenta
            parejas de historias A/B, listas para encontrar a su contraparte.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row md:items-start">
            <Button
              asChild
              size="lg"
              className="w-full bg-gold text-background hover:bg-gold/90 sm:w-auto"
            >
              <Link href="/wines">Descubre el vino</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full border-gold/40 bg-transparent text-gold hover:bg-gold/10 sm:w-auto"
            >
              <Link href="/story">Lee tu historia A/B</Link>
            </Button>
          </div>
        </motion.div>

        <motion.figure
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          className="relative flex h-[420px] w-full max-w-[260px] items-end justify-center rounded-full border border-gold/20 bg-gradient-to-b from-white/5 via-ink/40 to-ink/80 px-6 pb-8"
        >
          <div className="absolute inset-x-10 bottom-16 h-40 rounded-full bg-gold/10 blur-3xl" />
          <Image
            src={heroImage}
            alt={`Botella ${wineName}`}
            width={220}
            height={420}
            priority
            className="relative z-10 h-auto w-[220px]"
          />
          <figcaption className="absolute -bottom-8 left-1/2 w-max -translate-x-1/2 rounded-full border border-gold/30 bg-background/80 px-5 py-2 text-xs uppercase tracking-[0.35em] text-gold">
            {wineName}
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
