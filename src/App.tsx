import './App.css';

import { useRef, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import { routes } from './routes/path';
import { USER_ID_SESSION_KEY } from './constants/auth.constant';
import { AuthContext } from './context/auth.context';
import { ID } from './types/common';
import { ThemeProvider } from '@mui/material';
import { theme } from './styles/theme';

import LoginPage from './pages/Login';
import NotFound from './pages/NotFound';
import SignupPage from './pages/Signup';
import SearchPage from './pages/Search';
import MyPage from './pages/My';
import DocsPage from './pages/Docs';
import BookmarkPage from './pages/Bookmark';
import HomePage from './pages/Home';

interface AuthProviderProps { children?: React.ReactNode; }

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userId, setUserId] = useState<ID>(0);
  const authTokenRef = useRef<string>('');

  useEffect(() => {
    const userIdSession = sessionStorage.getItem(USER_ID_SESSION_KEY);

    if (userIdSession) {
      setUserId(userIdSession);
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      tokenRef: authTokenRef,
      userId: Number(userId),
      logout() {
        sessionStorage.removeItem(USER_ID_SESSION_KEY);
        window.location.replace(routes.login.path);
      },
      login(userId: ID) {
        sessionStorage.setItem(USER_ID_SESSION_KEY, JSON.stringify(userId));
        window.location.replace(routes.home.path);
      }
    }}>
      {children}
    </AuthContext.Provider>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path={routes.home.path} element={<HomePage/>}/>
            <Route path='/' element={<PrivateRoute/>}>
              <Route path={routes.search.path} element={<SearchPage/>}/>
              <Route path={routes.my.path} element={<MyPage/>}/>
              <Route path={routes.docs.path} element={<DocsPage/>}/>
              <Route path={routes.bookmark.path} element={<BookmarkPage/>}/>
            </Route>
            <Route path='/' element={<PublicRoute/>}>
              <Route path={routes.signup.path} element={<SignupPage/>}/>
              <Route path={routes.login.path} element={<LoginPage/>}/>
            </Route>
            <Route path={"/*"} element={<NotFound/>}/>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
