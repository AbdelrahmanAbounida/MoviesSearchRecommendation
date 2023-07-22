import React from 'react';
import { Inter } from 'next/font/google';

import styles from './NavBar.module.css'
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

const inter = Inter({ subsets: ['latin'] })

type NavBarProps = {}

const NavBar = () =>{ 

const {currentUser} = useAuth()

return(
<nav className={[styles.navbar, inter.className].join(' ')}>
  <div className={styles.logo}>OMDB</div>
  <ul className={styles.navLinks}>
    <div className={styles.menu}>
      <li>
        <Link href="/">
          Search
        </Link>
      </li>
      <li>
        <Link href="/recommend" className=''>Recommendations</Link>
      </li>

      <li>
        {currentUser && <Link href="/auth/logout" className=''>Logout</Link>}
      </li>

    </div>
  </ul>
</nav>
)
}
export default NavBar;
