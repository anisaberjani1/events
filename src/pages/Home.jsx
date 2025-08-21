import React from "react";
import Collection from "../components/shared/Collection";
import Search from "../components/shared/Search";
import CategoryFilter from "../components/shared/CategoryFilter";
import Hero from "../components/home/Hero";
import { useAllEvents } from "../hooks/useEvents";

const Home = () => {
  const { data: events, isLoading, isError } = useAllEvents();
  if (isLoading) return <p className="wrapper">Loading events...</p>;
  if (isError) return <p className="wrapper">Failed to load events.</p>;

  const randomEvents = events.sort(() => Math.random() - 0.5).slice(0, 6);
  return (
    <>
      <Hero />
      <section className="wrapper !my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold ">
          Trusted by <br /> Thousands of Events
        </h2>
        <Collection
          data={randomEvents}
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
