import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "../schema/signInSchema";
import type{ SignInFormValues } from "../types/authTypes";

type Props = {
  onSwitch: () => void;
};

const SignInForm = ({ onSwitch }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({ resolver: yupResolver(signInSchema) });

  const onSubmit = (data: SignInFormValues) => {
    console.log("Sign In:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input
          {...register("email")}
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-md focus:outline-blue-500"
        />
        <p className="text-red-500 text-sm">{errors.email?.message}</p>
      </div>

      <div>
        <input
          type="password"
          {...register("password")}
          placeholder="Password"
          className="w-full px-4 py-2 border rounded-md focus:outline-blue-500"
        />
        <p className="text-red-500 text-sm">{errors.password?.message}</p>
      </div>

      <div className="flex gap-2">
        <button type="submit" className="flex-1 bg-blue-500 text-white py-2 rounded-md">
          Login
        </button>
        <button type="button" onClick={onSwitch} className="flex-1 bg-gray-200 py-2 rounded-md">
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default SignInForm;