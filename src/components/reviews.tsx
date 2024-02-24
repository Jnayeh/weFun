import { ReviewCarousel } from "./ui/carousels/review-carousel";

const Reviews = () => {
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
    <section className={`w-full aspect-video flex flex-col justify-center items-center bg-slate-700 p-4 z-0 gap-10 bg-[url("/images/reviews-back.jpg")] bg-cover`}>
      <h2 className="text-[10dvw] sm:text-7xl font-extrabold uppercase text-white ">reviews</h2>
      <ReviewCarousel reviews={reviews}/>
    </section>
  );
};
export default Reviews;
