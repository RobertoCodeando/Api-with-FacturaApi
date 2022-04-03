import React from 'react';
import { Box } from '../components/form/Form';
import Menu from '../components/menu/Menu';
import AuthInitializer from './AuthInitializer';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
        <AuthInitializer>
            <Box styles={{ display: 'flex', width: '100%', height: '100%' }}>
                <Menu />
                <Box styles={{ width: '100%' }}>{children}</Box>
            </Box>
        </AuthInitializer>
  );
};

export default Layout;
