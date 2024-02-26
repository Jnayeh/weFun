import { Metadata } from "next";
import AddLocation from "~/components/location-form";

export const metadata: Metadata = {
  description: "Stop existing & Start living",
};
const Home = () => {

  return (
    <>
    <AddLocation />
    </>
  );
};
export default Home;
