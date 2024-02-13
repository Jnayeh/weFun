"use client"

import { NextPage } from "next";
import React from "react";

const Reviews: NextPage = () => {
  const reviews = [
    {
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod",
      user: {
        name: "Jane Doe",
        image: "/ellipse-5@2x.png",
      },
    },
    {
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod",
      user: {
        name: "Jane Doe",
        image: "/ellipse-5@2x.png",
      },
    },
    {
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod",
      user: {
        name: "Jane Doe",
        image: "/ellipse-5@2x.png",
      },
    },
    {
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod",
      user: {
        name: "Jane Doe",
        image: "/ellipse-5@2x.png",
      },
    },
  ];

  const [cards] = React.useState(reviews);

  return (
    <section className="relative flex h-[35vh] w-full items-end justify-center overflow-hidden bg-slate-300 text-center font-rubik text-sm ">
      <ul className="relative h-[70%] w-[80%] max-w-md ">
        {cards.map((review, index) => {
          return (
            <li
              key={index}
              className={`list-none rounded-md bg-slate-200 shadow-sm shadow-gray-700 `}
            >{review.description}</li>
          );
        })}
      </ul>
    </section>
  );
};
export default Reviews;
