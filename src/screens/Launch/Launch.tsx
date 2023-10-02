import styled from 'styled-components/native';
import { DarthVedarBanner, StarWarsBanner } from '../../assets/images';
import { ROUTES } from '../../utils/routes';
import { useNavigation } from '../../hooks/navigation';
import { useRTKDispatch, useRTKSelector } from '../../hooks/redux-toolkit';
import { useEffect } from 'react';
import {
	getFilmsStart,
	getPeopleStart,
	getPlanetsStart,
	getStarshipsStart
} from '../../redux/app/app.slice';
import { ActivityIndicator } from 'react-native-paper';
import { Theme } from '../../utils/theme';
import ThemeBtn from '../../components/ThemeBtn/ThemeBtn';

/**
 * A component that renders the launch screen of the app. It is the first screen that the user sees when they open the app before moving to dashboard.
 * It also starts the data fetching process to pre-load the data before the user moves to the dashboard.
 * @returns A React Functional Component that renders the Launch screen.
 */
const Launch = () => {
	const navigation = useNavigation();
	const { films, planets, starships, popularPeople } = useRTKSelector(
		state => state.appReducer
	);

	const dispatch = useRTKDispatch();

	const loadData = () => {
		dispatch(getPeopleStart());
		dispatch(getPlanetsStart());
		dispatch(getFilmsStart());
		dispatch(getStarshipsStart());
	};

	const navigateToPeople = () =>
		navigation.navigate(ROUTES.DASHBOARD_NAVIGATOR, {
			screen: ROUTES.PEOPLE
		});

	const hasAllData = !!(
		popularPeople.length &&
		planets.length &&
		starships.length &&
		films.length
	);

	useEffect(() => {
		if (hasAllData) navigateToPeople();
	}, [hasAllData]);

	return (
		<StyledView onLayout={loadData}>
			<StarWars source={StarWarsBanner} />
			<ContentWrapper>
				<DarthVedar source={DarthVedarBanner} />
				<TextWrapper>
					<Title>Welcome to Star Wars Dashboard</Title>
					<Description>
						Star Wars is an American epic space opera multimedia franchise
						created by George Lucas, which began with the eponymous 1977 film
						and quickly became a worldwide pop culture phenomenon.
					</Description>
				</TextWrapper>

				{!hasAllData ? (
					<ActivityIndicator
						animating={true}
						color={Theme.colors.secondary[1]}
					/>
				) : (
					<ThemeBtn onPress={navigateToPeople}>Next</ThemeBtn>
				)}
			</ContentWrapper>
		</StyledView>
	);
};

const StyledView = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.colors.primary[1]};
	align-items: center;
	padding: 48px 32px 0px;
	gap: 80px;
	flex-direction: column;
`;

const StarWars = styled.Image`
	width: 199px;
	height: 92px;
`;

const ContentWrapper = styled.View`
	flex-direction: column;
	gap: 20px;
	max-width: 560px;
`;

const DarthVedar = styled.Image`
	width: 300px;
	height: 218px;
	align-self: center;
`;

const TextWrapper = styled.View`
	flex-direction: column;
	gap: 12px;
`;

const Title = styled.Text`
	color: #ffffff;
	font-family: ${({ theme }) => theme.fontFamily.FredokaBold};
	font-size: 22px;
	line-height: 24px;
	letter-spacing: 0.14px;
	align-self: center;
`;

const Description = styled.Text`
	color: rgba(255, 255, 255, 0.56);
	font-size: 14px;
	font-family: ${({ theme }) => theme.fontFamily.FredokaRegular};
	line-height: 20px;
	letter-spacing: 0.14px;
`;

export default Launch;
