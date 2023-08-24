export interface InfoInputFieldProps {
  title: string;
  reason: string;
  inputs: InputProps[];
}

interface TextInputProps {
  placeholder: string;
  certification?: {
    name: string;
    event: () => Promise<void>;
  };
  errorMessage: string | null;
  description: string | null;
  tail?: React.ReactNode;
}

interface ChoiceInputItem {
  id: number;
  name: string;
}

interface ChoiceInputProps {
  items: ChoiceInputItem[];
  choiceRestriction: (items: ChoiceInputItem) => boolean;
  defaultPosition: number | null;
}

interface InputProps {
  required: boolean;
  label: string | React.ReactNode;
}

const InfoInputField: React.FC<InfoInputFieldProps> = ({ title, reason, inputs }) => {
  return (
    <></>
  );
}

export default InfoInputField;
