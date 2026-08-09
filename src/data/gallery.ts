export type GalleryCategory = "all" | "nailkada" | "kres" | "brewbox";

export interface GalleryItem {
  id: string;
  category: Exclude<GalleryCategory, "all">;
  type: "Photo" | "Reel";
  url: string;
  image: string;
  tone: string;
}

export const galleryCategories: { label: string; value: GalleryCategory }[] = [
  { label: "All", value: "all" },
  { label: "Nailkada", value: "nailkada" },
  { label: "Kres Co.", value: "kres" },
  { label: "The Brew Box", value: "brewbox" },
];

export const galleryBrandLabels: Record<
  Exclude<GalleryCategory, "all">,
  string
> = {
  nailkada: "Nailkada",
  kres: "Kres Co.",
  brewbox: "The Brew Box",
};

const tones = ["warm", "sage", "cream"];

type Seed = { category: Exclude<GalleryCategory, "all">; type: "Photo" | "Reel"; url: string };

const seeds: Seed[] = [
  // Nailkada — photos
  { category: "nailkada", type: "Photo", url: "https://www.instagram.com/p/DUHgZmDjcDi/" },
  { category: "nailkada", type: "Photo", url: "https://www.instagram.com/p/DT6k3AQAVIL/" },
  { category: "nailkada", type: "Photo", url: "https://www.instagram.com/p/DT7ZtTKgYVH/" },
  { category: "nailkada", type: "Photo", url: "https://www.instagram.com/p/DVkdq2mk8Eb/" },
  { category: "nailkada", type: "Photo", url: "https://www.instagram.com/p/DWDnDq6EzdX/" },
  { category: "nailkada", type: "Photo", url: "https://www.instagram.com/p/DWFkgrSE_K0/" },
  { category: "nailkada", type: "Photo", url: "https://www.instagram.com/p/DWSjTthE1_q/" },
  { category: "nailkada", type: "Photo", url: "https://www.instagram.com/p/DWVgWRLEy_Q/" },
  { category: "nailkada", type: "Photo", url: "https://www.instagram.com/p/DWfrnDOE77-/" },
  { category: "nailkada", type: "Photo", url: "https://www.instagram.com/p/DXDeaVOEzk3/" },
  { category: "nailkada", type: "Photo", url: "https://www.instagram.com/p/DW_RR3WExO2/" },
  { category: "nailkada", type: "Photo", url: "https://www.instagram.com/p/DXIoCfCEz8T/" },
  { category: "nailkada", type: "Photo", url: "https://www.instagram.com/p/DXJiCofE6RR/" },
  { category: "nailkada", type: "Photo", url: "https://www.instagram.com/p/DXOL5M9k0Jp/" },
  { category: "nailkada", type: "Photo", url: "https://www.instagram.com/p/DZMmFcuk1SR/" },
  { category: "nailkada", type: "Photo", url: "https://www.instagram.com/p/DamOqA0Ey1f/" },
  // Nailkada — reels
  { category: "nailkada", type: "Reel", url: "https://www.instagram.com/reel/DXGGPLLEww6/" },
  { category: "nailkada", type: "Reel", url: "https://www.instagram.com/reel/DUm8VD8iUZf/" },
  { category: "nailkada", type: "Reel", url: "https://www.instagram.com/reel/DWXzyOaTmIG/" },
  { category: "nailkada", type: "Reel", url: "https://www.instagram.com/reel/Dawx5cIT0kE/" },

  // Kres Co. — photos
  { category: "kres", type: "Photo", url: "https://www.instagram.com/p/DJL4TlYvI1x/" },
  { category: "kres", type: "Photo", url: "https://www.instagram.com/p/DJRB5ThPKDw/" },
  { category: "kres", type: "Photo", url: "https://www.instagram.com/p/DUAo_JnAiTu/" },
  { category: "kres", type: "Photo", url: "https://www.instagram.com/p/DT9SdvdATwO/" },
  { category: "kres", type: "Photo", url: "https://www.instagram.com/p/DYHgTb3gRaQ/" },
  { category: "kres", type: "Photo", url: "https://www.instagram.com/p/DYG4RgrATEn/" },
  { category: "kres", type: "Photo", url: "https://www.instagram.com/p/DYJpNNNiHQj/" },
  { category: "kres", type: "Photo", url: "https://www.instagram.com/p/DT_3hC0AVW6/" },
  // Kres Co. — reels
  { category: "kres", type: "Reel", url: "https://www.instagram.com/reel/DJTmpO-CTBC/" },
  { category: "kres", type: "Reel", url: "https://www.instagram.com/reel/DJZFCFhhAd1/" },
  { category: "kres", type: "Reel", url: "https://www.instagram.com/reel/DT7LoqBgTkd/" },
  { category: "kres", type: "Reel", url: "https://www.instagram.com/reel/DUPclJmgNWQ/" },
  { category: "kres", type: "Reel", url: "https://www.instagram.com/reel/DYJwAAADeb6/" },

  // The Brew Box — photos
  { category: "brewbox", type: "Photo", url: "https://www.instagram.com/p/DRwMnxDAb33/" },
  { category: "brewbox", type: "Photo", url: "https://www.instagram.com/p/DR6o2NPiU27/" },
  { category: "brewbox", type: "Photo", url: "https://www.instagram.com/p/DSMdTruAahL/" },
  { category: "brewbox", type: "Photo", url: "https://www.instagram.com/p/DSeMegqAQUr/" },
  { category: "brewbox", type: "Photo", url: "https://www.instagram.com/p/DSjWHalgdMm/" },
  { category: "brewbox", type: "Photo", url: "https://www.instagram.com/p/DSl66y2AUTU/" },
  { category: "brewbox", type: "Photo", url: "https://www.instagram.com/p/DSopUKUgeXD/" },
  { category: "brewbox", type: "Photo", url: "https://www.instagram.com/p/DSt66VqFGpi/" },
  { category: "brewbox", type: "Photo", url: "https://www.instagram.com/p/DSwKJX6gUP0/" },
  // The Brew Box — reels
  { category: "brewbox", type: "Reel", url: "https://www.instagram.com/reel/DS4mUrNit-p/" },
  { category: "brewbox", type: "Reel", url: "https://www.instagram.com/reel/DSegTNIDdyV/" },
  { category: "brewbox", type: "Reel", url: "https://www.instagram.com/reel/DSNA8kQE943/" },
  { category: "brewbox", type: "Reel", url: "https://www.instagram.com/reel/DSE_P4VjaMJ/" },
  { category: "brewbox", type: "Reel", url: "https://www.instagram.com/reel/DRw2I6FisQM/" },
];

const shortcode = (url: string) =>
  url.match(/instagram\.com\/(?:p|reel)\/([A-Za-z0-9_-]+)/)?.[1] ?? "";

export const galleryItems: GalleryItem[] = seeds.map((s, i) => ({
  id: `${s.category}-${i}`,
  category: s.category,
  type: s.type,
  url: s.url,
  image: `/gallery/${shortcode(s.url)}.jpg`,
  tone: tones[i % tones.length],
}));
