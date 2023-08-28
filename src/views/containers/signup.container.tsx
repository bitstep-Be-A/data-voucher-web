import { useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";

import Nav from "../../components/Nav";
import { classNames } from "../../utils";
import { SignupContext, useSignup } from "../../context/account.context";
import { useSignupSerializer } from "../../domain/account/signup.impl";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Loading from "../../components/Loading";

interface StatusItemProps {
  isActive: boolean;
  isLast: boolean;
  text: string;
}

const StatusItem: React.FC<StatusItemProps> = ({
  isActive,
  isLast,
  text
}) => {
  return (
    <div className="flex flex-row">
      <span className={classNames(
        !isLast ? "mr-5" : "",
        isActive ? "text-black" : "text-gray-400"
      )}>{text}</span>
      {
        !isLast && (
          <span className="mr-5 text-lightGray text-sm">{ ">" }</span>
        )
      }
    </div>
  )
}

const StepNavbar = () => {
  const { step } = useSignup();

  return (
    <Nav
      className="flex flex-row"
      linkMenus={[
        {
          item: (
            <StatusItem
              isActive={step === 1}
              isLast={ false }
              text="Step1. 약관동의"
            />
          ),
          className: "cursor-default"
        },
        {
          item: (
            <StatusItem
              isActive={step === 2}
              isLast={ false }
              text="Step2. 정보입력"
            />
          ),
          className: "cursor-default"
        },
        {
          item: (
            <StatusItem
              isActive={step === 3}
              isLast={ true }
              text="Step3. 이메일 인증"
            />
          ),
          className: "cursor-default"
        }
      ]}
    />
  );
}

const SignupContainer = ({ children }: {
  children: React.ReactNode;
}) => {
  const [searchParams, _] = useSearchParams();
  const [accepted, setAccepted] = useState<boolean[]>([false, false, false]);
  const [loading, setLoading] = useState<boolean>(false);

  const serializer = useSignupSerializer();
  const step = useMemo(() => {
    const stepParam = searchParams.get('step');
    if (stepParam) { return Number(stepParam) }
    else return 1;
  }, [searchParams]);

  return (
    <SignupContext.Provider value={{
      accepted, setAccepted, serializer, step, loading, setLoading
    }}>
      <div className="w-full h-full flex flex-col items-center px-16">
        <div className="relative w-full flex flex-row justify-center py-5">
          {
            (step === 2 || step === 3) && (
              <Link to={`?step=${step-1}`} className="absolute left-0">
                <ArrowBackIcon/>
              </Link>
            )
          }
          <h1 className="text-lg font-bold">회원가입</h1>
        </div>
        <StepNavbar/>
        { children }
      </div>
      {
        loading && (
          <Loading/>
        )
      }
    </SignupContext.Provider>
  );
}

export default SignupContainer;
