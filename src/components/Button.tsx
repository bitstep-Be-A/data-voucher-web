import { classNames } from "../utils";

import { lightGray } from "../styles/constant";

export interface EventButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children?: React.ReactNode;
  width?: number | string;
  paddingY?: number | string;
  className?: string;
  theme?: "default" | undefined | "none";
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export const EventButton: React.FC<EventButtonProps> = (props) => {
  const {
    children,
    width,
    paddingY,
    className,
    theme,
    type,
    style,
    onClick
  } = props;

  let baseStyle: React.CSSProperties = {
    width: width,
    paddingTop: paddingY ?? "0.375rem",
    paddingBottom: paddingY ?? "0.375rem"
  };

  if (theme === "default" || typeof theme === "undefined") {
    baseStyle = {
      ...baseStyle,
      backgroundColor: lightGray,
      color: "white"
    }
  }
  return (
    <button
      style={{
        ...baseStyle,
        ...style
      }}
      className={classNames(
        className
      )}
      type={ type }
      onClick={onClick}
      {...props}
    >
      { children }
    </button>
  );
}
