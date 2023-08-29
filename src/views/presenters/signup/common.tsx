import { useMemo } from "react";
import { styled } from "styled-components";

import { deepGray } from "../../../styles/constant";

export const StyledInput = styled.input`
  border-width: 1px;
  border-color: rgb(107 114 128);
  border-radius: 2px;
  padding-left: 0.5rem; /* 8px */
  padding-right: 0.5rem; /* 8px */
  width: 276px;
`;

export const Frame = styled.div`
  width: 676px;
`;

export const InputBlock = styled(Frame)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const RequireSymbol = () => {
  return (
    <span className="text-red-500">{"*"}</span>
  );
}

export const Label = ({label}: {label: React.ReactNode}) => {
  return (
    <div className="w-32 ml-2 mr-8" style={{color: deepGray}}>
      {label}
    </div>
  )
}

export const Description = ({main, fail}: {main: string | null; fail: string | null}) => {
  const message = useMemo(() => {
    if (fail) {
      return <span className="text-red-500">{fail}</span>;
    }
    else if (main) {
      return <>{"※ " + main}</>
    }
    return <></>;
  }, [main, fail]);

  return (
    <div className="absolute top-[28px] h-4 text-xs text-deepGray w-[400px]">
      {message}
    </div>
  )
}
