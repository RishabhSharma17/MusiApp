"use client"

import { signIn, signOut, useSession } from "next-auth/react";

export function Appbar(){
    const session = useSession(); 

    return <div className="flex justify-between">
        <div className="text-4xl p-2 font-bold ml-8">
            M U Z I
        </div>
        {!session.data?.user ? <button className="m-2 mr-12 text-lg p-1 rounded-xl text-white bg-black" onClick={()=>signIn()}>
            SignIn
        </button> : <button className="m-2 mr-12 text-lg p-1 rounded-xl text-white bg-black" onClick={()=>signOut()}>
            Logout
        </button>}
    </div>
}