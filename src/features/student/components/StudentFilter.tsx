import { Box, FormControl, Grid, InputLabel, OutlinedInput } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { City, ListParams } from 'models';
import { ChangeEvent } from 'react';

export interface StudentFilterProps {
  filter: ListParams;
  cityList: City[];
  onChange?: (newFilter: ListParams) => void;
  onSearchChange?: (newFilter: ListParams) => void;
}

export function StudentFilter({ filter, onSearchChange }: StudentFilterProps) {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!onSearchChange) return;
    const newFilter = {
      ...filter,
      name_like: e.target.value,
    };
    onSearchChange(newFilter);
  };
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel htmlFor="searchByName">Search by name</InputLabel>
            <OutlinedInput
              label="Search by name"
              id="searchByName"
              endAdornment={<Search />}
              defaultValue={filter.name_like}
              onChange={handleSearchChange}
              labelWidth={60}
            />
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}
