import { atom, useRecoilState } from "recoil";

const searchFilterModalState = atom({
  key: "modalState/searchFilter",
  default: false
});

export const useSearchFilterModal = () => {
  const [searchFilterModal, setSearchFilterModal] = useRecoilState(searchFilterModalState);
  return {
    searchFilterModal,
    setSearchFilterModal
  }
}

const folderAddModalState = atom({
  key: "modalState/folderAdd",
  default: false
});

export const useFolderAddModal = () => {
  const [folderAddModal, setFolderAddModal] = useRecoilState(folderAddModalState);
  return {
    folderAddModal,
    setFolderAddModal
  }
}
