import React from "react";
import Collection from "../../components/shared/Collection";
import { useAllEvents } from "../../hooks/useEvents";

const Events = () => {
  const { data: events, isLoading, isError } = useAllEvents();
  if (isLoading) return <p className="wrapper">Loading events...</p>;
  if (isError) return <p className="wrapper">Failed to load events.</p>;
  return (
    <section className="wrapper !my-8 flex flex-col gap-8 md:gap-12">
      <h2 className="h2-bold ">Find Your Next Adventure</h2>
      <div className="flex w-full flex-col gap-5 md:flex-row">
        {/* <Search />
          <CategoryFilter /> */}
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
  );
};

export default Events;
