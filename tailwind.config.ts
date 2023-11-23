import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        customGreen: {
          50: '#13EE00',
        },
        customBlue: {
          50: '#3929EF',
        },
        customPurple: {
          50: '#B000EE',
          100: '#4C00EE'
        },
        customBlack: {
          50: '#414141',
        },
        customGray: {
            50: '#E4E4E4',
            100: '#F5F5F5',
        },
      }
    }
  },
  plugins: [],
}
export default config
