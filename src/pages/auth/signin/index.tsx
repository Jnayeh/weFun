import { useRef, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { AiFillGoogleCircle } from "@react-icons/all-files/ai/AiFillGoogleCircle";
import { FaFacebook } from "@react-icons/all-files/fa/FaFacebook";
import { FcGoogle } from "@react-icons/all-files/fc/FcGoogle";
import Layout from "~/pages/layout";
import { NextPageWithLayout } from "~/pages/_app";

const SignInSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const SignIn: NextPageWithLayout = () => {
  const [success, setSuccess] = useState(false);
  const { data: session } = useSession();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const errorRef = useRef<HTMLParagraphElement>(null);

  const handleSignIn = async (data: any) => {
    try {
      await SignInSchema.parseAsync(data);
      const result = await signIn("credentials", {
        redirect: false,
        ...data,
      });
      // Check if the sign-in was successful or not
      if (result?.error &&errorRef.current) {
        // If there's an error, display the error message
        errorRef.current.innerText= result.error;
      } else {
        // If sign-in was successful, set success state to true
        setSuccess(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signIn("google",{
        redirect: true,
        callbackUrl: "/"
      });
    } catch (error) {
      console.error(error);
      
    }
  };
  const handleFacebookSignIn = async () => {
    try {
      await signIn("facebook",{
        redirect: true,
        callbackUrl: "/"
      });
    } catch (error) {
      console.error(error);
      
    }
    
  };

  return (
    <div className=" mt-5 flex flex-col items-center p-5">
      {session ? <p>You are already signed in as {session.user.name}</p> : null}
      {success ? <p>Sign-in successful!</p> : null}
      {!session ? (
        <>
          <form
            onSubmit={handleSubmit(handleSignIn)}
            className="mt-5 flex w-[90vw] max-w-md flex-col gap-4 rounded-2xl bg-slate-200 p-5 font-mono shadow-xl dark:bg-slate-700"
          >
            <h2 className=" text-center text-3xl font-bold">Sign In</h2>
            <div className=" flex flex-col gap-2 text-start">
              <label className=" dark:text-slate-400">Email</label>
              <Controller
                render={({ field }) => (
                  <input
                    {...field}
                    type="email"
                    placeholder="Email"
                    className="max-w-md rounded-xl border-2 border-transparent py-2 pl-3 pr-2 shadow-md focus:border-primary focus:outline-none dark:bg-gray-500"
                  />
                )}
                control={control}
                name="email"
                rules={{ required: true }}
                defaultValue=""
              />
              {errors.email && (
                <div className=" font-semibold text-red-500 dark:text-slate-50">
                  Email is required
                </div>
              )}
            </div>
            <div className=" flex flex-col gap-2 text-start">
              <label className=" dark:text-slate-400">Password</label>
              <Controller
                render={({ field }) => (
                  <input
                    {...field}
                    type="password"
                    placeholder="Password"
                    className="max-w-md rounded-xl  border-2 border-transparent py-2 pl-3 pr-2 shadow-md focus:border-primary focus:outline-none dark:bg-gray-500"
                  />
                )}
                control={control}
                name="password"
                rules={{ required: true, minLength: 6 }}
                defaultValue=""
              />
              {errors.password?.type == "required" && (
                <div className=" font-semibold text-red-500 dark:text-slate-50">
                  Password is required
                </div>
              )}
              {errors.password?.type == "minLength" && (
                <div className=" font-semibold text-red-500 dark:text-slate-50">
                  Password should be at least 6 characters
                </div>
              )}
            </div>
            <p className=" font-semibold text-red-500 dark:text-slate-50 empty:hidden" ref={errorRef}/>
            <button
              type="submit"
              className=" rounded-lg bg-red-600 p-2 px-6 text-sm font-bold uppercase text-white shadow-md hover:bg-red-700 disabled:bg-slate-200 disabled:font-normal disabled:text-gray-400 disabled:shadow-none"
            >
              Sign In
            </button>
          </form>
          <div className="p-4 flex justify-center items-center gap-2">
            <button onClick={handleGoogleSignIn} className=" text-2xl w-[36px] h-[36px] bg-white rounded-full flex justify-center items-center "> <FcGoogle /> </button>
            <button onClick={handleFacebookSignIn} className="text-4xl dark:bg-blue-600 rounded-full "> <FaFacebook className=" text-blue-600 dark:text-blue-50" /> </button>
          </div>
        </>
      ) : null}
    </div>
  );
};
SignIn.getLayout = (page: React.ReactNode) => (
  <Layout>{page}</Layout>
);
export default SignIn;
