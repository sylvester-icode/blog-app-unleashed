"use server"

import { revalidatePath } from "next/cache"
import { createBlog, increaMent} from "../services/blogs"
import {redirect} from "next/navigation"
import { getBlogs } from "../services/blogs"
import { auth } from "@/auth"

export interface BlogActionState {
   errors: {
    title?: string;
    author?: string;
    url?: string;
  };
  values: {
    title: string;
    author: string;
    url: string;
  } 

modal :{ 
  success?: boolean
  error?: string }

}

export const Updateblogs = async ( prevState: BlogActionState, blog : FormData) : Promise<BlogActionState>=>{
//checking for authentication
const session = await auth()
  if (!session) {
    redirect("/login")
  }


      const title = blog.get("title") as string
      const author = blog.get("author") as string
      const url = blog.get("url") as string

       //create a clean errors object to store any validation errors
       const currentErrors: BlogActionState["errors"] = {}
       const currentModal : BlogActionState["modal"] = {}

      if (!title || title.length < 5) {   
    currentErrors.title = "Blog title must be at least 5 characters long."
    currentModal.error = "Please correct the errors below."
    currentModal.success = false
  }  

     if (!author || author.length < 5) {
    currentErrors.author = "Author name must be at least 5 characters long."
    
  }
  

 
   if (!url || url.length < 5) {
    currentErrors.url = "The blog URL must be at least 5 characters long."
  }

    // 4. If any field failed validation, return the targeted error map
  if (Object.keys(currentErrors).length > 0) {
    return {
      errors: currentErrors,
      values: { title, author, url },
      modal : currentModal
    }
  }
      
  
  
     await createBlog( title , author , url  )
      revalidatePath('/blogs')
      return { modal : {success : true , error : ""} , errors : {} , values : { title : "" , author : "" , url : ""} }
}

export const addLikes = async (formData : FormData)=>{
    const like = Number(formData.get("id"))
    increaMent(like)
    revalidatePath(`/blogs/${like}`)
    revalidatePath('/blogs')
}


export const searchAction = async (formData : FormData)=>{
    const title = formData.get("title") as string
    if(!title){
     getBlogs()
     redirect(`/blogs`)
    }
    redirect(`/blogs?title=${title}`)
   

}
