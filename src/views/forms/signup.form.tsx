import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useSignup } from "../../hooks/account.hook";
import type { SignupinfoRequest, CompanyInfo, JoinAgreement, MyInfo } from "../../domains/account/signup.interface";
import { signupExceptionMap, signupValidator, useSignupSerializer } from "../../domains/account/signup.impl";
import agreementPolicy from "../../policies/agreement.policy";
import { routes } from "../../routes/path";
import {
  CompanySizeEnum,
  CompanyTypeEnum
} from "../../policies/company.policy";
import { interestTags, locations } from "../../policies/global.policy";

import AgreementCheckField from "../../components/signup/AgreementCheckField";
import InfoInputFieldset, { InfoInputField } from "../../components/signup/InfoInputFieldset";

interface StepSectionProps<T> {
  submit: (data: T) => void;
  formData: SignupinfoRequest;
}

const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 32px;
  padding-bottom: 1rem; /* Adjust the margin value according to your needs */
`;

const NextButton = styled.button`
  width: 96px;
  padding-top: 4px;
  padding-bottom: 4px;
  margin-top: 16px;
`

const AgreementStep: React.FC<StepSectionProps<JoinAgreement>> = ({
  submit,
  formData
}) => {
  return (
    <fieldset className="w-full flex flex-col items-center space-y-4">
      <AgreementCheckField
        policyContext={agreementPolicy.service}
        checked={formData.isAgreeService}
        setChecked={() => {
          submit({
            ...formData,
            isAgreeService: !formData.isAgreeService
          });
        }}
      />
      <AgreementCheckField
        policyContext={agreementPolicy.privacy}
        checked={formData.isAgreePrivacy}
        setChecked={() => {
          submit({
            ...formData,
            isAgreePrivacy: !formData.isAgreePrivacy
          });
        }}
      />
      <AgreementCheckField
        policyContext={agreementPolicy.marketing}
        checked={formData.isAgreeMarketing}
        setChecked={() => {
          submit({
            ...formData,
            isAgreeMarketing: !formData.isAgreeMarketing
          });
        }}
      />
    </fieldset>
  );
}

const MyInfoStep: React.FC<StepSectionProps<MyInfo>> = ({
  submit,
  formData
}) => {
  const { verifyEmail } = useSignupSerializer();
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
            description: null,
          }}
          verification={{
            name: "중복확인",
            event: () => {
              verifyEmail();
            }
          }}
          alertMessage={signupExceptionMap.INVALID_EMAIL_FORMAT.message}
          validator={(value: string) => signupValidator.checkValidEmail(value)}
          onSuccess={null}
        />,
        <InfoInputField
          key="pw"
          required={true}
          label="비밀번호"
          props={{
            type: "text",
            placeholder: "비밀번호를 입력하세요.",
            description: "비밀번호는 10~20자 이하의 영문, 숫자, 특수문자의 조합으로 입력하세요."
          }}
          alertMessage={signupExceptionMap.INVALID_PASSWORD_FORMAT.message}
          validator={(value: string) => signupValidator.checkValidPassword(value)}
          onSuccess={(value: string) => submit({...formData, password: value})}
        />,
        <InfoInputField
          key="pw2"
          required={true}
          label="비밀번호 확인"
          props={{
            type: "text",
            placeholder: "비밀번호를 한번 더 입력하세요",
            description: null
          }}
          alertMessage={signupExceptionMap.UNMATCHED_PASSWORD.message}
          validator={(value: string) => signupValidator.checkPasswordConfirmed(formData.password, value)}
          onSuccess={(value: string) => submit({...formData, confirmPassword: value})}
        />,
        <InfoInputField
          key="name"
          required={true}
          label="이름"
          props={{
            type: "text",
            placeholder: "",
            description: null
          }}
          alertMessage={signupExceptionMap.INVALID_NAME.message}
          onSuccess={(value: string) => submit({...formData, name: value})}
        />,
        <InfoInputField
          key="phone"
          required={true}
          label="휴대전화번호"
          props={{
            type: "text",
            placeholder: "ex) 010-1234-5678",
            description: null
          }}
          alertMessage={signupExceptionMap.INVALID_PHONE_NUMBER_FORMAT.message}
          validator={(value: string) => signupValidator.checkValidPhoneNumber(value)}
          onSuccess={(value: string) => submit({...formData, phoneNumber: value})}
        />
      ]}
    />
  );
}

const CompanyInfoStep: React.FC<StepSectionProps<CompanyInfo>> = ({
  submit,
  formData
}) => {
  const { verifyCompany } = useSignupSerializer();

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
            placeholder: "사업자등록번호를 입력하세요.",
            description: null
          }}
          alertMessage={signupExceptionMap.COMPANY_NOT_VERIFIED.message}
          onSuccess={null}
          verification= {{
            name: "기업정보확인",
            event: () => {
              verifyCompany();
            }
          }}
        />,
        <InfoInputField
          key="ceo"
          required={true}
          label="대표자명"
          props={{
            type: "text",
            placeholder: "사업자등록번호 확인 후 자동입력됩니다.",
            description: null
          }}
          alertMessage={signupExceptionMap.COMPANY_NOT_VERIFIED.message}
          onSuccess={null}
        />,
        <InfoInputField
          key="start"
          required={true}
          label="개업일자"
          props={{
            type: "text",
            placeholder: "사업자등록번호 확인 후 자동입력됩니다.",
            description: null
          }}
          alertMessage={signupExceptionMap.COMPANY_NOT_VERIFIED.message}
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
            defaultPosition: 0
          }}
          alertMessage={signupExceptionMap.COMPANY_SIZE_NOT_SELECTED.message}
          validator={(value: string) => JSON.parse(value).length === 1}
          onSuccess={(value: string) => submit({...formData, companySize: JSON.parse(value)[0]})}
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
            defaultPosition: 4
          }}
          alertMessage={signupExceptionMap.COMPANY_TYPE_NOT_SELECTED.message}
          validator={(value: string) => JSON.parse(value).length === 1}
          onSuccess={(value: string) => submit({...formData, companyType: JSON.parse(value)[0]})}
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
            defaultPosition: null
          }}
          alertMessage={signupExceptionMap.COMPANY_TARGET_AREA_NOT_SELECTED.message}
          validator={(value: string) => JSON.parse(value).length >= 1}
          onSuccess={(value: string) => submit({...formData, targetAreas: JSON.parse(value)})}
        />,
        <InfoInputField
          key="employee"
          required={true}
          label="종업원 수"
          props={{
            type: "number",
            defaultValue: "0",
            description: null,
            tail: "명"
          }}
          alertMessage={null}
          onSuccess={(value: string) => submit({...formData, employeeCount: Number(JSON.parse(value)[0])})}
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
            defaultPosition: null
          }}
          validator={(value: string) => JSON.parse(value).length <= 3}
          alertMessage={null}
          onSuccess={(value: string) => submit({...formData, interestKeywords: JSON.parse(value)})}
        />
      ]}
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

  const [formData, setFormData] = useState<SignupinfoRequest>(serializer.toData());

  const joinAgreementValue = useMemo<JoinAgreement>(() => {
    const {
      isAgreeService,
      isAgreePrivacy,
      isAgreeMarketing
    } = formData;
    return {
      isAgreeService,
      isAgreePrivacy,
      isAgreeMarketing
    }
  }, [formData]);
  const myInfoValue = useMemo<MyInfo>(() => {
    const {
      email,
      password,
      confirmPassword,
      phoneNumber,
      name
    } = formData;
    return {
      email,
      password,
      confirmPassword,
      phoneNumber,
      name
    }
  }, [formData]);
  const companyInfoValue = useMemo<CompanyInfo>(() => {
    const {
      businessRegistrationNumber,
      CEO,
      establishDate,
      companySize,
      targetAreas,
      companyType,
      employeeCount,
      interestKeywords
    } = formData;
    return {
      businessRegistrationNumber,
      CEO,
      establishDate,
      companySize,
      targetAreas,
      companyType,
      employeeCount,
      interestKeywords
    }
  }, [formData]);

  switch(step) {
    case 1:
      return (
        <Section>
          <AgreementStep
            submit={(data: JoinAgreement) => {
              setFormData({
                ...formData,
                ...data
              });
            }}
            formData={formData}
          />
          <NextButton
            className="border border-gray-500"
            onClick={() => {
              serializer.submitAgreement(joinAgreementValue);

              if (serializer.isValid()) {
                setAccepted([true, false, false]);
                navigate(`${routes.signup.path}?step=2`);
                return;
              }
              alert(serializer.getExceptions()[0].message);
            }}
          >다음</NextButton>
        </Section>
      );
    case 2:
      return (
        <Section>
          <MyInfoStep
            submit={(data: MyInfo) => {
              setFormData({
                ...formData,
                ...data
              });
            }}
            formData={formData}
          />
          <CompanyInfoStep
            submit={(data: CompanyInfo) => {
              setFormData({
                ...formData,
                ...data
              });
            }}
            formData={formData}
          />
          <NextButton
            className="border border-gray-500"
            onClick={() => {
              serializer.submitMyInfo(myInfoValue);
              serializer.submitCompanyInfo(companyInfoValue);

              if (serializer.isValid()) {
                setAccepted([true, true, false]);
                navigate(`${routes.signup.path}?step=2`);
                return;
              }
              alert(serializer.getExceptions()[0].message);
            }}
          >다음</NextButton>
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
