import './App.css';

import { useRef, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import { routes } from './routes/path';
import { USER_ID_SESSION_KEY } from './constants/auth.constant';
import { AuthContext } from './context/auth.context';

import LoginPage from './pages/Login';
import NotFound from './pages/NotFound';
import SignupPage from './pages/Signup';
import SearchPage from './pages/Search';
import MyPage from './pages/My';
import DocsPage from './pages/Docs';
import BookmarkPage from './pages/Bookmark';

interface AuthProviderProps { children?: React.ReactNode; }

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const userIdRef = useRef<string>('');
  const authTokenRef = useRef<string>('');

  useEffect(() => {
    const userId = sessionStorage.getItem(USER_ID_SESSION_KEY);

    if (userId) {
      userIdRef.current = userId;
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      tokenRef: authTokenRef,
      userIdRef: userIdRef,
      logout() {
        sessionStorage.removeItem(USER_ID_SESSION_KEY);
        window.location.replace(routes.login.path);
      },
    }}>
      {children}
    </AuthContext.Provider>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
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
  );
}

export default App;
