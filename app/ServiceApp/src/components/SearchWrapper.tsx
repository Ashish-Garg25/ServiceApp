import React, {useEffect, useState} from 'react';
import Search from './Search';
import Dropdown from './Dropdown';
import useDebounce from '../helpers/hooks/useDebounce';
import {useGetCategoryByNameMutation} from '../redux/services';

const SearchWrapper = ({handleClick, name}: any) => {
  const [searchText, setSearchText] = useState(name ?? '');
  const [searchedCategories, setSearchedCategories] = useState([]);

  const [getCategoryByName] = useGetCategoryByNameMutation();

  useEffect(() => setSearchedCategories([]), []);

  useDebounce(
    async () => {
      const response = await getCategoryByName({name: searchText}).unwrap();
      console.log(response);
      setSearchedCategories(response);
    },
    [getCategoryByName, searchText],
    800,
  );

  return (
    <>
      <Search
        placeholder={"Search for 'AC Service'"}
        onChangeText={e => setSearchText(e)}
        label={''}
        value={searchText}
        icon={undefined}
      />

      {searchedCategories.length > 0 && (
        <Dropdown
          dropdownListContent={searchedCategories}
          handleDropdown={(value: string) => {
            setSearchedCategories([]);
            handleClick(value);
          }}
        />
      )}
    </>
  );
};

export default SearchWrapper;
