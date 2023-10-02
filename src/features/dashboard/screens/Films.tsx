import { ScrollView } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { useRTKSelector } from '../../../hooks/redux-toolkit';
import FilmCard from '../components/Film/Film';
import ItemsView from '../components/ItemsView/ItemsView';

/**
 * A TypeScript React component that displays a list of Star Wars films using the `FilmCard` component. It is a screen in the dashboard.
 */
const Films = () => {
	const { films } = useRTKSelector(state => state.appReducer);

	return (
		<FilmView>
			<VericalScroll scrollEnabled showsVerticalScrollIndicator={false}>
				<ItemsView>
					{films.map((item, index) => (
						<FilmCard key={index} {...item} index={index} />
					))}
				</ItemsView>
			</VericalScroll>
		</FilmView>
	);
};

const FilmView = styled.View`
	padding: 16px;
	justify-content: center;
	align-items: center;
`;

const VericalScroll = styled(ScrollView)`
	flex-wrap: wrap;
`;

export default Films;
