import { NextPage } from "next";
import { ReviewCarousel } from "./ui/carousels/review-carousel";

const Reviews: NextPage = () => {
  const reviews = [
    {
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod",
      user: {
        name: "Mourad Slim Jnayeh",
        image: "/ellipse-5@2x.png",
      },
    },
    {
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod",
      user: {
        name: "Hamida Oura",
        image: "/ellipse-5@2x.png",
      },
    },
    {
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod",
      user: {
        name: "Atef Baghli",
        image: "/ellipse-5@2x.png",
      },
    },
    {
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod",
      user: {
        name: "Dhia Jaghli",
        image: "/ellipse-5@2x.png",
      },
    },
    {
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod",
      user: {
        name: "Aminus Omri",
        image: "/ellipse-5@2x.png",
      },
    },
  ];

  return (
    <section className="relative flex w-full items-end justify-center overflow-hidden bg-slate-300 text-center font-rubik text-sm py-4 px-1">
      <ReviewCarousel reviews={reviews}/>
    </section>
  );
};
export default Reviews;
