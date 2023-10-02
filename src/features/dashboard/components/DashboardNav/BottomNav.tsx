import React, { FC, useEffect } from 'react';
import styled from 'styled-components/native';
import { ROUTES } from '../../../../utils/routes';
import { useRTKSelector } from '../../../../hooks/redux-toolkit';
import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withTiming
} from 'react-native-reanimated';
import { useNavigation } from '../../../../hooks/navigation';
import ResourcePopup from '../ResourcePopup/ResourcePopup';

/**
 * A TypeScript React component that renders a a navigation bar at the bottom of DashboardNavigator with four navigation items: People, Films, Planets, and Starships.
 */
const BottomNav = () => (
	<ResourcePopup>
		<BottomView>
			<NavItem label='People' routeName={ROUTES.PEOPLE} />

			<NavItem label='Films' routeName={ROUTES.FILMS} />

			<NavItem label='Planets' routeName={ROUTES.PLANETS} />

			<NavItem label='Starships' routeName={ROUTES.STARSHIPS} />
		</BottomView>
	</ResourcePopup>
);

const BottomView = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

export default BottomNav;

const NavItem: FC<NavItemProps> = ({ label, routeName }) => {
	const currentRoute = useRTKSelector(state => state.appReducer.currentRoute),
		isActive = currentRoute === routeName;

	const navigation = useNavigation();

	const barWidth = useSharedValue(0);

	useEffect(() => {
		if (isActive) {
			barWidth.value = withTiming(100, {
				duration: 300,
				easing: Easing.inOut(Easing.ease)
			});
			return;
		}

		barWidth.value = withTiming(0, {
			duration: 300,
			easing: Easing.inOut(Easing.ease)
		});
	}, [isActive]);

	const barStyle = useAnimatedStyle(() => ({
		width: `${barWidth.value}%`,
		height: 4
	}));

	const navigate = () =>
		navigation.navigate(ROUTES.DASHBOARD_NAVIGATOR, {
			screen: routeName
		});

	return (
		<NavItemView onPress={navigate}>
			<Label
				style={
					isActive && [
						{
							color: 'white'
						}
					]
				}>
				{label}
			</Label>
			<Bar style={[barStyle]} />
		</NavItemView>
	);
};

const NavItemView = styled.TouchableOpacity`
	flex-direction: column;
	gap: 4px;
	justify-content: center;
	align-items: center;
`;

const Label = styled.Text`
	color: ${({ theme }) => theme.colors.gray[3]};
	font-size: 16px;
	font-family: ${({ theme }) => theme.fontFamily.FredokaRegular};
	line-height: 25.6px;
	padding: 0 4px;
`;

const Bar = styled(Animated.View)`
	height: 4px;
	background-color: white;
	border-radius: 2px;
`;

interface NavItemProps {
	label: string;
	routeName: ROUTES;
}
