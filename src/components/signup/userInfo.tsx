/**
 * Step2. 회원가입 정보입력
 */
import { useCallback, useState } from "react";

import { classNames } from "../../utils";

import { EventButton } from "../Button";
import {
  StyledInput,
  Frame,
  InputBlock,
  RequireSymbol,
  Label,
  Description
} from "./common";

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
  submitValue: string;
}

interface NumberInputProps {
  type: "number";
  description: string | null;
  maxLength?: number;
  tail?: React.ReactNode | string;
  disabled?: boolean;
  submitValue: string;
}

interface ChoiceInputItem {
  id: number;
  name: string;
}

interface ChoiceInputProps {
  type: "choice";
  items: ChoiceInputItem[];
  submitValue: string[];
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
  onInput: ((value: string) => void) | null;
}

const ChoiceInput: React.FC<InputProps> = ({
  props,
  onInput,
  validator
}) => {
  const {items, submitValue} = props as ChoiceInputProps;
  // const [choices, setChoices] = useState<string[]>(defaultPosition ? [items[defaultPosition].name] : []);

  return (
    <div className="grid grid-cols-4 gap-2 max-h-[120px] overflow-auto">
      {
        items.map((item) => (
          <EventButton key={item.id}
            onClick={() => {
              if (!submitValue.includes(item.name)) {
                let choices = [...submitValue, item.name];
                let value = JSON.stringify(choices);
                if (validator!(value)) {
                  onInput!(value);
                } else {
                  if (submitValue.length === 1) {
                    choices.shift();
                    onInput!(JSON.stringify(choices));
                  }
                }
              } else {
                let choices = submitValue.filter((v) => v !== item.name);
                let value = JSON.stringify(choices);
                if (validator!(value)) {
                  onInput!(value);
                }
              }
            }}
            theme={submitValue.includes(item.name) ? "default" : "none"}
            className={classNames(
              !submitValue.includes(item.name) ? "border border-lightGray" : "",
              "text-sm rounded-sm"
            )}
            width={90}
            paddingY={6}
          >
            {item.name}
          </EventButton>
        ))
      }
    </div>
  )
}

const VerificationButton = ({
  onClick,
  name
}: {
  onClick: () => void;
  name: string;
}) => {
  return (
    <EventButton className="text-sm font-bold ml-4 rounded-sm"
      width={92}
      paddingY={6}
      onClick={onClick}
    >
      {name}
    </EventButton>
  )
}

export const InfoInputField: React.FC<InputProps> = (_props) => {
  const {
    required,
    label,
    props,
    failMessage,
    validator,
    verification,
    onInput
  } = _props;
  const [failDescription, setFailDescription] = useState<string | null>(null);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFailDescription(null);
    const value = e.target.value;
    if (validator) {
      if (validator(value)) {
        onInput && onInput(value);
      } else {
        onInput && onInput(value);
        setFailDescription(failMessage);
      }
    }
  }, [setFailDescription, validator, onInput, setFailDescription, failMessage]);

  if (props.type === "text") {
    const { placeholder, description, tail, maxLength, disabled, isPassword, submitValue } = props;
    return (
      <InputBlock>
        {required && <RequireSymbol/>}
        <Label label={label}/>
        <div className="relative">
          <StyledInput type={isPassword ? "password" : "text"}
            {...{
              placeholder,
              maxLength,
              disabled
            }}
            className="placeholder:text-lightGray placeholder:text-sm"
            onChange={handleChange}
            value={submitValue}
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
    const { submitValue, description, maxLength, tail, disabled } = props;
    return (
      <InputBlock>
        {required && <RequireSymbol/>}
        <Label label={label}/>
        <div className="relative">
          <StyledInput type="number"
            {...{
              maxLength,
              disabled
            }}
            onChange={(e) => {
              e.target.value = e.target.value.slice(0, maxLength);
              handleChange(e);
            }}
            value={submitValue}
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
      <InputBlock>
        {required && <RequireSymbol/>}
        <Label label={label}/>
        <ChoiceInput {..._props}/>
      </InputBlock>
    );
  }
  throw Error("Cannot find input type");
}

export const InfoInputFieldset: React.FC<InfoInputFieldsetProps> = ({ title, reason, inputs }) => {
  return (
    <fieldset className="w-full flex flex-col items-center py-8 border-b border-gray-300">
      <Frame className="mb-5">
        <h2 className="text-deepGray font-bold text-xl">{title}</h2>
        {
          reason && (
            <div className="mt-4 leading-none flex flex-row text-xs text-deepGray space-x-1">
              <span>{"※ "}</span>
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
