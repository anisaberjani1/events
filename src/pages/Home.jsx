import { Button } from "flowbite-react";
import React from "react";
import { Link } from "react-router";

const Home = () => {
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">
              Discover, Attend, and Celebrate Every Event Around You
            </h1>
            <p className="p-regular-20 md:p-regular-24">
              From concerts and conferences to workshops and meetups, find the
              perfect events that match your interests—anytime, anywhere.
            </p>
            <Button size="lg" className="button w-full sm:w-fit">
              <Link to="events">Explore Now</Link>
            </Button>
          </div>
          <img
            src=""
            alt="hero"
            width={1000}
            height={1000}
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
          />
        </div>
      </section>

      <section
        id="events"
        className="wrapper my-8 flex flex-col gap-8 md:gap-12"
      >
        <h2 className="h2-bold">
          Trusted by <br /> Thousands of Events
        </h2>
        <div className="flex w-full flex-col gap-5 md:flex-row">
          Search CategoryFilter
        </div>
      </section>
    </>
  );
};

export default Home;
