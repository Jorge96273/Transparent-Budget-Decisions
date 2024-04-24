const NavBar = () => {
  return (
    <>
      <nav className="mb-14 nav-background-color" >
        <div className=' flex flex-wrap items-center justify-between mx-10 '>
          <a href='/' className='w-24 m-1 shadow rounded-full'>
            <img
              className='rounded-full shadow-2xl'
              src='/src/assets/tbd_logo.png'
            ></img>
          </a>
          <div className='flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse'></div>
          <div className='text-decoration-line: none items-center justify-between hidden h-max w-full md:flex md:w-auto md:order-1'>
            <ul className='flex  flex-col font-medium md:p-0 mt-2 pt-2  md:space-x-2 rtl:space-x-reverse md:flex-row md:mt-0   '>
              <li className="shadow-md  rounded-full  hover:bg-orange-100">
                <a
                  href='/about/'
                  className='no-underline block py-2 px-3 text-gray-900 rounded'
                >
                  About
                </a>
              </li>
              <li className="shadow-md rounded-full hover:bg-orange-100">
                <a
                  href='/dashboard/'
                  className='no-underline block py-2 px-3 text-gray-900 rounded'
                >
                  Dashboard
                </a>
              </li>
              <li className="shadow-md  rounded-full  hover:bg-orange-100">
                <a
                  href='/'
                  className='no-underline block py-2 px-3 text-gray-900 rounded'
                >
                  Learning Center
                </a>
              </li>
              <li className="shadow-md  rounded-full  hover:bg-orange-100">
                <a
                  href='/temp/'
                  className='no-underline block py-2 px-3 text-gray-900 rounded'
                >
                  Temp
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
