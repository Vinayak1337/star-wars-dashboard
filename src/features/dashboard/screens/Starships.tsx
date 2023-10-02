import { ScrollView } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { useRTKSelector } from '../../../hooks/redux-toolkit';
import StarshipCard from '../components/Starship/Starship';
import ItemsView from '../components/ItemsView/ItemsView';

/**
 * A TypeScript React component that displays a list of Star Wars Starships using the `StarshipCard` component. It is a screen in the dashboard.
 */
const Starships = () => {
	const starships = useRTKSelector(state => state.appReducer.starships);

	return (
		<Container>
			<VerticalScroll scrollEnabled showsVerticalScrollIndicator={false}>
				<ItemsView>
					{starships.map((starship, index) => (
						<StarshipCard key={index} index={index} {...starship} />
					))}
				</ItemsView>
			</VerticalScroll>
		</Container>
	);
};

const Container = styled.View`
	padding: 16px;
	justify-content: center;
	align-items: center;
	background-color: ${({ theme }) => theme.colors.cream};
`;

const VerticalScroll = styled(ScrollView)``;

export default Starships;
