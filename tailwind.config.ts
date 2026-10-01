import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff5f7',
          100: '#ffe4ec',
          200: '#ffc9d9',
          300: '#ffa0bd',
          400: '#ff6b99',
          500: '#f43f76',
          600: '#e11d5e',
          700: '#be124d',
          800: '#9e1444',
          900: '#851640',
        },
        warm: {
          50: '#fefbf6',
          100: '#fdf3e4',
          200: '#fae5c4',
          300: '#f6d19a',
          400: '#f1b563',
          500: '#ec9a3c',
          600: '#dd7e27',
          700: '#b86121',
          800: '#934d22',
          900: '#77411e',
        },
        cozy: {
          50: '#f7f6f3',
          100: '#efece4',
          200: '#ddd6c6',
          300: '#c6b9a0',
          400: '#ad977a',
          500: '#997f62',
          600: '#8c6c55',
          700: '#755748',
          800: '#61483f',
          900: '#513d37',
        },
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Georgia', 'ui-serif', 'serif'],
      },
      boxShadow: {
        soft: '0 2px 10px -2px rgba(0, 0, 0, 0.08), 0 1px 4px -2px rgba(0, 0, 0, 0.06)',
        warm: '0 8px 30px -8px rgba(236, 154, 60, 0.28)',
        glow: '0 0 0 2px rgba(255, 107, 153, 0.18), 0 8px 24px -4px rgba(244, 63, 118, 0.35)',
        floaty: '0 20px 50px -20px rgba(0, 0, 0, 0.25)',
        innerwarm: 'inset 0 1px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 0 rgba(0, 0, 0, 0.04)',
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      transitionTimingFunction: {
        bouncy: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'float-fast': 'float 3.5s ease-in-out infinite',
        'float-alt': 'float-alt 8s ease-in-out infinite',
        'float-diagonal': 'float-diagonal 12s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 2.4s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite',
        'fade-in': 'fade-in 0.5s ease-out both',
        'fade-in-slow': 'fade-in 1.1s ease-out both',
        'fade-in-up': 'fade-in-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in-down': 'fade-in-down 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in-left': 'fade-in-left 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in-right': 'fade-in-right 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        'slide-up': 'slide-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
        'slide-up-bouncy': 'slide-up-bouncy 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both',
        'scale-in': 'scale-in 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) both',
        'pop-in': 'pop-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both',
        'pop-out': 'pop-out 0.35s cubic-bezier(0.4, 0, 0.2, 1) both',
        'shake': 'shake 0.55s cubic-bezier(0.36, 0.07, 0.19, 0.97) both',
        'spin-slow': 'spin 18s linear infinite',
        'shimmer': 'shimmer 2.8s linear infinite',
        'sparkle': 'sparkle 1.6s ease-in-out infinite',
        'heartbeat': 'heartbeat 1.4s ease-in-out infinite',
        'tilt': 'tilt 10s ease-in-out infinite',
        'marquee': 'marquee 22s linear infinite',
        'gradient-x': 'gradient-x 12s ease infinite',
        'countdown': 'countdown-pulse 1s ease-in-out both',
        'bounce-in': 'bounce-in 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both',
        'bounce-in-right': 'bounce-in-right 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both',
        'flip': 'flip 0.7s ease-in-out both',
        'wiggle': 'wiggle 1.2s ease-in-out infinite',
        'orbit': 'orbit 14s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'float-alt': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-18px) rotate(4deg)' },
        },
        'float-diagonal': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(12px, -14px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.72', transform: 'scale(1.02)' },
        },
        'pulse-ring': {
          '0%': { boxShadow: '0 0 0 0 rgba(244, 63, 118, 0.45)' },
          '70%': { boxShadow: '0 0 0 14px rgba(244, 63, 118, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(244, 63, 118, 0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'fade-in-right': {
          '0%': { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(22px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up-bouncy': {
          '0%': { opacity: '0', transform: 'translateY(26px) scale(0.96)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'pop-in': {
          '0%': { opacity: '0', transform: 'scale(0.5)' },
          '70%': { opacity: '1', transform: 'scale(1.08)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'pop-out': {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.6)' },
        },
        'shake': {
          '10%, 90%': { transform: 'translateX(-1px)' },
          '20%, 80%': { transform: 'translateX(2px)' },
          '30%, 50%, 70%': { transform: 'translateX(-4px)' },
          '40%, 60%': { transform: 'translateX(4px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-800px 0' },
          '100%': { backgroundPosition: '800px 0' },
        },
        'sparkle': {
          '0%, 100%': { opacity: '0', transform: 'scale(0.6) rotate(0deg)' },
          '50%': { opacity: '1', transform: 'scale(1.2) rotate(180deg)' },
        },
        'heartbeat': {
          '0%, 100%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.15)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.15)' },
          '56%': { transform: 'scale(1)' },
        },
        'tilt': {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'countdown-pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.2)', opacity: '0.85' },
        },
        'bounce-in': {
          '0%': { opacity: '0', transform: 'translateY(24px) scale(0.9)' },
          '60%': { opacity: '1', transform: 'translateY(-6px) scale(1.02)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'bounce-in-right': {
          '0%': { opacity: '0', transform: 'translateX(40px) scale(0.9)' },
          '60%': { opacity: '1', transform: 'translateX(-6px) scale(1.02)' },
          '100%': { opacity: '1', transform: 'translateX(0) scale(1)' },
        },
        'flip': {
          '0%': { transform: 'rotateY(0deg)' },
          '50%': { transform: 'rotateY(90deg)' },
          '100%': { transform: 'rotateY(0deg)' },
        },
        'wiggle': {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        'orbit': {
          '0%': { transform: 'rotate(0deg) translateX(22px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(22px) rotate(-360deg)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
