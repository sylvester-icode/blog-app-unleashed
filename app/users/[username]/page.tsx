export const instant = false
import { getUserWithBlogs } from "../../services/users";

const User = async ({params} : {params : Promise<{username : string}>})=>{

const {username} = await params


const user = await getUserWithBlogs(username)
console.log(user)


return(
 <div>
      <h2>{user?.name}</h2>
      <p>Username: {user?.username}</p>
      <h3>Notes</h3>
      <ul>
        {user?.blogs.map((blog) => (
          <li key={blog.id}>
            <h4>{blog.title}</h4>
            <p>{blog.author}</p>
            <p>{blog.url}</p>
          </li>
        ))}
      </ul>
    </div>
)
}

export default User