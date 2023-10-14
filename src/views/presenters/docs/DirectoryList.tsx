import { useContext } from "react";

import type {
  DocFolderId,
  DocFileId
} from "../../../domain/doc-management/docs.interface";
import { DocsContext } from "../../../context/docs.context";

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

interface DirectoryListUx {
  clickFolder: (folderId: DocFolderId) => void;
  clickFile: (fileId: DocFileId) => void;
}

const DirectoryList: React.FC<DirectoryListUx> = (ux) => {
  const { docNode } = useContext(DocsContext)!;

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <List>
        {
          docNode?.folders.map((folder, index) => (
            <div key={index}>
              <ListItem disablePadding>
                <ListItemButton sx={{
                  cursor: "default"
                }} onClick={(e) => {
                  if (e.detail === 2) {
                    ux.clickFolder(folder.id!);
                  }
                }}>
                  <ListItemIcon sx={{
                    ml: 2
                  }}>
                    <FolderOpenOutlinedIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primaryTypographyProps={{
                    variant: "body2"
                  }} primary={folder.name} />
                </ListItemButton>
              </ListItem>
              <Divider />
            </div>
          ))
        }
        {
          docNode?.files.map((file, index) => (
            <div key={index}>
              <ListItem disablePadding>
                <ListItemButton sx={{
                  cursor: "default"
                }} onClick={(e) => {
                  if (e.detail === 2) {
                    console.log('event start');
                  }
                }}>
                  <ListItemIcon sx={{
                    ml: 2
                  }}>
                    <DescriptionOutlinedIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primaryTypographyProps={{
                    variant: "body2"
                  }} primary={file.name} />
                </ListItemButton>
              </ListItem>
              <Divider />
            </div>
          ))
        }
      </List>
    </Box>
  );
}

export default DirectoryList;

export const DirectoryListSkeleton = () => {
  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <List>
        {
          [1,2,3,4,5,6].map((v) => (
            <div key={v}>
              <ListItem sx={{py: 1}}>
                <Stack direction={'row'} spacing={2} sx={{ml: 2}} alignItems={'center'}>
                  <Skeleton variant="rectangular" sx={{
                    ml: 2
                  }} width={20} height={20}/>
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
