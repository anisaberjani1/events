import React from "react";
import Collection from "../components/shared/Collection";
import Search from "../components/shared/Search";
import CategoryFilter from "../components/shared/CategoryFilter";
import Hero from "../components/home/Hero";
import { events } from "../data/mockDB";

const Home = () => {
  console.log(events);
  return (
    <>
      <Hero />
      <section className="wrapper !my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold ">
          Trusted by <br /> Thousands of Events
        </h2>
        <div className="flex w-full flex-col gap-5 md:flex-row">
          <Search />
          <CategoryFilter />
        </div>
        <Collection
          data={events}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={6}
          page={1}
          totalPages={2}
        />
      </section>
    </>
  );
};

export default Home;
