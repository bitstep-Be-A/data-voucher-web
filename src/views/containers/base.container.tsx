import { useMemo } from "react";
import { useLocation } from "react-router";

import { routes } from "../../routes/path";
import { classNames } from "../../utils";
import { useAuth } from "../../hooks/auth.hook";

import Nav from "../../components/Nav";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { DocumentTextIcon } from "@heroicons/react/24/outline";

interface SideNavItemProps {
  text: string;
  HeroIcon: React.ForwardRefExoticComponent<Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
    title?: string | undefined;
    titleId?: string | undefined;
  } & React.RefAttributes<SVGSVGElement>>;
  isActive: boolean;
}

const SideNavItem: React.FC<SideNavItemProps> = ({
  text,
  HeroIcon,
  isActive
}) => {
  return (
    <div className={classNames(
      isActive ? "text-black" : "text-gray-400",
      "flex flex-row items-center pl-10 py-2 hover:bg-gray-100 hover:opacity-70"
    )}>
      <HeroIcon
        style={{
          width: 18,
          height: 18
        }}
      />
      <span className="ml-4"
        style={{
          fontSize: 18
        }}
      >{text}</span>
    </div>
  )
}

const SideNavbar = () => {
  const { pathname } = useLocation();

  return (
    <div className="w-[350px] flex flex-col border-r border-gray-400">
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
                HeroIcon={MagnifyingGlassIcon}
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
                HeroIcon={BookmarkIcon}
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
                HeroIcon={DocumentTextIcon}
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
  const auth = useAuth();

  const isLogined = useMemo(() => !!auth.tokenRef.current, [auth]);

  return (
    <div className="w-full border-b border-gray-400 py-4">
      <Nav
        className="flex flex-row justify-end mr-5"
        linkMenus={!isLogined ? [
          {
            path: routes.login.path,
            item: (
              <TopNavItem
                text={"로그인"}
                isActive={
                  routes.login.re.test(pathname)
                }
                isLast={false}
              />
            )
          },
          {
            path: routes.signup.path,
            item: (
              <TopNavItem
                text={"회원가입"}
                isActive={
                  routes.signup.re.test(pathname)
                }
                isLast={true}
              />
            )
          }
        ] : [
          {
            path: routes.my.path,
            item: (
              <TopNavItem
                text={"마이페이지"}
                isActive={
                  routes.my.re.test(pathname)
                }
                isLast={true}
              />
            )
          }
        ]}
      />
    </div>
  );
}

export const BaseContainer = ({ children }: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <div className="w-full h-full flex flex-row">
      <SideNavbar />
      <div className="w-full h-full flex flex-col">
        <TopNavbar />
        {children}
      </div>
    </div>
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
