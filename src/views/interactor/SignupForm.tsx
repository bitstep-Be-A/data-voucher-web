import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { signupApi } from "../../api/account";
import { useSignup } from "../../context/account.context";
import type { SignupinfoRequest, JoinAgreement, MyInfo, CompanyDetailInfo, CompanyRegisterInfo } from "../../domain/account/signup.interface";
import { signupExceptionMap, signupValidator, useSignupSerializer } from "../../domain/account/signup.impl";
import agreementPolicy from "../../policies/agreement.policy";
import { routes } from "../../routes/path";
import {
  CompanySizeEnum,
  CompanyTypeEnum,
  EMPLOY_MAX_LENGTH,
} from "../../policies/company.policy";
import { interestTags } from "../../policies/recommendation.policy";
import { locations } from "../../policies/global.policy";
import {
  EMAIL_MAX_LENGTH,
  PASSWORD_MAX_LENGTH,
  NAME_MAX_LENGTH,
  PHONE_NUMBER_MAX_LENGTH
} from "../../policies/signup.policy";
import { useContainer } from "../../context/base.context";

import { AgreementCheckField } from "../presenters/signup/joinAgreement";
import { InfoInputField, InfoInputFieldset } from "../presenters/signup/userInfo";
import { EmailVerification } from "../presenters/signup/emailVerification";
import { useAuth } from "../../context/auth.context";

interface StepSectionProps<T> {
  submit: (data: T) => void;
  formData: SignupinfoRequest;
}

const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
    <fieldset className="w-full flex flex-col items-center space-y-4 mt-8">
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
            maxLength: EMAIL_MAX_LENGTH,
            submitValue: String(formData.email)
          }}
          failMessage={signupExceptionMap.INVALID_EMAIL_FORMAT.message}
          validator={(value: string) => signupValidator.checkValidEmail(value)}
          onInput={(value: string) => submit({...formData, email: value})}
        />,
        <InfoInputField
          key="pw"
          required={true}
          label="비밀번호"
          props={{
            type: "text",
            placeholder: "비밀번호를 입력하세요.",
            description: "비밀번호는 10~20자 이하의 영문, 숫자, 특수문자의 조합으로 입력하세요.",
            maxLength: PASSWORD_MAX_LENGTH,
            isPassword: true,
            submitValue: String(formData.password)
          }}
          failMessage={signupExceptionMap.INVALID_PASSWORD_FORMAT.message}
          validator={(value: string) => signupValidator.checkValidPassword(value)}
          onInput={(value: string) => submit({...formData, password: value})}
        />,
        <InfoInputField
          key="pw2"
          required={true}
          label="비밀번호 확인"
          props={{
            type: "text",
            placeholder: "비밀번호를 한번 더 입력하세요",
            description: null,
            maxLength: PASSWORD_MAX_LENGTH,
            isPassword: true,
            submitValue: String(formData.confirmPassword)
          }}
          failMessage={signupExceptionMap.UNMATCHED_PASSWORD.message}
          validator={(value: string) => signupValidator.checkPasswordConfirmed(formData.password, value)}
          onInput={(value: string) => submit({...formData, confirmPassword: value})}
        />,
        <InfoInputField
          key="name"
          required={true}
          label="이름"
          props={{
            type: "text",
            placeholder: "",
            description: null,
            maxLength: NAME_MAX_LENGTH,
            submitValue: String(formData.name)
          }}
          failMessage={signupExceptionMap.INVALID_NAME.message}
          validator={(value: string) => signupValidator.checkValidName(value)}
          onInput={(value: string) => submit({...formData, name: value})}
        />,
        <InfoInputField
          key="phone"
          required={true}
          label="휴대전화번호"
          props={{
            type: "text",
            placeholder: "ex) 010-1234-5678",
            description: null,
            maxLength: PHONE_NUMBER_MAX_LENGTH,
            submitValue: String(formData.phoneNumber)
          }}
          failMessage={signupExceptionMap.INVALID_PHONE_NUMBER_FORMAT.message}
          validator={(value: string) => signupValidator.checkValidPhoneNumber(value)}
          onInput={(value: string) => submit({...formData, phoneNumber: value})}
        />
      ]}
    />
  );
}

const CompanyRegisterInfoStep: React.FC<StepSectionProps<CompanyRegisterInfo>> = ({
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
            description: null,
            submitValue: String(formData.businessRegistrationNumber)
          }}
          failMessage={signupExceptionMap.COMPANY_NOT_VERIFIED.message}
          validator={(value: string) => true}
          onInput={(value: string) => submit({...formData, businessRegistrationNumber: value})}
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
            description: null,
            // disabled: true,
            submitValue: String(formData.CEO)
          }}
          failMessage={signupExceptionMap.COMPANY_NOT_VERIFIED.message}
          validator={(value: string) => true}
          onInput={(value: string) => submit({...formData, CEO: value})}
        />,
        <InfoInputField
          key="start"
          required={true}
          label="개업일자"
          props={{
            type: "text",
            placeholder: "사업자등록번호 확인 후 자동입력됩니다.",
            description: null,
            // disabled: true,
            submitValue: String(formData.establishDate)
          }}
          failMessage={signupExceptionMap.COMPANY_NOT_VERIFIED.message}
          validator={(value: string) => true}
          onInput={(value: string) => submit({...formData, establishDate: value})}
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
            submitValue: [String(formData.companySize)]
          }}
          failMessage={signupExceptionMap.COMPANY_SIZE_NOT_SELECTED.message}
          validator={signupValidator.checkValidCompanySize}
          onInput={(value: string) => submit({...formData, companySize: JSON.parse(value)[0]})}
        />,
      ]}
    />
  );
}

