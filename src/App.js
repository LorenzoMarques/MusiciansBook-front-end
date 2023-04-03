import { ToastContainer } from "react-toastify";
import GlobalStyle from "./globalStyle";
import AppRoutes from "./routes";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <AppRoutes />
      <ToastContainer />
    </div>
  );
}

export default App;
