"use server"

import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"
import { db } from "../../db"
import { users } from "../../db/schema"
import {eq} from "drizzle-orm"

export interface RegisterState {
  errors : {
    username?: string,
    password?: string
    confirmpassword? : string

  };
  values : {
    password : string,
    username : string
    name : string
    confirmpassword : string
  }
}

export const registerUser = async (prevState :  RegisterState ,formData: FormData): Promise<RegisterState>=>{


  const username = (formData.get("username") as string)?.trim()
  const name = (formData.get("name") as string)?.trim()
  const password = formData.get("password") as string
  const confirmpassword = (formData.get("confirmpassword") as string)?.trim()

  //create a clean errors object to store any validation errors
  const currentErrors: RegisterState["errors"] = {}
    
  if(!username || username.length < 4){
     currentErrors.username = "username must have at least 4 characters"
}

 const userName =  await db.query.users.findFirst({where : eq(users.username , username)})
   if(userName){
    currentErrors.username = "username has aready been taken"
   }








    if(!password || password.length < 4){
     currentErrors.password = "password must have at least 4 characters"  
    }  

    if(!confirmpassword || confirmpassword !== password){
     currentErrors.confirmpassword = "make sure the password matches"  
    }  


  if (Object.keys(currentErrors).length > 0) {
    return {
      errors: currentErrors,
      values: {username , password , name , confirmpassword}
    }
  }
      

  const passwordHash = await bcrypt.hash(confirmpassword , 10)
  await db.insert(users).values({ username, name, passwordHash })

  redirect("/login")
}