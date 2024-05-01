import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/config/firebase";

const ProfilePage = () => {
    const [user, loading] = useAuthState(auth);

  return (
    <>
    {user? 
 (   <div className="flex flex-col items-center min-h-screen ">
  <div className="flex-col flex ">
    
    <img src={user.photoURL} referrerPolicy='no-referrer'  className="rounded-full shadow-2xl" />
    <div className="">
      <h1 className="text-2xl font-bold">{user?.email}</h1>
      <p>First Name:</p>
      <p>Last Name: </p>
      <p>Email: {user.email}</p>
      <p>Password: </p>

  
    </div>
  </div>
</div>): ''
}
    </>
  )
}

export default ProfilePage