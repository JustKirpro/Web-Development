import {BrowserRouter} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import Router from "./components/Router";
import Sidebar from "./components/Sidebar";
import {BookProvider} from "./hooks/useBook";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return <BookProvider>
    <BrowserRouter>
      <Sidebar />
      <Router />
      <ToastContainer />
    </BrowserRouter>
  </BookProvider>
}

export default App;