import { Button } from "flowbite-react";
import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { buyTicket } from "../../lib/api";
import { useNavigate } from "react-router";
import { useUser } from "../../context/UserContext";

const CheckoutButton = ({ event }) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useUser();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: buyTicket,
    onSuccess: () => {
      queryClient.invalidateQueries(["tickets", user.sub]);
      alert("Ticket purchased successfully!");
      navigate("/profile");
    },
    onError: () => {
      alert("Something went wrong!");
    },
  });

  const handleBuyTicket = () => {
    if (!isAuthenticated) {
      alert("You need to log in to buy tickets!");
      return;
    }

    mutation.mutate({
      buyerId: user.sub,
      eventId: event.id,
      status: "confirmed",
      price: event.isFree ? 0 : event.price,
      event: {
        id: event.id,
        title: event.title,
        imageUrl: event.imageUrl,
        startDateTime: event.startDateTime,
        endDateTime: event.endDateTime,
        location: event.location,
        organizerId: event.organizerId,
        organizerName: event.organizerName,
      },
    });
  };

  const hasEventFinished = new Date(event.endDateTime) < new Date();

  return (
    <div className="flex items-center gap-3">
      {hasEventFinished ? (
        <p className="p-2 text-red-400">
          Sorry, tickets are no longer available.
        </p>
      ) : (
        <Button
          className="button rounded-full"
          size="lg"
          onClick={handleBuyTicket}
        >
          Get Tickets
        </Button>
      )}
    </div>
  );
};

export default CheckoutButton;
