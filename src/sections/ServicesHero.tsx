"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  type MotionValue,
} from "motion/react";

import PillButton from "@/components/PillButton";


const EASE = [0.22, 1, 0.36, 1] as const;



const SERVICES = [
  {
    title: "BRAND",
    subtitle: "Brand Strategy",
    image: "/images/services/brand.jpg",
    items: [
      "Brand Identity",
      "Visual Direction",
      "Creative Strategy",
    ],
  },

  {
    title: "DIGITAL",
    subtitle: "Digital Marketing",
    image: "/images/services/digital.jpg",
    items: [
      "Social Media",
      "Content Creation",
      "Growth Campaigns",
    ],
  },

  {
    title: "VIDEO",
    subtitle: "Video Production",
    image: "/images/services/video.jpg",
    items: [
      "Commercial Films",
      "Short Form Content",
      "Motion Design",
    ],
  },

  {
    title: "CREATIVE",
    subtitle: "Creative Design",
    image: "/images/services/design.jpg",
    items: [
      "Web Design",
      "Campaign Design",
      "Art Direction",
    ],
  },
];



function ServiceImage({
  servicesIndex,
}: {
  servicesIndex: MotionValue<number>;
}) {


  return (

    <AnimatePresence mode="wait">

      <motion.div
        key={servicesIndex.get()}
        initial={{
          opacity: 0,
          scale: .9,
          y: 40
        }}

        animate={{
          opacity: 1,
          scale: 1,
          y: 0
        }}

        exit={{
          opacity: 0,
          scale: 1.05,
          y: -40
        }}

        transition={{
          duration: .7,
          ease: EASE
        }}

        className="
          absolute
          left-[58%]
          top-[52%]
          -translate-x-1/2
          -translate-y-1/2
          w-[260px]
md:w-[340px]
xl:w-[420px]
          aspect-square
        "
      >

        <img
          src={
            SERVICES[
              Math.round(
                servicesIndex.get()
              )
            ].image
          }

          className="
            w-full
            h-full
            object-cover
            rounded-[32px]
            border
            border-white/20
            shadow-[0_50px_120px_rgba(0,0,0,.5)]
          "

          alt=""
        />


        <div
          className="
            absolute
            bottom-5
            left-5
            bg-white
            text-black
            rounded-full
            w-12
            h-12
            flex
            items-center
            justify-center
            text-xs
          "
        >
          ▶
        </div>


      </motion.div>

    </AnimatePresence>

  );
}
export default function ServicesHero() {

  const sectionRef = useRef<HTMLElement>(null);


  const {
    scrollYProgress
  } = useScroll({

    target: sectionRef,

    offset: [
      "start start",
      "end end"
    ],

  });



  /*
    Scroll controls active service

    0 - Brand
    1 - Digital
    2 - Video
    3 - Creative
  */

  const activeService = useTransform(
    scrollYProgress,

    [
      0,
      .25,
      .5,
      .75,
      1
    ],

    [
      0,
      1,
      2,
      3,
      3
    ]

  );



  const titleScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 0.92]
  );



  return (

    <section
      ref={sectionRef}
      className="
    relative
    h-[400vh]
    bg-blue
    text-white
  "
    >


      <div

        className="
          sticky
          top-0
          h-screen
          overflow-hidden
        "

      >

        {/* BIG LEFT TEXT */}


        <motion.h1
          style={{
            scale: titleScale
          }}
          className="
    absolute
    left-[4vw]
    top-[12%]
    max-w-[900px]
    z-10
    font-heading
    font-bold
    text-[clamp(3rem,6.8vw,7rem)]
    leading-[0.92]
    tracking-tight
    text-white
  "
        >

          Clear solutions for your{" "}
          <span className="italic text-orange">
            brand&apos;s
          </span>{" "}
          growth.

        </motion.h1>






        {/* CENTER IMAGE */}

        <ServiceImage

          servicesIndex={activeService}

        />






        {/* RIGHT HUGE WORD */}


        <motion.h1

          className="
            absolute
            right-[3vw]
            bottom-[15%]
            font-heading
            font-black
            uppercase
            text-[clamp(5rem,15vw,14rem)]
            leading-[.75]
            tracking-[-.06em]
          "

        >

          <motion.div
            className="
    absolute
    right-[5vw]
    bottom-[18%]
    z-30
    text-right
  "
          >

            <p
              className="
      text-orange
      uppercase
      tracking-[.3em]
      text-xs
      font-semibold
    "
            >
              Featured Service
            </p>


            <h2
              className="
      mt-3
      font-heading
      text-4xl
      md:text-6xl
      font-bold
    "
            >
              {
                SERVICES[
                  Math.round(
                    activeService.get()
                  )
                ].subtitle
              }
            </h2>

          </motion.div>

        </motion.h1>






        {/* SERVICE LIST */}


        <div

          className="
            absolute
            left-[4vw]
bottom-[18%]
max-w-[280px]
            z-30
          "

        >

          <AnimatePresence mode="wait">

            <motion.ul

              key={
                Math.round(
                  activeService.get()
                )
              }

              initial={{
                opacity: 0,
                y: 20
              }}

              animate={{
                opacity: 1,
                y: 0
              }}

              exit={{
                opacity: 0,
                y: -20
              }}

              transition={{
                duration: .5
              }}

              className="
                space-y-3
              "

            >

              {
                SERVICES[
                  Math.round(
                    activeService.get()
                  )
                ]
                  .items
                  .map(
                    item =>
                    (

                      <li

                        key={item}

                        className="
                      flex
                      items-center
                      gap-3
                      uppercase
                      font-bold
                      text-sm
                      tracking-wide
                    "

                      >

                        <span

                          className="
                        w-3
                        h-3
                        rounded-full
                        bg-lime-300
                      "

                        />

                        {item}


                      </li>

                    )

                  )
              }


            </motion.ul>

          </AnimatePresence>


        </div>







        {/* FLOATING PROJECT CARD */}


        <div

          className="
            absolute
            right-12
            top-[28%]
            bg-white
            text-black
            rounded-[28px]
            p-3
            w-[270px]
            z-30
            flex
            gap-4
            items-center
          "

        >

          <img

            src="/images/project-thumb.jpg"

            className="
              w-20
              h-20
              rounded-2xl
              object-cover
            "

            alt=""

          />


          <div>

            <p
              className="
                text-sm
                opacity-60
              "
            >
              New project
            </p>


            <p
              className="
                font-black
                text-lg
              "
            >
              NOVA TECH
            </p>


          </div>


        </div>







        {/* CTA */}


        <div

          className="
            absolute
            left-12
            bottom-12
            z-40
          "

        >

          <PillButton href="#contact">

            Book a call

          </PillButton>


        </div>






        {/* FOOTER */}

        <div

          className="
            absolute
            bottom-10
            right-12
            text-white/60
          "

        >

        </div>



      </div>


    </section>

  );
}