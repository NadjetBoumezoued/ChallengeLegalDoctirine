import React from 'react';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ onSearch }) => {
  const handleSearch = (event) => {
    const query = event.target.value;
    onSearch(query);
  };

  return (
    <div>
      <TextField
        type="text"
        placeholder="Search..."
        onChange={handleSearch}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        style={{ width: '100%' }}
       
      />
    </div>
  );
};

export default SearchBar;
