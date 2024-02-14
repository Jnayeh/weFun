import { Metadata } from "next";
import AddActivity from "~/components/activity-form";

export const metadata: Metadata = {
  description: "Stop existing & Start living",
};
const Home = () => {

  return (
    <>
    <AddActivity />
    </>
  );
};
export default Home;
