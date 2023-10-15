import { useState } from "react";
import { Link } from "react-router-dom";

import { routes } from "../../routes/path";
import { LoginRequest, LoginService } from "../../domain/account/login.interface";
import { defaultLoginRequest } from "../../domain/account/login.impl";

import { EventButton } from "../../components/Button";
import { UnderlinedTextInput, BlockedTextInput } from "../../components/Input";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import { Box } from "@mui/material";

// FindCredentialPw
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
            className="text-sm rounded-sm"
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
        className="text-sm rounded-sm"
      >
        비밀번호 재설정
      </EventButton>
    </form>
  );
}

// FindCredentialId
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
        className="text-sm rounded-sm"
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
        className="text-sm rounded-sm"
      >
        아이디 찾기
      </EventButton>
    </form>
  );
}

// Login
interface LoginInputFieldProps {
  labelName: string;
  updateValue: (value: string) => void;
  value: string;
}

const LoginInputField: React.FC<LoginInputFieldProps> = ({
  labelName,
  updateValue,
  value
}) => {
  return (
    <div className="w-full flex justify-between items-center space-x-4">
      <label className="text-sm">{labelName}</label>
      <BlockedTextInput width={208} type={labelName === "비밀번호" ? "password" : "text"} value={value} onChange={(e) => updateValue(e.target.value)} />
    </div>
  )
}

const HelpCredentialInfo: React.FC = () => {
  return (
    <div className="flex flex-row items-center justify-end text-xs text-lightGray space-x-3">
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

export const LoginForm: React.FC<LoginService> = ({
  login
}) => {
  const [formData, setFormData] = useState<LoginRequest>(defaultLoginRequest);

  return (
    <Card sx={{
      px: 3,
      py: 4
    }}>
      <Box
        width={"100%"}
        mb={3}
      >
        <Typography variant={"h6"} component={"h1"}
          sx={{fontWeight: "bold"}}
          className="text-center"
        >
          로그인
        </Typography>
      </Box>
      <form className="w-[286px] flex flex-col items-end" onSubmit={(e) => {
        e.preventDefault();
        login(formData);
      }}>
        <div className="mb-6">
          <fieldset>
            <div className="space-y-4 my-2 py-2">
              <LoginInputField labelName="아이디" updateValue={(v) => setFormData({...formData, emailId: v})} value={formData.emailId} />
              <LoginInputField labelName="비밀번호" updateValue={(v) => setFormData({...formData, password: v})} value={formData.password} />
            </div>
          </fieldset>
          {/* <HelpCredentialInfo /> */}
        </div>
        <Button
          sx={{
            borderRadius: "4px",
          }}
          className="w-full"
          type={"submit"}
          variant={"contained"}
        >
          로그인
        </Button>
      </form>
    </Card>
  );
}
