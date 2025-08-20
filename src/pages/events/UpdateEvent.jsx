import React, { useEffect, useState } from "react";
import EventForm from "../../components/events/EventForm";
import { useParams } from "react-router";
import { events } from "../../data/mockDB";

const UpdateEvent = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const foundEvent = events.find((e) => e.id === id);
    setEvent(foundEvent || null);
  }, [id]);

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center !py-5 !md:py-10">
        <h3 className="wrapper h3-bold !text-center sm:text-left">
          Update Event
        </h3>
      </section>
      <div className="wrapper !my-8">
        <EventForm userId={"userId"} event={event} eventId={id} type="Update" />
      </div>
    </>
  );
};

export default UpdateEvent;
