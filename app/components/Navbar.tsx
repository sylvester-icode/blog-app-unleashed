"use client"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"

const NavigationBar = ()=>{
 const { data: session } = useSession()

 
    return(
        <div className="bg-slate-600 text-white p-4 flex justify-between items-center">
           <a href="/" className="bg-slate-600 no-underline bg-black text-cyan-400 w-sm h-23">Home</a>{ " | "}
             
            <Link href={"/blogs"} className="bg-slate-600">Blogs</Link>{ " | "}
            <Link href={"/users"} className="bg-slate-600">Users</Link>{ " | "}
             { " | "}
            
                {session ? (
        <>
          <Link href={"/blogs/new"}>Add Blog</Link>
          {" | "}
          <em>{session.user?.name} logged in</em>{" "}
          <button  onClick={() => signOut()}>logout</button>
        </>
      ) : (<>
         <Link href="/login" className="bg-slate-600">login</Link>
         {" | "}
          <Link href="/register" className="bg-slate-600">register</Link>
        </>
       
      )}
       </div>

    )
}

export default NavigationBar