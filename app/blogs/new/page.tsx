"use client"

import { Updateblogs, type BlogActionState } from "@/app/actions/blogs";
import { useActionState } from "react"
import {useRouter} from "next/navigation"
import {useNotification} from "../../components/NotificationContext";
import { useEffect } from "react";

const CreateBlog = ()=>{

    const initialState: BlogActionState = { 
    errors: {}, 
    values: { title: "", author: "", url: "" } ,
    modal : { success: false , error : "" }
  }


  const {showNotification} = useNotification()
   const router = useRouter()

const [state, formAction] = useActionState(Updateblogs, initialState)  
useEffect(() => {
    if (state.modal.success) {
      showNotification("blog has been created successfully", "success")
      router.push("/blogs")
    }
  }, [state, showNotification, router])


return (
    <div>
        <form action={formAction}>
        <div>
            <label>
                <p>Title</p>
                <input type="text" name="title" 
                defaultValue={state.values?.title}></input>
            </label>
            {state.errors.title && <p style={{ color: "red" }}>{state.errors.title}</p>}
        </div>
        <div>
            <label>
                <p>Author</p>
                <input type="text" name="author" defaultValue={state.values?.author}></input>
            </label>
            {state.errors.author && <p style={{ color: "red" }}>{state.errors.author}</p>}
        </div>
        <div>
            <label>
                <p>Url</p>
                <input type="text" name="url" defaultValue={state.values?.url}></input>
            </label>
            {state.errors.url && <p style={{ color: "red" }}>{state.errors.url}</p>}
        </div>
        <button type="submit"> Create </button>

        </form>
    </div>
)
}

export default CreateBlog