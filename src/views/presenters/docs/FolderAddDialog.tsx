import { useState } from "react";

import { useFolderAddModal } from "../../../recoil/modalState";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

interface FolderAddDialogUx {
  clickCancelButton: () => void;
  clickWrapper: () => void;
  clickAddButton: (form: {
    name: string;
  }) => void;
}

const FolderAddDialog: React.FC<FolderAddDialogUx> = (ux) => {
  const { folderAddModal } = useFolderAddModal();
  const [folderName, setFolderName] = useState<string>("");

  return (
    <Dialog open={folderAddModal} onClose={ux.clickWrapper}>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="폴더명"
          type="text"
          fullWidth
          variant="standard"
          onChange={(e) => setFolderName(e.target.value)}
          value={folderName}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={ux.clickCancelButton}>취소</Button>
        <Button onClick={() => ux.clickAddButton({name: folderName})}>추가</Button>
      </DialogActions>
    </Dialog>
  );
}

export default FolderAddDialog;
