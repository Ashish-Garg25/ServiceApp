import category from './category';
import common from './common';
import notification from './notification';
import service from './service';
import user from './user';

export const reducers = {
  common: common.reducer,
  user: user.reducer,
  category: category.reducer,
  service: service.reducer,
  notification: notification.reducer,
};
