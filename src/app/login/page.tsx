"use client";
import { TextField } from "@/componets/form-fields/text";
import { login } from "@/redux/reducer/user-slice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const router = useRouter();
  const onSubmit = (data) => {
    dispatch(login(data))
      .unwrap()
      .then((res) => {
        console.log("res", res);
        router.push("/departments");
      });
  };
  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-300">
      <div className="flex gap-9">
        <div className="w-2/5 flex items-center border-r-2 border-blue-500">
          <img src="/next.svg" alt="logo" className="w-1/2 mx-auto" />
        </div>
        <div className="w-3/5 p-4">
          <h1 className="text-2xl font-bold text-center mb-4">
            LOGIN INTO YOUR ACCOUNT
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              type="text"
              placeholder="Email"
              label="Email"
              name="email"
              error={errors?.email}
              {...register("email", { required: "Email is required" })}
            />
            <TextField
              type="password"
              placeholder="Password"
              label="Password"
              name="password"
              error={errors?.password}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
            />

            <div className="flex items-center justify-between">
              <button className="py-2 px-3 rounded-md my-2 bg-blue-400 text-white">
                Login
              </button>
              <Link className="text-blue-400" href={`/signup`}>
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
