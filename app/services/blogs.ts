import { eq } from "drizzle-orm"
import { db } from "../../db"
import { blogs } from "../../db/schema"
import { getCurrentUser } from "./session"


export const getBlogs = async ()=>{
    //return blogs.sort((a , b)=>b.likes - a.likes)
    return db.query.blogs.findMany()
}

export const createBlog = async (title: string, author : string, url : string )=>{
   const user = await getCurrentUser()
  if (!user) {
    throw new Error("Not logged in")
  }
      await db.insert(blogs).values({title , author , url , userId : user.id})
}


export const getBlogById = async (id : number)=>{
    return db.query.blogs.findFirst({where : eq(blogs.id , id),})
    //return blogs.find((blog)=>blog.id === id)
}

export const increaMent = async (id : number)=>{

//const blog = blogs.find((blog)=>blog.id === id)

const blog = await db.query.blogs.findFirst({where: eq(blogs.id , id),})

 if(blog){
   return blog.likes++
 }

}

export const searchTitle = async (title : string )=>{
      
  return  await db.query.blogs.findFirst({where : eq(blogs.title , title),})
      ///return blogs.find((blog)=>blog.title.toLocaleLowerCase() === title.toLocaleLowerCase())
           
}
