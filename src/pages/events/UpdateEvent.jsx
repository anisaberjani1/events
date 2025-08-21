import React from "react";
import EventForm from "../../components/events/EventForm";
import { useParams } from "react-router";
import { useEvent } from "../../hooks/useEvents";

const UpdateEvent = () => {
  const { id } = useParams();
  const { data: event, isLoading } = useEvent(id);

  if (isLoading) return <p>Loading event...</p>;

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center !py-5 !md:py-10">
        <h3 className="wrapper h3-bold !text-center sm:text-left">
          Update Event
        </h3>
      </section>
      <div className="wrapper !my-8">
        <EventForm event={event} eventId={id} type="Update" />
      </div>
    </>
  );
};

export default UpdateEvent;
