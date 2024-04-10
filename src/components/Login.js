import React, {useRef, useState} from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate';
import {  createUserWithEmailAndPassword ,signInWithEmailAndPassword,updateProfile } from "firebase/auth";
import {auth} from "../utils/firebase";
import {useNavigate}  from "react-router-dom";
import {useDispatch} from "react-redux";
import { addUser } from '../utils/userSlice';
 

const Login = () => {

  const [isSignInForm , setIsSignInForm] = useState(true);
  const [errorMessage , setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = ()=>{
     
    const  message   = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    
    if(message) return;

    if(!isSignInForm){
      //sign up logic
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    updateProfile(user, {
      displayName: name.current.value, photoURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXYFTEvdEYL2OIq1T_1tWxcENorm7EITteGwew3T9FhA&s"
    }).then(() => {
      const {uid , email , displayName ,photoURL} = auth.currentUser;
      dispatch(addUser(
        {uid : uid , 
          email : email ,
           displayName : displayName ,
            photoURL : photoURL
          }))
      navigate("/browse")
    }).catch((error) => {
      setErrorMessage(error.message)
    });

    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode+"-"+errorMessage)
    // ..
  });
    }
     else {
      // signIn logic
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    navigate("/browse")
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode+"-"+errorMessage)

  });
     }

   
  }
  
const toggleSignInForm = ()=>{
    setIsSignInForm(!isSignInForm);
}
  return (
    <div >
      <Header />
      <div className='absolute '>
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/7ca5b7c7-20aa-42a8-a278-f801b0d65fa1/fb548c0a-8582-43c5-9fba-cd98bf27452f/IN-en-20240326-popsignuptwoweeks-perspective_alpha_website_large.jpg" 
        alt='logo' />
      </div>
      <form onSubmit={(e)=>e.preventDefault()}    
      className='p-10 bg-black absolute  w-3/12  my-28  mx-auto right-0 left-0  text-white rounded-lg bg-opacity-80'>
        <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
        { !isSignInForm &&  <input type='text' placeholder='Full Name' 
        className='p-4 my-4 w-full bg-gray-800 ' ref={name}
         /> }
        <input type='text' placeholder='Email Address' ref = {email} 
        className='p-4 my-4 w-full bg-gray-800'
         />
        <input type='password' placeholder='password' ref={password}
         className='p-4 my-4 w-full bg-gray-800'
         />
         <p className='text-red-500 font-bold py-2 text-lg'>{errorMessage}</p>
        <button className='p-4 my-6 bg-red-700 w-full rounded-lg' onClick={handleButtonClick} >{isSignInForm ? "Sign In" : "Sign Up"}</button>
        <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>
          {isSignInForm
        ?  "New to Netflix? Sign Up Now"
        : "Already Registered? Sign In Now."
        }</p>
      </form>
    </div>
  )
}

export default Login