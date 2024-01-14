import { motion, useTransform, useScroll } from "framer-motion";
import { NextPage } from "next";
import React from "react";

const CARD_COLORS = ["#266678", "#cb7c7a", " #36a18b", "#cda35f", "#747474"];
const CARD_OFFSET = 10;
const SCALE_FACTOR = 0.06;

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
  ];

  const [cards, setCards] = React.useState(CARD_COLORS);
  const y = useTransform(useScroll().scrollY, [0, 1], [0, 1]);

  return (
    <section className="h-[25vh] relative flex w-full items-end justify-center overflow-hidden bg-slate-300 text-center font-rubik text-sm ">
      <ul className="relative h-[70%] w-[80%] max-w-md ">
        {cards.map((color, index) => {
          const canDrag = index === 0;

          return (
            <motion.li
              key={color}
              style={{
                backgroundColor: color,
                cursor: canDrag ? "grab" : "auto",
              }}
              className="absolute h-[90%] w-[90%] origin-top list-none rounded-md shadow-md"
              animate={{
                top: index * -CARD_OFFSET,
                scale: 1 - index * SCALE_FACTOR,
                zIndex: CARD_COLORS.length - index,
              }}
              drag={canDrag ? "y" : false}
              dragConstraints={{
                top: 0,
                bottom: 0,
              }}
              onDrag={(e) => {
                let el = e.target as HTMLElement;
                el?.style.setProperty("cursor", "grabbing", "important");
              }}
            />
          );
        })}
      </ul>
    </section>
  );
};
export default Reviews;
