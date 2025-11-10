## VIATERRA — Bodega mexicana de lujo

Aplicación web construida con Next.js 14 para una vinícola mexicana de edición limitada. Presenta una experiencia oscura y elegante inspirada en negro y oro metálico, con flujos para historias A/B, preventa y comunidad.

## Stack principal

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS v4 + shadcn/ui
- Framer Motion para animaciones sutiles
- React Hook Form + Zod
- next-seo para metadatos SEO y OpenGraph
- next-intl (scaffolding listo para internacionalización)

## Scripts

```bash
# Desarrollo
pnpm dev

# Linting
pnpm lint

# Pruebas unitarias con Vitest
pnpm test
```

## Arquitectura

- `src/app` — Rutas App Router, API routes (`/api`), sitemap y robots.
- `src/components` — Componentes UI reutilizables (Navbar, Hero, formularios, lookup A/B, etc.).
- `src/lib/data.ts` — Mock de vinos, historias A/B y comunidad; listo para sustituir por una base de datos.
- `src/lib/story-utils.ts` — Utilidades compartidas para búsqueda de historias.
- `src/lib/types.ts` — Tipos para vinos, historias, comunidad y partners.
- `src/components/ui` — Componentes base generados con shadcn/ui.

## Flujos clave

- **Home**: hero animado, filosofía, destacado del vino, lookup inline, planes de preventa, historias de comunidad.
- **Catálogo / Detalle**: rutas `wines` y `wine/[slug]/[vintage]` con fichas técnicas, galería y CTA hacia historias/preventa.
- **Historias A/B**: búsqueda por código con diálogo para compartir relatos (POST `/api/stories`).
- **Preventa**: planes Single/Pair conectados al stub `/api/preorder`.
- **Comunidad**: grid con filtros por temática y paginación simple.
- **Aliados**: listado de partners + formulario para nuevas alianzas (POST `/api/partners`).
- **Contacto**: formulario general + newsletter stub.

## Tests

- Vitest configurado con entorno `jsdom`.
- Pruebas básicas para `story-utils` (`normalizeStoryCode`, `getStoryByCode`).
- Ejecuta `pnpm test` para validar las utilidades de historias.

## Próximos pasos sugeridos

- Conectar completamente `next-intl` y definir mensajes para `es/en`.
- Sustituir mocks por una capa de datos (ej. Prisma + SQLite/Postgres).
- Generar imágenes OG reales para cada vino.
- Añadir pruebas E2E con Playwright o Cypress para validar formularios y navegación.
