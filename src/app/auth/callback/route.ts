import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host'); // original origin before reverse proxy
      const isLocalEnv = process.env.NODE_ENV === 'development';

      if (isLocalEnv) {
        // we can be sure that there is a Host header here when not using a reverse proxy
        return NextResponse.redirect(new URL('/area-riservata', request.url));
      } else if (forwardedHost) {
        return NextResponse.redirect(
          new URL('/area-riservata', `https://${forwardedHost}`)
        );
      } else {
        return NextResponse.redirect(new URL('/area-riservata', request.url));
      }
    }
  }

  // return the user to an error page with some instructions
  return NextResponse.redirect(new URL('/login?error=auth_error', request.url));
}
