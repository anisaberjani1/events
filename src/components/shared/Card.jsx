import React from "react";
import { Link } from "react-router";
import edit from "../../assets/icons/edit.svg"
import DeleteConfirmation from "./DeleteConfirmation";

const formatDateTime = (date) => {
  const d = new Date(date);
  return {
    dateOnly: d.toLocaleDateString(),
    timeOnly: d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  };
};

const Card = ({ event, hasOrderLink, hidePrice }) => {
  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
      <Link
        to={`/events/${event.id}`}
        style={{ backgroundImage: `url(${event.imageUrl})` }}
        className="flex-center flex-grow !bg-gray-50 bg-cover bg-center text-gray-500"
      />
      {/* IS EVENT CREATOR.... */}
      {/* {isEventCreator && !hidePrice && ( */}
        <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white !p-3 shadow-sm transition-all">
            <Link to={`/events/update/${event.id}`} >
                <img src={edit} alt="edit" width={20} height={20}/>
            </Link>
            <DeleteConfirmation eventId={event.id}/> 
        </div>
      {/* )} */}

      <div className="flex min-h-[230px] flex-col gap-3 !p-5 md:gap-4">
        {!hidePrice && (
          <div className="flex gap-2">
            <span className="p-semibold-14 w-min rounded-full bg-green-100 !px-4 !py-1 text-green-600">
              {event.isFree ? "FREE" : `$${event.price}`}
            </span>
            <p className="p-semibold-14 w-min rounded-full bg-gray-500/10 !px-4 !py-1 text-gray-500 !line-clamp-1">
              {event.category}
            </p>
          </div>
        )}
        <p className="p-medium-16 p-medium-18 text-gray-500">
          {formatDateTime(event.startDateTime).dateTime}
        </p>
        <Link to={`/events/${event.id}`}>
          <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">
            {event.title}
          </p>
        </Link>
        <div className="flex-between w-full !pt-18">
          <p className="p-medium-14 md:p-medium-16 text-gray-600">
            event.organizerId
          </p>
          {hasOrderLink && (
            <Link to={`orders?eventId=${event.id}`} className="flex gap-2">
              <p className="text-primary-500">Order Details</p>
              {/* <img src="/icons/arrow.svg" alt="search" width={10} height={10}/> */}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
