import styled from 'styled-components';

import CircularProgress from '@mui/material/CircularProgress';
import { deepGray } from '../styles/constant';

const Box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-items: center;
`;

const Loading = (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  return (
    <Box {...props}>
      <CircularProgress sx={{
        color: deepGray
      }}/>
    </Box>
  );
}

export default Loading;
