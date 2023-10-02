import styled from 'styled-components/native';
import { FC, ReactNode } from 'react';

const ItemsView: FC<{
	children: ReactNode;
}> = ({ children }) => <Container>{children}</Container>;

const Container = styled.View`
	width: 100%;
	height: 100%;
	flex-direction: row;
	flex-wrap: wrap;
	gap: 20px;
	align-items: center;
	justify-content: center;
`;

export default ItemsView;
