import { useContext, useEffect, useState } from "react";

import type {
  DocFolderId,
  DocFileId,
  DocFolder,
  DocFile
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
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

interface DirectoryListUx {
  clickFolder: (folderId: DocFolderId) => void;
  clickFile: (fileId: DocFileId) => void;
  deleteFolder: (folderId: DocFolderId) => void;
  deleteFile: (fileId: DocFileId) => void;
}

const DirectoryList: React.FC<DirectoryListUx> = (ux) => {
  const { docNode } = useContext(DocsContext)!;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [optionChoice, setOptionChoice] = useState<{
    type: "file" | "folder";
    value: string;
    item: DocFolder | DocFile;
    isClicked: boolean;
  }>();

  const open = Boolean(anchorEl);
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (!optionChoice?.isClicked) return;

    if (optionChoice?.value === "삭제") {
      if (optionChoice.type === "file") {
        const fileId = (optionChoice.item as DocFile).id
        ux.deleteFile(fileId);
      }
      else if (optionChoice.type === "folder") {
        const folderId = (optionChoice.item as DocFolder).id!
        ux.deleteFolder(folderId);
      }
      setOptionChoice(undefined); return; // optionChoice를 초기화 해주어야 합니다.
    }
  }, [optionChoice]);

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <List>
        {
          docNode?.folders.map((folder, index) => (
            <div key={index}>
              <ListItem disablePadding
                secondaryAction={
                  <div>
                    <IconButton
                      aria-controls={open ? "long-menu" : undefined}
                      aria-expanded={open ? "true" : undefined}
                      aria-haspopup="true"
                      onClick={(e) => {
                        setOptionChoice({
                          type: 'folder',
                          value: '삭제',
                          item: folder,
                          isClicked: false
                        });
                        handleClick(e);
                      }}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      elevation={1}
                    >
                      <MenuItem
                        onClick={() => {
                          setOptionChoice({
                            ...optionChoice!,
                            isClicked: true
                          });
                          handleClose();
                        }}
                        sx={{py: 0}}
                      >
                        <ListItemText
                          primaryTypographyProps={{
                            variant: "body2"
                          }}
                          primary={"삭제"}
                        />
                      </MenuItem>
                    </Menu>
                  </div>
                }
              >
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
              <ListItem disablePadding
                secondaryAction={
                  <div>
                    <IconButton
                      aria-controls={open ? "long-menu" : undefined}
                      aria-expanded={open ? "true" : undefined}
                      aria-haspopup="true"
                      onClick={(e) => {
                        setOptionChoice({
                          type: 'file',
                          value: '삭제',
                          item: file,
                          isClicked: false
                        });
                        handleClick(e);
                      }}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      elevation={1}
                    >
                      <MenuItem
                        onClick={() => {
                          setOptionChoice({
                            ...optionChoice!,
                            isClicked: true
                          });
                          handleClose();
                        }}
                        sx={{py: 0}}
                      >
                        <ListItemText
                          primaryTypographyProps={{
                            variant: "body2"
                          }}
                          primary={"삭제"}
                        />
                      </MenuItem>
                    </Menu>
                  </div>
                }
              >
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
