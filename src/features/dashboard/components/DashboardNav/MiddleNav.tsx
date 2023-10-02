import React from 'react';
import styled from 'styled-components/native';
import { Theme } from '../../../../utils/theme';
import { AntDesign } from '@expo/vector-icons';

/**
 * A component that displays a search bar in the middle of navigation bar.
 */
const MiddleNav = () => (
	<MiddleNavView>
		<SearchbarWrapper>
			<StyledSearchbar
				placeholderTextColor={Theme.colors.gray[3]}
				value=''
				cursorColor={Theme.colors.primary[1]}
				placeholder='Search characters'
			/>
			<StyledIcon name='search1' size={20} color={Theme.colors.gray[3]} />
		</SearchbarWrapper>
	</MiddleNavView>
);

const MiddleNavView = styled.View``;

const SearchbarWrapper = styled.View`
	flex-direction: row;
	position: relative;
`;

const StyledSearchbar = styled.TextInput`
	font-family: ${({ theme }) => theme.fontFamily.FredokaRegular};
	line-height: 24px;
	letter-spacing: 0.03px;
	border-radius: 6px;
	font-size: 14px;
	background-color: #ffffff;
	width: 100%;
	height: 36px;
	padding: 6px 8px;
	color: ${({ theme }) => theme.colors.primary[1]};
`;

const StyledIcon = styled(AntDesign)`
	position: absolute;
	top: 8px;
	right: 8px;
`;

export default MiddleNav;
