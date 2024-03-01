import Image from "next/image";
import { ReviewCarousel } from "./carousels/review-carousel";

const Reviews = () => {
  const reviews = [
    {
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod",
      user: {
        name: "Mourad Slim Jnayeh",
        image: "/review.webp",
      },
    },
    {
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod",
      user: {
        name: "Hamida Oura",
        image: "/review.webp",
      },
    },
    {
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod",
      user: {
        name: "Atef Baghli",
        image: "/review.webp",
      },
    },
    {
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod",
      user: {
        name: "Dhia Jaghli",
        image: "/review.webp",
      },
    },
    {
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod",
      user: {
        name: "Aminus Omri",
        image: "/review.webp",
      },
    },
  ];

  return (
    <section
      className={`relative z-0 flex h-fit w-full flex-col items-center justify-center gap-10 overflow-hidden bg-slate-700 bg-cover p-4`}
    >
      <div className="absolute h-[120%] w-screen">
        <Image
          src="/images/reviews-back.webp"
          className="object-cover"
          fill
          alt="reviews background"
          aria-hidden
        />
      </div>
      <h2 className="z-0 text-[10dvw] font-extrabold uppercase text-white sm:text-7xl">
        reviews
      </h2>
      <ReviewCarousel reviews={reviews} />
    </section>
  );
};
export default Reviews;
