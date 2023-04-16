import Header from "./components/Header";
import Tickets from "./components/Tickets";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getToken } from "./reducers/TokenReducer";
import { Routes, Route } from "react-router-dom";
import Spinner from "./components/Spinner";

const App = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const [tokenRetrieved, setTokenRetrieved] = useState(false);

  useEffect(() => {
    dispatch(getToken());
    setTokenRetrieved(true);
  }, [dispatch]);

  if (!tokenRetrieved) {
    return <Spinner />;
  }

  return (
    <>
      <Header />
      <Routes>
        {!token.isValid && <Route path="/login" element={<LoginForm />} />}
        {token.isValid && <Route path="/tickets" element={<Tickets />} />}
      </Routes>
      <Footer />
    </>
  );
};

export default App;
