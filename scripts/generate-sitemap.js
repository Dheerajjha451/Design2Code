const fs = require("fs");
const globby = require("globby");
const prettier = require("prettier");
const axios = require("axios");

const getTemplatePaths = async () => {
  const response = await axios.get("https://www.designtocode.me/api/templates");
  const templates = response.data;
  return templates.map(template => `/templates/${template.id}`);
};

(async () => {
  const prettierConfig = await prettier.resolveConfig("./.prettierrc.js");

  const pages = await globby([
    "pages/**/*.js",
    "!pages/_*.js",
    "!pages/**/_*.js",
    "!pages/api/**/*.js"
  ]);

  const staticPaths = pages.map(page => {
    const path = page
      .replace("pages", "")
      .replace(".js", "")
      .replace(/\/index$/, "");
    return path === "" ? "/" : path;
  });

  const templatePaths = await getTemplatePaths();

  const allPaths = [...staticPaths, ...templatePaths];

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allPaths
        .map(path => `
          <url>
            <loc>https://www.designtocode.me${path}</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.8</priority>
          </url>
        `).join("")}
    </urlset>
  `;

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: "html",
  });

  fs.writeFileSync("public/sitemap.xml", formatted);
})();