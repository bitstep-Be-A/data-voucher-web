import { useState } from "react";
import styled from "styled-components";

import { Description, InputBlock } from "./common";

import Timer from "../../../components/Timer";
import { EventButton } from "../../../components/Button";

export interface EmailVerificationProps {
  duration: number;
  failMessage: string;
  verify: (value: string) => Promise<boolean>;
  complete: () => Promise<void>;
}

const StyledInput = styled.input`
  border-width: 1px;
  border-color: rgb(107 114 128);
  border-radius: 2px;
  padding-left: 0.5rem; /* 8px */
  padding-right: 0.5rem; /* 8px */
  width: 180px;
`;

export const EmailVerification: React.FC<EmailVerificationProps> = ({
  duration,
  failMessage,
  verify,
  complete
}) => {
  const [value, setValue] = useState<string>("");
  const [fail, setFail] = useState<string | null>(null);

  return (
    <fieldset className="py-8">
      <h2 className="text-deepGray font-bold text-xl">인증번호 입력</h2>
      <div className="mt-4 leading-none flex flex-row text-xs text-deepGray space-x-1">
        <span>{"※ "}</span>
        <span>이메일로 전송된 인증번호를 입력해주세요.</span>
      </div>
      <div className="w-full flex items-center justify-center mt-32">
        <InputBlock>
          <span className="text-deepGray mr-4">인증번호</span>
          <div className="relative">
            <StyledInput onChange={(e) => setValue(e.target.value)} value={value} autoFocus />
            <Description main={null} fail={fail}/>
          </div>
          <div className="w-16">
            <Timer start={duration} reversed={true} timeFormat="m:ss" className="ml-2"/>
          </div>
          <EventButton
            width={80}
            paddingY={2}
            className="rounded-sm font-bold"
            onClick={async () => {
              const isValid = await verify(value);
              if (isValid) {
                complete();
              } else {
                setFail(failMessage);
              }
            }}
          >
            확인
          </EventButton>
        </InputBlock>
      </div>
    </fieldset>
  );
}
