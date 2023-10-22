import { SignUp } from '@clerk/nextjs';
import { NextPageWithLayout } from '~/pages/_app';


const SignUpPage: NextPageWithLayout = () => {
  return (
    <SignUp />
  );
};

export default SignUpPage;
