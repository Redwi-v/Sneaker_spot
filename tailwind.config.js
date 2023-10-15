/** @type {import('tailwindcss').Config} */

const constants = {
    brown: '#f09958',
    darkBrown: '#6D2518',
    lightBrown: '#863426',

    orange: '#de7b27',
    darkOrange: '#ed772f',
    yellow: '#f2c547',
    beige: '#faddc4',
    white: '#fff',
    lightYellow: '#fbecc6',
    blue: '#211e3b',
};

module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        colors: {
            ...constants,
        },
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },

            gridTemplateColumns: {
                gird_list_3: 'repeat(3, minmax(0, min-content))',
                gird_list_4: 'repeat(4, minmax(0, min-content))',
            },
        },
    },

    plugins: [],
};
