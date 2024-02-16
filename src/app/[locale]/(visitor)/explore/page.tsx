import { Activities } from "../activities/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore - Find your new experiences",
  description: "Explore our experiences",
};
const ExplorePage = () => {
  return (
    <>
      <main className="mx-auto w-[90%] py-4">
        <Activities />
      </main>
    </>
  );
};

ExplorePage.getLayout = (page: React.ReactNode) => <>{page}</>;
export default ExplorePage;
