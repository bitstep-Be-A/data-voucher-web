import { Link } from "react-router-dom";

export interface ILinkMenu {
  path?: string; // url should be follow Link href attribute style ex) "/about"
  onClick?: () => void;
  item: React.ReactNode;
  className?: string;
}

export interface NavProps {
  linkMenus: ILinkMenu[];
  className?: string;
}

const Nav = ({
  linkMenus,
  className,
}: NavProps) => {
  return (
    <nav className={className}>
      {
        linkMenus.map((value, index) => (!value.onClick && value.path) ?
        (
          <Link
            to={value.path}
            key={index}
            className={value.className}
          >
            {value.item}
          </Link>
        ) : (
          <button
            onClick={value.onClick}
            className={value.className}
          >
            {value.item}
          </button>
        ))
      }
    </nav>
  )
}

export default Nav;
