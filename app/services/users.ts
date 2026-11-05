import { eq } from "drizzle-orm"
import { db } from "../../db"
import { users , blogs } from "../../db/schema"


export const getUsers = async () => {
    return db.query.users.findMany()
}

export const getUserById = async (id : number)=>{

    return db.query.users.findFirst({where : eq(users.id , id)})
}

export const getblogsByUserId = async(id: number)=>{
   return db.query.blogs.findMany({where : eq(blogs.userId , id)})
}

export const getUserWithBlogs = async (username : string) => {
    console.log(username)
    const user = await  db.query.users.findFirst({
    where: eq(users.username, username),
    with: { blogs : true },
  })

  if (user) {
    return user
  }
}