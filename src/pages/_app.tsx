import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@/pages/_layout';
import { SearchContextProvider } from '@/context/SearchContext';
import {AuthProvider} from '@/context/AuthContext'

export default function App({ Component, pageProps }: AppProps) {
  return <AuthProvider>
              <SearchContextProvider>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
              </SearchContextProvider>
          </AuthProvider>
        
}