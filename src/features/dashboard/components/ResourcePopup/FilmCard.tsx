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
 * A TypeScript React component that displays a popup with information about a Star Wars film.
 * @param item An object containing information about the film, including its title, release date, producer, director, opening crawl, and characters.
 * @param handleClose A function to close the popup.
 */
const FilmCard: FC<PopupCardProps<'film'>> = ({ item, handleClose }) => {
	const { characters, director, opening_crawl, title, producer, release_date } =
		item;

	const peopleNames = useRTKSelector(state => {
		return selectPeopleNames(state.appReducer, characters);
	});

	return (
		<PopupContainer>
			<PopupImage
				source={{
					uri: `https://picsum.photos/200/300?random=${characters.length}`
				}}
			/>

			<ContainerContent>
				<TextWrapper>
					<HeadContent>
						<PopupName>{title}</PopupName>
						<PopupLabel>
							{release_date} • {producer} • {director}
						</PopupLabel>
					</HeadContent>
					<PopupDescription numberOfLines={5}>{opening_crawl}</PopupDescription>
					<PopupDescription>
						Characters: {toSentence(peopleNames)}
					</PopupDescription>
				</TextWrapper>
				<PopupBtn onPress={handleClose}>Got it</PopupBtn>
			</ContainerContent>
		</PopupContainer>
	);
};

/**
 * A selector function that takes in the app state and an array of film IDs and returns an array of the names of the characters in those films.
 * @param appReducer The app state.
 * @param films An array of film IDs.
 * @returns An array of the names of the characters in the specified films.
 */
const selectPeopleNames = createSelector(
	(appReducer: AppState) => appReducer,
	(_: AppState, films: string[]) => films,
	(app, films) => {
		const filmsNumber = films.map(film => Number(film.match(/\d+/g)?.[0]));

		const people = [...app.allPeople, ...app.allPeople2, ...app.popularPeople];

		const peopleNames = people
			.filter((_, index) => filmsNumber.includes(index + 1))
			.map(person => person.name);

		return peopleNames;
	}
);

export default FilmCard;
