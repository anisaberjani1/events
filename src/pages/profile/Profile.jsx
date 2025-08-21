import React, { useState } from "react";
import { Button } from "flowbite-react";
import { Link } from "react-router";
import Collection from "../../components/shared/Collection";
import { useUserEvents, useUserTickets } from "../../hooks/useEvents";
import { useUser } from "../../context/UserContext";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useUser();
  const userId = user?.sub;
  const [ticketsPage, setTicketsPage] = useState(1);
  const [eventsPage, setEventsPage] = useState(1);
  const { data: tickets, isLoading: loadingTickets } = useUserTickets(userId);
  const { data: organizedEvents, isLoading: loadingEvents } =
    useUserEvents(userId);

  const eventsFromTickets = (tickets || [])
    .map((ticket) => ticket.event)
    .filter(Boolean);

  const ticketsLimit = 3;
  const ticketsTotalPages = Math.ceil(
    (eventsFromTickets.length || 0) / ticketsLimit
  );
  const ticketsPaginated = eventsFromTickets.slice(
    (ticketsPage - 1) * ticketsLimit,
    ticketsPage * ticketsLimit
  );

  const eventsLimit = 6;
  const eventsTotalPages = Math.ceil(
    (organizedEvents?.length || 0) / eventsLimit
  );
  const eventsPaginated = (organizedEvents || []).slice(
    (eventsPage - 1) * eventsLimit,
    eventsPage * eventsLimit
  );

  if (isLoading) return <p>Loading...</p>;

  if (!isAuthenticated) {
    return (
      <div className="wrapper !my-8 text-center">
        <p className="p-medium-16 text-gray-600">
          Please log in to see your profile.
        </p>
      </div>
    );
  }

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center !py-5 !md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">My Tickets</h3>
          <Button className="button hidden sm:flex" size="lg">
            <Link to="/events">Explore More Events</Link>
          </Button>
        </div>
      </section>
      <section className="wrapper !my-8">
        {loadingTickets ? (
          <p>Loading tickets...</p>
        ) : (
          <Collection
            data={ticketsPaginated}
            emptyTitle="No event tickets purchased yet"
            emptyStateSubtext="No worries - plenty of exciting events to explore!"
            collectionType="My_Tickets"
            limit={ticketsLimit}
            page={ticketsPage}
            totalPages={ticketsTotalPages || 1}
            onPageChange={setTicketsPage}
          />
        )}
      </section>

      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center !py-5 !md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">Events Organized</h3>
          <Button className="button hidden sm:flex" size="lg">
            <Link to="/events/create">Create New Event</Link>
          </Button>
        </div>
      </section>
      <section className="wrapper !my-8">
        {loadingEvents ? (
          <p>Loading organized events...</p>
        ) : (
          <Collection
            data={eventsPaginated}
            emptyTitle="No events have been created yet"
            emptyStateSubtext="Go create some now"
            collectionType="Events_Organized"
            limit={eventsLimit}
            page={eventsPage}
            totalPages={eventsTotalPages || 1}
            onPageChange={setEventsPage}
          />
        )}
      </section>
    </>
  );
};

export default Profile;
