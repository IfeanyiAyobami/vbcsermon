import {createServerClient} from "@supabase/ssr";
import {cookies} from "next/headers";

// Cookie-aware server client — used in Server Actions and the admin dashboard's
// Server Components, where we need to know WHO is logged in (so RLS policies
// that check auth.role() = 'authenticated' work correctly for writes).
export async function createAdminClient(){
  const cookieStore=await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies:{
        getAll(){return cookieStore.getAll();},
        setAll(cookiesToSet){
          try{
            cookiesToSet.forEach(({name,value,options})=>cookieStore.set(name,value,options));
          }catch{
            // Called from a Server Component render — safe to ignore since
            // middleware handles refreshing the session on every request.
          }
        }
      }
    }
  );
}
