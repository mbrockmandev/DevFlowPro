import Header from "./components/Header";
import Tickets from "./components/Tickets";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getToken } from "./reducers/TokenReducer";
import { Routes, Route, useNavigate } from "react-router-dom";
import Spinner from "./components/Spinner";
import Admin from "./components/Admin";
import ApiLanding from "./components/api/Landing";
import RegisterForm from "./components/RegisterForm";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const [tokenRetrieved, setTokenRetrieved] = useState(false);

  useEffect(() => {
    const retrieveToken = (() => {
      dispatch(getToken());
      if (!token.isValid) {
        navigate('/login');
      } else {
        navigate('/tickets')
      }
      setTokenRetrieved(true);
    });
    retrieveToken();
  }, []);

  if (!tokenRetrieved) {
    return <Spinner />;
  }

  return (
    <>
      <Header />
      <Routes>
        {!token.isValid && <Route path="/login" element={<LoginForm />} />}
        {!token.isValid && <Route path="/register" element={<RegisterForm />} />}
        {token.isValid && <Route path="/tickets" element={<Tickets />} />}
        {token.isValid && <Route path="/admin" element={<Admin />} />}
        {token.isValid && <Route path="/api/help" element={<ApiLanding />} />}
      </Routes>
      <Footer />
    </>
  );
};

export default App;
