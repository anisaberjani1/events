import React, { useEffect, useState, useMemo } from "react";
import Collection from "../../components/shared/Collection";
import { useAllEvents } from "../../hooks/useEvents";
import Search from "../../components/shared/Search";

const Events = () => {
  const [inputValue, setInputValue] = useState("");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const limit = 9;

  useEffect(() => {
    const t = setTimeout(() => setQuery(inputValue), 300);
    return () => clearTimeout(t);
  }, [inputValue]);

  const { data: events = [], isLoading, isError } = useAllEvents();

  const categories = useMemo(() => {
    const unique = new Set(events.map((e) => e.category).filter(Boolean));
    return ["All", ...unique];
  }, [events]);

  const filteredEvents = useMemo(() => {
    const q = query.trim().toLowerCase();
    const hasQuery = q.length > 0;

    return events.filter((e) => {
      const inCategory =
        category === "All" ||
        (e.category && e.category.toLowerCase() === category.toLowerCase());

      const matchesQuery = !hasQuery
        ? true
        : (e.title || "").toLowerCase().includes(q);

      return inCategory && matchesQuery;
    });
  }, [events, query, category]);

  const totalPages = Math.ceil(filteredEvents.length / limit);
  const paginatedEvents = useMemo(() => {
    const start = (page - 1) * limit;
    return filteredEvents.slice(start, start + limit);
  }, [filteredEvents, page]);

  useEffect(() => {
    setPage(1);
  }, [query, category]);

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
        data={paginatedEvents}
        emptyTitle="No Events Found"
        emptyStateSubtext="Come back later"
        collectionType="All_Events"
        limit={limit}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </section>
  );
};

export default Events;
