// import { Link } from 'react-router-dom'; 

const EnterLandingPage = () => {
    
    
    return (
      <>
      <div className="page-container">EnterLandingPage
      <div className="top-half">
      <div className="rounded-form">
      <p className='font-bold text-lg'>Already have an account?</p>
            <input type="text" placeholder="Username" className="rounded-input" />
            <input type="password" placeholder="Password" className="rounded-input" />
            <button className="rounded-button">Login</button>
            <p className='font-bold text-lg'>OR</p>
            <button className="rounded-button">Login with Google</button>
        </div>
      </div>
      <div className="bottom-half">
      <p className='font-bold text-lg'>Don't have an account?</p> 
      </div>      
      </div>
      </>
    )
  }
  
  export default EnterLandingPage