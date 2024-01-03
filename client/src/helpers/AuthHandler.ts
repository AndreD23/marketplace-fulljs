import Cookies from "js-cookie";

/**
 * Checks if the user is logged in by retrieving the token from cookies.
 *
 * @returns {boolean} Returns true if the user is logged in, false otherwise.
 */
export const isLogged = (): boolean => {
  let token = Cookies.get("token");
  return !!token;
};

/**
 * Function to perform login action
 *
 * @param {string} token - The login token string
 * @param {boolean} rememberPassword - Flag to determine if password should be remembered or not (default: false)
 * @returns {void}
 */
export const doLogin = (
  token: string,
  rememberPassword: boolean = false,
): void => {
  if (rememberPassword) {
    Cookies.set("token", token, { expires: 365 });
  } else {
    Cookies.set("token", token);
  }
};

/**
 * Logs the user out by removing the token cookie and redirecting to the home page.
 * @function
 * @returns {void}
 */
export const doLogout = (): void => {
  Cookies.remove("token");
  window.location.href = "/";
};
