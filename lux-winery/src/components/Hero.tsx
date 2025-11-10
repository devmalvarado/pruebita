"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type HeroProps = {
  title: string
  tagline: string
  bottleImage: string
  bottleAlt: string
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
  className?: string
}

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export const Hero = ({
  title,
  tagline,
  bottleImage,
  bottleAlt,
  primaryCta,
  secondaryCta,
  className,
}: HeroProps) => {
  return (
    <section
      className={cn(
        "relative isolate flex min-h-[80svh] items-center overflow-hidden bg-background",
        className,
      )}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 1.6, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(circle at 50% 20%, rgba(189, 159, 87, 0.24), transparent 65%)",
        }}
      />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-16 px-6 py-20 lg:grid-cols-[1.2fr,1fr] lg:px-8">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6"
        >
          <p className="text-xs uppercase tracking-[0.6em] text-gold">
            Edición limitada · Aguascalientes · 2026
          </p>
          <h1 className="font-serif text-4xl tracking-[0.08em] text-foreground md:text-5xl">
            {title}
          </h1>
          <p className="max-w-xl text-base text-foreground/70 md:text-lg">{tagline}</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              asChild
              className="bg-gold px-10 py-6 text-sm uppercase tracking-[0.3em] text-black hover:bg-[#d1b369]"
            >
              <Link href={primaryCta.href}>{primaryCta.label}</Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="border border-ink px-10 py-6 text-sm uppercase tracking-[0.3em] text-foreground hover:border-gold hover:text-gold"
            >
              <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="relative flex justify-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        >
          <div className="relative flex h-[360px] w-[160px] items-center justify-center rounded-3xl border border-ink/60 bg-ink/40 p-6 shadow-glow sm:h-[420px] sm:w-[200px]">
            <div className="absolute inset-4 rounded-[2rem] border border-gold/30" />
            <Image
              src={bottleImage}
              alt={bottleAlt}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 160px, 200px"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
