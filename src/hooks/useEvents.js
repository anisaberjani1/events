import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createEvent,
  deleteEvent,
  fetchEventById,
  fetchEvents,
  fetchEventsByOrganizer,
  fetchTicketsByUser,
  updateEvent,
} from "../lib/api";

export const useEvent = (id) => {
  return useQuery({
    queryKey: ["event", id],
    queryFn: () => fetchEventById(id),
  });
};

export const useAllEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });
};

export const useUserTickets = (userId) =>
  useQuery({
    queryKey: ["tickets", userId],
    queryFn: () => fetchTicketsByUser(userId),
  });

export const useUserEvents = (userId) =>
  useQuery({
    queryKey: ["organizedEvents", userId],
    queryFn: () => fetchEventsByOrganizer(userId),
  });

export const useCreateEvent = (userId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (eventData) => createEvent(eventData),
    onSuccess: () => {
      queryClient.invalidateQueries(["events"]);
      queryClient.invalidateQueries(["organizedEvents", userId]);
    },
  });
};

export const useUpdateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...eventData }) => updateEvent(id, eventData),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["events"]);
      queryClient.invalidateQueries(["organizedEvents", variables.organizerId]);
      queryClient.invalidateQueries(["event", variables.id]);
    },
  });
};
export const useDeleteEvent = (userId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteEvent(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries(["events"]);
      queryClient.invalidateQueries(["organizedEvents", userId]);
      queryClient.invalidateQueries(["event", id]);
    },
  });
};
