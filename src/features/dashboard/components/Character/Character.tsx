import styled from 'styled-components/native';
import { FC } from 'react';
import {
	useRTKDispatch,
	useRTKSelector
} from '../../../../hooks/redux-toolkit';
import { setPopup } from '../../../../redux/app/app.slice';

/**
 * A TypeScript React component that displays a card with information about a Star Wars character. It is used in the People screen.
 * @param name The name of the character.
 * @param index The index of the character.
 * @param homeworld The homeworld of the character.
 * @param birth_year The birth year of the character.
 * @param restProps The rest of the props to be passed to the view component.
 */
const CharacterCard: FC<Character & { index: number }> = ({
	name,
	index,
	homeworld,
	birth_year,
	...restProps
}) => {
	const planet = useRTKSelector(state => {
		const worlNumber = homeworld.match(/\d+/g)?.[0]!;

		return state.appReducer.planets[Number(worlNumber) - 1]?.name;
	});

	const dispatch = useRTKDispatch();

	const togglePopup = () =>
		dispatch(
			setPopup({
				item: {
					name,
					homeworld: planet,
					birth_year,
					...restProps
				},
				type: 'character'
			})
		);

	return (
		<CharacterView onPress={togglePopup}>
			<Image
				source={{ uri: `https://picsum.photos/200/300?random=${index}` }}
			/>
			<TextWrapper>
				<Name>{name}</Name>
				<Description>
					The character Hails from {planet} , born on {birth_year}
				</Description>
			</TextWrapper>
		</CharacterView>
	);
};

const CharacterView = styled.TouchableOpacity`
	flex-direction: column;
	gap: 12px;
	width: 141px;
	margin-right: 16px;
`;

const Image = styled.Image`
	width: 141px;
	height: 141px;
	border-radius: 16px;
`;

const TextWrapper = styled.View`
	flex-direction: column;
	gap: 8px;
`;

const Name = styled.Text`
	font-size: 16px;
	font-family: ${({ theme }) => theme.fontFamily.FredokaBold};
	line-height: 16px;
	color: ${({ theme }) => theme.colors.primary[2]};
`;

const Description = styled.Text`
	font-size: 12px;
	font-family: ${({ theme }) => theme.fontFamily.FredokaRegular};
	color: ${({ theme }) => theme.colors.gray[1]};
	line-height: 16px;
`;

export default CharacterCard;
