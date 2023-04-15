import Header from "./components/Header";
import Tickets from "./components/Tickets";
import Footer from "./components/Footer";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  const [token] = useSelector((state) => state.token);

  return (
    <div className="App container">
      <Header />
      <Tickets />
      <Footer />
    </div>
  );
};

export default App;
