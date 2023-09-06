import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';

interface SearchBarUx {
  clickFilter: () => void;
  writeDown: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarUx> = (ux) => {
  return (
    <div>
      <SearchIcon className='left-4' />
      <input onChange={(e) => {
        const value = e.target.value;
        ux.writeDown(value);
      }}
      />
      <button className='relative right-4'
        onClick={ux.clickFilter}
      >
        <TuneIcon />
      </button>
    </div>
  )
}
