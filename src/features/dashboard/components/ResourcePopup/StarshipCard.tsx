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

/**
 * A TypeScript React component that displays a popup with information about a Star Wars starship.
 * @param item An object containing information about the starship, including its name, model, starship class, manufacturer, hyperdrive rating, films it appeared in, pilots, cargo capacity, consumables, cost in credits, crew, length, max atmosphering speed, and passengers.
 * @param handleClose A function to close the popup.
 */
const StarshipCard: FC<PopupCardProps<'starship'>> = ({
	handleClose,
	item
}) => {
	const {
		name,
		model,
		starship_class,
		manufacturer,
		hyperdrive_rating,
		films,
		pilots,
		cargo_capacity,
		consumables,
		cost_in_credits,
		crew,
		length,
		max_atmosphering_speed,
		passengers
	} = item;

	return (
		<PopupContainer>
			<PopupImage
				source={{ uri: `https://picsum.photos/200/300?random=${films.length}` }}
			/>

			<ContainerContent>
				<TextWrapper>
					<HeadContent>
						<PopupName>{name}</PopupName>
						<PopupLabel>
							{model} • {starship_class} • {manufacturer}
						</PopupLabel>
					</HeadContent>
					<PopupDescription>
						The starship starred in {toSentence(films)}
						{!!pilots?.length && ` and was piloted by ${toSentence(pilots)}`}.
					</PopupDescription>

					<PopupDescription>
						Cargo Capacity: {cargo_capacity} • Consumables: {consumables} •
						Cost: {cost_in_credits} • Crew: {crew}
					</PopupDescription>

					<PopupDescription>
						Length: {length} • Max Speed: {max_atmosphering_speed} • Passengers:{' '}
						{passengers} • Hyperdrive Rating: {hyperdrive_rating}
					</PopupDescription>
				</TextWrapper>
				<PopupBtn onPress={handleClose}>Got it</PopupBtn>
			</ContainerContent>
		</PopupContainer>
	);
};

export default StarshipCard;
