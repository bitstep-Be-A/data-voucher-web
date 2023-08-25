import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useSignup } from "../../hooks/account.hook";
import type { CompanyInfo, JoinAgreement, MyInfo, VerificationType } from "../../domains/account/signup.interface";
import { signupExceptionMap, signupValidator } from "../../domains/account/signup.impl";
import agreementPolicy from "../../policies/agreement.policy";
import { routes } from "../../routes/path";
import {
  CompanySizeEnum,
  CompanyTypeEnum
} from "../../policies/company.policy";
import { interestTags, locations } from "../../policies/global.policy";

import AgreementCheckField from "../../components/signup/AgreementCheckField";
import InfoInputFieldset, { InfoInputField, ChoiceInputItem } from "../../components/signup/InfoInputFieldset";
import { EventButton } from "../../components/Button";

interface StepSectionProps<T> {
  complete: () => void;
  submit: (data: T) => void;
  isValid: () => boolean;
  getErrorMessage: () => string;
  next: () => void;
  getData: () => T;
  verify?: (eventType: VerificationType) => Promise<void>;
}

const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 32px;
  padding-bottom: 1rem; /* Adjust the margin value according to your needs */
`;

const AgreementStep: React.FC<StepSectionProps<JoinAgreement>> = ({
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
    <fieldset className="w-full flex flex-col items-center space-y-1">
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
    </fieldset>
  );
}

const MyInfoStep: React.FC<StepSectionProps<MyInfo>> = ({
  submit,
  getData,
  verify
}) => {
  return (
    <InfoInputFieldset
      title="개인정보"
      inputs={[
        <InfoInputField
          key="email"
          required={true}
          label="아이디(이메일 주소)"
          props={{
            type: "text",
            placeholder: "아이디(이메일 주소)를 입력하세요.",
            verification: {
              name: "중복확인",
              event: () => {
                verify!("이메일 중복확인");
              }
            },
            errorMessage: signupExceptionMap.INVALID_EMAIL_FORMAT.message,
            validator: (value: string) => signupValidator.checkValidEmail(value),
            description: null,
          }}
          onSuccess={null}
        />,
        <InfoInputField
          key="pw"
          required={true}
          label="비밀번호"
          props={{
            type: "text",
            placeholder: "비밀번호를 입력하세요.",
            errorMessage: signupExceptionMap.INVALID_PASSWORD_FORMAT.message,
            validator: (value: string) => signupValidator.checkValidPassword(value),
            description: "비밀번호는 10~20자 이하의 영문, 숫자, 특수문자의 조합으로 입력하세요."
          }}
          onSuccess={(value: string) => submit({...getData(), password: value})}
        />,
        <InfoInputField
          key="pw2"
          required={true}
          label="비밀번호 확인"
          props={{
            type: "text",
            placeholder: "비밀번호를 한번 더 입력하세요",
            errorMessage: signupExceptionMap.UNMATCHED_PASSWORD.message,
            validator: (value: string) => signupValidator.checkPasswordConfirmed(getData().password, value),
            description: null
          }}
          onSuccess={(value: string) => submit({...getData(), confirmPassword: value})}
        />,
        <InfoInputField
          key="name"
          required={true}
          label="이름"
          props={{
            type: "text",
            placeholder: "",
            errorMessage: null,
            description: null
          }}
          onSuccess={(value: string) => submit({...getData(), name: value})}
        />,
        <InfoInputField
          key="phone"
          required={true}
          label="휴대전화번호"
          props={{
            type: "text",
            placeholder: "ex) 010-1234-5678",
            errorMessage: signupExceptionMap.INVALID_PHONE_NUMBER_FORMAT.message,
            validator: (value: string) => signupValidator.checkValidPhoneNumber(value),
            description: null
          }}
          onSuccess={(value: string) => submit({...getData(), phoneNumber: value})}
        />
      ]}
    />
  );
}

const CompanyInfoStep: React.FC<StepSectionProps<CompanyInfo>> = ({
  complete,
  submit,
  isValid,
  getErrorMessage,
  next,
  getData,
  verify
}) => {
  return (
    <InfoInputFieldset
      title="기업정보 (최신 기준 사업자등록 정보)"
      inputs={[
        <InfoInputField
          key="regi"
          required={true}
          label="사업자등록번호"
          props={{
            type: "text",
            verification: {
              name: "중복확인",
              event: () => {
                verify!("이메일 중복확인");
              }
            },
            placeholder: "사업자등록번호를 입력하세요.",
            errorMessage: null,
            description: null
          }}
          onSuccess={null}
        />,
        <InfoInputField
          key="ceo"
          required={true}
          label="대표자명"
          props={{
            type: "text",
            placeholder: "사업자등록번호 확인 후 자동입력됩니다.",
            errorMessage: null,
            description: null
          }}
          onSuccess={null}
        />,
        <InfoInputField
          key="start"
          required={true}
          label="개업일자"
          props={{
            type: "text",
            placeholder: "사업자등록번호 확인 후 자동입력됩니다.",
            errorMessage: null,
            description: null
          }}
          onSuccess={null}
        />,
        <InfoInputField
          key="size"
          required={true}
          label="기업규모"
          props={{
            type: "choice",
            items: [
              {
                id: 1,
                name: CompanySizeEnum.SB
              },
              {
                id: 2,
                name: CompanySizeEnum.SME
              },
              {
                id: 3,
                name: CompanySizeEnum.MC
              },
              {
                id: 4,
                name: CompanySizeEnum.LC
              }
            ],
            choiceRestriction: (choices: ChoiceInputItem[]) => choices.length === 1,
            defaultPosition: 0
          }}
          onSuccess={(value: string) => submit({...getData(), companySize: JSON.parse(value)[0]})}
        />,
        <InfoInputField
          key="compType"
          required={true}
          label="기업형태"
          props={{
            type: "choice",
            items: [
              {
                id: 1,
                name: CompanyTypeEnum.VE
              },
              {
                id: 2,
                name: CompanyTypeEnum.WOB
              },
              {
                id: 3,
                name: CompanyTypeEnum.SE
              },
              {
                id: 4,
                name: CompanyTypeEnum.DIB
              },
              {
                id: 5,
                name: CompanyTypeEnum.NA
              }
            ],
            choiceRestriction: (choices: ChoiceInputItem[]) => choices.length === 1,
            defaultPosition: 4
          }}
          onSuccess={(value: string) => submit({...getData(), companyType: JSON.parse(value)[0]})}
        />,
        <InfoInputField
          key="loc"
          required={true}
          label={(
            <div>
              <p>기업소재지 또는</p>
              <p>관심지역</p>
            </div>
          )}
          props={{
            type: "choice",
            items: locations.map((v) => {
              return {
                id: v.code,
                name: v.name
              }
            }),
            choiceRestriction: (choices: ChoiceInputItem[]) => choices.length >= 1,
            defaultPosition: null
          }}
          onSuccess={(value: string) => submit({...getData(), targetAreas: JSON.parse(value)})}
        />,
        <InfoInputField
          key="employee"
          required={true}
          label="종업원 수"
          props={{
            type: "text",
            placeholder: "종업원 수를 입력해 주세요.",
            errorMessage: null,
            description: null,
            tail: "명"
          }}
          onSuccess={(value: string) => submit({...getData(), employeeCount: Number(JSON.parse(value)[0])})}
        />,
        <InfoInputField
          key="interest"
          required={false}
          label={(
            <div>
              <p>추가 관심 키워드</p>
              <p>(선택사항)</p>
            </div>
          )}
          props={{
            type: "choice",
            items: interestTags.map((v) => {
              return {
                id: v.id,
                name: v.keyword
              }
            }),
            choiceRestriction: (choices: ChoiceInputItem[]) => (choices.length <= 3) && (choices.length >= 1),
            defaultPosition: null
          }}
          onSuccess={(value: string) => submit({...getData(), interestKeywords: JSON.parse(value)})}
        />
      ]}
      nextButton={(
        <EventButton
          width={96}
          paddingY={4}
          theme="none"
          className="border border-gray-500"
          onClick={() => {
            if (isValid()) {
              complete();
              next();
              return;
            }
            alert(getErrorMessage());
          }}
        >다음</EventButton>
      )}
    />
  );
}

const SignupSuccessStep: React.FC = () => {
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
        <Section>
          <AgreementStep
            complete={() => setAccepted([true, false, false])}
            submit={(data: JoinAgreement) => {
              serializer.submitAgreement(data);
            }}
            isValid={() => serializer.isValid()}
            getErrorMessage={() => serializer.getExceptions()[0].message}
            next={() => navigate(`${routes.signup.path}?step=2`)}
            getData={() => serializer.toData()}
          />
        </Section>
      );
    case 2:
      return (
        <Section>
          <MyInfoStep
            complete={() => setAccepted([true, false, false])}
            submit={(data: MyInfo) => {
              serializer.submitMyInfo(data);
            }}
            isValid={() => !serializer.isValid()}
            getErrorMessage={() => serializer.getExceptions()[0].message}
            next={() => navigate(`${routes.signup.path}?step=3`)}
            getData={() => serializer.toData()}
            verify={(eventType: VerificationType) => serializer.verify(eventType)}
          />
          <CompanyInfoStep
            complete={() => setAccepted([true, true, false])}
            submit={(data: CompanyInfo) => {
              serializer.submitCompanyInfo(data);
            }}
            isValid={() => !serializer.isValid()}
            getErrorMessage={() => serializer.getExceptions()[0].message}
            next={() => navigate(`${routes.signup.path}?step=3`)}
            getData={() => serializer.toData()}
            verify={(eventType: VerificationType) => serializer.verify(eventType)}
          />
        </Section>
      );
    case 3:
      return (
        <Section>
          <SignupSuccessStep/>
        </Section>
      );
    default:
      throw new Error('Signup step is out of bound. Please check your SignupProvider');
  }
}

export default SignupForm;
