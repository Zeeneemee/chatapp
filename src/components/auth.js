import React, { useRef } from 'react';
import { sendSignInLinkToEmai, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '@/firebase-config'; // Assuming your Firebase config and auth exports are set here
import Cookies from 'universal-cookie';

const AuthClientComponent = ({setIsAuth}) => {
    const cookies = new Cookies();
    const emailRef = useRef(null); // Use useRef to manage input fields for email
    const passwordRef = useRef(null); // Assuming you might need password management

    const signInWithGoogle = async () => {
      try {
        const result = await signInWithPopup(auth, provider);
        console.log(result.user)
        cookies.set('auth',{accessToken: result.user.accessToken, user: result.user.displayName},{path:'/'})
        setIsAuth(true)
  
      } catch (error) {
        console.error("Failed to sign in with Google:", error);
      }
    };

    const handleSendSignInLink = (email) => {
        const actionCodeSettings = {
            url: 'https://chatapp-2131a.firebaseapp.com',
            handleCodeInApp: true,
            dynamicLinkDomain: 'chatapp-2131a.page.link'
        };

        sendSignInLinkToEmail(auth, email, actionCodeSettings)
            .then(() => {
                cookies.set('auth', { email: email }, { path: '/' });
                console.log('Sign-in link sent to:', email);
            })
            .catch((error) => {
                console.error('Error sending sign-in link:', error);
            });
    };

    const handleEmailSubmit = (event) => {
        event.preventDefault(); // Prevent form submission causing a page reload
        const email = emailRef.current.value;
        handleSendSignInLink(email);
    };

    return (
        <div className="flex flex-col items-center gap-2 justify-center h-[100vh]">
            <h1 className="text-2xl font-bold">Sign in with Google to Continue</h1>
            <button onClick={signInWithGoogle} className="bg-blue-500 text-white p-2 rounded-md w-[300px] h-[50px]">
                Sign in with Google
            </button>
            <form className="flex flex-col" onSubmit={handleEmailSubmit}>
                <input ref={emailRef} className="border-2 border-solid" type="email" placeholder="Email" />
                <button type="submit" className="mt-2 bg-blue-500 text-white p-2 rounded-md">Send Sign-In Link</button>
            </form>
        </div>
    );
};

export default AuthClientComponent;
