import calendarImage from "../images/calendar.png";
import budgetImage from "../images/Budgets.png";
import tableImage from "../images/Table.png"
import { Divider } from "@tremor/react";
import { Link } from "react-router-dom";

const TeamPage = () => {
  return (
    <>
      <section className='rounded-xl shadow-xl shadow-slate-300/70 bg-slate-400 p-4 mx-5 my-4'>
        <div className='grid my-2 max-w-screen-3xl rounded-xl  px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12'>
          <div className='mr-auto rounded-xl p-1 place-self-center lg:col-span-7'>
            <h1 className='max-w-2xl p-2 mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl '>
              Visualize your finances with our interactive calendar
            </h1>
            <p className='max-w-2xl mb-6 font-light text-slate-300 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400'>
              From upcoming recurring payments or income, to individual
              transactions, all in one place to quickly grasp upcoming or past
              events.
            </p>
            <Link
              to="/enterlanding/"
              className='inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-slate-100 rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900'
            >
              Get started
              <svg
                className='w-5 h-5 ml-2 -mr-1'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'></path>
              </svg>
            </Link>
            <Link
              to="/enterlanding/"
              className='inline-flex bg-slate-200 items-center justify-center px-5 py-3 text-base font-medium text-center text-slate-900 border border-slate-300 rounded-lg hover:bg-slate-400 focus:ring-4 focus:ring-gray-100'
            >
              Sign Up Today!
            </Link>
          </div>
          <div className='hidden rounded-2xl shadow-xl shadow-slate-600 lg:mt-0 lg:col-span-5 lg:flex'>
            <img
              className='rounded-2xl w-full h-full'
              src={calendarImage}
              alt='mockup'
            />
          </div>
        </div>

        <div className='py-8'>
          <Divider> ◦◦◦⦿◦◦◦</Divider>
        </div>
        <div className='flex justify-center w-full items-center content-center'>
          <div className="w-1/2 mr-12">

          <img
            className='rounded-xl shadow-xl shadow-slate-600 mx-8 '
            src={tableImage}
            alt='data table'
            />
            </div>
        <div className='flex justify-center'>
        </div>
          <div className='flex ml-12 justify-center items-center'>
            <div className='grid max-w-screen-2xl rounded-xl mx-auto lg:gap- xl:gap-0 lg:py-16 '>
              <div className='mr-auto rounded-xl p-1 place-self-center lg:col-span-7'>
                <h1 className='max-w-2xl  text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl '>
                 Got tables? Got Graphs? WE DO! 
                </h1>
                <p className='max-w-2xl mb-6 font-light text-slate-300 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400'>
                 If excel sheets, charts, graphs, data, numbers, rows, and columns, excite you, you&apos;ll appreciate our visual tables. Plotted data with graphs for maximum efficiency! Pin-point exactly what you need and find trends in your data.
                </p>
                <Link
                  to="/enterlanding/"
                  className='inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-slate-100 rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900'
                >
                  Get started
                  <svg
                    className='w-5 h-5 ml-2 -mr-1'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'></path>
                  </svg>
                </Link>
                <Link
                  to="/enterlanding/"
                  className='inline-flex bg-slate-200 items-center justify-center px-5 py-3 text-base font-medium text-center text-slate-900 border border-slate-300 rounded-lg hover:bg-slate-400 focus:ring-4 focus:ring-gray-100'
                >
                  Sign Up Today!
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className='py-8'>
          <Divider> ◦◦◦⦿◦◦◦</Divider>
        </div>

        <div className='flex justify-center'>
          <img
            className='shadow-xl shadow-slate-600 rounded-2xl w-2/3'
            src={budgetImage}
            alt='budget table'
          />
        </div>
        <div className='flex justify-center w-full items-center content-center'>
          <div className='flex justify-center items-center'>
            <div className='grid max-w-screen-2xl rounded-xl mx-auto lg:gap- xl:gap-0 lg:py-16 '>
              <div className='mr-auto rounded-xl p-1 place-self-center lg:col-span-7'>
                <h1 className='max-w-2xl  text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl '>
                  Budget Tracking in an instant
                </h1>
                <p className='max-w-2xl mb-6 font-light text-slate-300 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400'>
                  Never lose track of your budget data again, with our budgets
                  feature, you can find yourself in charge and prepared!
                </p>
                <Link
                  to="/enterlanding/"
                  className='inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-slate-100 rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900'
                >
                  Get started
                  <svg
                    className='w-5 h-5 ml-2 -mr-1'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'></path>
                  </svg>
                </Link>
                <Link
                  to="/enterlanding/"
                  className='inline-flex bg-slate-200 items-center justify-center px-5 py-3 text-base font-medium text-center text-slate-900 border border-slate-300 rounded-lg hover:bg-slate-400 focus:ring-4 focus:ring-gray-100'
                >
                  Sign Up Today!
                </Link>
              </div>
            </div>
          </div>
        </div>
       
      </section>
    </>
  );
};

export default TeamPage;
