
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
                'montserrat': ['Montserrat', 'sans-serif'],
            },
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
                love: {
                    100: '#fff1f2',
                    200: '#ffdde1',
                    300: '#ffc2c7',
                    400: '#ffa8af',
                    500: '#ff8c96',
                    600: '#ff4d5e',
                    700: '#ea384c',
                    800: '#d31434',
                    900: '#af0f2d'
                }
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
                'scatter': {
                    '0%': { transform: 'translate(0, 0) rotate(0deg)' },
                    '100%': { transform: 'translate(var(--tx, 0), var(--ty, 0)) rotate(var(--r, 0deg))' }
                },
                'float': {
                    '0%, 100%': {
                        transform: 'translateY(0)'
                    },
                    '50%': {
                        transform: 'translateY(-10px)'
                    }
                },
                'heartbeat': {
                    '0%': { transform: 'scale(1)' },
                    '14%': { transform: 'scale(1.2)' },
                    '28%': { transform: 'scale(1)' },
                    '42%': { transform: 'scale(1.2)' },
                    '70%': { transform: 'scale(1)' },
                },
                'fade-in': {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'swipe-away': {
                    '0%': { opacity: '1', transform: 'translateX(0) rotate(0)' },
                    '100%': { opacity: '0', transform: 'translateX(150%) rotate(20deg)' },
                },
                'bounce-in': {
                    '0%': { transform: 'scale(0.8)', opacity: '0' },
                    '80%': { transform: 'scale(1.1)' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                }
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
                'scatter': 'scatter 0.8s ease-out forwards',
                'float': 'float 6s ease-in-out infinite',
                'heartbeat': 'heartbeat 1.5s infinite',
                'fade-in': 'fade-in 0.5s ease-out',
                'swipe-away': 'swipe-away 0.5s ease-out forwards',
                'bounce-in': 'bounce-in 0.5s ease-out'
			},
            backgroundImage: {
                'love-gradient': 'linear-gradient(135deg, #ffdee9 0%, #b5fffc 100%)',
                'pink-gradient': 'linear-gradient(135deg, #ffdee9 0%, #ff9eaa 100%)',
                'romantic-gradient': 'linear-gradient(225deg, #FFE29F 0%, #FFA99F 48%, #FF719A 100%)'
            }
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
