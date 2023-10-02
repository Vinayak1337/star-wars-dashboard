import styled from 'styled-components/native';
import { useRTKSelector } from '../../../hooks/redux-toolkit';
import CharacterCard from '../components/Character/Character';
import { ScrollView } from 'react-native-gesture-handler';

/**
 * A TypeScript React component that displays a list of Star Wars People using the `CharacterCard` component. It is a screen in the dashboard.
 */
const People = () => {
	const { allPeople, allPeople2, popularPeople } = useRTKSelector(
		state => state.appReducer
	);

	return (
		<PeopleView>
			<Scroll scrollEnabled showsVerticalScrollIndicator={false}>
				<Wrapper>
					<Label>Popular People</Label>
					<Scroll
						scrollEnabled
						horizontal
						showsHorizontalScrollIndicator={false}>
						{popularPeople.map((item, index) => (
							<CharacterCard key={index} {...item} index={index} />
						))}
					</Scroll>
				</Wrapper>
				<Wrapper>
					<Label>All People</Label>
					<Scroll
						scrollEnabled
						horizontal
						showsHorizontalScrollIndicator={false}>
						{allPeople.map((item, index) => (
							<CharacterCard
								key={index}
								{...item}
								index={index + popularPeople.length}
							/>
						))}
					</Scroll>
				</Wrapper>
				<Wrapper>
					<Label>All People 2</Label>
					<Scroll
						scrollEnabled
						horizontal
						showsHorizontalScrollIndicator={false}>
						{allPeople2.map((item, index) => (
							<CharacterCard
								key={index}
								{...item}
								index={index + popularPeople.length + allPeople.length}
							/>
						))}
					</Scroll>
				</Wrapper>
			</Scroll>
		</PeopleView>
	);
};

const PeopleView = styled.View`
	padding: 15px 0px 15px 24px;
`;

const Scroll = styled(ScrollView)``;

const Wrapper = styled.View`
	flex-direction: column;
	gap: 24px;
	margin-bottom: 38px;
`;

const Label = styled.Text`
	font-family: ${({ theme }) => theme.fontFamily.FredokaBold};
	color: ${({ theme }) => theme.colors.primary[2]};
	font-size: 18px;
	line-height: 18px;
`;

export default People;
