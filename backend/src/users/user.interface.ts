export interface User {
  id?: number;
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  role?: UserRole;
  profileImage?: string;
}

export enum UserRole {
  USER = 'user',
  USER_SALES = 'user_sales',
  ADMIN = 'admin',
  SUPERADMIN = 'superadmin',
}
