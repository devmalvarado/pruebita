import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Wine } from "@/lib/types";
import { Button } from "@/components/ui/button";

type HeroProps = {
  wine: Wine;
  vintageYear: number;
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.8, ease: "easeOut" },
  }),
};

export function Hero({ wine, vintageYear }: HeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-black via-black/95 to-black">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(189,159,87,0.15),_transparent_55%)]" />

      <div className="container flex min-h-[90vh] flex-col items-center gap-16 py-16 md:flex-row md:items-end md:justify-between">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="flex max-w-2xl flex-col gap-6 text-center md:text-left"
        >
          <span className="text-xs uppercase tracking-[0.4em] text-gold">
            Edición limitada {vintageYear}
          </span>
          <h1 className="text-4xl font-semibold sm:text-5xl md:text-6xl">
            Every bottle tells a story.
          </h1>
          <p className="text-lg text-zinc-300 sm:text-xl">
            {wine.storyTagline} Hecho en Aguascalientes con apenas{" "}
            <strong className="text-gold">{wine.vintages[0].abPairs} pares A/B</strong>{" "}
            para compartir memorias en dualidad.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-start">
            <Button
              asChild
              className="min-w-[180px] rounded-full bg-gold px-6 py-3 text-black hover:bg-[#d1b369]"
            >
              <Link href={`/wine/${wine.slug}/${vintageYear}`}>Discover the wine</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="min-w-[200px] rounded-full border-gold bg-transparent px-6 py-3 text-gold hover:bg-ink"
            >
              <Link href="/story">Read your A/B story</Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="relative flex shrink-0 items-center justify-center lg:translate-y-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9, ease: "easeOut" }}
        >
          <div className="absolute -left-12 -right-12 bottom-8 h-40 rounded-full bg-gold/20 blur-3xl" />
          <div className="relative flex h-[420px] w-[180px] items-end justify-center rounded-full border border-ink/60 bg-gradient-to-b from-ink/20 to-black/80 p-6 md:h-[500px] md:w-[210px]">
            <Image
              src={wine.heroImage}
              alt={`${wine.name} ${vintageYear}`}
              fill
              className="object-contain object-bottom"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
