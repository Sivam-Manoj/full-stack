import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { useRegisterAPIMutation } from "../store/slices/userApiSlice";
import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoggedIn } = useSelector((state) => state.auth);

  const [registerApi, { isLoading }] = useRegisterAPIMutation();
  const reset = () => {
    setName(""), setEmail(""), setPassword("");
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name || !email || !password) {
      toast.error("All fields need to be filled");
      return;
    }
    try {
      await registerApi({ name, email, password }).unwrap();
      toast.success("registration succesful");
      reset();
    } catch (error) {
      toast.error("Registration failed");
    }
  };

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
            Get started today
          </h1>
          <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
            create a Admin user to manage this application
          </p>
          <form
            onSubmit={handleSubmit}
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
          >
            <p className="text-center text-lg font-medium">
              Create Admin account
            </p>
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <button
              type="submit"
              className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
            >
              {isLoading ? "Loading..." : "Register User"}
            </button>
            <p className="text-center text-sm text-gray-500">
              <Link className="underline" to="/admin">
                Home
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
