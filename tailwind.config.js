/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'joy-blue': '#4CC9F0',
                'joy-pink': '#F72585',
                'joy-yellow': '#FFD60A',
                'joy-green': '#70E000',
                'joy-purple': '#7209B7',
                'joy-orange': '#FB5607',
                'joy-background': '#FFFDF5',
                'pastel-blue': '#A2D2FF',
                'pastel-pink': '#FFC8DD',
                'pastel-yellow': '#FDFD96',
                'pastel-green': '#BDE0FE',
                'pastel-purple': '#CDB4DB',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                rounded: ['Nunito', 'sans-serif'], // We might need to import these fonts
            },
        },
    },
    plugins: [],
}
