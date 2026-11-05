export const instant = false
import { getBlogs } from "../services/blogs";
import {searchAction}from '../actions/blogs'

const blogsPage = async ({searchParams} : {searchParams : Promise<{title? : string}>})=>{

const {title} = await searchParams
const blogs = await getBlogs()

const showList = title === undefined ? blogs : blogs.filter((blog)=>blog.title.toLocaleLowerCase() === title.toLocaleLowerCase())


    return (
        <>
        <div className="max-w-2xl mx-auto p-6">
            <form className="mt-600  bg-red-100" action={searchAction}>
              <label>
                <input placeholder="Search by title" type="text" name='title'>
                </input>

                </label>
                
                <button type="submit">Search</button>
                </form>
            {showList.map((blog)=>(<ul key={blog.id}>
                <h1>{blog.title}</h1>
                <h3>{blog.author}</h3>
                <h3>{blog.url}</h3>
                <h3>{blog.likes}</h3>

            </ul>))}
            </div>
         

        </>
      )
     
     
     
    
   
}

export default blogsPage