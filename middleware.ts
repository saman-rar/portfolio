import { auth } from '@/lib/auth';

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname.startsWith('/admin/dashboard')) {
    const newUrl = new URL('/admin', req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
  if (req.auth && req.nextUrl.pathname === '/admin') {
    const newUrl = new URL('/admin/dashboard', req.nextUrl.origin);
    return Response.redirect(newUrl);
  }

  if (!req.auth && req.method !== 'GET') {
    return Response.json({ message: 'Forbidden!', code: 403 });
  }
});
