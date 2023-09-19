import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";

import { routes } from "../../routes/path";
import { classNames } from "../../utils";
import { useAuth } from "../../context/auth.context";
import { ContainerContext, useContainer } from "../../context/base.context";
import useElementWidth from "../../hooks/useElementWidth";

import Nav from "../../components/Nav";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';

interface SideNavItemProps {
  text: string;
  Icon: any;
  isActive: boolean;
}

const SideNavItem: React.FC<SideNavItemProps> = ({
  text,
  Icon,
  isActive
}) => {
  return (
    <div className={classNames(
      isActive ? "text-black" : "text-gray-400",
      "flex flex-row items-center pl-10 py-2 hover:bg-gray-100 hover:opacity-70"
    )}>
      <Icon
        style={{
          width: 18,
          height: 18
        }}
      />
      <span className="ml-4 whitespace-nowrap"
        style={{
          fontSize: 18
        }}
      >{text}</span>
    </div>
  )
}

const SideNavbar = () => {
  const { pathname } = useLocation();

  const sideBoxRef = useRef<HTMLDivElement>(null);
  const sideBoxWidth = useElementWidth(sideBoxRef);
  const isSideNavBarHidden = useMemo(() => (sideBoxWidth !== null && sideBoxWidth < 186), [sideBoxWidth]);

  const { menuBarState } = useContainer();

  useEffect(() => {
    if (isSideNavBarHidden) menuBarState[1](true);
  }, [isSideNavBarHidden]);

  return (
    <div className={classNames(
      isSideNavBarHidden ? "hidden" : "flex flex-col",
      "w-[250px] border-r border-gray-400"
    )} ref={sideBoxRef}>
      <div className="h-[40px] my-12">
        <span className="hidden">Logo</span>
      </div>
      <Nav
        className="w-full flex flex-col space-y-6"
        linkMenus={[
          {
            path: routes.search.path,
            item: (
              <SideNavItem
                text="공고검색"
                Icon={MagnifyingGlassIcon}
                isActive={
                  !routes.bookmark.re.test(pathname) &&
                  !routes.docs.re.test(pathname)
                }
              />
            )
          },
          {
            path: routes.bookmark.path,
            item: (
              <SideNavItem
                text="즐겨찾기"
                Icon={BookmarkIcon}
                isActive={
                  routes.bookmark.re.test(pathname)
                }
              />
            )
          },
          {
            path: routes.docs.path,
            item: (
              <SideNavItem
                text="문서관리"
                Icon={DocumentTextIcon}
                isActive={
                  routes.docs.re.test(pathname)
                }
              />
            )
          }
        ]}
      />
    </div>
  )
}

interface TobNavItemProps {
  text: string;
  isActive: boolean;
  isLast: boolean;
}

const TopNavItem: React.FC<TobNavItemProps> = ({
  text,
  isActive,
  isLast
}) => {
  return (
    <div className={"text-sm"}>
      <span className={isActive ? "text-black" : "text-gray-400"}>{text}</span>
      {!isLast && <span className="mx-2 text-gray-400">|</span>}
    </div>
  )
}

const TopNavbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const auth = useAuth();
  const isAuthorized = useMemo(() => !!auth.userId, [auth]);

  const { menuBarState } = useContainer();

  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const toggleDrawer = (open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setDrawerOpen(open);
    };


  return (
    <AppBar position={"static"} color={"inherit"}>
      <Toolbar
        className="flex flex-row justify-between"
      >
        <Box>
          <IconButton
            onClick={toggleDrawer(true)}
          >
            <MenuIcon sx={{
              display: menuBarState[0] ? "block" : "none"
            }} />
          </IconButton>
          <Drawer
            anchor={'left'}
            open={drawerOpen}
            onClose={toggleDrawer(false)}
          >
            <SideNavbar/>
          </Drawer>
        </Box>
        <Box>
          {
            !isAuthorized ? <>
              <button onClick={() => navigate(routes.login.path)}>
                <TopNavItem
                  text={"로그인"}
                  isActive={
                    routes.login.re.test(pathname)
                  }
                  isLast={false}
                />
              </button>
              <button onClick={() => navigate(routes.signup.path)}>
                <TopNavItem
                  text={"회원가입"}
                  isActive={
                    routes.signup.re.test(pathname)
                  }
                  isLast={true}
                />
              </button>
            </> : <>
              <button onClick={() => navigate(routes.my.path)}>
                <TopNavItem
                  text={"마이페이지"}
                  isActive={
                    routes.my.re.test(pathname)
                  }
                  isLast={false}
                />
              </button>
              <button onClick={() => auth.logout()}>
                <TopNavItem
                  text={"로그아웃"}
                  isActive={false}
                  isLast={true}
                />
              </button>
            </>
          }
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export const BaseContainer = ({ children }: {
  children: React.ReactNode;
}): JSX.Element => {
  const mainScreenRef = useRef<HTMLDivElement>(null);

  const menuBarState = useState<boolean>(false);

  return (
    <ContainerContext.Provider value={{
      mainScreenRef,
      menuBarState
    }}>
      <div className="w-screen h-screen flex flex-row overflow-hidden">
        <SideNavbar />
        <div className="w-full h-full flex flex-col">
          <TopNavbar />
          <div className="w-full h-full overflow-y-scroll bg-neutral-50" ref={mainScreenRef}>
            {children}
          </div>
        </div>
      </div>
    </ContainerContext.Provider>
  );
}

export const CenteredContainer = ({ children, className }: {
  children: React.ReactNode;
  className?: string;
}): JSX.Element => {
  return (
    <div className={classNames(
      "w-full h-full flex justify-center items-center",
      className
    )}>
      {children}
    </div>
  );
}
