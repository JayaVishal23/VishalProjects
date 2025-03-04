import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const API_URL = "http://localhost:5000";

const Signup = () => {
  const [data, setData] = useState({
    email: "",
    fullname: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const [err, setErr] = useState(false);

  function handleChange(event) {
    setData({ ...data, [event.target.name]: event.target.value });
  }
  async function submitForm(event) {
    event.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:5000/api/auth/signup`,
        data
      );

      toast.success("User Registered");
      navigate("/login"); // Redirect to login page
      localStorage.setItem("token", res.data.token); // Assuming token is returned
      setErr(false);
    } catch (error) {
      setErr(true);
      toast.error(error.response?.data?.error || "Something went wrong");
    }
  }

  return (
    <div className="flex justify-center items-center h-[90vh] ">
      <form
        onSubmit={submitForm}
        className="flex flex-col  justify-center items-center p-7 border-2 border-blue-900 rounded-t-lg rounded-b-lg"
      >
        <h2 className="text-3xl font-extrabold mb-8">Signup</h2>
        <div className="inp-name border mb-4 rounded">
          <input
            type="input"
            required
            name="fullname"
            placeholder="Enter Name"
            value={data.fullname}
            onChange={handleChange}
            className="text-base p-2 w-64 "
          />
        </div>
        <div className="inp-name border mb-4 rounded">
          <input
            type="input"
            required
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={handleChange}
            className="text-base p-2 w-64 "
          />
        </div>
        <div className="flex justify-between w-64 mb-2 gap-2">
          <div className="inp-name border mb-6 rounded">
            <input
              type="input"
              required
              name="username"
              value={data.username}
              onChange={handleChange}
              placeholder="Username"
              className="text-base p-2 w-30 "
            />
          </div>
          <div className="inp-pass border mb-6 rounded">
            <input
              type="password"
              required
              name="password"
              value={data.password}
              onChange={handleChange}
              placeholder="Password"
              className="text-base p-2 w-30 "
            />
          </div>
        </div>
        <div className="login-btn w-full mb-6">
          <button className="btn btn-wide btn-active text-base btn-primary rounded-3xl">
            Signup
          </button>
        </div>
        <p className="mb-2">Already have Account?</p>
        <div className="login-btn w-full">
          <button
            onClick={() => navigate("/login")}
            className="btn btn-wide btn-outline text-base btn-primary rounded-3xl"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
