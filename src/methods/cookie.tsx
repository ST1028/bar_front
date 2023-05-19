export function parseCookies(cookies: string| null = '') {
    if (cookies === null) {
      return {};
    } else {
      return Object.fromEntries(
        cookies.split(';').map(c => c.trim().split('=').map(decodeURIComponent))
      );
    }
}
  
export function hasToken(cookies: any) {
    return cookies.token !== undefined && cookies.token !== null;
}
