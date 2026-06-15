const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const Project = require('../models/Project');

const BASE_URL = process.env.CLIENT_URL || 'https://bavdev.xyz';

router.get('/sitemap.xml', async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true }).select('slug updatedAt');
    const projects = await Project.find({ isActive: true }).select('slug updatedAt');

    const staticPages = [
      { loc: '/', changefreq: 'weekly', priority: '1.0' },
      { loc: '/privacy-policy', changefreq: 'monthly', priority: '0.3' },
    ];

    const blogUrls = blogs.map(b => ({
      loc: `/blog/${b.slug}`,
      lastmod: b.updatedAt.toISOString(),
      changefreq: 'monthly',
      priority: '0.7',
    }));

    const projectUrls = projects.map(p => ({
      loc: `/project/${p.slug}`,
      lastmod: p.updatedAt.toISOString(),
      changefreq: 'monthly',
      priority: '0.8',
    }));

    const allUrls = [...staticPages, ...blogUrls, ...projectUrls];

    // Generate XML
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    allUrls.forEach(url => {
      xml += '  <url>\n';
      xml += `    <loc>${BASE_URL}${url.loc}</loc>\n`;
      if (url.lastmod) xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
      xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
      xml += `    <priority>${url.priority}</priority>\n`;
      xml += '  </url>\n';
    });

    xml += '</urlset>';

    res.header('Content-Type', 'application/xml');
    res.send(xml);
  } catch (error) {
    console.error('Sitemap error:', error);
    res.status(500).send('Error generating sitemap');
  }
});

module.exports = router;