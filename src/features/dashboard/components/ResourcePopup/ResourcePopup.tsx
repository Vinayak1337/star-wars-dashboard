import React, { FC, ReactNode, useEffect } from 'react';
import {
	useRTKDispatch,
	useRTKSelector
} from '../../../../hooks/redux-toolkit';
import { Portal, Modal } from 'react-native-paper';
import { setPopup } from '../../../../redux/app/app.slice';
import styled from 'styled-components/native';
import PeopleCard from './PeopleCard';
import FilmCard from './FilmCard';
import Planetcard from './Planetcard';
import StarshipCard from './StarshipCard';
import { Theme } from '../../../../utils/theme';
import Animated, {
	useSharedValue,
	withTiming,
	Easing,
	interpolate,
	useAnimatedStyle
} from 'react-native-reanimated';
import ThemeBtn from '../../../../components/ThemeBtn/ThemeBtn';

/**
 * A TypeScript React component that wraps the content inside a `Portal` and a `Modal`. It is the main component that renders the popup card with information about a Star Wars resource.
 * @param children The children components to be rendered inside the portal and the modal.
 */
const ResourcePopup: FC<{ children: ReactNode }> = ({ children }) => {
	const resource = useRTKSelector(state => state.appReducer.resourcePopup);
	const distpatch = useRTKDispatch();

	const closePupup = () => distpatch(setPopup(null));

	const translateY = useSharedValue(1);

	useEffect(() => {
		if (resource) {
			translateY.value = withTiming(0, {
				duration: 350,
				easing: Easing.inOut(Easing.ease)
			});
		} else {
			translateY.value = 1;
		}
	}, [resource]);

	const animatedStyle = useAnimatedStyle(() => {
		const position = interpolate(translateY.value, [0, 1], [0, 500]);

		return {
			transform: [{ translateY: position }]
		};
	});

	const selectCard = () => {
		switch (resource?.type) {
			case 'character':
				return <PeopleCard item={resource.item} handleClose={closePupup} />;

			case 'film':
				return <FilmCard item={resource.item} handleClose={closePupup} />;

			case 'planet':
				return <Planetcard item={resource.item} handleClose={closePupup} />;

			case 'starship':
				return <StarshipCard item={resource.item} handleClose={closePupup} />;

			default:
				return null;
		}
	};

	return (
		<Container>
			{children}
			<Portal>
				<StyledModal
					theme={{
						colors: { backdrop: Theme.colors.primary[5] }
					}}
					visible={!!resource}
					onDismiss={closePupup}>
					<ResourceWrapper style={[animatedStyle]}>
						{selectCard()}
					</ResourceWrapper>
				</StyledModal>
			</Portal>
		</Container>
	);
};

const Container = styled.View``;

const StyledModal = styled(Modal)`
	justify-content: center;
	align-items: center;
`;

const ResourceWrapper = styled(Animated.View)``;

export default ResourcePopup;
