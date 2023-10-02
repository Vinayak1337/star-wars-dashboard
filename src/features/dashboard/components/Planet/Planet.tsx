import { FC } from 'react';
import styled from 'styled-components/native';
import { Entypo } from '@expo/vector-icons';
import { setPopup } from '../../../../redux/app/app.slice';
import { useRTKDispatch } from '../../../../hooks/redux-toolkit';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring
} from 'react-native-reanimated';
import FloatingMenu from '../../../../components/Menu/Menu';

/**
 * A TypeScript React component that displays a card with information about a Star Wars planet. It is used in the Planets screen.
 * @param name The name of the planet.
 * @param population The population of the planet.
 * @param terrain The terrain of the planet.
 * @param orbital_period The orbital period of the planet.
 * @param restProps The rest of the props to be passed to the view component.
 */
const PlanetCard: FC<Planet & { index: number }> = ({
	index,
	name,
	population,
	terrain,
	orbital_period,
	...restProps
}) => {
	const dispatch = useRTKDispatch();
	const scaleValue = useSharedValue(1);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ scale: scaleValue.value }]
		};
	});

	const handlePressIn = () => {
		scaleValue.value = withSpring(0.95);
	};

	const handlePressOut = () => {
		scaleValue.value = withSpring(1);
	};

	const togglePopup = () =>
		dispatch(
			setPopup({
				item: {
					name,
					population,
					terrain,
					orbital_period,
					...restProps
				},
				type: 'planet'
			})
		);

	return (
		<Container>
			<StyledTouch
				onPress={togglePopup}
				onPressIn={handlePressIn}
				onPressOut={handlePressOut}>
				<Thumbnail
					style={[animatedStyle]}
					source={{ uri: `https://picsum.photos/200/300?random=${index}` }}
				/>
				<TextWrapper>
					<Name>{name}</Name>
					<Description>
						The planet is inhabited by {population} creatures . The terrain is
						{terrain}. With orbital period of {orbital_period} of around its
						local star.
					</Description>
				</TextWrapper>
				<FloatingView>
					<FloatingMenu name={name} view={togglePopup} />
				</FloatingView>
			</StyledTouch>
		</Container>
	);
};

const StyledTouch = styled.Pressable`
	flex-direction: column;
	gap: 12px;
`;

const Container = styled.View`
	position: relative;
	margin-bottom: 16px;
	width: 343px;
`;

const Thumbnail = styled(Animated.Image)`
	width: 343px;
	height: 141px;
	border-radius: 16px;
`;

const TextWrapper = styled.View`
	flex-direction: column;
	gap: 8px;
`;

const Name = styled.Text`
	color: ${({ theme }) => theme.colors.primary[2]};
	font-size: 16px;
	font-family: ${({ theme }) => theme.fontFamily.FredokaBold};
	line-height: 16px;
`;

const Description = styled.Text`
	color: ${({ theme }) => theme.colors.gray[1]};
	font-size: 12px;
	font-family: ${({ theme }) => theme.fontFamily.FredokaRegular};
	line-height: 16px;
`;

const FloatingView = styled.View`
	position: absolute;
	top: 16px;
	right: 16px;
`;

export default PlanetCard;
