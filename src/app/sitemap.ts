import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog-posts";

// All city pages - add new cities here and they auto-appear in sitemap
const cities = ["oakland", "pinole", "richmond", "concord", "berkeley", "hayward", "fremont", "walnut-creek", "alameda", "antioch", "san-leandro", "vallejo", "livermore", "lafayette", "pleasanton", "san-ramon", "dublin", "brentwood", "union-city", "newark", "pleasant-hill", "martinez", "pittsburg", "castro-valley", "hercules", "el-cerrito", "danville", "benicia", "oakley", "san-pablo", "orinda", "moraga", "bay-point", "american-canyon", "el-sobrante", "san-francisco", "san-jose", "san-rafael", "novato", "mill-valley", "sausalito", "tiburon", "corte-madera", "larkspur", "san-anselmo", "fairfax", "clayton", "rodeo", "crockett", "discovery-bay", "bethel-island", "contra-costa-county", "marin-county", "fairfield", "san-lorenzo", "emeryville", "piedmont", "alameda-county", "vacaville", "suisun-city", "dixon", "solano-county", "daly-city", "redwood-city", "san-mateo", "south-san-francisco", "pacifica", "burlingame", "san-bruno", "menlo-park", "foster-city", "belmont", "san-carlos", "half-moon-bay", "millbrae", "san-mateo-county", "sunnyvale", "santa-clara", "mountain-view", "milpitas", "palo-alto", "cupertino", "campbell", "los-gatos", "saratoga", "morgan-hill", "gilroy", "santa-clara-county"];
const otherPages = ["booking", "contractors", "services", "general-debris", "construction-debris", "roofing", "household-cleanout", "green-waste", "clean-soil", "clean-concrete", "mixed-materials"];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://tpdumpsters.com";
  const now = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];

  const cityPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${baseUrl}/${city}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const otherPageEntries: MetadataRoute.Sitemap = otherPages.map((page) => ({
    url: `${baseUrl}/${page}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const blogIndex: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
  ];

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...otherPageEntries, ...blogIndex, ...blogEntries, ...cityPages];
}
