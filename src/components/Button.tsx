import { classNames } from "../utils";

export interface EventButtonProps {
  children?: React.ReactNode;
  width?: number | string;
  paddingY?: number | string;
  className?: string;
  theme?: "default" | undefined;
  type?: "button" | "submit" | "reset" | undefined;
}

export const EventButton: React.FC<EventButtonProps> = ({
  children,
  width,
  paddingY,
  className,
  theme,
  type
}) => {
  return (
    <button
      style={{
        width: width,
        paddingTop: paddingY ?? "0.375rem",
        paddingBottom: paddingY ?? "0.375rem"
      }}
      className={classNames(
        (theme === "default" || typeof theme === "undefined") ?
          "bg-gray-500 rounded-sm text-sm text-white" : "",
        className
      )}
      type={ type }
    >
      { children }
    </button>
  );
}
