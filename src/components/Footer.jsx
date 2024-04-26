
export default function Footer() {
  return (
    <>
      <footer className="nav-footer-background-color">
        <div className='w-full mx-auto flex justify-center mt-3'>
          <span className='text-xs text-gray-500 sm:text-center dark:text-gray-400'>
            © 2024{" "}
            <a href='/' className='no-underline text-gray-400 hover:underline'>
              TBD™
            </a>{" "}
            All Rights Reserved.
            </span>
          <ul className='flex items-center text-xs font-medium text-gray-500 dark:text-gray-400 sm:mt-0'>
            <li>
              <a href='/' className='no-underline  text-gray-400 hover:underline me-4 md:me-6'>
                Home
              </a>
            </li>
            <li>
              <a href='/about/' className='no-underline text-gray-400 hover:underline me-4 md:me-6'>
                About
              </a>
            </li>
            <li>
              <a href='/' className='no-underline text-gray-400 hover:underline me-4 md:me-6'>
                Privacy Policy
              </a>
            </li>
          </ul>
          
        </div>
      </footer>
    </>
  );
}
