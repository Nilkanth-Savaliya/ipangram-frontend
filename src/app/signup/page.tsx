"use client";
import { TextField } from "@/componets/form-fields/text";
import { signup } from "@/redux/reducer/user-slice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const router = useRouter();
  const onSubmit = (data) => {
    delete data.confirmPassword;
    dispatch(signup(data))
      .unwrap()
      .then((res) => {
        console.log("res", res);
        router.push("/dashboard");
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
            CREATE YOUR ACCOUNT
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
              type={"text"}
              placeholder={"First Name"}
              label={"First Name"}
              name={"first_name"}
              error={errors?.first_name}
              {...register("first_name", {
                required: "First Name is required",
              })}
            />

            <TextField
              type={"text"}
              placeholder={"Last Name"}
              label={"Last Name"}
              name={"last_name"}
              error={errors?.last_name}
              {...register("last_name", { required: "Last Name is required" })}
            />

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Hobbies
              </label>
              <div className="flex items-center mt-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    value="reading"
                    {...register("hobbies", {
                      required: "Hobbies is required",
                    })}
                    className="form-checkbox"
                  />
                  <span className="ml-2">Reading</span>
                </label>
                <label className="inline-flex items-center ml-6">
                  <input
                    type="checkbox"
                    value="traveling"
                    {...register("hobbies", {
                      required: "Hobbies is required",
                    })}
                    className="form-checkbox"
                  />
                  <span className="ml-2">Traveling</span>
                </label>
                <label className="inline-flex items-center ml-6">
                  <input
                    type="checkbox"
                    value="sports"
                    {...register("hobbies", {
                      required: "Hobbies is required",
                    })}
                    className="form-checkbox"
                  />
                  <span className="ml-2">Sports</span>
                </label>
              </div>
              {errors.hobbies && (
                <p className="text-red-500 text-xs mt-1">
                  {typeof errors.hobbies.message === "string" &&
                    errors.hobbies.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <div className="flex items-center mt-2">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="male"
                    {...register("gender", { required: "Gender is required" })}
                    className="form-radio"
                  />
                  <span className="ml-2">Male</span>
                </label>
                <label className="inline-flex items-center ml-6">
                  <input
                    type="radio"
                    value="female"
                    {...register("gender", { required: "Gender is required" })}
                    className="form-radio"
                  />
                  <span className="ml-2">Female</span>
                </label>
                <label className="inline-flex items-center ml-6">
                  <input
                    type="radio"
                    value="other"
                    {...register("gender", { required: "Gender is required" })}
                    className="form-radio"
                  />
                  <span className="ml-2">Other</span>
                </label>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                User type
              </label>
              <div className="flex items-center mt-2">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="admin"
                    {...register("type", {
                      required: "User type is required",
                    })}
                    className="form-radio"
                  />
                  <span className="ml-2">Admin</span>
                </label>
                <label className="inline-flex items-center ml-6">
                  <input
                    type="radio"
                    value="user"
                    {...register("type", {
                      required: "User type is required",
                    })}
                    className="form-radio"
                  />
                  <span className="ml-2">User</span>
                </label>
              </div>
              {errors.type && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.type.message}
                </p>
              )}
            </div>
    
            <TextField
              type={"password"}
              placeholder={"Password"}
              label={"Password"}
              name={"password"}
              error={errors?.password}
              {...register("password", {
                required: "Password is required",
                validate: (value) => {
                  const passwordCriteria = [
                    { regex: /[A-Z]/, message: "an uppercase letter" },
                    { regex: /[a-z]/, message: "a lowercase letter" },
                    { regex: /[0-9]/, message: "a number" },
                    {
                      regex: /[!@#$%^&*(),.?":{}|<>]/,
                      message: "a special character",
                    },
                    { regex: /^.{8,20}$/, message: "8-20 characters long" },
                  ];

                  for (const { regex, message } of passwordCriteria) {
                    if (!regex.test(value)) {
                      return `Password must include ${message}`;
                    }
                  }
                  return true;
                },
              })}
            />

            <TextField
              type={"password"}
              placeholder={"Confirm Password"}
              label={"Confirm Password"}
              name={"confirmPassword"}
              error={errors?.confirmPassword}
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value, { password }) =>
                  value === password || "Passwords do not match",
              })}
            />
            <div className="flex items-center justify-between">
              <button className="py-2 px-3 rounded-md my-2 bg-blue-400 text-white">
                Sign Up
              </button>
              <Link className="text-blue-400" href={`/login`}>
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
