import styled from 'styled-components/native';
import ThemeBtn from '../../../../components/ThemeBtn/ThemeBtn';

export const PopupContainer = styled.View`
	background-color: white;
	border-radius: 16px;
	width: 321px;
`;

export const ContainerContent = styled.View`
	padding: 16px;
	flex-direction: column;
	gap: 24px;
`;

export const TextWrapper = styled.View`
	flex-direction: column;
	gap: 16px;
`;

export const PopupName = styled.Text`
	color: ${({ theme }) => theme.colors.primary[2]};
	font-size: 24px;
	font-family: ${({ theme }) => theme.fontFamily.FredokaBold};
	line-height: 32px;
`;

export const PopupLabel = styled.Text`
	color: ${({ theme }) => theme.colors.secondary[1]};
	font-size: 14px;
	font-family: ${({ theme }) => theme.fontFamily.FredokaRegular};
`;

export const HeadContent = styled.View`
	flex-direction: column;
	gap: 4px;
`;

export const PopupImage = styled.Image`
	width: 321px;
	height: 172px;
	border-top-left-radius: 16px;
	border-top-right-radius: 16px;
`;

export const PopupDescription = styled.Text`
	color: ${({ theme }) => theme.colors.primary[6]};
	font-size: 16px;
	font-family: ${({ theme }) => theme.fontFamily.FredokaRegular};
`;

export const PopupBtn = styled(ThemeBtn)`
	border-radius: 8px;
`;
