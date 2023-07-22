import React, { PropsWithChildren } from 'react';
import NavBar from '@/components/navbar/NavBar';
import { Toaster } from '@/components/ui/toaster';

const Layout: React.FC<PropsWithChildren> = ({ children }) => (
 
  <>
    <NavBar  />
    <main className='min-w-sm'>{children}</main>
    <Toaster />
  </>
)

export default Layout;