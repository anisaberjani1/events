import { Route, Routes } from "react-router";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import CreateEvent from "./pages/events/CreateEvent";
import UpdateEvent from "./pages/events/UpdateEvent";
import EventDetails from "./pages/events/EventDetails";
import Profile from "./pages/profile/Profile";
import Events from "./pages/events/Events";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="events/:id" element={<EventDetails />} />
        <Route path="profile" element={<Profile />} />
        <Route path="events" element={<Events />} />
        <Route path="events/create" element={<CreateEvent />} />
        <Route path="events/update/:id" element={<UpdateEvent />} />
      </Route>
    </Routes>
  );
}

export default App;
