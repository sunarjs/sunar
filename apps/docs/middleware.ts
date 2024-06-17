import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
	const url = request.nextUrl.clone();

	const isProduction = process.env.NODE_ENV === 'production';
	const requestedHost = request.headers.get('X-Forwarded-Host');

	if (isProduction && requestedHost && !requestedHost.match(/sunar.js.org/)) {
		const host = 'sunar.js.org';

		const requestedPort = request.headers.get('X-Forwarded-Port');
		const requestedProto = request.headers.get('X-Forwarded-Proto');

		url.host = host;
		url.protocol = requestedProto || url.protocol;
		url.port = requestedPort || url.port;

		return NextResponse.redirect(url);
	}

	return NextResponse.next();
}

export const config = {
	matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
