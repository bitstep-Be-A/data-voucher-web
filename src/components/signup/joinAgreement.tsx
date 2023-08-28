/**
 * Step1. 회원가입 약관동의
 */

import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

import type { AgreementPolicy } from '../../policies/agreement.policy';

import Checkbox from '@mui/material/Checkbox';

export interface AgreementCheckFieldProps {
  policyContext: AgreementPolicy;
  setChecked: () => void;
  checked: boolean;
}

export const AgreementCheckField: React.FC<AgreementCheckFieldProps> = ({
  policyContext,
  setChecked,
  checked
}) => {
  return (
    <div className='w-full flex flex-col space-y-2'>
      <div className='flex flex-row items-center w-full space-x-2'>
        <Checkbox checked={checked} onChange={(e) => setChecked()} className='w-5 h-5' />
        <b>
          {
            policyContext.required ? (
              <span className='text-red-500'>(필수)&nbsp;</span>
            ) : (
              <span className='text-blue-500'>(선택)&nbsp;</span>
            )
          }
          <span>{policyContext.name} 동의</span>
        </b>
      </div>
      <div className='h-[160px] overflow-y-scroll border border-gray-300 text-sm pb-8'>
        <ReactMarkdown rehypePlugins={[rehypeRaw]} children={policyContext.content} />
      </div>
    </div>
  );
}
