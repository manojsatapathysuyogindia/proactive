let _navigate: ((path: string) => void) | null = null;

export const setNavigator = (navFn: (path: string) => void) => {
  _navigate = navFn;
};

export const navigateTo = (path: string) => {
  if (_navigate) _navigate(path);
};