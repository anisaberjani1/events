import React, { useEffect, useState, useMemo } from "react";
import Collection from "../../components/shared/Collection";
import { useAllEvents } from "../../hooks/useEvents";
import Search from "../../components/shared/Search";

const Events = () => {
  const [inputValue, setInputValue] = useState("");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery(inputValue);
    }, 300);
    return () => clearTimeout(timer);
  }, [inputValue]);

  const { data: events, isLoading, isError } = useAllEvents({ query });

  const categories = useMemo(() => {
    if (!events) return ["All"];
    return [
      "All",
      ...Array.from(new Set(events.map((e) => e.category).filter(Boolean))),
    ];
  }, [events]);

  const filteredEvents = useMemo(() => {
    if (!events) return [];
    return category === "All"
      ? events
      : events.filter(
          (event) =>
            event.category &&
            event.category.toLowerCase() === category.toLowerCase()
        );
  }, [events, category]);

  if (isLoading) return <p className="wrapper">Loading events...</p>;
  if (isError) return <p className="wrapper">Failed to load events.</p>;

  return (
    <section className="wrapper !my-8 flex flex-col gap-8 md:gap-12">
      <h2 className="h2-bold">Find Your Next Adventure</h2>

      <div className="flex w-full flex-col gap-5 md:flex-row">
        <Search query={query} setQuery={setInputValue} />

        <div className="relative w-full md:w-60">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full cursor-pointer bg-gray-50 !px-4 !py-3.5 border border-gray-200 rounded-full text-gray-700 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Collection
        data={filteredEvents}
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
