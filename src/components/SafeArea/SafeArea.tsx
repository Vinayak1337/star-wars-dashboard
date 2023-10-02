import { FC } from 'react';
import { ViewProps } from 'react-native';
import styled from 'styled-components/native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Theme } from '../../utils/theme';

/**
 * A component that wraps the content inside a safe area view and adds a status bar.
 * @param children The children components to be rendered inside the safe area view.
 * @param restProps The rest of the props to be passed to the view component.
 */
const SafeArea: FC<ViewProps> = ({ children, ...restProps }) => (
	<SafeAreaViewStyled>
		<View {...restProps}>
			{children}
			<ExpoStatusBar
				style='dark'
				animated
				backgroundColor={Theme.colors.primary[1]}
			/>
		</View>
	</SafeAreaViewStyled>
);

const SafeAreaViewStyled = styled(SafeAreaView)`
	flex: 1;
`;

const View = styled.View`
	flex: 1;
`;

export default SafeArea;
