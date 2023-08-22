import './App.css';

import { useRef, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import { routes } from './routes/path';
import { AUTH_TOKEN_COOKIE_KEY } from './constants/auth.constant';
import { AuthContext } from './hooks/auth.hook';

import LoginPage from './pages/Login';
import NotFound from './pages/NotFound';
import RegisterPage from './pages/Register';
import SearchPage from './pages/Search';
import MyPage from './pages/My';
import DocsPage from './pages/Docs';
import BookmarkPage from './pages/Bookmark';

interface AuthProviderProps { children?: React.ReactNode; }

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [cookies, _, removeCookie] = useCookies([AUTH_TOKEN_COOKIE_KEY]);

  const authTokenRef = useRef<string>('');

  useEffect(() => {
    if (cookies[AUTH_TOKEN_COOKIE_KEY]) {
      authTokenRef.current = cookies[AUTH_TOKEN_COOKIE_KEY];
    } else {
      removeCookie(AUTH_TOKEN_COOKIE_KEY);
    }
  }, [cookies]);

  return (
    <AuthContext.Provider value={{
      tokenRef: authTokenRef
    }}>
      {children}
    </AuthContext.Provider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <AuthProvider>
            <PrivateRoute/>
          </AuthProvider>
        }>
          <Route path={routes.search.path} element={<SearchPage/>}/>
          <Route path={routes.my.path} element={<MyPage/>}/>
          <Route path={routes.docs.path} element={<DocsPage/>}/>
          <Route path={routes.bookmark.path} element={<BookmarkPage/>}/>
        </Route>
        <Route path='/' element={
          <AuthProvider>
            <PublicRoute/>
          </AuthProvider>
        }>
          <Route path={routes.register.path} element={<RegisterPage/>}/>
          <Route path={routes.login.path} element={<LoginPage/>}/>
        </Route>
        <Route path={"/*"} element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
