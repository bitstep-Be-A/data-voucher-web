import { classNames } from "../utils";

export interface InputAttributeProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  width?: number | string;
}

export interface UnderlinedTextInputProps extends InputAttributeProps { };

export const UnderlinedTextInput: React.FC<UnderlinedTextInputProps> = ({
  placeholder,
  width,
  className,
  style
}) => {
  return (
    <input type="text" placeholder={placeholder}
      className={classNames(
        "border-b-2 border-gray-300 text-sm py-1.5 px-3",
        className,
      )}
      style={{
        width: width,
        ...style
      }}
    />
  );
}

export interface BlockedTextInputProps extends InputAttributeProps { };

export const BlockedTextInput: React.FC<BlockedTextInputProps> = (props) => {
  const {
    placeholder,
    width,
    className,
    style
  } = props;
  return (
    <input type="text" placeholder={placeholder}
      className={classNames(
        "border border-gray-400 rounded text-sm py-1.5 px-3",
        className,
      )}
      style={{
        width: width,
        ...style
      }}
      {...props}
    />
  );
}

export const NumberInput = (props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
  return (
    <input type="number" onChange={(e) => {
        if (e.target.value === "") e.target.placeholder = "0";
        e.target.value = e.target.value.slice(0, props.maxLength);
        props.onChange && props.onChange(e);
      }}
      {...props}
    />
  )
}
