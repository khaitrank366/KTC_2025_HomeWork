import { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        {isSignUp ? (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
            <SignUpForm onSwitch={() => setIsSignUp(false)} />
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
            <SignInForm onSwitch={() => setIsSignUp(true)} />
          </>
        )}
      </div>
    </div>
  );
};

export default AuthForm;