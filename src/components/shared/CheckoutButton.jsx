import { Button } from "flowbite-react";
import React from "react";
import { Link } from "react-router";
import Checkout from "../Checkout";

const CheckoutButton = ({ event }) => {
  // const {user} = useUser();
  // const userId = userId?.publicMetadata.userId as string
  const hasEventFinished = new Date(event.endDateTime) < new Date();
  return (
    <div className="flex items-center gap-3">
      {/* Cannot buy past event */}
      {hasEventFinished ? (
        <p className="p-2 text-red-400">
          Sorry, tickets are no longer available.
        </p>
      ) : (
        <>
          {/* SignedOut Component from auth */}
          <Button className="button rounded-full" size="lg">
            <Link to="/register">Get Tickets</Link>
          </Button>
          {/* SignedIn Component from auth */}
          <Checkout event={event} userId={"userId"} />
        </>
      )}
    </div>
  );
};

export default CheckoutButton;
