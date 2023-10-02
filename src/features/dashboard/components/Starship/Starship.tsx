import { FC } from 'react';
import styled from 'styled-components/native';
import { setPopup } from '../../../../redux/app/app.slice';
import {
	useRTKDispatch,
	useRTKSelector
} from '../../../../hooks/redux-toolkit';
import { createSelector } from '@reduxjs/toolkit';
import { SettingLogo } from '../../../../assets/images';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring
} from 'react-native-reanimated';
import { toSentence } from '../../../../utils';

/**
 * A TypeScript React component that displays a popup with information about a Star Wars starship. It is used in the Starships screen.
 * @param item An object containing information about the starship, including its name, model, starship class, manufacturer, hyperdrive rating, films it appeared in, pilots, cargo capacity, consumables, cost in credits, crew, length, max atmosphering speed, and passengers.
 * @param handleClose A function to close the popup.
 */
const StarshipCard: FC<Starship & { index: number }> = ({
	index,
	name,
	model,
	starship_class,
	manufacturer,
	hyperdrive_rating,
	films,
	pilots,
	...restProps
}) => {
	const dispatch = useRTKDispatch();

	const { filmNames, pilotNames } = useRTKSelector(state =>
		selectFilmAndPilotNames(state.appReducer, films, pilots)
	);

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
					model,
					starship_class,
					manufacturer,
					hyperdrive_rating,
					films: filmNames,
					pilots: pilotNames,
					...restProps
				},
				type: 'starship'
			})
		);

	return (
		<Container>
			<StyledTouch
				onPressIn={handlePressIn}
				onPressOut={handlePressOut}
				onPress={togglePopup}>
				<Thumbnail
					style={[animatedStyle]}
					source={{ uri: `https://picsum.photos/200/300?random=${index}` }}
				/>
				<ContentWrapper>
					<TopContent>
						<TopLeftContent>
							<Name>{name}</Name>
							<Label>
								{model} • {starship_class}
							</Label>
						</TopLeftContent>
						<LogoWrapper>
							<SpaceLogo source={SettingLogo} />
						</LogoWrapper>
					</TopContent>
					<BottomContent>
						<Description>
							The starship starred in {toSentence(filmNames)}
							{!!pilotNames?.length &&
								` and was piloted by ${toSentence(pilotNames)}`}
							.
						</Description>
						<Footer>
							{manufacturer} • {hyperdrive_rating}
						</Footer>
					</BottomContent>
				</ContentWrapper>
			</StyledTouch>
		</Container>
	);
};

const selectFilmAndPilotNames = createSelector(
	(appReducer: AppState, films: string[], pilots: string[]) => ({
		appReducer,
		films,
		pilots
	}),
	({ appReducer, films, pilots }) => {
		const filmsNumber = films.map(film => Number(film.match(/\d+/g)?.[0]));
		const filmNames = appReducer.films
			.filter((_, index) => filmsNumber.includes(index + 1))
			.map(film => film.title);

		if (!pilots.length) return { filmNames, pilotNames: [] };

		const pilotsNumber = pilots.map(pilot => Number(pilot.match(/\d+/g)?.[0]));
		const pilotNames = [
			...appReducer.popularPeople,
			...appReducer.allPeople,
			...appReducer.allPeople2
		]
			.filter((_, index) => pilotsNumber.includes(index + 1))
			.map(pilot => pilot.name);

		return { filmNames, pilotNames };
	}
);

const StyledTouch = styled.Pressable`
	flex-direction: column;
`;

const Container = styled.View`
	position: relative;
	margin-bottom: 16px;
	width: 343px;
	background-color: white;
	border-radius: 16px;
`;

const Thumbnail = styled(Animated.Image)`
	width: 343px;
	height: 141px;
	border-top-left-radius: 16px;
	border-top-right-radius: 16px;
`;

const ContentWrapper = styled.View`
	flex-direction: column;
	gap: 16px;
	padding: 14px;
	padding-bottom: 38px;
	border-bottom-left-radius: 16px;
	border-bottom-right-radius: 16px;
`;

const TopContent = styled.View`
	flex-direction: row;
	justify-content: space-between;
`;

const TopLeftContent = styled.View`
	flex-direction: column;
	gap: 4px;
`;

const LogoWrapper = styled.View`
	background-color: ${({ theme }) => theme.colors.secondary[2]};
	padding: 4px;
	border-radius: 6px;
	justify-content: center;
	align-items: center;
`;

const SpaceLogo = styled.Image`
	width: 24px;
	height: 24px;
`;

const BottomContent = styled.View`
	flex-direction: column;
	gap: 8px;
`;

const Name = styled.Text`
	color: ${({ theme }) => theme.colors.primary[2]};
	font-size: 16px;
	font-family: ${({ theme }) => theme.fontFamily.FredokaBold};
	line-height: 16px;
`;

const Label = styled.Text`
	color: ${({ theme }) => theme.colors.gray[3]};
	font-size: 12px;
	font-family: ${({ theme }) => theme.fontFamily.FredokaMedium};
	line-height: 16px;
`;

const Footer = styled.Text`
	color: ${({ theme }) => theme.colors.gray[3]};
	font-size: 12px;
	font-family: ${({ theme }) => theme.fontFamily.FredokaMedium};
	line-height: 16px;
	align-self: flex-end;
`;

const Description = styled.Text`
	font-size: 12px;
	font-family: ${({ theme }) => theme.fontFamily.FredokaRegular};
	line-height: 16px;
`;

export default StarshipCard;
