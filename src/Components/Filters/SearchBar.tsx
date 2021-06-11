// React Imports
import React, { FC, useState } from "react";
import debounce from "lodash.debounce";
import { Filter } from "./index";

// Material UI Imports
import { Input, makeStyles, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    height: theme.spacing(5),
  },
  container: {
    margin: theme.spacing("auto", 1),
    width: "100%",
  },
  input: {
    width: "100%",
  },
}));

export interface SearchBarProps {
  defaultSearch: string;
  onSearchChange: (value: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ defaultSearch, onSearchChange }) => {
  const classes = useStyles();
  const [localSearch, setLocalSearch] = useState(defaultSearch);

  const handleChange = debounce((value: string) => {
    onSearchChange(value);
  }, 500);

  return (
    <Filter label="Search">
      <Paper className={classes.root} elevation={4}>
        <div className={classes.container}>
          <Input
            value={localSearch}
            onChange={(e) => {
              const val = e.target.value;

              setLocalSearch(val);
              handleChange(val);
            }}
            fullWidth
            className={classes.input}
            disableUnderline
          />
        </div>
      </Paper>
    </Filter>
  );
};

export default SearchBar;
