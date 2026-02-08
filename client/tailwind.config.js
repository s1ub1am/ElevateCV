/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // ElevateCV Professional Palette
                'brand-blue': '#2563EB',    // Primary Action (Blue-600)
                'brand-dark': '#0F172A',    // Slate-900
                'brand-gray': '#F8FAFC',    // Slate-50 background

                // Legacy Mappings (to force Light Theme immediately)
                'neon-green': '#2563EB',    // Map to Brand Blue
                'neon-pink': '#4F46E5',     // Map to Indigo
                'deep-purple': '#1E293B',   // Map to Slate 800
                'dark-bg': '#FFFFFF',       // Force White Background
                'card-bg': '#F8FAFC',       // Force Light Gray Card
                'text-primary': '#0F172A',  // Slate 900
                'text-secondary': '#64748B',// Slate 500
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Space Grotesk', 'sans-serif'], // Keep for headers, it's nice
            },
            boxShadow: {
                'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
            }
        },
    },
    plugins: [],
}
