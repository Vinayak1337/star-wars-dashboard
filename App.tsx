import {
	FredokaBold,
	FredokaLight,
	FredokaMedium,
	FredokaRegular,
	FredokaSemiBold
} from './src/assets/fonts';
import * as Font from 'expo-font';
import { useState, useCallback, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import SafeArea from './src/components/SafeArea/SafeArea';
import { PaperProvider } from 'react-native-paper';
import { Theme } from './src/utils/theme';
import Router from './src/router';
import { ThemeProvider } from 'styled-components/native';
import { Provider } from 'react-redux';
import Store from './src/redux/store';

/**
 * The main entry point of the Star Wars Dashboard app.
 * It loads the fonts, prevents the splash screen from hiding, and renders the app's router.
 */
export default function App() {
	const [appIsReady, setAppIsReady] = useState(false);

	async function prepare() {
		try {
			await Font.loadAsync({
				FredokaBold,
				FredokaLight,
				FredokaMedium,
				FredokaRegular,
				FredokaSemiBold
			});

			await new Promise(resolve => setTimeout(resolve, 2000));
			setAppIsReady(true);
		} catch (e: any) {
			setAppIsReady(true);
		} finally {
			setAppIsReady(true);
		}
	}

	async function preventSplashScreenHide() {
		try {
			await SplashScreen.preventAutoHideAsync();
		} catch (e: any) {
			console.warn('Error preventAutoHideAsync: ', e.message);
			console.warn('Stack trace of preventAutoHideAsync: ', e.stack);
		}
	}

	useEffect(() => {
		preventSplashScreenHide();
		prepare();
	}, []);

	const onLayoutRootView = useCallback(async () => {
		if (appIsReady) await SplashScreen.hideAsync();
	}, [appIsReady]);

	if (!appIsReady) return null;

	return (
		<Provider store={Store}>
			<ThemeProvider theme={Theme}>
				<SafeArea onLayout={onLayoutRootView}>
					<PaperProvider>
						<Router />
					</PaperProvider>
				</SafeArea>
			</ThemeProvider>
		</Provider>
	);
}
