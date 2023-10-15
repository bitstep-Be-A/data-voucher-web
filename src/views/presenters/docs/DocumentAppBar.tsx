import { useContext, useRef } from "react";

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
  uploadFile: (file: File) => void;
}

const DocumentAppBar: React.FC<DocumentAppBarUx> = (ux) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { docNode } = useContext(DocsContext)!;
  const {
    folderName,
    parentFolderId,
    rootFolderName
  } = docNode!;

  const handleSelectFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      ux.uploadFile(file);
    }
  };

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
          <input
            type="file"
            ref={fileInputRef}
            accept=".pdf, .doc, .docx, .txt, .hwp, .pptx, .ppt, .xlsx, .csv"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          {
            folderName !== rootFolderName && (
              <IconButton onClick={handleSelectFile}>
                <NoteAddOutlinedIcon />
              </IconButton>
            )
          }
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default DocumentAppBar;
