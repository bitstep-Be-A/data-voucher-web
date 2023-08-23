import { useSignup } from "../../hooks/auth.hook";
import type { CompanyInfo, JoinAgreement, MyInfo } from "../../serializers/auth.interface";

interface StepFormProps<T> {
  complete: () => void;
  submit: (data: T) => void;
  isValid: () => boolean;
  getErrorMessage: () => string;
}

const AgreementStepForm: React.FC<StepFormProps<JoinAgreement>> = ({
  complete,
  submit,
  isValid,
  getErrorMessage
}) => {
  return (
    <></>
  );
}

const MyInfoStepForm: React.FC<StepFormProps<MyInfo>> = ({
  complete,
  submit,
  isValid,
  getErrorMessage
}) => {
  return (
    <></>
  );
}

const CompanyInfoStepForm: React.FC<StepFormProps<CompanyInfo>> = ({
  complete,
  submit,
  isValid,
  getErrorMessage
}) => {
  return (
    <></>
  );
}

const SignupSuccess: React.FC = () => {
  return (
    <></>
  );
}

const SignupForm: React.FC = () => {
  const { accepted, setAccepted, serializer, step } = useSignup();

  switch(step) {
    case 1:
      return (
        <AgreementStepForm
          complete={() => setAccepted([true, true, false])}
          submit={(data: JoinAgreement) => {
            serializer.submitAgreement(data);
          }}
          isValid={() => serializer.hasException()}
          getErrorMessage={() => {
            const rst = serializer.exceptions[0].message;
            serializer.isValid();
            return rst;
          }}
        />
      );
    case 2:
      return (
        <>
        <MyInfoStepForm
          complete={() => setAccepted([true, true, false])}
          submit={(data: MyInfo) => {
            serializer.submitMyInfo(data);
          }}
          isValid={() => serializer.hasException()}
          getErrorMessage={() => {
            const rst = serializer.exceptions[0].message;
            serializer.isValid();
            return rst;
          }}
        />
        </>
      );
    case 3:
      return <SignupSuccess/>;
    default:
      throw new Error('Signup step is out of bound. Please check your SignupProvider');
  }
}

export default SignupForm;
