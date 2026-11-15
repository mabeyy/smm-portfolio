import { experiences } from "@/data/caseStudies";
import { galleryItems, galleryBrandLabels, type GalleryItem } from "@/data/gallery";

export type ProjectId = "nailkada" | "kres" | "brewbox";

interface BrandDefaults {
  year: string;
  discipline: string;
  /** used when a piece has no description of its own */
  blurb: string;
  tags: string[];
}

const brandDefaults: Record<ProjectId, BrandDefaults> = {
  nailkada: {
    year: "2026",
    discipline: "Content & Design",
    blurb:
      "Made for Nailkada's feed — part of an organic content system built around one soft, feminine visual language.",
    tags: ["Product Content", "Feed Design", "Branding"],
  },
  kres: {
    year: "2024 — 26",
    discipline: "Social & Campaigns",
    blurb:
      "Made for Kres Co.'s channels — everyday content and campaign work built for reach without paid promotion.",
    tags: ["Campaigns", "Graphic Design", "Social"],
  },
  brewbox: {
    year: "2025 — 26",
    discipline: "Visual Refresh",
    blurb:
      "Made for The Brew Box's refreshed feed — simple, cohesive visuals focused on lifestyle and product moments.",
    tags: ["Feed Redesign", "Graphic Design", "Food & Lifestyle"],
  },
};

export interface WorkOverride {
  title?: string;
  description?: string;
  discipline?: string;
  year?: string;
  tags?: string[];
}

/**
 * Per-piece details, keyed by the image's Instagram shortcode
 * (the file name in /public/gallery). Anything left out falls back
 * to the brand defaults above.
 */
export const workDetails: Record<string, WorkOverride> = {
  // DUHgZmDjcDi: {
  //   title: "Press-on nails, on the go",
  //   description: "Lifestyle shot for the launch of the travel pack.",
  //   discipline: "Product Styling",
  //   tags: ["Photography", "Styling"],
  // },
};

export interface WorkDetail {
  title: string;
  client: string;
  role: string;
  year: string;
  discipline: string;
  description: string;
  tags: string[];
  /** position of this piece among the brand's photos, 1-based */
  number: number;
  total: number;
}

const shortcodeOf = (item: GalleryItem) => item.image.split("/").pop()!.replace(/\.jpg$/, "");

export const isProjectId = (v: string): v is ProjectId => v in brandDefaults;

export function getWorkDetail(item: GalleryItem): WorkDetail {
  const id = item.category as ProjectId;
  const defaults = brandDefaults[id];
  const override = workDetails[shortcodeOf(item)] ?? {};
  const siblings = galleryItems.filter((g) => g.category === id && g.type === "Photo");
  const number = siblings.findIndex((g) => g.id === item.id) + 1;
  const client = galleryBrandLabels[id];

  return {
    title: override.title ?? `${client} No. ${String(number).padStart(2, "0")}`,
    client,
    role: experiences.find((e) => e.id === id)?.role ?? "Creative",
    year: override.year ?? defaults.year,
    discipline: override.discipline ?? defaults.discipline,
    description: override.description ?? defaults.blurb,
    tags: override.tags ?? defaults.tags,
    number,
    total: siblings.length,
  };
}
