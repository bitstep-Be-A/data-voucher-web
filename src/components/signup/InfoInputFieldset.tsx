/**
 * Step2. 회원가입 정보입력
 */
import { useCallback, useState, useMemo } from "react";
import styled from "styled-components";

import { EventButton } from "../Button";
import { deepGray } from "../../styles/constant";

export interface InfoInputFieldsetProps {
  title: string;
  reason?: string;
  inputs: React.ReactNode[];
}

interface TextInputProps {
  type: "text";
  placeholder: string;
  description: string | null;
  maxLength?: number;
  tail?: React.ReactNode | string;
  disabled?: boolean;
  isPassword?: boolean;
}

interface NumberInputProps {
  type: "number";
  defaultValue: string;
  description: string | null;
  maxLength?: number;
  tail?: React.ReactNode | string;
  disabled?: boolean;
}

interface ChoiceInputItem {
  id: number;
  name: string;
}

interface ChoiceInputProps {
  type: "choice";
  items: ChoiceInputItem[];
  defaultPosition: number | null;
}

interface InputProps {
  required: boolean;
  label: string | React.ReactNode;
  props: TextInputProps | ChoiceInputProps | NumberInputProps;
  failMessage: string | null;
  validator?: (value: string) => boolean;
  verification?: {
    name: string;
    event: () => void;
  };
  onSuccess: ((value: string) => void) | null;
}

const Frame = styled.div`
  width: 560px;
`;

const InputBlock = styled(Frame)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const RequireSymbol = () => {
  return (
    <span className="text-red-500">{"*"}</span>
  );
}

const Label = ({label}: {label: React.ReactNode}) => {
  return (
    <div className="w-32 ml-2 mr-8" style={{color: deepGray}}>
      {label}
    </div>
  )
}

const Description = ({main, fail}: {main: string | null; fail: string | null}) => {
  const message = useMemo(() => {
    if (fail) {
      return <span className="text-red-500">{fail}</span>;
    }
    else if (main) {
      return <>{"※ " + main}</>
    }
    return <></>;
  }, [main, fail]);

  return (
    <div className="absolute top-[28px] h-4 text-xs text-deepgray w-[400px]">
      {message}
    </div>
  )
}

const ChangedInput = styled.input`
  border-width: 1px;
  border-color: rgb(107 114 128);
  border-radius: 2px;
  padding-left: 0.5rem; /* 8px */
  padding-right: 0.5rem; /* 8px */
  width: 276px;
`

const VerificationButton = ({
  onClick,
  name
}: {
  onClick: () => void;
  name: string;
}) => {
  return (
    <EventButton className="text-lg font-bold ml-4"
      width={92}
      paddingY={6}
      onClick={onClick}
    >
      {name}
    </EventButton>
  )
}

export const InfoInputField: React.FC<InputProps> = ({
  required,
  label,
  props,
  failMessage,
  validator,
  verification,
  onSuccess
}) => {
  const [failDescription, setFailDescription] = useState<string | null>(null);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFailDescription(null);
    const value = e.target.value;
    if (validator) {
      if (validator(value)) {
        onSuccess && onSuccess(value);
      } else {
        setFailDescription(failMessage);
      }
    }
  }, [setFailDescription, validator, onSuccess, setFailDescription, failMessage]);

  if (props.type === "text") {
    const { placeholder, description, tail, maxLength, disabled, isPassword } = props;
    return (
      <InputBlock>
        {required && <RequireSymbol/>}
        <Label label={label}/>
        <div className="relative">
          <ChangedInput type={isPassword ? "password" : "text"}
            {...{
              placeholder,
              maxLength,
              disabled
            }}
            className="placeholder:text-themegray placeholder:text-sm"
            onChange={handleChange}
          />
          <Description main={description} fail={failDescription}/>
        </div>
        {
          verification && (
            <VerificationButton
              onClick={verification.event}
              name={verification.name}
            />
          )
        }
        {tail}
      </InputBlock>
    );
  }
  if (props.type === "number") {
    const { defaultValue, description, maxLength, tail, disabled } = props;
    return (
      <InputBlock>
        {required && <RequireSymbol/>}
        <Label label={label}/>
        <div className="relative">
          <ChangedInput type="number"
            {...{
              defaultValue,
              maxLength,
              disabled
            }}
            onChange={(e) => {
              if (e.target.value === "") e.target.placeholder = "0";
              e.target.value = e.target.value.slice(0, maxLength);
              handleChange(e);
            }}
          />
          <Description main={description} fail={failDescription}/>
        </div>
        {
          verification && (
            <VerificationButton
              onClick={verification.event}
              name={verification.name}
            />
          )
        }
        {tail}
      </InputBlock>
    );
  }
  if (props.type === "choice") {
    return (
      <></>
    );
  }
  throw Error("Cannot find input type");
}

const InfoInputFieldset: React.FC<InfoInputFieldsetProps> = ({ title, reason, inputs }) => {
  return (
    <fieldset className="w-full flex flex-col items-center py-8 border-b border-gray-300">
      <Frame className="mb-5">
        <h2 className="text-deepgray font-bold text-xl">{title}</h2>
        {
          reason && (
            <div>
              <span>{reason}</span>
            </div>
          )
        }
      </Frame>
      <div className="w-full flex flex-col space-y-6 items-center">
        {
          inputs.map(v => v)
        }
      </div>
    </fieldset>
  );
}

export default InfoInputFieldset;
