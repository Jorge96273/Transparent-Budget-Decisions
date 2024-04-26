import LogoutButton from "./LogoutButton";

const NavBar = () => {
  return (
    <>
      <div className='w-full mr-4 flex justify-center'>
        <nav className='m-1 rounded-full  nav-background-color'>
          <div className='flex items-center '>
            <a
              href='/'
              className='w-24 outline  outline-orange-50 shadow p-2 rounded-full'
            >
              <img
                className='rounded-full outline outline-orange-50 shadow'
                src='/src/assets/tbd_logo.png'
              ></img>
            </a>
            <div className='m-2 text-decoration-line: none items-center justify-between hidden h-max w-full md:flex md:w-auto md:order-1'>
              <ul className='flex  flex-col font-medium md:p-0 mt-2 pt-2  md:space-x-2 rtl:space-x-reverse md:flex-row md:mt-0   '>
                <li className='shadow-md  rounded-full bg-orange-50 hover:bg-orange-100'>
                  <a
                    href='/about/'
                    className='no-underline block py-2 px-3 text-gray-900 rounded'
                  >
                    About
                  </a>
                </li>
                <li className='shadow-md rounded-full hover:bg-orange-100'>
                  <a
                    href='/dashboard/'
                    className='no-underline block py-2 px-3 text-gray-900 rounded'
                  >
                    Dashboard
                  </a>
                </li>
                <li className='shadow-md  rounded-full  hover:bg-orange-100'>
                  <a
                    href='/'
                    className='no-underline block py-2 px-3 text-gray-900 rounded'
                  >
                    Learning Center
                  </a>
                </li>
                <li className='shadow-md  rounded-full  hover:bg-orange-100'>
                  <a
                    href='/temp/'
                    className='no-underline block py-2 px-3 text-gray-900 rounded'
                  >
                    Temp
                  </a>
                </li>
                <li className='shadow-md  rounded-full  hover:bg-orange-100'>
                  <a
                    href='/education/'
                    className='no-underline block py-2 px-3 text-gray-900 rounded'
                  >
                    Education
                  </a>
                </li>
                <li className="shadow-md  rounded-full  hover:bg-orange-100">
                <a
                  className="no-underline block py-2 px-3 text-gray-900 rounded"
                  >
                <LogoutButton />
                </a>
              </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
