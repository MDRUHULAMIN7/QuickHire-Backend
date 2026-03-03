import config from '../config/index.js';
import { USER_ROLE } from '../modules/user/user.constant.js';
import { User } from '../modules/user/user.model.js';

const superUser = {
  id: '0001',
  email: 'ruhulofficial777@gmail.com',
  name: 'Admin',
  password: config.admin_password,
  needsPasswordChange: false,
  role: USER_ROLE.Admin,
  status: 'active',
  isDeleted: false,
};

const seedAdmin = async () => {
  //when database is connected, we will check is there any user who is super admin
  const isAdminExists = await User.findOne({ role: USER_ROLE.Admin });

  if (!isAdminExists) {
    await User.create(superUser);
  }
};

export default seedAdmin;
