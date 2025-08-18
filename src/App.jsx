import { Route, Routes } from "react-router";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateEvent from "./pages/event/CreateEvent";
import UpdateEvent from "./pages/event/UpdateEvent";
import EventDetails from "./pages/event/EventDetails";
import Profile from "./pages/profile/Profile";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="events/create" element={<CreateEvent />} />
        <Route path="events/update" element={<UpdateEvent />} />
        <Route path="events/:eventId" element={<EventDetails />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="login" element={<Login />} />
    </Routes>
  );
}

export default App;
