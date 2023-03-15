import { ToastContainer } from "react-toastify";
import GlobalStyle from "./globalStyle";
import AppRoutes from "./routes";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { AudioContainer } from "./pages/feed/style";
import { BsChevronDoubleDown, BsChevronDoubleUp } from "react-icons/bs";
import AudioPlayer from "react-h5-audio-player";

function App() {
  const [song, setSong] = useState();
  const [isHidden, setIsHidden] = useState(false);

  return (
    <div className="App">
      <GlobalStyle />
      <AppRoutes setSong={setSong} />
      <ToastContainer />
      {song && (
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
            src={song}
            onPlay={(e) => console.log("onPlay")}
          />
        </AudioContainer>
      )}
    </div>
  );
}

export default App;
