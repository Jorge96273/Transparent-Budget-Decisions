import LogoutButton from "./LogoutButton";
import { useState, useEffect } from "react";
import { auth } from "@/config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { onAuthStateChanged } from "firebase/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import userPhoto from "../images/userPhoto.svg";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

const NavBar = () => {
  const [isloggedIn, setIsLoggedIn] = useState(false);
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      {isloggedIn && (
        <nav className='animate-in fade-in duration-1000  flex p-2 '>
          <div className='w-32 mt-1 ml-2'>
            {isloggedIn ? (
              <Link to='/dashboard/'>
                <img
                  className='rounded-full outline outline-orange-50 shadow'
                  src='/src/assets/tbd_logo.png'
                ></img>
              </Link>
            ) : (
              <Link to='/'>
                <img
                  className='rounded-full outline outline-orange-50 shadow'
                  src='/src/assets/tbd_logo.png'
                ></img>
              </Link>
            )}
          </div>
          <div className='w-full mr-4 h-40 flex justify-center'>
            <nav className=' h-20 rounded-full'>
              <div className=''>
                <div className='text-decoration-line: none items-center justify-between hidden h-max w-full md:flex md:w-auto md:order-1'>
                  <ul className='flex  flex-col font-medium md:p-0 mt-2 pt-2  md:space-x-2 rtl:space-x-reverse md:flex-row md:mt-0   '>
                    {isloggedIn && (
                      <>
                        <li >
                          <a
                            href='/about/'
                            className='shadow-md rounded-full pt-2 pb-2 pr-4 pl-4 no-underline flex justify-center text-gray-900   hover:bg-orange-100'
                          >
                            About
                          </a>
                        </li>

                        <li>
                          <a
                            href='/dashboard/'
                            className='shadow-md rounded-full pt-2 pb-2 pr-4 pl-4 no-underline flex justify-center text-gray-900   hover:bg-orange-100'
                          >
                            Dashboard
                          </a>
                        </li>

                        <li>
                          <a
                            href='/temp/'
                            className='shadow-md rounded-full pt-2 pb-2 pr-4 pl-4 no-underline flex justify-center text-gray-900   hover:bg-orange-100'
                          >
                            Temp
                          </a>
                        </li>
                        <li>
                          <a
                            href='/education/'
                            className='shadow-md rounded-full pt-2 pb-2 pr-4 pl-4 no-underline flex justify-center text-gray-900   hover:bg-orange-100'
                          >
                            Education
                          </a>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </nav>
          </div>
          <div className='pr-10 pt-1'>
            {user && (
              <div className='flex flex-col'>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <div className='flex flex-col items-center'>
                      <Avatar>
                        {user?.photoURL ? (
                          <>
                          <AvatarImage
                            src={user.photoURL}
                            referrerPolicy='no-referrer'
                          />
                          
                          </>
                        ) : (
                          <AvatarImage
                            src={userPhoto}
                            referrerPolicy='no-referrer'
                          />
                        )}
                        
                      </Avatar>
                      <h3 className="text-sm">{user.displayName}</h3>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-orange-100">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-gray-300  "/>
                    <DropdownMenuItem>
                      <Link className='no-underline text-black w-full' to='/profile/'>
                        Profile
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem>Team</DropdownMenuItem>
                    
                      <div className="w-full bg-red-400 rounded p-1 text-sm mb-1 mt-1">
                      <LogoutButton />
                      </div>
       

                    <div >
                      <Drawer>
                        <DrawerTrigger className='rounded text-sm bg-sky-400 hover:bg-sky-500 shadow w-full p-1'>
                          Notifications
                        </DrawerTrigger>
                        <DrawerContent>
                          <DrawerHeader>
                            <DrawerTitle>Notifications</DrawerTitle>

                            <ul className='flex flex-col items-center w-full'>
                              <li className='bg-slate-500 text-white shadow-md rounded p-1 w-1/2 flex justify-center'>
                                Rent is due in 2 days!
                              </li>
                              <li className='bg-slate-500 mt-2 text-white shadow-md rounded p-1 w-1/2 flex justify-center'>
                                Credit Card card due in 5 days!
                              </li>
                            </ul>
                          </DrawerHeader>
                          <DrawerFooter className='flex items-center'>
                            <Button className='w-max bg-red-300 hover:bg-red-500'>
                              Clear Notifications
                            </Button>
                            <DrawerClose>
                              <Button variant='outline'>Close</Button>
                            </DrawerClose>
                          </DrawerFooter>
                        </DrawerContent>
                      </Drawer>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        </nav>
      )}
      
    </>
  );
};

export default NavBar;
