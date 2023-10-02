import { StackCardInterpolationProps } from '@react-navigation/stack';
import { Animated, Easing } from 'react-native';

/**
 * The transition specification for the page transitions.
 */
export const transitionSpec = {
	animation: 'timing' as const,
	config: {
		duration: 500,
		easing: Easing.inOut(Easing.ease)
	}
};

/**
 * The linear page transition style.
 * @param props The interpolation props for the transition.
 * @returns The card style with the linear transition.
 */
export const forLinear = ({
	current,
	next,
	layouts: {
		screen: { width }
	}
}: StackCardInterpolationProps) => {
	const progress = Animated.add(
		current.progress,
		next ? next.progress : 0
	).interpolate({
		inputRange: [0, 1, 2],
		outputRange: [width, 0, -width]
	});

	return {
		cardStyle: {
			transform: [
				{
					translateX: progress
				}
			]
		}
	};
};

/**
 * The default page transition style.
 */
export const defaultPageTransitionStyle = forLinear;

/**
 * The default screen options for the app.
 */
const defaultScreenOptions = {
	headerShown: false,
	gestureEnabled: true,
	animationEnabled: true,
	gestureDirection: 'vertical',
	cardStyleInterpolator: defaultPageTransitionStyle,
	transitionSpec: {
		open: transitionSpec,
		close: transitionSpec
	}
} as const;

export default defaultScreenOptions;
