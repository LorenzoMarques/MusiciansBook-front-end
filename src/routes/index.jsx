import { Route, Routes } from "react-router-dom";
import ChatPage from "../pages/chat";
import FeedPage from "../pages/feed";
import LoginRegisterPage from "../pages/loginRegisterPage";
import ProfilePage from "../pages/profile";

const AppRoutes = ({ setSong }) => {
  return (
    <Routes>
      <Route path="/" element={<LoginRegisterPage />} />
      <Route path="/feed" element={<FeedPage setSong={setSong} />} />
      <Route path="/profile/:id" element={<ProfilePage setSong={setSong} />} />
      <Route path="/chat" element={<ChatPage />} />
    </Routes>
  );
};

export default AppRoutes;
