const NavBar = () => {
  return (
    <>
      <nav className="nav-background-color">
        <div className="max-w-screen-xl max-h-20 flex flex-wrap items-center justify-between mx-20 p-1">
          <a
            href="/"
            className="flex items-center "
          >
            <img className="w-16 rounded-full" src="/src/assets/tbd_logo.png"></img>
          </a>
          <div className='flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse'>
          </div>
          <div
            className='text-decoration-line: none items-center justify-between hidden h-max w-full md:flex md:w-auto md:order-1'
            
          >
            <ul className="flex  flex-col font-medium md:p-0 mt-2 pt-2  md:space-x-2 rtl:space-x-reverse md:flex-row md:mt-0   ">
            
              <li>
                <a
                  href="/about/"
                  className="no-underline block py-2 px-3 text-gray-900 rounded"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/dashboard/"
                  className="no-underline block py-2 px-3 text-gray-900 rounded"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="no-underline block py-2 px-3 text-gray-900 rounded"
                >
                  Learning Center
                </a>
              </li>
              <li>
                <a
                  href="/temp/"
                  className="no-underline block py-2 px-3 text-gray-900 rounded"
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
