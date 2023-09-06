import { atom, useRecoilState } from "recoil";

const searchFilterModalState = atom({
  key: "modal/searchFilter",
  default: false
});

export const useSearchFilterModal = () => {
  const [searchFilterModal, setSearchFilterModal] = useRecoilState(searchFilterModalState);
  return {
    searchFilterModal,
    setSearchFilterModal
  }
}
