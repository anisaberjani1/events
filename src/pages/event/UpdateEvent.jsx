import React from "react";
import EventForm from "../../components/events/EventForm";

// type UpdateEventProps = {
//   params: {
//     id:String
//   }
// }

const UpdateEvent = ({params}) => {
  // const { sessionClaims } = auth();
  // const userId = sessionClaims?.userId as string
  // const event = await getEventById(id)


  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          Update Event
        </h3>
      </section>
      <div className="wrapper my-8">
        <EventForm userId={"userId"} event={'event'} eventId={'event.id'} type="Update" />
      </div>
    </>
  );
};

export default UpdateEvent;
