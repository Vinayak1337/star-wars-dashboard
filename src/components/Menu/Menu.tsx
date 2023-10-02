import styled from 'styled-components/native';
import { Entypo } from '@expo/vector-icons';
import { Menu, Portal, Modal } from 'react-native-paper';
import { FC, useState } from 'react';
import { MoveIcon, RenameIcon } from '../../assets/images';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Theme } from '../../utils/theme';
import ThemeBtn from '../ThemeBtn/ThemeBtn';

/**
 * A TypeScript React component that renders a floating menu with various options.
 * @param name The name of the file.
 * @param view A function to handle the View option.
 * @param download A function to handle the Download option.
 * @param rename A function to handle the Rename option.
 * @param shareLink A function to handle the Share Link option.
 * @param move A function to handle the Move option.
 * @param markPrivate A function to handle the Mark Private option.
 */
const FloatingMenu: FC<FloatingMenuProps> = ({
	view,
	download,
	rename,
	shareLink,
	move,
	markPrivate,
	name
}) => {
	const [visible, setVisible] = useState(false);
	const [deletePopup, setDeletePopup] = useState(false);

	const closeMenu = () => setVisible(false);
	const toggleMenu = () => setVisible(p => !p);

	const openDeletePopup = () => setDeletePopup(true);
	const closeDeletePopup = () => setDeletePopup(false);

	// Function to close the menu and call the corresponding function for each option
	const closeCallback = (fn?: () => void) => () => {
		closeMenu();
		fn?.();
	};

	return (
		<Container>
			<Menu
				contentStyle={{ backgroundColor: '#ffffff' }}
				visible={visible}
				onDismiss={closeMenu}
				anchor={
					<MenuIconView onPress={toggleMenu}>
						<Entypo name='dots-three-horizontal' size={16} color='black' />
					</MenuIconView>
				}>
				<ItemsContainer>
					<StyledItem
						onPress={closeCallback(view)}
						leadingIcon={() => (
							<AntDesign name='eyeo' size={24} color='black' />
						)}
						title='View'
					/>
					<StyledItem
						onPress={closeCallback(download)}
						leadingIcon={() => (
							<Feather name='download' size={24} color='black' />
						)}
						title='Download'
					/>
					<StyledItem
						onPress={closeCallback(rename)}
						leadingIcon={RenameIcon}
						title='Rename'
					/>
					<StyledItem
						onPress={closeCallback(shareLink)}
						leadingIcon={() => (
							<AntDesign name='sharealt' size={24} color='black' />
						)}
						title='Share Link'
					/>
					<StyledItem
						onPress={closeCallback(move)}
						leadingIcon={MoveIcon}
						title='Move'
					/>
					<StyledItem
						onPress={closeCallback(markPrivate)}
						leadingIcon={() => <Feather name='lock' size={24} color='black' />}
						title='Mark Private'
					/>
					<StyledItem
						titleStyle={{ color: Theme.colors.red[1] }}
						leadingIcon={() => (
							<Feather name='trash-2' size={24} color={Theme.colors.red[1]} />
						)}
						onPress={closeCallback(openDeletePopup)}
						title='Delete'
					/>
				</ItemsContainer>
			</Menu>
			<Portal>
				<StyledModal visible={deletePopup} onDismiss={closeDeletePopup}>
					<ModalContainer>
						<IconContainer>
							<Feather
								style={{
									backgroundColor: Theme.colors.red[4],
									borderRadius: 50,
									padding: 8
								}}
								name='alert-circle'
								size={24}
								color={Theme.colors.red[2]}
							/>
						</IconContainer>
						<TextContainer>
							<Title>Caution!</Title>
							<Description>
								Are you sure you want to delete <Highlight>{name}</Highlight>?
							</Description>
						</TextContainer>
						<ButtonsContainer>
							<CancelButton
								onPress={closeDeletePopup}
								textColor={Theme.colors.gray[5]}>
								Cancel
							</CancelButton>
							<ConfirmButton onPress={closeDeletePopup}>Yes</ConfirmButton>
						</ButtonsContainer>
					</ModalContainer>
				</StyledModal>
			</Portal>
		</Container>
	);
};

const Container = styled.View`
	flex-direction: column;
	gap: 4px;
	align-items: flex-end;
`;

const ItemsContainer = styled.View`
	background-color: white;
	border-radius: 4px;
	padding: 2px 8px;
`;

const StyledItem = styled(Menu.Item)`
	height: 40px;
`;

const MenuIconView = styled.Pressable`
	background-color: white;
	border-radius: 4px;
	padding: 4px;
`;

const StyledModal = styled(Modal)`
	justify-content: center;
	align-items: center;
`;

const ModalContainer = styled.View`
	padding: 24px;
	flex-direction: column;
	background-color: white;
	border-radius: 12px;
`;

const IconContainer = styled.View`
	background-color: ${Theme.colors.red[3]};
	border-radius: 50px;
	padding: 8px;
	align-self: flex-start;
`;

const TextContainer = styled.View`
	margin: 20px 0px 32px;
	gap: 8px;
	flex-direction: column;
`;

const Title = styled.Text`
	color: ${({ theme }) => theme.colors.primary[4]};
	font-size: 18px;
	font-family: ${({ theme }) => theme.fontFamily.FredokaMedium};
	line-height: 28px;
`;

const Description = styled.Text`
	color: ${({ theme }) => theme.colors.gray[2]};
	font-size: 14px;
	font-family: ${({ theme }) => theme.fontFamily.FredokaRegular};
	line-height: 20px;
`;

const Highlight = styled.Text`
	font-family: ${({ theme }) => theme.fontFamily.FredokaBold};
`;

const ButtonsContainer = styled.View`
	flex-direction: row;
	gap: 12px;
	justify-content: space-between;
`;

const CancelButton = styled(ThemeBtn)`
	border-radius: 8px;
	color: #000000;
	background-color: white;
	font-size: 16px;
	line-height: 24px;
	font-family: ${({ theme }) => theme.fontFamily.FredokaMedium};
	border: 1px solid ${({ theme }) => theme.colors.gray[6]};
	width: 130px;
`;

const ConfirmButton = styled(CancelButton)`
	background-color: ${({ theme }) => theme.colors.red[2]};
	border: none;
`;

export default FloatingMenu;

interface FloatingMenuProps {
	name: string;
	view?: () => void;
	download?: () => void;
	rename?: () => void;
	shareLink?: () => void;
	move?: () => void;
	markPrivate?: () => void;
	delete?: () => void;
}
