import category from './category';
import common from './common';
import service from './service';
import user from './user';

export const reducers = {
  common: common.reducer,
  user: user.reducer,
  category: category.reducer,
  service: service.reducer,
};
