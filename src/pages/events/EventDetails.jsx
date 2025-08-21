import React, { useState } from "react";
import { useParams } from "react-router";

import CheckoutButton from "../../components/shared/CheckoutButton";
import calendar from "../../assets/icons/calendar.svg";
import location from "../../assets/icons/location.svg";
import Collection from "../../components/shared/Collection";
import { useAllEvents, useEvent } from "../../hooks/useEvents";

const formatDateTime = (date) => {
  const d = new Date(date);
  return {
    dateOnly: d.toLocaleDateString(),
    timeOnly: d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  };
};

const EventDetails = () => {
  const { id } = useParams();
  const { data: event, isLoading, isError } = useEvent(id);
  const { data: allEvents } = useAllEvents();

  const [page, setPage] = useState(1);
  const limit = 3;

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError || !event)
    return <p className="text-center mt-10">Event not found</p>;

  const relatedEvents = allEvents?.filter((e) => e.category === event.category);

  const totalPages = Math.ceil(relatedEvents.length / limit);
  const paginatedEvents = relatedEvents.slice((page - 1) * limit, page * limit);
  return (
    <>
      <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
        <div className="!grid !grid-cols-1 !md:grid-cols-2 !2xl:max-w-7xl !p-6">
          <img
            src={event.imageUrl}
            alt="hero image"
            width={1000}
            height={1000}
            className="h-full min-h-[300px] object-cover object-center rounded-4xl"
          />
          <div className="flex w-full flex-col gap-8 !p-5 md:p-10">
            <div className="flex flex-col gap-6">
              <h2 className="h2-bold">{event.title}</h2>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex gap-3">
                  <p className="p-bold-20 rounded-full bg-green-500/10 !px-5 !py-2 text-green-700">
                    {event.isFree ? "FREE" : `$${event.price}`}
                  </p>
                  <p className="p-medium-16 rounded-full bg-gray-500/10 !px-4 !py-2.5 text-grey-500">
                    {event.category}
                  </p>
                </div>
                <p className="p-medium-18 ml-2 mt-2 sm:mt-0">
                  by{" "}
                  <span className="text-primary-500">
                    {event.organizerName}
                  </span>
                </p>
              </div>
            </div>

            <CheckoutButton event={event} />

            <div className="flex flex-col gap-5">
              <div className="flex gap-2 md:gap-3">
                <img src={calendar} alt="calendar" width={32} height={32} />
                <div className="p-medium-16 lg:p-regular-20 flex flex-wrap items-center gap-4">
                  <p>
                    {formatDateTime(event.startDateTime).dateOnly} -{" "}
                    {formatDateTime(event.startDateTime).timeOnly}
                  </p>
                  <p>
                    {formatDateTime(event.endDateTime).dateOnly} -{" "}
                    {formatDateTime(event.endDateTime).timeOnly}
                  </p>
                </div>
              </div>
              <div className="p-regular-20 flex items-center gap-3">
                <img src={location} alt="location" width={32} height={32} />
                <p className="p-medium-16 lg:p-regular-20">{event.location}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="p-bold-20 text-gray-600">What You'll Learn</p>
              <p className="p-medium-16 lg:p-regular-18">{event.description}</p>
              <p className="p-medium-16 lg:p-regular-18 truncate text-primary-500 underline">
                {event.url}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="wrapper !my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Related Events</h2>
        <Collection
          data={paginatedEvents}
          emptyTitle="No related events found!"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={limit}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </section>
    </>
  );
};

export default EventDetails;
