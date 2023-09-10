import CircularProgress from '@mui/material/CircularProgress';
import { deepGray } from '../styles/constant';

const Loading = (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  return (
    <div {...props}>
      <CircularProgress sx={{
        color: deepGray
      }}/>
    </div>
  );
}

export default Loading;
