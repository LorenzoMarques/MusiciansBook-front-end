import { Route, Routes } from "react-router-dom";
import ChatPage from "../pages/chat";
import FeedPage from "../pages/feed";
import LoginRegisterPage from "../pages/loginRegisterPage";
import ProfilePage from "../pages/profile";
import { AudioContainer } from "../pages/feed/style";
import { BsChevronDoubleDown, BsChevronDoubleUp } from "react-icons/bs";
import AudioPlayer from "react-h5-audio-player";
import { useEffect, useState } from "react";
import apiJamendo from "../api/apiJamento";

const AppRoutes = () => {
  const [isHidden, setIsHidden] = useState(false);
  const [playlist, setPlaylist] = useState([]);

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  useEffect(() => {
    console.log(playlist);
  }, [playlist]);
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginRegisterPage />} />
        <Route
          path="/feed"
          element={
            <FeedPage
              setPlaylist={setPlaylist}
              playlist={playlist}
              setCurrentTrackIndex={setCurrentTrackIndex}
            />
          }
        />
        <Route
          path="/profile/:id"
          element={
            <ProfilePage
              setPlaylist={setPlaylist}
              playlist={playlist}
              setCurrentTrackIndex={setCurrentTrackIndex}
            />
          }
        />
        <Route
          path="/chat"
          element={
            <ChatPage
              setPlaylist={setPlaylist}
              playlist={playlist}
              setCurrentTrackIndex={setCurrentTrackIndex}
            />
          }
        />
      </Routes>

      {playlist[0] && (
        <AudioContainer isHidden={isHidden}>
          <button
            onClick={() => {
              setIsHidden(!isHidden);
              console.log(isHidden);
            }}
          >
            {!isHidden ? (
              <BsChevronDoubleDown size={25} color={"var(--color-grey2)"} />
            ) : (
              <BsChevronDoubleUp size={25} color={"var(--color-grey2)"} />
            )}
          </button>

          <AudioPlayer
            autoPlay
            src={playlist[currentTrackIndex].audio}
            onPlay={(e) => console.log("onPlay")}
            onEnded={() => {
              console.log(playlist);
              if (currentTrackIndex + 1 < playlist.length) {
                setCurrentTrackIndex(currentTrackIndex + 1);
              } else {
                apiJamendo
                  .get(
                    `/v3.0/tracks/?client_id=${process.env.REACT_APP_CLIENT_ID}&format=json&limit=20&fuzzytags=groove+rock&speed=high+veryhigh&include=musicinfo&groupby=artist_id`
                  )
                  .then((res) => {
                    const data = res.data.results;
                    const filteredData = [];

                    for (let i = 0; i < data.length; i++) {
                      const findSong = playlist.find(
                        (element) => element.id === data[i].id
                      );
                      console.log(findSong);
                      if (!findSong && data[i].audio !== ``) {
                        filteredData.push(data[i]);
                      }
                    }

                    setPlaylist([...playlist, ...filteredData]);
                    if (filteredData.length > 0) {
                      setCurrentTrackIndex(currentTrackIndex + 1);
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            }}
          />
        </AudioContainer>
      )}
    </>
  );
};

export default AppRoutes;
