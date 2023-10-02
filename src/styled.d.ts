/// <reference types="react" />

import 'styled-components/native';

import { Theme as CustomTheme } from './utils/theme';

type Theme = typeof CustomTheme;

declare module 'styled-components/native' {
	export interface DefaultTheme extends Theme {}

	const styled: ReactNativeStyledInterface<DefaultTheme>;
}
