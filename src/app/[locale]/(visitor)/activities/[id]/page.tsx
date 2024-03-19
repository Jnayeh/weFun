import { Metadata } from "next";
import { cn } from "~/utils/helpers/server";
import { ActivityPicturesCarousel } from "./activity-pictures-carousel";
import ActivityDetailsDrawer from "./activity-details";
export const metadata: Metadata = {
  title: "Places - Find your new experiences",
  description: "Details about the category",
};
const RegionPage = () => {
  return (
    <>
      <main>
        <div className=" h-dvh min-h-screen overflow-hidden">
          <ActivityPicturesCarousel />
          <ActivityDetailsDrawer />
        </div>
      </main>
    </>
  );
};
export default RegionPage;
