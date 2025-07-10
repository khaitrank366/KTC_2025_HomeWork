import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "../schema/signUpSchema";
import type { SignUpFormValues } from "../types/authTypes";
import { useState } from "react";

interface Props {
  onSwitch: () => void;
}

const SignUpForm = ({ onSwitch }: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpFormValues>({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = (data: SignUpFormValues) => {
    console.log("✅ Registered user:", data);
    reset();
    onSwitch(); // Chuyển sang trang đăng nhập
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        {...register("name")}
        placeholder="Name"
        className="w-full px-4 py-2 border rounded-md focus:outline-blue-500"
      />
      <p className="text-red-500 text-sm">{errors.name?.message}</p>

      <input
        {...register("email")}
        placeholder="Email"
        className="w-full px-4 py-2 border rounded-md focus:outline-blue-500"
      />
      <p className="text-red-500 text-sm">{errors.email?.message}</p>

      <input
        {...register("phone")}
        placeholder="Phone"
        className="w-full px-4 py-2 border rounded-md focus:outline-blue-500"
      />
      <p className="text-red-500 text-sm">{errors.phone?.message}</p>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          {...register("password")}
          placeholder="Password"
          className="w-full px-4 py-2 border rounded-md focus:outline-blue-500"
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-2 top-2 text-sm text-blue-600"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
      <p className="text-red-500 text-sm">{errors.password?.message}</p>

      <input
        type="password"
        {...register("confirmPassword")}
        placeholder="Confirm Password"
        className="w-full px-4 py-2 border rounded-md focus:outline-blue-500"
      />
      <p className="text-red-500 text-sm">{errors.confirmPassword?.message}</p>

      <div className="flex gap-2 mt-4">
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={onSwitch}
          className="w-full bg-gray-200 text-black py-2 rounded-md"
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
