import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { registerUser } from "../reducers/TokenReducer";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState("")
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);

  const handleRegisterUser = (e) => {
    if (name.length > 40 || email.length > 40 || password.length > 40) {
      setName("");
      setEmail("");
      setPassword("");
      // also set notification
      return;
    } else if (!name || email.length < 5 || password.length < 6) {
      // set notification
      return;
    }
    e.preventDefault();
    dispatch(registerUser({ name, email, password, isAdmin }));
    navigate("/tickets");
  };

  if (token.isValid) return null;

  return (
    <div className="container relative top-40 left-28">
      <form onSubmit={handleRegisterUser}>
        <label className="relative top-0 left-4 text-lg font-mono font-semibold">Register</label>
        <input
          id="admin"
          className="relative ml-16"
          value={isAdmin}
          onChange={({ target }) => setIsAdmin(target.value)}
          type="checkbox"
        />
        <label
          htmlFor="admin"
          className="ml-2 font-mono font-semibold"
        >
          Admin?
        </label>

        <div className="">
          <label
            htmlFor="name"
            className="relative ml-4 text-sm font-medium text-black"
          >
            Display Name
          </label>
          <input
            type="name"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mx-4"
            placeholder="Name"
            value={name}
            onChange={({ target }) => setName(target.value)}
            required
          />
        </div>

        <div className="">
          <label
            htmlFor="email"
            className="relative ml-4 text-sm font-medium text-black"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mx-4 "
            placeholder="person@email.com"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="relative ml-4 text-sm font-medium text-black"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mx-4"
            placeholder="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm md:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-4"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
