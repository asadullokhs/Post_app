import React, { useState } from "react";
import "../Login/Login.scss";
import Input from "../../components/Input";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUserFailure,
  registerUserStart,
  registerUserSuccess,
} from "../../redux/slice/AuthSlice";
import { AuthService } from "../../services/AuthService";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { name, surname, email, password };
    dispatch(registerUserStart());
    try {
      const response = await AuthService.registerUser(user);
      dispatch(registerUserSuccess(response.token));
      navigate("/");
    } catch (error) {
      dispatch(registerUserFailure());
    }
  };
  return (
    <main className="form">
      <form>
        <h1 className="h3 fw-bold text-primary">Register</h1>

        <Input type="text" label="Name" value={name} setValue={setName} />
        <Input
          type="text"
          label="Surname"
          value={surname}
          setValue={setSurname}
        />
        <Input type="email" label="E-mail" value={email} setValue={setEmail} />
        <Input
          type="password"
          label="Password"
          value={password}
          setValue={setPassword}
        />

        <button
          onClick={(e) => handleSubmit(e)}
          className="w-100 btn btn-lg btn-primary"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "loading..." : "Register"}
        </button>
        <Link to={"/login"} className="mt-4 d-block text-decoration-none">
          Already have account?
        </Link>
      </form>
    </main>
  );
};

export default Register;
