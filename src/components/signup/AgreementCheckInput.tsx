import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

import type { AgreementPolicy } from '../../policies/agreement.policy';

import Checkbox from '@mui/material/Checkbox';

export interface AgreementCheckInputProps {
  agreementPolicy: AgreementPolicy;
  setChecked: () => void;
  checked: boolean;
}

const AgreementCheckInput: React.FC<AgreementCheckInputProps> = ({
  agreementPolicy,
  setChecked,
  checked
}) => {
  return (
    <div className='w-full px-16 flex flex-col space-y-2'>
      <div className='flex flex-row items-center w-full space-x-2'>
        <Checkbox checked={checked} onChange={(e) => setChecked()} className='w-5 h-5' />
        <b>
          {
            agreementPolicy.required ? (
              <span className='text-red-500'>(필수)&nbsp;</span>
            ) : (
              <span className='text-blue-500'>(선택)&nbsp;</span>
            )
          }
          <span>{agreementPolicy.name} 동의</span>
        </b>
      </div>
      <div className='h-[160px] overflow-y-scroll border border-gray-300 text-sm pb-8'>
        <ReactMarkdown rehypePlugins={[rehypeRaw]} children={agreementPolicy.content} />
      </div>
    </div>
  );
}

export default AgreementCheckInput;
