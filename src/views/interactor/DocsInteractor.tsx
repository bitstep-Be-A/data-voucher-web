import { useContext } from "react";
import {
  useSetRecoilState
} from "recoil";

import { useFolderAddModal } from "../../recoil/modalState";
import { useDocNodeQuery } from "../../recoil/app/DocNodeQuery";
import DirectoryList from "../presenters/docs/DirectoryList";
import DocumentAppBar from "../presenters/docs/DocumentAppBar";
import FolderAddDialog from "../presenters/docs/FolderAddDialog";
import { docFolderKeyState, docFolderRequestState } from "../../recoil/app/DocFolderMutation";
import DirectorySkeleton from "../presenters/docs/DirectorySkeleton";
import { DocsContext } from "../../context/docs.context";
import { docFileKeyState, docFileRequestState } from "../../recoil/app/DocFileMutation";

const DocsInteractor = () => {
  const {
    isLoading,
    docNode
  } = useContext(DocsContext)!;

  const { setFolderAddModal } = useFolderAddModal();

  const { query } = useDocNodeQuery();

  const setDocFolderRequest = useSetRecoilState(docFolderRequestState);
  const setDocFileRequest = useSetRecoilState(docFileRequestState);
  const setDocFolderKey = useSetRecoilState(docFolderKeyState);
  const setDocFileKey = useSetRecoilState(docFileKeyState);

  return (
    <div className="w-full h-full bg-white">
      <div className="flex flex-col space-y-2">
        {
          isLoading ? <DirectorySkeleton /> : (
            <>
            <DocumentAppBar
              goHome={() => {
                query(null);
              }}
              goBack={() => {
                query(docNode?.parentFolderId!);
              }}
              clickFolder={() => { setFolderAddModal(true) }}
              uploadFile={(file) => {
                setDocFileRequest({
                  folderId: docNode?.folderId!,
                  file
                });
              }}
            />
            <DirectoryList
              clickFile={(fileId) => { }}
              clickFolder={(folderId) => {
                query(folderId);
              }}
              deleteFile={(fileId) => {
                setDocFileKey(fileId);
              }}
              deleteFolder={(folderId) => {
                setDocFolderKey(folderId);
              }}
            />
            </>
          )
        }
      </div>
      <FolderAddDialog
        clickAddButton={(form) => {
          setDocFolderRequest({
            name: form.name,
            parent: docNode?.folderId!
          });
        }}
        clickCancelButton={() => { setFolderAddModal(false) }}
        clickWrapper={() => { setFolderAddModal(false) }}
      />
    </div>
  );
}

export default DocsInteractor;
