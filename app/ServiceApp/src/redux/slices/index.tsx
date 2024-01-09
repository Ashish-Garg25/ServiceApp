import category from './category';
import common from './common';
import user from './user';

export const reducers = {
  common: common.reducer,
  user: user.reducer,
  category: category.reducer,
};
