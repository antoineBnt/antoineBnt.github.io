import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://antoineBnt.github.io/PORTFOLIOO",
  base: "/PORTFOLIOO/", // Ajoutez la base URL correspondant à votre dépôt
  output: "static",
  integrations: [mdx(), sitemap(), tailwind()],
});
