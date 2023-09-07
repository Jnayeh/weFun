import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';

const SignInSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const SignIn = () => {
  const [success, setSuccess] = useState(false);
  const { data: session } = useSession();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const handleSignIn = async (data: any) => {
    try {
      await SignInSchema.parseAsync(data);
      await signIn('credentials', {
        redirect: false,
        ...data,
      });
      setSuccess(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoogleSignIn = async () => {
    await signIn('google');
  };

  return (
    <div>
      <h2>Sign In</h2>
      {session ? <p>You are already signed in as {session.user.email}</p> : null}
      {success ? <p>Sign-in successful!</p> : null}
      {!session ? (
        <>
          <form onSubmit={handleSubmit(handleSignIn)}>
            <div>
              <label>Email</label>
              <Controller
                render={({ field }) => (
                  <input {...field} type="email" placeholder="Email" />
                )}
                control={control}
                name="email"
                rules={{ required: true }}
                defaultValue=""
              />
              {errors.email && <div>Email is required</div>}
            </div>
            <div>
              <label>Password</label>
              <Controller
                render={({ field }) => (
                  <input {...field} type="password" placeholder="Password" />
                )}
                control={control}
                name="password"
                rules={{ required: true }}
                defaultValue=""
              />
              {errors.password && <div>Password is required</div>}
            </div>
            <button type="submit">Sign In</button>
          </form>
          <button onClick={handleGoogleSignIn}>Sign In with Google</button>
        </>
      ) : null}
    </div>
  );
};

export default SignIn;
