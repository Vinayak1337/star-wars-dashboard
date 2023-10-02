import { ScrollView } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { useRTKSelector } from '../../../hooks/redux-toolkit';
import PlanetCard from '../components/Planet/Planet';
import ItemsView from '../components/ItemsView/ItemsView';

/**
 * A TypeScript React component that displays a list of Star Wars Planets using the `PlanetCard` component. It is a screen in the dashboard.
 */
const Planets = () => {
	const planets = useRTKSelector(state => state.appReducer.planets);

	return (
		<Container>
			<VericalScroll scrollEnabled showsVerticalScrollIndicator={false}>
				<ItemsView>
					{planets.map((planet, index) => (
						<PlanetCard key={index} index={index} {...planet} />
					))}
				</ItemsView>
			</VericalScroll>
		</Container>
	);
};

const Container = styled.View`
	padding: 16px;
	justify-content: center;
	align-items: center;
`;

const VericalScroll = styled(ScrollView)``;

export default Planets;
