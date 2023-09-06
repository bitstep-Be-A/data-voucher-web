interface FilterPopupUx {
  selectLocation: (name: string) => void;
  selectEnterprise: (name: string) => void;
  writeHRSize: (value: number) => void;
  selectHRType: (name: string) => void;
  selectPart: (name: string) => void;
  clickCalendar: (index: number) => void;
  inputProjectAmount: (index: number, value: string) => void;
  clickSearchButton: () => void;
  closePopup: () => void;
}

export const FilterPopup: React.FC<FilterPopupUx> = (ux) => {
  return (
    <></>
  );
}
