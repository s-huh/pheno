/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                firaSans: ['Fira Sans', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
