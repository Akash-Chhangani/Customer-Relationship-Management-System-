import { FC, ReactNode } from 'react';
import { Box, alpha, lighten, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Sidebar from './Sidebar';
import Header from './Header';

interface SidebarLayoutProps {
  children?: ReactNode;
}

const SidebarLayout: FC<SidebarLayoutProps> = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const backgroundColor = isDarkMode ? theme.colors.alpha.trueWhite[5] : theme.colors.alpha.white[50];
  const boxShadow = isDarkMode
    ? `0 1px 0 ${alpha(lighten(theme.colors.primary.main, 0.7), 0.15)}, 0px 2px 4px -3px rgba(0, 0, 0, 0.2), 0px 5px 12px -4px rgba(0, 0, 0, .1)`
    : `0px 2px 4px -3px ${alpha(theme.colors.alpha.black[100], 0.1)}, 0px 5px 12px -4px ${alpha(theme.colors.alpha.black[100], 0.05)}`;

  return (
    <Box sx={{ flex: 1, height: '100%' }}>
      <Box
        sx={{
          '.MuiPageTitle-wrapper': {
            background: backgroundColor,
            marginBottom: theme.spacing(4),
            boxShadow: boxShadow
          }
        }}
      >
        <Header />
        <Sidebar />
        <Box
          sx={{
            position: 'relative',
            zIndex: 5,
            display: 'block',
            flex: 1,
            pt: theme.header.height,
            [theme.breakpoints.up('lg')]: { ml: theme.sidebar.width }
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default SidebarLayout;
