import tailwindcss from '@tailwindcss/vite'
import remarkMdc from 'remark-mdc'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  future: {
    compatibilityVersion: 4,
  },

  modules: ['@nuxt/content'],

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  content: {
    build: {
      markdown: {
        highlight: {
          langs: ['bash', 'diff', 'json', 'js', 'ts', 'html', 'css', 'vue', 'shell', 'mdc', 'md', 'yaml'],
        },
        remarkPlugins: {
          'remark-mdc': {
            options: { autoUnwrap: true },
          },
        },
        rehypePlugins: {
          'rehype-slug': {},
          'rehype-autolink-headings': {
            options: {
              behavior: 'wrap',
              properties: {
                className: ['anchor'],
              },
            },
          },
        },
      },
    },
  },

  mdc: {
    highlight: {
      shikiEngine: 'javascript',
    },
  },

  typescript: {
    strict: true,
  },
})
