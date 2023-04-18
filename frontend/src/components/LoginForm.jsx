import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { logUserIn } from "../reducers/TokenReducer";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);

  const handleLogin = (e) => {
    if (email.length > 40 || password.length > 40) {
      setEmail("");
      setPassword("");
      return;
    } else if (email.length < 5 || password.length < 6) {
      return;
    }
    e.preventDefault();
    dispatch(logUserIn({ email, password }));
    navigate("/tickets");
  };

  if (token.isValid) return null;

  return (
    <form onSubmit={handleLogin}>
      <div className="">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your email
        </label>
        <input
          type="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mx-4"
          placeholder="mike@gmail.com"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your password
        </label>
        <input
          type="password"
          id="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mx-4"
          placeholder="secret"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-4"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
