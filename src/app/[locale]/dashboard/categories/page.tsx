import { Metadata } from "next";
import AddCategory from "~/components/category-form";

export const metadata: Metadata = {
  description: "Stop existing & Start living",
};
const Home = () => {

  return (
    <>
    <AddCategory />
    </>
  );
};
export default Home;