const CompanyDetailInfoStep: React.FC<StepSectionProps<CompanyDetailInfo>> = ({
  submit,
  formData
}) => {
  return (
    <InfoInputFieldset
      title="기업 추가정보 (중복선택 가능)"
      reason="추가정보 입력 시, 입력하신 정보를 바탕으로 맞춤형 고용정책 추천 서비스 및 인력 관리 서비스를 보다 간편하게 이용하실 수 있습니다."
      inputs={[
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
            ],
            submitValue: formData.companyTypes
          }}
          failMessage={signupExceptionMap.COMPANY_TYPE_NOT_SELECTED.message}
          validator={signupValidator.checkValidCompanyType}
          onInput={(value: string) => submit({...formData, companyTypes: JSON.parse(value)})}
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
            submitValue: formData.targetAreas
          }}
          failMessage={signupExceptionMap.COMPANY_TARGET_AREA_NOT_SELECTED.message}
          validator={signupValidator.checkValidTargetAreas}
          onInput={(value: string) => submit({...formData, targetAreas: JSON.parse(value)})}
        />,
        <InfoInputField
          key="employee"
          required={true}
          label="종업원 수"
          props={{
            type: "number",
            submitValue: String(formData.employeeCount),
            description: null,
            maxLength: EMPLOY_MAX_LENGTH,
            tail: <span className="ml-2">{"명"}</span>
          }}
          failMessage={null}
          validator={(value: string) => true}
          onInput={(value: string) => submit({...formData, employeeCount: Number(value) || 0})}
        />,
        <InfoInputField
          key="interest"
          required={false}
          label={(
            <div>
              <p>추가 관심 키워드</p>
              <p>(최대 3개)</p>
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
            submitValue: formData.interestKeywords
          }}
          validator={signupValidator.checkValidInterestKeywords}
          failMessage={null}
          onInput={(value: string) => submit({...formData, interestKeywords: JSON.parse(value)})}
        />,
      ]}
    />
  )
}

const EmailVerificationStep: React.FC = () => {
  const auth = useAuth();
  return (
    <EmailVerification duration={300} failMessage="인증에 실패하였습니다." verify={async (value: string) => {
        try {
          const res = await signupApi.signupVerify(value);
          return !!res;
        } catch (err: any) {
          console.error(err);
          return false;
        }
      }}
      complete={async () => {
        await signupApi.signupComplete();
        window.location.replace(routes.login.path);
      }}
    />
  );
}

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const { setAccepted, serializer, step, setLoading } = useSignup();

  const [formData, setFormData] = useState<SignupinfoRequest>(serializer.getData());

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

  const companyRegisterInfoValue = useMemo<CompanyRegisterInfo>(() => {
    const {
      businessRegistrationNumber,
      CEO,
      establishDate,
      companySize,
    } = formData;
    return {
      businessRegistrationNumber,
      CEO,
      establishDate,
      companySize
    }
  }, [formData]);

  const companyDetailInfoValue = useMemo<CompanyDetailInfo>(() => {
    const {
      targetAreas,
      companyTypes: companyType,
      employeeCount,
      interestKeywords
    } = formData;
    return {
      targetAreas,
      companyTypes: companyType,
      employeeCount,
      interestKeywords
    }
  }, [formData]);

  const { mainScreenRef } = useContainer();

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
            className="border border-lightGray"
            onClick={() => {
              serializer.submitAgreement(joinAgreementValue);

              if (serializer.isValid()) {
                setAccepted([true, false, false]);
                navigate(`${routes.signup.path}?step=2`);
                if (mainScreenRef.current) mainScreenRef.current.scrollTop = 0;
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
          <CompanyRegisterInfoStep
            submit={(data: CompanyRegisterInfo) => {
              setFormData({
                ...formData,
                ...data
              });
            }}
            formData={formData}
          />
          <CompanyDetailInfoStep
            submit={(data: CompanyDetailInfo) => {
              setFormData({
                ...formData,
                ...data
              });
            }}
            formData={formData}
          />
          <NextButton
            className="border border-lightGray"
            onClick={async () => {
              serializer.submitMyInfo(myInfoValue);
              serializer.submitCompanyRegisterInfo(companyRegisterInfoValue);
              serializer.submitCompanyDetailInfo(companyDetailInfoValue);

              if (serializer.isValid()) {
                const reqBody = serializer.toEntity();
                setLoading(true);
                try {
                  await signupApi.signupInfo(reqBody);
                } catch(err: any) {
                  setLoading(false);
                  const res = err.response;
                  if (res?.data) {
                    alert(res.data.error);
                  } else { console.error(err) }
                  return;
                }
                setLoading(false);
                setAccepted([true, true, false]);
                navigate(`${routes.signup.path}?step=3`);
                if (mainScreenRef.current) mainScreenRef.current.scrollTop = 0;
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
          <EmailVerificationStep/>
        </Section>
      );
    default:
      throw new Error('Signup step is out of bound. Please check your SignupProvider');
  }
}

export default SignupForm;
