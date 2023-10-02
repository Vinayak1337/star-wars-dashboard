import { FC, ReactNode } from 'react';
import styled from 'styled-components/native';
import TopNav from './TopNav';
import MiddleNav from './MiddleNav';
import BottomNav from './BottomNav';

/**
 * A navigation component for the dashboard page.
 * It consists of a top navigation bar, a middle navigation bar, and a bottom navigation bar.
 * @param children The children components to be rendered inside the navigation component.
 */
const DashboardNav: FC<{ children: ReactNode }> = ({ children }) => (
	<DashboardNavView>
		<NavWrapper>
			<TopNav />
			<MainContentWrapper>
				<MiddleNav />
				<BottomNav />
			</MainContentWrapper>
		</NavWrapper>
		{children}
	</DashboardNavView>
);

const DashboardNavView = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.colors.primary[1]};
	flex-direction: column;
`;

const NavWrapper = styled.View`
	padding: 14px 16px 8px;
	gap: 18px;
	flex-direction: column;
`;

const MainContentWrapper = styled.View`
	flex-direction: column;
	gap: 8px;
`;

export default DashboardNav;
