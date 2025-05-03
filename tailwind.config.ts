import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'inherit',
            h1: {
              color: '#000',
              fontWeight: '700',
            },
            h2: {
              color: '#000',
              fontWeight: '600',
            },
            h3: {
              color: '#000',
              fontWeight: '600',
            },
            h4: {
              color: '#000',
              fontWeight: '600',
            },
            p: {
              color: '#000',
            },
            li: {
              color: '#000',
            },
            strong: {
              color: '#000',
              fontWeight: '600',
            },
            a: {
              color: '#3b82f6',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
            pre: {
              backgroundColor: '#1e293b',
              color: '#e2e8f0',
              overflow: 'auto',
              padding: '1rem',
              borderRadius: '0.375rem',
            },
            code: {
              color: '#24292e',
              backgroundColor: '#f1f5f9',
              paddingLeft: '0.25rem',
              paddingRight: '0.25rem',
              paddingTop: '0.125rem',
              paddingBottom: '0.125rem',
              borderRadius: '0.25rem',
            },
            'code::before': {
              content: 'none',
            },
            'code::after': {
              content: 'none',
            },
            blockquote: {
              borderLeftColor: '#3b82f6',
              color: '#4b5563',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config; 