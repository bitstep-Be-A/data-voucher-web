import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { deepGray } from '../styles/constant';

const Loading = () => {
  return (
    <Box sx={{
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyItems: "center"
    }}>
      <CircularProgress sx={{
        color: deepGray
      }}/>
    </Box>
  );
}

export default Loading;
