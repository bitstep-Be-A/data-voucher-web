import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { useSignup } from "../../hooks/auth.hook";
import type { CompanyInfo, JoinAgreement, MyInfo } from "../../domains/auth.interface";
import agreementPolicies from "../../policies/agreement.policy";
import { routes } from "../../routes/path";

import AgreementCheckInput from "../../components/signup/AgreementCheckInput";
import { EventButton } from "../../components/Button";

interface StepSectionProps<T> {
  complete: () => void;
  submit: (data: T) => void;
  isValid: () => boolean;
  getErrorMessage: () => string;
  next: () => void;
}

const AgreementStepSection: React.FC<StepSectionProps<JoinAgreement>> = ({
  complete,
  submit,
  isValid,
  getErrorMessage,
  next
}) => {
  const [data, setData] = useState<JoinAgreement>({
    isAgreeService: false,
    isAgreePrivacy: false,
    isAgreeMarketing: false
  });

  return (
    <section className="flex flex-col items-center mt-8">
      <fieldset className="w-full h-full flex flex-col overflow-y-scroll space-y-4 mb-4">
        <AgreementCheckInput
          agreementPolicy={agreementPolicies.service}
          checked={data.isAgreeService}
          setChecked={() => {
            setData({
              ...data,
              isAgreeService: !data.isAgreeService
            });
          }}
        />
        <AgreementCheckInput
          agreementPolicy={agreementPolicies.privacy}
          checked={data.isAgreePrivacy}
          setChecked={() => {
            setData({
              ...data,
              isAgreePrivacy: !data.isAgreePrivacy
            });
          }}
        />
        <AgreementCheckInput
          agreementPolicy={agreementPolicies.marketing}
          checked={data.isAgreeMarketing}
          setChecked={() => {
            setData({
              ...data,
              isAgreeMarketing: !data.isAgreeMarketing
            });
          }}
        />
      </fieldset>
      <EventButton
        width={96}
        paddingY={4}
        theme="none"
        className="border border-gray-500"
        onClick={() => {
          submit(data);
          if (isValid()) {
            complete();
            next();
            return;
          }
          alert(getErrorMessage());
        }}
      >다음</EventButton>
    </section>
  );
}

const MyInfoStepSection: React.FC<StepSectionProps<MyInfo>> = ({
  complete,
  submit,
  isValid,
  getErrorMessage
}) => {
  return (
    <></>
  );
}

const CompanyInfoStepSection: React.FC<StepSectionProps<CompanyInfo>> = ({
  complete,
  submit,
  isValid,
  getErrorMessage
}) => {
  return (
    <></>
  );
}

const SignupSuccessSection: React.FC = () => {
  return (
    <></>
  );
}

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const { setAccepted, serializer, step } = useSignup();

  switch(step) {
    case 1:
      return (
        <AgreementStepSection
          complete={() => setAccepted([true, false, false])}
          submit={(data: JoinAgreement) => {
            serializer.submitAgreement(data);
          }}
          isValid={() => serializer.isValid()}
          getErrorMessage={() => serializer.getExceptions()[0].message}
          next={() => navigate(`${routes.signup.path}?step=2`)}
        />
      );
    case 2:
      return (
        <>
        <MyInfoStepSection
          complete={() => setAccepted([true, false, false])}
          submit={(data: MyInfo) => {
            serializer.submitMyInfo(data);
          }}
          isValid={() => !serializer.isValid()}
          getErrorMessage={() => serializer.getExceptions()[0].message}
          next={() => navigate(`${routes.signup.path}?step=3`)}
        />
        <CompanyInfoStepSection
          complete={() => setAccepted([true, true, false])}
          submit={(data: CompanyInfo) => {
            serializer.submitCompanyInfo(data);
          }}
          isValid={() => !serializer.isValid()}
          getErrorMessage={() => serializer.getExceptions()[0].message}
          next={() => navigate(`${routes.signup.path}?step=3`)}
        />
        </>
      );
    case 3:
      return <SignupSuccessSection/>;
    default:
      throw new Error('Signup step is out of bound. Please check your SignupProvider');
  }
}

export default SignupForm;
