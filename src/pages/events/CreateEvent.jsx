import React from "react";
import EventForm from "../../components/events/EventForm";
import { useUser } from "../../context/UserContext";

const CreateEvent = () => {
  const { isAuthenticated, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="wrapper !my-8 text-center">
        <p className="p-medium-16 text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="wrapper !my-8 text-center">
        <p className="p-medium-16 text-gray-600">
          You must be logged in to create an event.
        </p>
      </div>
    );
  }

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center !py-5 !md:py-10">
        <h3 className="wrapper h3-bold !text-center sm:text-left">
          Create Event
        </h3>
      </section>
      <div className="wrapper !my-8">
        <EventForm type="Create" />
      </div>
    </>
  );
};

export default CreateEvent;
