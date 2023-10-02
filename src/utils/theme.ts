import { MD3LightTheme } from 'react-native-paper';

export const Theme = {
	colors: {
		primary: {
			1: '#181818',
			2: '#090A0A',
			3: '#252C32',
			4: '#101828',
			5: '#00000299',
			6: '#191d23'
		},
		secondary: { 1: '#0062FF', 2: '#2064FA' },
		teritary: '#fc5a5a',
		gray: {
			1: '#6C7072',
			2: '#667085',
			3: '#A4A9B5',
			4: '#D0D5DD',
			5: '#344054',
			6: '#DEDEDE'
		},
		cream: '#f3f4f6',
		red: {
			1: '#F15454',
			2: '#FC5A5A',
			3: '#FEF3F2',
			4: '#FEE4E2'
		}
	},
	fontFamily: {
		FredokaBold: 'FredokaBold',
		FredokaLight: 'FredokaLight',
		FredokaMedium: 'FredokaMedium',
		FredokaRegular: 'FredokaRegular',
		FredokaSemiBold: 'FredokaSemiBold'
	}
} as const;

export const PaperTheme = {
	...MD3LightTheme,
	...Theme,
	colors: {
		...MD3LightTheme.colors,
		...Theme.colors
	}
};
