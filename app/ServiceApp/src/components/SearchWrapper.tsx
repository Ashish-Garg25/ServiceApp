import React, {useEffect, useState} from 'react';
import Search from './Search';
import Dropdown from './Dropdown';
import useDebounce from '../helpers/hooks/useDebounce';
import {useGetCategoryByNameMutation} from '../redux/services';
import {useDispatch, useSelector} from 'react-redux';
import category from '../redux/slices/category';
import {View} from 'react-native';

const SearchWrapper = ({noClick = false}: any) => {
  const dispatch = useDispatch();
  const {singleCategory} = useSelector((state: any) => state.category);

  const [searchText, setSearchText] = useState('');
  const [searchedCategories, setSearchedCategories] = useState([]);

  const [getCategoryByName] = useGetCategoryByNameMutation();

  useEffect(() => {
    if (singleCategory?.name) {
      setSearchText(singleCategory?.name);
    }
    setSearchedCategories([]);
  }, [singleCategory]);

  useDebounce(
    async () => {
      const response = await getCategoryByName({name: searchText}).unwrap();
      console.log(response);
      setSearchedCategories(response);
    },
    [searchText],
    800,
  );

  return (
    <View pointerEvents={noClick ? 'none' : 'box-none'}>
      <Search
        placeholder={"Search for 'AC Service'"}
        onChangeText={e => setSearchText(e)}
        label={''}
        value={searchText}
        icon={undefined}
      />

      {searchText !== '' && searchedCategories.length > 0 && (
        <Dropdown
          dropdownListContent={searchedCategories}
          handleDropdown={(value: string) => {
            setSearchedCategories([]);
            dispatch(category.actions.setSingleCategory(value));
          }}
        />
      )}
    </View>
  );
};

export default SearchWrapper;
