export interface RouteExp {
  path: string;
  re: RegExp;
  detail?: (id: string) => string;
}

interface PublicRoutesType {
  home: RouteExp;
  login: RouteExp;
  signup: RouteExp;
  findCredentialId: RouteExp;
  findCredentialPw: RouteExp;
}

export const publicRoutes: PublicRoutesType = {
  home: {
    path: '/',
    re: new RegExp('^/$')
  },
  login: {
    path: '/login',
    re: new RegExp('^/login')
  },
  signup: {
    path: '/signup',
    re: new RegExp('^/signup')
  },
  findCredentialId: {
    path: '/login?find=id',
    re: new RegExp('^/login?find=id')
  },
  findCredentialPw: {
    path: '/login?find=pw',
    re: new RegExp('^/login?find=pw')
  }
}

interface AuthPermissionRoutesType {
  search: RouteExp;
  bookmark: RouteExp;
  docs: RouteExp;
  my: RouteExp;
}

export const authPermissionRoutes: AuthPermissionRoutesType = {
  search: {
    path: '/search',
    re: new RegExp('^/search'),
  },
  bookmark: {
    path: '/bookmark',
    re: new RegExp('^/bookmark')
  },
  docs: {
    path: '/docs',
    re: new RegExp('^/docs')
  },
  my: {
    path: '/my',
    re: new RegExp('^/my')
  }
}

interface RoutesType extends PublicRoutesType, AuthPermissionRoutesType {};

export const routes: RoutesType = {
  ...publicRoutes,
  ...authPermissionRoutes
}
