import { Link } from "react-router-dom";

import { routes } from "../../routes/path";

import { EventButton } from "../Button";
import { UnderlinedTextInput, BlockedTextInput } from "../Input";

interface FindCredentialPwInputFieldProps {
  placeholder: string;
  buttonText?: string;
  inputStyle?: React.CSSProperties;
}

const FindCredentialPwInputField: React.FC<FindCredentialPwInputFieldProps> = ({
  placeholder,
  buttonText,
  inputStyle
}) => {
  return (
    <div className="w-full flex justify-center items-center space-x-4">
      <UnderlinedTextInput placeholder={placeholder} width={224} style={inputStyle} />
      {
        buttonText && (
          <EventButton
            width={'90px'}
          >
            {buttonText}
          </EventButton>
        )
      }
    </div>
  );
}

export const FindCredentialPwForm: React.FC = () => {
  return (
    <form className="w-[500px] flex flex-col items-center">
      <fieldset className="mb-4">
        <legend className="text-2xl font-bold py-3 text-center">비밀번호 찾기/재설정</legend>
        <span className="text-center py-1 mb-2 text-sm">
          <p>회원가입 시 등록하셨던 휴대전화번호로 비밀번호를 찾습니다.</p>
          <p>휴대전화번호로 전송되는 인증번호를 입력해주세요.</p>
        </span>
        <div className="space-y-2 my-2 py-2">
          <FindCredentialPwInputField placeholder="ID(이메일) 주소를 입력해주세요."
            inputStyle={{
              textAlign: 'center',
              marginBottom: 25,
              width: 240
            }}
          />
          <FindCredentialPwInputField placeholder="휴대전화번호 입력 ('-' 제외)" buttonText="인증번호 전송" />
          <FindCredentialPwInputField placeholder="인증번호 입력" buttonText="확인" />
        </div>
      </fieldset>
      <EventButton
        width={160}
        type={"submit"}
      >
        비밀번호 재설정
      </EventButton>
    </form>
  );
}

interface FindCredentialIdInputFieldProps {
  placeholder: string;
  buttonText: string;
}

const FindCredentialIdInputField: React.FC<FindCredentialIdInputFieldProps> = ({
  placeholder,
  buttonText
}) => {
  return (
    <div className="w-full flex justify-center items-center space-x-4">
      <UnderlinedTextInput placeholder={placeholder} width={224} />
      <EventButton
        width={'90px'}
      >
        {buttonText}
      </EventButton>
    </div>
  );
}

export const FindCredentialIdForm: React.FC = () => {
  return (
    <form className="w-[500px] flex flex-col items-center">
      <fieldset className="mb-4">
        <legend className="text-2xl font-bold py-3 text-center">아이디 찾기</legend>
        <span className="text-center py-1 mb-2 text-sm">
          <p>회원가입 시 등록하셨던 휴대전화번호로 아이디를 찾습니다.</p>
          <p>휴대전화번호로 전송되는 인증번호를 입력해주세요.</p>
        </span>
        <div className="space-y-2 my-2 py-2">
          <FindCredentialIdInputField placeholder="휴대전화번호 입력 ('-' 제외)" buttonText="인증번호 전송" />
          <FindCredentialIdInputField placeholder="인증번호 입력" buttonText="확인" />
        </div>
      </fieldset>
      <EventButton
        width={160}
        type={"submit"}
      >
        아이디 찾기
      </EventButton>
    </form>
  );
}

interface LoginInputFieldProps {
  labelName: string;
}

const LoginInputField: React.FC<LoginInputFieldProps> = ({
  labelName,
}) => {
  return (
    <div className="w-full flex justify-between items-center space-x-4">
      <label className="text-sm font-light">{labelName}</label>
      <BlockedTextInput width={208} />
    </div>
  )
}

const HelpCredentialInfo: React.FC = () => {
  return (
    <div className="flex flex-row items-center justify-end text-xs text-gray-500 space-x-3">
      <span>계정 정보를 잊으셨나요?</span>
      <div className="space-x-2">
        <Link to={routes.findCredentialId.path}
          className="underline hover:text-indigo-500"
        >
          아이디 찾기
        </Link>
        <Link to={routes.findCredentialPw.path}
          className="underline hover:text-indigo-500"
        >
          비밀번호 찾기
        </Link>
      </div>
    </div>
  )
}

export const LoginForm: React.FC = () => {
  return (
    <form className="w-[286px] flex flex-col items-end">
      <div className="mb-6">
        <fieldset>
          <div className="space-y-4 my-2 py-2">
            <LoginInputField labelName="아이디" />
            <LoginInputField labelName="비밀번호" />
          </div>
        </fieldset>
        <HelpCredentialInfo />
      </div>
      <EventButton
        width={208}
        className="rounded"
      >
        로그인
      </EventButton>
    </form>
  )
}
