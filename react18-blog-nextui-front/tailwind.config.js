import { Container } from 'postcss'

const { nextui } = require('@nextui-org/react')

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  darkMode: 'class',
  plugins: [
    nextui({
      prefix: 'nextui',
      addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
      defaultTheme: 'light', // default theme from the themes object
      defaultExtendTheme: 'light',
      layout: {
        dividerWeight: '1px', // h-divider the default height applied to the divider component
        disabledOpacity: 0.5, // this value is applied as opacity-[value] when the component is disabled
        fontSize: {
          tiny: '0.75rem', // text-tiny
          small: '0.875rem', // text-small
          medium: '1rem', // text-medium
          large: '1.25rem' // text-large
        },
        lineHeight: {
          tiny: '1rem', // text-tiny
          small: '1.25rem', // text-small
          medium: '1.5rem', // text-medium
          large: '1.75rem' // text-large
        },
        radius: {
          small: '4px', // rounded-small
          medium: '6px', // rounded-medium
          large: '8px' // rounded-large
        },
        borderWidth: {
          small: '1px', // border-small
          medium: '2px', // border-medium (default)
          large: '3px' // border-large
        }
      },
      themes: {
        light: {
          layout: {
            disabledOpacity: '0.3',
            hoverOpacity: 0.8, //  this value is applied as opacity-[value] when the component is hovered
            boxShadow: {
              // shadow-small
              small:
                '0px 0px 5px 0px rgb(0 0 0 / 0.02), 0px 2px 10px 0px rgb(0 0 0 / 0.06), 0px 0px 1px 0px rgb(0 0 0 / 0.3)',
              // shadow-medium
              medium:
                '0px 0px 15px 0px rgb(0 0 0 / 0.03), 0px 2px 30px 0px rgb(0 0 0 / 0.08), 0px 0px 1px 0px rgb(0 0 0 / 0.3)',
              // shadow-large
              large:
                '0px 0px 30px 0px rgb(0 0 0 / 0.04), 0px 30px 60px 0px rgb(0 0 0 / 0.12), 0px 0px 1px 0px rgb(0 0 0 / 0.3)'
            }
          },
          colors: {
            primary: {
              50: '#eef2ff',
              100: '#e0e7ff',
              200: '#c7d2fe',
              300: '#a5b4fc',
              400: '#818cf8',
              500: '#6366f1',
              600: '#4f46e5',
              700: '#4338ca',
              800: '#3730a3',
              900: '#312e81',
              DEFAULT: '#4757d5',
              foreground: '#ffffff'
            }
          }
        },
        dark: {
          layout: {
            hoverOpacity: 0.9, //  this value is applied as opacity-[value] when the component is hovered
            boxShadow: {
              // shadow-small
              small:
                '0px 0px 5px 0px rgb(0 0 0 / 0.05), 0px 2px 10px 0px rgb(0 0 0 / 0.2), inset 0px 0px 1px 0px rgb(255 255 255 / 0.15)',
              // shadow-medium
              medium:
                '0px 0px 15px 0px rgb(0 0 0 / 0.06), 0px 2px 30px 0px rgb(0 0 0 / 0.22), inset 0px 0px 1px 0px rgb(255 255 255 / 0.15)',
              // shadow-large
              large:
                '0px 0px 30px 0px rgb(0 0 0 / 0.07), 0px 30px 60px 0px rgb(0 0 0 / 0.26), inset 0px 0px 1px 0px rgb(255 255 255 / 0.15)'
            }
          },
          colors: {
            focus: '#F182F6',
            primary: {
              50: '#eef2ff',
              100: '#e0e7ff',
              200: '#c7d2fe',
              300: '#a5b4fc',
              400: '#818cf8',
              500: '#6366f1',
              600: '#4f46e5',
              700: '#4338ca',
              800: '#3730a3',
              900: '#312e81',
              DEFAULT: '#4757d5',
              foreground: '#ffffff'
            },
            purplePrimary: {
              50: '#FEECFE',
              100: '#FDD5F9',
              200: '#FCADF9',
              300: '#F182F6',
              400: '#DD62ED',
              500: '#c031e2',
              600: '#9823C2',
              700: '#7318A2',
              800: '#520F83',
              900: '#3B096C',
              DEFAULT: '#DD62ED',
              foreground: '#ffffff'
            }
          }
        },
        'purple-dark': {
          extend: 'dark', // <- inherit default values from dark theme
          colors: {
            background: '#0D001A', // them bg-color(purple color theme)
            foreground: '#ffffff',
            focus: '#F182F6', // when focus color(purple type theme)
            primary: {
              50: '#eef2ff',
              100: '#e0e7ff',
              200: '#c7d2fe',
              300: '#a5b4fc',
              400: '#818cf8',
              500: '#6366f1',
              600: '#4f46e5',
              700: '#4338ca',
              800: '#3730a3',
              900: '#312e81',
              DEFAULT: '#4757d5',
              foreground: '#ffffff'
            },
            purplePrimary: {
              50: '#FEECFE',
              100: '#FDD5F9',
              200: '#FCADF9',
              300: '#F182F6',
              400: '#DD62ED',
              500: '#c031e2',
              600: '#9823C2',
              700: '#7318A2',
              800: '#520F83',
              900: '#3B096C',
              DEFAULT: '#DD62ED',
              foreground: '#ffffff'
            }
          },
          layout: {
            disabledOpacity: '0.3',
            hoverOpacity: 0.8,
            radius: {
              small: '4px',
              medium: '6px',
              large: '8px'
            },
            borderWidth: {
              small: '1px',
              medium: '2px',
              large: '3px'
            }
          }
        }
      }
    })
  ]
}
