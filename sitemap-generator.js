const dotenv = require('dotenv');
dotenv.config();

const fs = require('fs');
const { SitemapStream } = require('sitemap');

const currentDate = new Date().toISOString().slice(0, 10);

const pages = [
  { url: '/', meta: { lastmod: currentDate, changefreq: 'weekly', priority: 0.5 } },
  { url: '/404', meta: { lastmod: currentDate, changefreq: 'weekly', priority: 0.5 } },
];

async function generateSitemap() {
  const sitemapStream = new SitemapStream({
    hostname: process.env.NEXT_PUBLIC_BASE_URL,
  });

  const writeStream = fs.createWriteStream('public/sitemap.xml');
  sitemapStream.pipe(writeStream);

  for (const page of pages) {
    const { url, meta } = page;
    sitemapStream.write({
      url,
      lastmod: meta.lastmod,
      changefreq: meta.changefreq,
      priority: meta.priority
    });
  }

  sitemapStream.end();

  return new Promise((resolve, reject) => {
    writeStream.on('finish', resolve);
    writeStream.on('error', reject);
  });
}

generateSitemap()
  .catch((error) => {
    console.error('Error generating sitemap:', error);
  });
