import { NextRequest, NextResponse } from 'next/server'
import { serialize } from 'cookie'

export function middleware(request: NextRequest) {
  const cookies = parseCookies(request.headers.get('Cookie'));
  // トークンが存在しない場合、/signin 以外のページへのアクセスは /signin にリダイレクト
  console.log(hasToken(cookies))
  if (!hasToken(cookies) && !request.nextUrl.pathname.startsWith('/signin')) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  // トークンが存在し、/signin にアクセスしようとしている場合、/menus にリダイレクト
  if (hasToken(cookies) && request.nextUrl.pathname.startsWith('/signin')) {
    return NextResponse.redirect(new URL('/menus', request.url));
  }

  // 上記の条件に該当しない場合、リクエストをそのまま進める
  return NextResponse.next();
}

function parseCookies(cookies: string| null = '') {
    if (cookies === null) {
      return {};
    } else {
      return Object.fromEntries(
        cookies.split(';').map(c => c.trim().split('=').map(decodeURIComponent))
      );
    }
}
  
function hasToken(cookies: any) {
    return cookies.token !== undefined && cookies.token !== null;
}
