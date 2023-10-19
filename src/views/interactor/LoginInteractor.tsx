import { useState, useMemo } from "react";
import { useRecoilState } from "recoil";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { routes } from "../../routes/path";
import { LoginRequest, LoginService } from "../../domain/account/login.interface";
import { defaultLoginRequest } from "../../domain/account/login.impl";
import { findIdEmailVerficationState, findIdRequestState } from "../../recoil/app/FindIDRequest";
import { findPWRequestState, findPwEmailVerification } from "../../recoil/app/FindPWRequest";
import { loginApi } from "../../api/account";

import Timer from "../../components/Timer";
import { EventButton } from "../../components/Button";
import { UnderlinedTextInput, BlockedTextInput } from "../../components/Input";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import { Box } from "@mui/material";
import { classNames } from "../../utils";
import LoopIcon from '@mui/icons-material/Loop';
import IconButton from "@mui/material/IconButton";

export const Frame = styled.div`
  width: 676px;
`;

export const InputBlock = styled(Frame)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

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
    <div className="absolute top-[28px] h-4 text-xs text-deepGray w-[400px]">
      {message}
    </div>
  )
}

// FindCredentialPw
interface InputFieldProps {
  placeholder: string;
  buttonText?: string;
  inputStyle?: React.CSSProperties;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onButtonClick?: () => void;
  disabled?: boolean;
  type?: React.HTMLInputTypeAttribute | undefined;
}

const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  buttonText,
  inputStyle,
  value,
  onChange,
  onButtonClick,
  disabled,
  type
}) => {
  return (
    <div className="w-full flex justify-center items-center space-x-4">
      <UnderlinedTextInput placeholder={placeholder} width={224} style={inputStyle}
        value={value}
        onChange={onChange}
        readOnly={disabled}
        type={type}
      />
      {
        buttonText && (
          <EventButton
            width={'90px'}
            className={classNames("text-sm rounded-sm", disabled ? "opacity-40": "")}
            onClick={onButtonClick}
            disabled={disabled}
          >
            {buttonText}
          </EventButton>
        )
      }
    </div>
  );
}

export const FindCredentialPwForm: React.FC = () => {
  const [emailVerfication, setEmailVerification] = useRecoilState(findPwEmailVerification);
  const [findPwRequest, setFindPwRequest] = useRecoilState(findPWRequestState);

  const [isSendCode, setIsSendCode] = useState<boolean>(false);

  return (
    <form className="w-[500px] flex flex-col items-center" onSubmit={(e) => {
      e.preventDefault();
      loginApi.pwFind({
        "code": findPwRequest.code,
        "new_password": findPwRequest.password,
        "new_password_confirm": findPwRequest.passwordConfirm
      }).then(data => {
        alert(data.message);
        window.location.replace(routes.login.path);
      }).catch((e) => alert("비밀번호 재설정에 실패하였습니다."));
    }}>
      <fieldset className="mb-4">
        <legend className="text-2xl font-bold py-3 text-center">비밀번호 찾기/재설정</legend>
        <span className="text-center py-1 mb-2 text-sm">
          <p>회원가입 시 등록하셨던 이메일로 비밀번호를 찾습니다.</p>
          <p>이메일로 전송되는 인증번호를 입력해주세요.</p>
        </span>
        <div className="space-y-2 my-2 py-2">
          <div className={classNames(
            "flex flex-row",
            isSendCode ? "ml-10" : ""
          )}>
            <InputField placeholder="ID(이메일) 주소를 입력해주세요."
              value={emailVerfication.email}
              onChange={(e) => setEmailVerification({
                email: e.target.value
              })}
              buttonText="인증번호 전송"
              onButtonClick={() => {
                setIsSendCode(true);
                loginApi.pwFindVerify({
                  "Email_ID": emailVerfication.email
                }).catch(e => alert("인증번호 전송에 실패했습니다."));
              }}
              disabled={isSendCode}
            />
            {
              isSendCode && <IconButton onClick={() => window.location.reload()}>
                <LoopIcon fontSize="small" />
              </IconButton>
            }
          </div>
          <div className="flex flex-row items-center">
            <InputField placeholder="인증번호 입력" value={findPwRequest.code} onChange={(e) => setFindPwRequest({
                ...findPwRequest,
                code: e.target.value
              })}
              inputStyle={{
                width: isSendCode ? 238 : 272
              }}
            />
            {
              isSendCode && (
                <Timer start={300} timeFormat="m:ss" className="text-red-500" reversed={true} />
              )
            }
          </div>
          <InputField placeholder="새 비밀번호 입력" value={findPwRequest.password} onChange={(e) => setFindPwRequest({
              ...findPwRequest,
              password: e.target.value
            })}
            inputStyle={{
              width: 272
            }}
            type={"password"}
          />
          <InputField placeholder="새 비밀번호 확인" value={findPwRequest.passwordConfirm} onChange={(e) => setFindPwRequest({
              ...findPwRequest,
              passwordConfirm: e.target.value
            })}
            inputStyle={{
              width: 272
            }}
            type={"password"}
          />
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

export const FindCredentialIdForm: React.FC = () => {
  const [emailVerification, setEmailVerification] = useRecoilState(findIdEmailVerficationState);
  const [findIdRequest, setFindIdRequest] = useRecoilState(findIdRequestState);

  const [isSendCode, setIsSendCode] = useState<boolean>(false);
  return (
    <form className="w-[500px] flex flex-col items-center" onSubmit={(e) => {
      e.preventDefault();
      loginApi.idFind({
        verification_code: findIdRequest.code
      }).then((data) => {
        alert("회원님의 아이디는 " + data.user_id + " 입니다.");
        window.location.replace(routes.login.path);
      }).catch((e) => alert("인증에 실패하였습니다. 올바른 인증코드를 입력하거나 새로고침하세요."));
    }}>
      <fieldset className="mb-4">
        <legend className="text-2xl font-bold py-3 text-center">아이디 찾기</legend>
        <span className="text-center py-1 mb-2 text-sm">
          <p>회원가입 시 등록하셨던 이메일로 아이디를 찾습니다.</p>
          <p>이메일로 전송되는 인증번호를 입력해주세요.</p>
        </span>
        <div className="space-y-2 my-2 py-2">
          <div className={classNames(
            "flex flex-row",
            isSendCode ? "ml-10" : ""
          )}>
            <InputField
              placeholder="이메일 입력"
              buttonText="인증번호 전송" 
              value={emailVerification.email}
              onChange={(e) => setEmailVerification({email: e.target.value})}
              onButtonClick={() => {
                setIsSendCode(true);
                loginApi.idFindVerify({
                  "Email": emailVerification.email
                }).catch(e => alert("인증번호 전송에 실패했습니다."));
              }}
              disabled={isSendCode}
            />
            {
              isSendCode && <IconButton onClick={() => window.location.reload()}>
                <LoopIcon fontSize="small" />
              </IconButton>
            }
          </div>
          <div className="flex flex-row items-center">
            <InputField
              placeholder="인증번호 입력"
              value={findIdRequest.code}
              onChange={(e) => setFindIdRequest({code: e.target.value})}
              inputStyle={{
                width: isSendCode ? 238 : 272
              }}
            />
            {
              isSendCode && (
                <Timer start={300} timeFormat="m:ss" className="text-red-500" reversed={true} />
              )
            }
          </div>
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
          <HelpCredentialInfo />
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
