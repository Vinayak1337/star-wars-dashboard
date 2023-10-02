import React, { FC } from 'react';
import {
	ContainerContent,
	HeadContent,
	PopupBtn,
	PopupContainer,
	PopupDescription,
	PopupImage,
	PopupLabel,
	PopupName,
	TextWrapper
} from './PopupComponents';
import { toSentence } from '../../../../utils';
import { useRTKSelector } from '../../../../hooks/redux-toolkit';
import { createSelector } from '@reduxjs/toolkit';

/**
 * A TypeScript React component that displays a popup with information about a Star Wars character.
 * @param item An object containing information about the character, including their name, homeworld, birth year, and films they appeared in.
 * @param handleClose A function to close the popup.
 */
const PeopleCard: FC<PopupCardProps<'character'>> = ({ item, handleClose }) => {
	const { films, name, homeworld, birth_year } = item;

	const filmNames = useRTKSelector(state => {
		return selectFilmNames(state.appReducer, films);
	});

	return (
		<PopupContainer>
			<PopupImage
				source={{ uri: `https://picsum.photos/200/300?random=${films.length}` }}
			/>
			<ContainerContent>
				<TextWrapper>
					<HeadContent>
						<PopupName>{name}</PopupName>
						<PopupLabel>{homeworld}</PopupLabel>
					</HeadContent>
					<PopupDescription>
						The character Hails from {homeworld} , born on {birth_year}
					</PopupDescription>
					<PopupDescription>Films: {toSentence(filmNames)}</PopupDescription>
				</TextWrapper>
				<PopupBtn onPress={handleClose}>Got it</PopupBtn>
			</ContainerContent>
		</PopupContainer>
	);
};

/**
 * A selector function that takes in the app state and an array of film IDs and returns an array of the names of the films.
 * @param appReducer The app state.
 * @param films An array of film IDs.
 * @returns An array of the names of the films with the specified IDs.
 */
const selectFilmNames = createSelector(
	(appReducer: AppState) => appReducer.films,
	(_: AppState, films: string[]) => films,
	(filmsFromState, films) => {
		const filmsNumber = films.map(film => Number(film.match(/\d+/g)?.[0]));

		const filmNames = filmsFromState
			.filter((_, index) => filmsNumber.includes(index + 1))
			.map(film => film.title);

		return filmNames;
	}
);

export default PeopleCard;
