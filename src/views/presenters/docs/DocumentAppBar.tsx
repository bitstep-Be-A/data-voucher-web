import { useContext } from "react";

import { DocsContext } from "../../../context/docs.context";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import CreateNewFolderOutlinedIcon from "@mui/icons-material/CreateNewFolderOutlined";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Tooltip from '@mui/material/Tooltip';
import HomeIcon from '@mui/icons-material/Home';

interface DocumentAppBarUx {
  goHome: () => void;
  goBack: () => void;
  clickFolder: () => void;
  clickFile: () => void;
}

const DocumentAppBar: React.FC<DocumentAppBarUx> = (ux) => {
  const { docNode } = useContext(DocsContext)!;
  const {
    rootFolderName,
    folderName,
    parentFolderId,
  } = docNode!;

  return (
    <AppBar position="static" color="inherit" elevation={1}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <Breadcrumbs aria-label="breadcrumb">
          <IconButton onClick={ux.goHome}>
            <HomeIcon fontSize="small" />
          </IconButton>
          {
            parentFolderId && (
              <Tooltip title="뒤로가기">
                <IconButton onClick={ux.goBack}>
                  <MoreHorizIcon />
                </IconButton>
              </Tooltip>
            )
          }
          <Typography color="text.primary">{folderName}</Typography>
        </Breadcrumbs>
        <Stack direction="row">
          <IconButton onClick={ux.clickFolder}>
            <CreateNewFolderOutlinedIcon />
          </IconButton>
          <IconButton>
            <NoteAddOutlinedIcon />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default DocumentAppBar;
