/**
 * Step2. 회원가입 정보입력
 */

export interface InfoInputFieldsetProps {
  title: string;
  reason?: string;
  inputs: React.ReactNode[];
}

interface TextInputProps {
  type: "text";
  placeholder: string;
  description: string | null;
  tail?: React.ReactNode | string;
}

interface NumberInputProps {
  type: "number";
  defaultValue: string;
  description: string | null;
  tail?: React.ReactNode | string;
}

interface ChoiceInputItem {
  id: number;
  name: string;
}

interface ChoiceInputProps {
  type: "choice";
  items: ChoiceInputItem[];
  defaultPosition: number | null;
}

interface InputProps {
  required: boolean;
  label: string | React.ReactNode;
  props: TextInputProps | ChoiceInputProps | NumberInputProps;
  alertMessage: string | null;
  validator?: (value: string) => boolean;
  verification?: {
    name: string;
    event: () => void;
  };
  onSuccess: ((value: string) => void) | null;
}

export const InfoInputField: React.FC<InputProps> = ({
  required,
  label,
  props
}) => {
  return (
    <></>
  );
}

const InfoInputFieldset: React.FC<InfoInputFieldsetProps> = ({ title, reason, inputs }) => {
  return (
    <fieldset className="w-full py-8 border-b border-gray-300">
      <h2>{title}</h2>
      {
        reason && (
          <div>
            <span>{reason}</span>
          </div>
        )
      }
      <div className="w-full flex flex-col space-y-2">
        {
          inputs.map(v => v)
        }
      </div>
    </fieldset>
  );
}

export default InfoInputFieldset;
