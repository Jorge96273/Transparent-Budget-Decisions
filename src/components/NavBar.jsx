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
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import userPhoto from "../images/userPhoto1.svg";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import TBD from "../images/TBD.png";

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
        <nav className="animate-in fade-in duration-1000 flex justify-center items-center py-1 ">
          <div className="w-32 mr-3 mt-1 ml-2">
            {isloggedIn ? (
              <Link to="/dashboard/">
                <img
                  className=" shadow-xl shadow-slate-500/50 rounded-full p-1 outline outline-2 bg-slate-200 outline-slate-800"
                  src={TBD}
                ></img>
              </Link>
            ) : (
              <Link to="/">
                <img
                  className="rounded-full outline outline-slate-50 shadow"
                  src={TBD}
                ></img>
              </Link>
            )}
          </div>
          <div className="w-full flex justify-center">
            <div className="">
              <div className="text-decoration-line:none items-center justify-between hidden h-max w-full md:flex md:w-auto md:order-1">
                <ul className="flex bg-slate-400 shadow-inner rounded-full px-5 py-2 round font-medium md:p-0  justify-center content-center items-center md:space-x-2 rtl:space-x-reverse md:flex-row md:mt-0   ">
                  {isloggedIn && (
                    <>
                      <li>
                        <Link
                          to="/dashboard/"
                          className="shadow-md rounded-full pt-2 pb-2 pr-4 pl-4 no-underline flex justify-center text-slate-900   hover:bg-slate-300 bg-slate-200"
                        >
                          Dashboard
                        </Link>
                      </li>

                      {/* <li>
                          <Link
                          to='/temp/'
                          className='shadow-md rounded-full pt-2 pb-2 pr-4 pl-4 no-underline flex justify-center text-slate-900   hover:bg-slate-300 bg-slate-200'
                          >
                          Temp
                          </Link>
                        </li> */}
                      <li>
                        <Link
                          to="/education/"
                          className="shadow-md rounded-full pt-2 pb-2 pr-4 pl-4 no-underline flex justify-center text-slate-900   hover:bg-slate-300 bg-slate-200"
                        >
                          Education
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/team/"
                          className="shadow-md  rounded-full pt-2 pb-2 pr-4 pl-4 no-underline flex justify-center text-slate-900  bg-slate-200 hover:bg-slate-300 "
                        >
                          Meet the Team
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/about/"
                          className="shadow-md  rounded-full pt-2 pb-2 pr-4 pl-4 no-underline flex justify-center text-slate-900  bg-slate-200 hover:bg-slate-300 "
                        >
                          About
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div className=" pt-2 ">
            {user && (
              <div className="mx-8">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <div className="flex flex-col items-center">
                      <Avatar className="bg-slate-200 shadow-md outline outline-slate-400 shadow-slate-100">
                        {user?.photoURL ? (
                          <>
                            <AvatarImage
                              src={user.photoURL}
                              referrerPolicy="no-referrer"
                            />
                          </>
                        ) : (
                          <AvatarImage
                            src={userPhoto}
                            referrerPolicy="no-referrer"
                          />
                        )}
                      </Avatar>
                      <h3 className="text-sm bg-slate-500 shadow rounded my-2 text-slate-50">
                        {user.displayName}
                      </h3>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-slate-200 shadow-xl shadow-slate-300/40 mr-2">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-slate-300" />
                    <DropdownMenuItem className="bg-slate-100 shadow-sm hover:bg-slate-400 p-1 rounded my-2">
                      <Link
                        className="no-underline text-slate-800 w-full justify-center flex "
                        to="/profile/"
                      >
                        Edit Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="bg-slate-100 shadow-sm hover:bg-slate-400 p-1 rounded my-2">
                      <LogoutButton />
                    </DropdownMenuItem>
                    <div>
                      <Drawer>
                        <DrawerTrigger className="rounded text-sm bg-sky-500 hover:bg-sky-600 shadow w-full p-1">
                          Notifications
                        </DrawerTrigger>
                        <DrawerContent>
                          <DrawerHeader>
                            <DrawerTitle>Notifications</DrawerTitle>

                            <ul className="flex flex-col items-center w-full">
                              <li className="bg-slate-500 text-white shadow-md rounded p-1 w-1/2 flex justify-center">
                                Rent is due in 2 days!
                              </li>
                              <li className="bg-slate-500 mt-2 text-white shadow-md rounded p-1 w-1/2 flex justify-center">
                                Credit Card card due in 5 days!
                              </li>
                            </ul>
                          </DrawerHeader>
                          <DrawerFooter className="flex items-center">
                            <Button className="w-max bg-red-300 hover:bg-red-500">
                              Clear Notifications
                            </Button>
                            <DrawerClose>
                              <Button variant="outline">Close</Button>
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
