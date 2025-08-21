import React from "react";
import { Button } from "flowbite-react";
import { Link } from "react-router";
import Collection from "../../components/shared/Collection";
import { useUserEvents, useUserTickets } from "../../hooks/useEvents";
import { useUser } from "../../context/UserContext";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useUser();
  const userId = user?.sub;
  const { data: tickets, isLoading: loadingTickets } = useUserTickets(userId);
  const { data: organizedEvents, isLoading: loadingEvents } =
    useUserEvents(userId);

  const eventsFromTickets = (tickets || [])
    .map((ticket) => ticket.event)
    .filter(Boolean);

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
            data={eventsFromTickets}
            emptyTitle="No event tickets purchased yet"
            emptyStateSubtext="No worries - plenty of exciting events to explore!"
            collectionType="My_Tickets"
            limit={3}
            page={1}
            urlParamName="ordersPage"
            totalPages={2}
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
            data={organizedEvents || []}
            emptyTitle="No events have been created yet"
            emptyStateSubtext="Go create some now"
            collectionType="Events_Organized"
            limit={6}
            page={1}
            urlParamName="eventsPage"
            totalPages={2}
          />
        )}
      </section>
    </>
  );
};

export default Profile;
