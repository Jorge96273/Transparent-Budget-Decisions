import calendarImage from "../images/calendar.png"
import budgetImage from "../images/Budgets.png"

const TeamPage = () => {
  return (
    <>
    <section className="rounded-xl bg-slate-400 p-4 mx-5 my-4">
    <div className="grid my-2 max-w-screen-3xl rounded-xl  px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto rounded-xl p-1 place-self-center lg:col-span-7">
            <h1 className="max-w-2xl p-2 mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl ">Visualize your finances with our interactive calendar</h1>
            <p className="max-w-2xl mb-6 font-light text-slate-300 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">From upcoming recurring payments or income, to individual transcations all in one place to quickly grasp upcoming or past events.</p>
            <a href="#" className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-slate-100 rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                Get started
                <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"></path></svg>
            </a>
            <a href="#" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-slate-900 border border-slate-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100">
               Sign Up Today!
            </a> 
        </div>
        <div className="hidden rounded-2xl shadow-xl shadow-slate-200/70 lg:mt-0 lg:col-span-5 lg:flex">
            <img className="rounded-2xl w-full h-full" src={calendarImage} alt="mockup"/>
        </div>                
    </div>


            <img className="rounded-2xl" src={budgetImage} alt="mockup"/>
    <div className="grid my-2 max-w-screen-3xl rounded-xl  px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto rounded-xl p-1 place-self-center lg:col-span-7">
            <h1 className="max-w-2xl p-2 mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl ">Budget Tracking at an instance</h1>
            <p className="max-w-2xl mb-6 font-light text-slate-300 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Never lose track of your budget data again, with our budgets feature, you can find yourself in charge and prepared!</p>
            <a href="#" className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-slate-100 rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                Get started
                <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"></path></svg>
            </a>
            <a href="#" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-slate-900 border border-slate-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100">
               Sign Up Today!
            </a> 
        </div>
              
    </div>


    <div className="grid my-2 max-w-screen-3xl rounded-xl  px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="hidden rounded-xl bg-green-400 lg:mt-0 lg:col-span-5 lg:flex">
            <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png" alt="mockup"/>
        </div>                
        <div className="mr-auto rounded-xl p-1 bg-red-500 place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Payments tool for software companies</h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">From checkout to global sales tax compliance, companies around the world use Flowbite to simplify their payment stack.</p>
            <a href="#" className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                Get started
                <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </a>
            <a href="#" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                Speak to Sales
            </a> 
        </div>
    </div>
</section>
    </>
  )
}

export default TeamPage