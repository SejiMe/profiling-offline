import { ProtectedRoutes } from '@/components/ProtectedRoutes';
import { AuthContextProvider } from '@/contexts/AuthContext';
import '@/styles/globals.css';
import { useRouter } from 'next/router';

const noAuthRequired = ['/', '/login', '/contact', '/services'];

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    /* Checking if the pathname is in the noAuthRequired array. If it is, it renders the component. If
    it is not, it renders the ProtectedRoutes component. */
    <AuthContextProvider>
      {noAuthRequired.includes(router.pathname) ? (
        <Component {...pageProps} />
      ) : (
        <ProtectedRoutes>
          <Component {...pageProps} />
        </ProtectedRoutes>
      )}
    </AuthContextProvider>
  );
}

export default MyApp;
