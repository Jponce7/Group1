import FullPageLoader from '../components/FullPageLoader.jsx';
import {useState} from 'react';
import { auth } from '../firebase/config.js';
import { 
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  onAuthStateChanged
 } from "firebase/auth";
import { set } from 'firebase/database';
import {useDispatch} from 'react-redux';
import{setUser} from '../store/usersSlice.js';
import logo from '../assets/logo.png';

function LoginPage() {

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [loginType, setLoginType] = useState('login');
  const [userCredentials, setUserCredentials] = useState({});
  const [error, setError] = useState('');


//keeps logged in user logged in
  onAuthStateChanged(auth, (user) => {
    
    if (user) {
      dispatch(setUser({id: user.uid, email: user.email}))
    } else {
      dispatch(setUser(null))
    }
    if(isLoading){setIsLoading(false)};
  });



// handles user input
  function handleCredentials(e) {
    setUserCredentials({...userCredentials, [e.target.name]: e.target.value})
  }



  //handles signup used  in handleSignup button
  function handleSignup(e) {
    e.preventDefault();
    setError("");

    console.log('signup')
    createUserWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
    .then((userCredential) => {
      console.log(userCredential.user)
      dispatch(setUser({id: userCredential.user.uid, email: userCredential.user.email}))
    })
    .catch((error) => {
      setError(error.message)

  });
  }




// handles login used in handleLogin button
  function handleLogin(e) {
    e.preventDefault();
    setError("");
    

    signInWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
    .then((userCredential) => {
      dispatch(setUser({id: userCredential.user.uid, email: userCredential.user.email}))
      console.log(userCredential.user)

    })
    .catch((error) => {
      setError(error.message)
    });
  }


  //handles password reset
function handlePasswordReset() {
  const email = prompt('Please enter your email');
  sendPasswordResetEmail(auth, email);
  alert('Password reset email sent');
}


    return (
      <>
        { isLoading && <FullPageLoader></FullPageLoader> }
        
        <div className="container login-page">
        <section>
          
          <h1><img src={logo} alt="SpectRoom Logo" className="logo" style={{ width: '600', height: 'auto' }} /></h1>
            <p style={{ color: 'white' }}>Login or create an account to continue</p>
            <div className="login-type">
              <button 
                className={`btn ${loginType == 'login' ? 'selected' : ''}`}
                onClick={()=>setLoginType('login')}>
                  Login
              </button>
              <button 
                className={`btn ${loginType == 'signup' ? 'selected' : ''}`}
                onClick={()=>setLoginType('signup')}>
                  Signup
              </button>
            </div>
            <form className="add-form login">
                  <div className="form-control">
                    <label style={{ color: 'white' }}>Email</label>
                      <input onChange = {(e)=>{handleCredentials(e)}} type="text" name="email" placeholder="Enter your email" />
                  </div>
                  <div className="form-control">
                      <label style={{ color: 'white' }}>Password</label>
                      <input onChange = {(e)=>{handleCredentials(e)}} type="password" name="password" placeholder="Enter your password" />
                  </div>
                  {
                    loginType == 'login' ?
                    <button onClick={(e)=>handleLogin(e)} className="active btn btn-block">Login</button>
                    : 
                    <button onClick={(e)=>handleSignup(e)} className="active btn btn-block">Sign Up</button>
                  }
                  
                  {
                    error&&<div className="error">
                      {error}
                    </div>
                  }
                  

                  <p onClick={handlePasswordReset} className="forgot-password">Forgot Password?</p>
                  
              </form>
          </section>
        </div>
      </>
    )
  }
  
  export default LoginPage
  