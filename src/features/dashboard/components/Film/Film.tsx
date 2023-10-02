import { FC } from 'react';
import styled from 'styled-components/native';
import { Entypo } from '@expo/vector-icons';
import { setPopup } from '../../../../redux/app/app.slice';
import { useRTKDispatch } from '../../../../hooks/redux-toolkit';
import moment from 'moment';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring
} from 'react-native-reanimated';
import FloatingMenu from '../../../../components/Menu/Menu';

/**
 * A TypeScript React component that displays a card with information about a Star Wars film. It is used in the Films screen.
 * @param created The date the film was created.
 * @param title The title of the film.
 * @param opening_crawl The opening crawl of the film.
 * @param director The director of the film.
 * @param release_date The release date of the film.
 * @param restProps The rest of the props to be passed to the view component.
 */
const FilmCard: FC<Film & { index: number }> = ({
	index,
	created,
	title,
	opening_crawl,
	director,
	release_date,
	...restProps
}) => {
	const dispatch = useRTKDispatch();
	const scaleValue = useSharedValue(1);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ scale: scaleValue.value }]
		};
	});

	const handlePressIn = () => {
		scaleValue.value = withSpring(0.95);
	};

	const handlePressOut = () => {
		scaleValue.value = withSpring(1);
	};

	const togglePopup = () =>
		dispatch(
			setPopup({
				item: {
					created,
					title,
					opening_crawl,
					director,
					release_date,
					...restProps
				},
				type: 'film'
			})
		);

	return (
		<FilmView>
			<StyledTouch
				onPress={togglePopup}
				onPressIn={handlePressIn}
				onPressOut={handlePressOut}>
				<Thumbnail
					style={[animatedStyle]}
					source={{ uri: `https://picsum.photos/200/300?random=${index}` }}
				/>
				<TextWrapper>
					<Timestamp>{moment(created).format('YYYY-MM-DD HH:MM')}</Timestamp>
					<Title>{title}</Title>
					<Description numberOfLines={2}>{opening_crawl}</Description>
					<Director>{director}</Director>
				</TextWrapper>
			</StyledTouch>
			<ReleaseDate>{release_date}</ReleaseDate>
			<FloatingView>
				<FloatingMenu name={title} view={togglePopup} />
			</FloatingView>
		</FilmView>
	);
};

const StyledTouch = styled.Pressable`
	flex-direction: column;
	gap: 8px;
`;

const FilmView = styled.View`
	position: relative;
	margin-bottom: 20px;
`;

const Thumbnail = styled(Animated.Image)`
	width: 343px;
	height: 168px;
	border-radius: 6px;
`;

const ReleaseDate = styled.Text`
	position: absolute;
	top: 8px;
	left: 8px;
	border-radius: 4px;
	padding: 4px 6px;
	background-color: #000000b3;

	color: white;
	font-size: 10px;
	font-family: ${({ theme }) => theme.fontFamily.FredokaRegular};
	line-height: 16px;
`;

const TextWrapper = styled.View`
	flex-direction: column;
	gap: 4px;
`;

const Timestamp = styled.Text`
	border-radius: 6px;
	padding: 4px 10px;
	color: ${({ theme }) => theme.colors.gray[2]};
	font-size: 12px;
	font-family: ${({ theme }) => theme.fontFamily.FredokaMedium};
	line-height: 16px;
	border: 1px solid ${({ theme }) => theme.colors.gray[4]};
	width: 110px;
`;

const Title = styled.Text`
	color: ${({ theme }) => theme.colors.primary[3]};
	font-size: 18px;
	font-family: ${({ theme }) => theme.fontFamily.FredokaBold};
	line-height: 24px;
`;

const Description = styled.Text`
	color: ${({ theme }) => theme.colors.gray[2]};
	font-size: 14px;
	font-family: ${({ theme }) => theme.fontFamily.FredokaRegular};
	line-height: 19.6px;
`;

const Director = styled.Text`
	color: ${({ theme }) => theme.colors.gray[2]};
	font-size: 12px;
	font-family: ${({ theme }) => theme.fontFamily.FredokaRegular};
	line-height: 16px;
`;

const FloatingView = styled.View`
	position: absolute;
	top: 8px;
	right: 8px;
`;

export default FilmCard;
