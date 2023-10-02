import { ButtonProps, Button } from 'react-native-paper';
import styled from 'styled-components/native';
import { FC } from 'react';

/**
 * A component that displays a button with the secondary theme color.
 * @param children The children components to be rendered inside the button.
 * @param restProps The rest of the props to be passed to the button component.
 */
const ThemeBtn: FC<ThemeBtnProps & ButtonProps> = ({
	children,

	...restProps
}) => (
	<StyledButton mode='contained' {...restProps} buttonColor='secondary'>
		{children}
	</StyledButton>
);

const StyledButton = styled(Button)`
	background-color: ${({ theme }) => theme.colors.secondary[1]};
`;

export default ThemeBtn;

interface ThemeBtnProps {}
