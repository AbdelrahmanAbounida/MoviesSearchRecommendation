import React, { PropsWithChildren } from 'react';
import NavBar from '@/components/navbar/NavBar';

const Layout: React.FC<PropsWithChildren> = ({ children }) => (
 
  <>
    <NavBar  />
    <main className='min-w-sm'>{children}</main>
  </>
)

export default Layout;