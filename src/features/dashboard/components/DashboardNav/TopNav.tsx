import React from 'react';
import styled from 'styled-components/native';
import { StarWarsLogo } from '../../../../assets/images';
import { Ionicons } from '@expo/vector-icons';
import { Badge } from 'react-native-paper';

/**
 * A component that displays the top part of Dashboard navigation of the dashboard page.
 * It consists of the Star Wars logo and a notification icon with a badge.
 */
const TopNav = () => (
	<TopNavView>
		<StarsWars source={StarWarsLogo} />
		<NotificationView>
			<Ionicons name='notifications-outline' size={24} color='white' />
			<StyledBadge size={10} />
		</NotificationView>
	</TopNavView>
);

const StarsWars = styled.Image`
	width: 67px;
	height: 28px;
`;

const NotificationView = styled.View`
	position: relative;
`;

const StyledBadge = styled(Badge)`
	position: absolute;
	top: 2px;
	right: 2px;
	background-color: ${({ theme }) => theme.colors.teritary};
`;

const TopNavView = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

export default TopNav;
