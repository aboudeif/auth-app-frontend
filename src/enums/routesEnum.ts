export enum RoutesEnum {
  LOGIN,
  SIGNUP,
  APPLICATION,
  LOGOUT,
}

export const routeLinks = {
  [RoutesEnum.LOGIN]: "/login",
  [RoutesEnum.SIGNUP]: "/signup",
  [RoutesEnum.APPLICATION]: "/application",
  [RoutesEnum.LOGOUT]: "/logout",
}

export const routeTitles = {
  [RoutesEnum.LOGIN]: "Login",
  [RoutesEnum.SIGNUP]: "Signup",
  [RoutesEnum.APPLICATION]: "Application",
  [RoutesEnum.LOGOUT]: "Logout",
}