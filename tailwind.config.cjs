const { ComponentsContentPath } = require('@yext/search-ui-react');

module.exports = {
	content: ['./src/**/*.{html,js,jsx,ts,tsx}', ComponentsContentPath],

	theme: {
		fontSize: {
			xs: '16px',
			s: '14px',
			md: '18px',
			sm: '0.8rem',
			base: '1.125rem',
			xl: '1.25rem',
			'2xl': '1.563rem',
			'3xl': '1.953rem',
			'4xl': '2.441rem',
			'5xl': '5.052rem',
		},
		extend: {
			screens: {
				large: { min: '1600px', max: '1800px' },
				extraLarge: { min: '1801px', max: '2000px' },
				small: { min: '0px', max: '375px' },
			},
			colors: {
				typography: {
					link: '#102B51',
					breadcrumb: '#437CBF',
					time: '#3D3D3D',
					lightGray: '#A3A3A3',
					white: '#fff',
					line: '#757575',
					footer: '#cdcdcd',
				},

				bg: '#F7F9FB',
				map: '#E3E9F3',
				faqBanner: '#E3E8EE',
				primary: '#2A71D4',
				secondary: '#102B51',

				link: '#102B51',
			},
			fontFamily: {
				inter: ['Inter', 'sans-serif'],
			},
			borderRadius: {
				cta: 'var(0.2rem, 0.2rem)',
			},
			keyframes: {
				rotate: {
					'100%': { transform: 'rotate(360deg)' },
				},
				dash: {
					'0%': { transform: 'rotate(0deg)', 'stroke-dashoffset': 204 },
					'50%': { transform: 'rotate(45deg)', 'stroke-dashoffset': 52 },
					'100%': { transform: 'rotate(360deg)', 'stroke-dashoffset': 204 },
				},
			},
			scale: {
				1.02: '1.02',
			},
		},
	},
	plugins: [
		require('@tailwindcss/forms')({
			strategy: 'class',
		}),
	],
};
