import { createStackNavigator } from '@react-navigation/stack';
import defaultScreenOptions from './route.config';
import { ROUTES } from '../utils/routes';
import People from '../features/dashboard/screens/People';
import DashboardNav from '../features/dashboard/components/DashboardNav/DashboardNav';
import { useFetchRoute } from '../hooks/navigation';
import Films from '../features/dashboard/screens/Films';
import Planets from '../features/dashboard/screens/Planets';
import Starships from '../features/dashboard/screens/Starships';

const DashboardStack = createStackNavigator();

/**
 * A stack navigator for the dashboard screens. It is the main navigator for the app.
 */
const DashboardNavigator = () => {
	useFetchRoute();

	return (
		<DashboardNav>
			<DashboardStack.Navigator
				initialRouteName={ROUTES.PEOPLE}
				screenOptions={defaultScreenOptions}>
				<DashboardStack.Screen name={ROUTES.PEOPLE} component={People} />
				<DashboardStack.Screen name={ROUTES.FILMS} component={Films} />
				<DashboardStack.Screen name={ROUTES.PLANETS} component={Planets} />
				<DashboardStack.Screen name={ROUTES.STARSHIPS} component={Starships} />
			</DashboardStack.Navigator>
		</DashboardNav>
	);
};

export default DashboardNavigator;
