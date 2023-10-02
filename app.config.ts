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
			projectId: '726796bd-63f5-422b-98bc-250704c2d6a0'
		}
	}
});
