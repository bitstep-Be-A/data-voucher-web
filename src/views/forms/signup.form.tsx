import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useSignup } from "../../hooks/account.hook";
import type { CompanyInfo, JoinAgreement, MyInfo } from "../../domains/account.interface";
import agreementPolicy from "../../policies/agreement.policy";
import { routes } from "../../routes/path";

import AgreementCheckField from "../../components/signup/AgreementCheckField";
import { EventButton } from "../../components/Button";

interface StepSectionProps<T> {
  complete: () => void;
  submit: (data: T) => void;
  isValid: () => boolean;
  getErrorMessage: () => string;
  next: () => void;
  getData: () => T;
}

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 32px;
  padding-bottom: 1rem;
`;

const Fieldset = styled.fieldset`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  gap: 1rem; /* Adjust the gap value according to your needs */
  margin-bottom: 1rem; /* Adjust the margin value according to your needs */
`

const AgreementStepSection: React.FC<StepSectionProps<JoinAgreement>> = ({
  complete,
  submit,
  isValid,
  getErrorMessage,
  next,
  getData
}) => {
  const [data, setData] = useState<JoinAgreement>({
    isAgreeService: getData().isAgreeService,
    isAgreePrivacy: getData().isAgreePrivacy,
    isAgreeMarketing: getData().isAgreeMarketing
  });

  return (
    <Section>
      <Fieldset>
        <AgreementCheckField
          policyContext={agreementPolicy.service}
          checked={data.isAgreeService}
          setChecked={() => {
            setData({
              ...data,
              isAgreeService: !data.isAgreeService
            });
          }}
        />
        <AgreementCheckField
          policyContext={agreementPolicy.privacy}
          checked={data.isAgreePrivacy}
          setChecked={() => {
            setData({
              ...data,
              isAgreePrivacy: !data.isAgreePrivacy
            });
          }}
        />
        <AgreementCheckField
          policyContext={agreementPolicy.marketing}
          checked={data.isAgreeMarketing}
          setChecked={() => {
            setData({
              ...data,
              isAgreeMarketing: !data.isAgreeMarketing
            });
          }}
        />
      </Fieldset>
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
    </Section>
  );
}

const MyInfoStepSection: React.FC<StepSectionProps<MyInfo>> = ({
  complete,
  submit,
  isValid,
  getErrorMessage,
  next,
  getData
}) => {
  return (
    <></>
  );
}

const CompanyInfoStepSection: React.FC<StepSectionProps<CompanyInfo>> = ({
  complete,
  submit,
  isValid,
  getErrorMessage,
  next,
  getData
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
          getData={() => serializer.toData()}
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
          getData={() => serializer.toData()}
        />
        <CompanyInfoStepSection
          complete={() => setAccepted([true, true, false])}
          submit={(data: CompanyInfo) => {
            serializer.submitCompanyInfo(data);
          }}
          isValid={() => !serializer.isValid()}
          getErrorMessage={() => serializer.getExceptions()[0].message}
          next={() => navigate(`${routes.signup.path}?step=3`)}
          getData={() => serializer.toData()}
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
