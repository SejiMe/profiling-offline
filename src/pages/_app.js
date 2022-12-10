import { ProtectedRoutes } from '@/components/ProtectedRoutes';
import { AuthContextProvider } from '@/contexts/AuthContext';
import '@/styles/globals.css';
import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ParallaxProvider } from 'react-scroll-parallax';

const noAuthRequired = ['/', '/login', '/contact', '/services'];

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const queryClient = new QueryClient();
  return (
    /* Checking if the pathname is in the noAuthRequired array. If it is, it renders the component. If
    it is not, it renders the ProtectedRoutes component. */
    <QueryClientProvider client={queryClient}>
      <ParallaxProvider>
        <AuthContextProvider>
          {noAuthRequired.includes(router.pathname) ? (
            <Component {...pageProps} />
          ) : (
            <ProtectedRoutes>
              <Component {...pageProps} />
            </ProtectedRoutes>
          )}
        </AuthContextProvider>
      </ParallaxProvider>
      <ReactQueryDevtools position='bottom-right' initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
