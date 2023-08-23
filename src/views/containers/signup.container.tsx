import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import Nav from "../../components/Nav";
import { routes } from "../../routes/path";
import { classNames } from "../../utils";

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
          <span className="mr-5 text-gray-500 text-sm">{ ">" }</span>
        )
      }
    </div>
  )
}

const StepNavbar = () => {
  const [searchParams, _] = useSearchParams();
  
  const step = useMemo(() => {
    const stepParam = searchParams.get('step');
    if (stepParam) { return Number(stepParam) }
    else return 1;
  }, [searchParams]);

  return (
    <Nav
      className="flex flex-row"
      linkMenus={[
        {
          path: `${routes.signup.path}?step=1`,
          item: (
            <StatusItem
              isActive={step === 1}
              isLast={ false }
              text="Step1. 약관동의"
            />
          )
        },
        {
          path: `${routes.signup.path}?step=2`,
          item: (
            <StatusItem
              isActive={step === 2}
              isLast={ false }
              text="Step2. 정보입력"
            />
          )
        },
        {
          path: `${routes.signup.path}?step=3`,
          item: (
            <StatusItem
              isActive={step === 3}
              isLast={ true }
              text="Step3. 가입완료"
            />
          )
        }
      ]}
    />
  );
}

const SignupContainer = ({ children }: {
  children: React.ReactNode;
}) => {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <h1 className="text-lg py-5">회원가입</h1>
      <StepNavbar/>
      { children }
    </div>
  );
}

export default SignupContainer;
