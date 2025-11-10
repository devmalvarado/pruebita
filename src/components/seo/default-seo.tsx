"use client";

import { DefaultSeo as NextDefaultSeo } from "next-seo";
import { defaultSeo } from "@/lib/seo";

export function DefaultSeo() {
  return <NextDefaultSeo {...defaultSeo} />;
}
