import { useContext, useEffect } from 'react';
import { NavigationContext } from '@react-navigation/core';
import { useRTKDispatch } from './redux-toolkit';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { setCurrentRoute } from '../redux/app/app.slice';

/**
 * A hook that returns the navigation object from the nearest NavigationContext.
 * @returns The navigation object.
 */
export const useNavigation = () => useContext(NavigationContext)!;

//* use only in feature navigator
export const useFetchRoute = () => {
	const navigation = useNavigation();
	const dispatch = useRTKDispatch();

	useEffect(() => {
		if (!navigation) return;

		const unsubscribe = navigation.addListener('state', () => {
			const state = navigation.getState();
			const routeName = getFocusedRouteNameFromRoute(
				state.routes[state.index]
			) as string;

			dispatch(setCurrentRoute(routeName));
		});

		return unsubscribe;
	}, [navigation]);
};
