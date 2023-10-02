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
 * A TypeScript React component that displays a popup with information about a Star Wars planet.
 * @param item An object containing information about the planet, including its name, population, terrain, climate, films it appeared in, orbital period, diameter, gravity, and surface water.
 * @param handleClose A function to close the popup.
 */
const Planetcard: FC<PopupCardProps<'planet'>> = ({ handleClose, item }) => {
	const {
		name,
		population,
		terrain,
		climate,
		films,
		orbital_period,
		diameter,
		gravity,
		surface_water
	} = item;

	const filmNames = useRTKSelector(state => {
		return selectFilmNames(state.appReducer, films);
	});

	return (
		<PopupContainer>
			<PopupImage
				source={{
					uri: `https://picsum.photos/200/300?random=${films.length}`
				}}
			/>

			<ContainerContent>
				<TextWrapper>
					<HeadContent>
						<PopupName>{name}</PopupName>
						<PopupLabel>
							{diameter} • {gravity} • {climate} • {surface_water}
						</PopupLabel>
					</HeadContent>
					<PopupDescription>
						The planet is inhabited by {population} creatures . The terrain is
						{terrain}. With orbital period of {orbital_period} of around its
						local star.
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

export default Planetcard;
