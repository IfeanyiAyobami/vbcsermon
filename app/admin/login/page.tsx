"use client";
import {useActionState} from "react";
import Image from "next/image";
import {signIn} from "@/app/admin/actions";

const initialState={error:undefined as string|undefined};

export default function LoginPage(){
  const [state,formAction,pending]=useActionState(signIn,initialState);

  return (
    <main className="grid min-h-screen place-items-center bg-[var(--vbc-black)] px-5">
      <form action={formAction} className="w-full max-w-sm rounded-3xl border border-white/10 bg-white/[.04] p-8">
        <div className="flex items-center gap-3">
          <Image src="/images/brand/vine-branch-tv-logo-cropped.png" alt="Vine Branch TV" width={747} height={576} className="h-8 w-auto"/>
          <span className="vbc-display text-2xl text-white">Admin</span>
        </div>
        <p className="mt-2 text-sm text-white/40">Sign in to manage sermons.</p>

        {state.error&&<p className="mt-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">{state.error}</p>}

        <div className="mt-6 flex flex-col gap-4">
          <div>
            <label className="text-xs font-semibold text-white/40">Email</label>
            <input name="email" type="email" required className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#ff0000]"/>
          </div>
          <div>
            <label className="text-xs font-semibold text-white/40">Password</label>
            <input name="password" type="password" required className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#ff0000]"/>
          </div>
        </div>

        <button type="submit" disabled={pending} className="mt-7 w-full rounded-xl bg-[#ff0000] py-3.5 text-sm font-bold text-white transition hover:bg-[#d90000] disabled:opacity-50">
          {pending?"Signing in...":"Sign in"}
        </button>
      </form>
    </main>
  );
}
