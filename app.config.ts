import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
	...config,
	slug: 'star-wars',
	name: 'star-wars',
	version: '1.0.0',
	orientation: 'portrait',
	icon: './assets/sw-icon.png',
	userInterfaceStyle: 'light',
	splash: {
		image: './assets/sw-splash.png',
		resizeMode: 'contain',
		backgroundColor: '#000000'
	},
	updates: {
		fallbackToCacheTimeout: 0
	},
	assetBundlePatterns: ['**/*'],
	ios: {
		supportsTablet: true,
		bundleIdentifier: 'com.starWarsDashboard.galaxy',
		buildNumber: '1.0.0'
	},
	android: {
		adaptiveIcon: {
			foregroundImage: './assets/sw-icon.png',
			backgroundColor: '#ffffff'
		},
		package: 'com.starWarsDashboard.galaxy',
		versionCode: 1
	},
	web: {
		favicon: './assets/sw-icon.png'
	},
	plugins: [
		[
			'expo-screen-orientation',
			{
				initialOrientation: 'PORTRAIT'
			}
		]
	],
	extra: {
		eas: {
			projectId: '83c2e896-e5bc-40c8-871c-b1baff742986'
		}
	}
});
