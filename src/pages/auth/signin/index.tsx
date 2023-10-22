import { useRef, useState } from "react";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { FaFacebook } from "@react-icons/all-files/fa/FaFacebook";
import { FcGoogle } from "@react-icons/all-files/fc/FcGoogle";
import Layout from "~/pages/layout";
import { NextPageWithLayout } from "~/pages/_app";
import { useSignIn, useUser } from "@clerk/nextjs";
import { OAuthStrategy } from "@clerk/nextjs/dist/types/server";

const SignInSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const SignIn: NextPageWithLayout = () => {
  const [success, setSuccess] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();
  const { isLoaded: signInLoaded, signIn, setActive } = useSignIn();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const errorRef = useRef<HTMLParagraphElement>(null);
  const handleSignIn = async (data: any) => {
    try {
      if (!signInLoaded) {
        console.error("sigin is not loaded yet");
        return;
      }
      await SignInSchema.parseAsync(data);
      const result = await signIn.create({
        identifier: data?.email,
        password: data?.password,
      });
      if (result.status === "complete") {
        console.log(result);
        await setActive({ session: result.createdSessionId });
        setSuccess(true);
      }
      /* 
        // Check if the sign-in was successful or not
        if (result?.error &&errorRef.current) {
          // If there's an error, display the error message
          errorRef.current.innerText= result.error;
        } else {
          // If sign-in was successful, set success state to true
          setSuccess(true);
        }
        */
    } catch (error) {
      console.error(error);
    }
  };

  const signInWith = (strategy: OAuthStrategy) => {
    if (!signInLoaded) {
      console.error("sigin is not loaded yet");
      return;
    }
    return signIn.authenticateWithRedirect({
      strategy,
      redirectUrl: "/",
      redirectUrlComplete: "/",
    });
  };

  return (
    <div className=" mt-5 flex flex-col items-center p-5">
      {isSignedIn ? <p>You are already signed in as {user.fullName}</p> : null}
      {success ? <p>Sign-in successful!</p> : null}
      {!isSignedIn ? (
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
            <p
              className=" font-semibold text-red-500 empty:hidden dark:text-slate-50"
              ref={errorRef}
            />
            <button
              type="submit"
              className=" rounded-lg bg-red-600 p-2 px-6 text-sm font-bold uppercase text-white shadow-md hover:bg-red-700 disabled:bg-slate-200 disabled:font-normal disabled:text-gray-400 disabled:shadow-none"
            >
              Sign In
            </button>
          </form>
          <div className="flex items-center justify-center gap-2 p-4">
            <button
              onClick={() => signInWith("oauth_google")}
              className=" flex h-[36px] w-[36px] items-center justify-center rounded-full bg-white text-2xl "
            >
              <FcGoogle />
            </button>
            <button
              onClick={() => signInWith("oauth_facebook")}
              className="rounded-full text-4xl dark:bg-blue-600 "
            >
              <FaFacebook className=" text-blue-600 dark:text-blue-50" />
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
};
SignIn.getLayout = (page: React.ReactNode) => <Layout>{page}</Layout>;
export default SignIn;
