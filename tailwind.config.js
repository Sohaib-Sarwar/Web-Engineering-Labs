/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      colors: {
        // Light mode - Minimalist palette
        light: {
          bg: '#FAFAFA',
          surface: '#FFFFFF',
          text: '#1F2937',
          textSecondary: '#6B7280',
          border: '#E5E7EB',
          accent: '#3B82F6',
        },
        // Dark mode - Pure black theme
        dark: {
          bg: '#000000',
          surface: '#0A0A0A',
          surfaceHover: '#151515',
          text: '#FFFFFF',
          textSecondary: '#A0A0A0',
          border: '#1F1F1F',
          primary: '#3B82F6',
          secondary: '#0EA5E9',
          success: '#10B981',
          warning: '#F59E0B',
          danger: '#EF4444',
        }
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'slide-in': 'slide-in 0.3s ease-out',
        'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(59, 130, 246, 0.6)' },
        },
        'slide-in': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'bounce-subtle': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
}
