import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const DirectorySkeleton = () => {
  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <List>
        {
          [1, 2, 3, 4, 5, 6].map((v) => (
            <div key={v}>
              <ListItem sx={{ py: 1 }}>
                <Stack direction={'row'} spacing={2} sx={{ ml: 2 }} alignItems={'center'}>
                  <Skeleton variant="rectangular" sx={{
                    ml: 2
                  }} width={20} height={20} />
                  <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} width={200} />
                </Stack>
              </ListItem>
              <Divider />
            </div>
          ))
        }
      </List>
    </Box>
  )
}

export default DirectorySkeleton;
