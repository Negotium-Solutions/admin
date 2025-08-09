export interface User {
  [prop: string]: any;

  id?: number | string | null;
  first_name?: string;
  last_name?: string;
  email?: string;
  avatar?: string;
  roles?: any[];
  permissions?: any[];
}

export interface Token {
  [prop: string]: any;

  access_token: string;
  token_type?: string;
  expires_in?: number;
  exp?: number;
}
