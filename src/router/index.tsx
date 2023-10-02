import { NavigationContainer, InitialState } from '@react-navigation/native';
import { useRTKDispatch, useRTKSelector } from '../hooks/redux-toolkit';
import { setInitialRouteState } from '../redux/app/app.slice';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from '../utils/routes';
import DashboardNavigator from './dashboard.navigator';
import defaultScreenOptions from './route.config';
import Launch from '../screens/Launch/Launch';

const Stack = createStackNavigator();

/**
 * The router component for the Star Wars Dashboard app.
 * It sets up the navigation stack, including the initial route state and screen options.
 * @returns The navigation container with the stack navigator and screens.
 */
const Router = () => {
	const initialRouteState = useRTKSelector(
		state => state.appReducer.initialRouteState
	);

	const dispatch = useRTKDispatch();

	const dispatchInitialRouteState = (state?: InitialState) =>
		dispatch(setInitialRouteState(state));

	return (
		<NavigationContainer
			onStateChange={dispatchInitialRouteState}
			initialState={initialRouteState}>
			<Stack.Navigator
				screenOptions={defaultScreenOptions}
				initialRouteName={ROUTES.LAUNCH}>
				<Stack.Screen name={ROUTES.LAUNCH} component={Launch} />
				<Stack.Screen
					name={ROUTES.DASHBOARD_NAVIGATOR}
					component={DashboardNavigator}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default Router;
