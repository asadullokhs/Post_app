import React, { useState } from "react";
import "./Login.scss";
import Input from "../../components/Input";
import { AuthService } from "../../services/AuthService";
import { useDispatch, useSelector } from "react-redux";
import {
  userLoginStart,
  userLoginSuccess,
  userLoginFailure,
  getUserInfoSuccess,
} from "../../redux/slice/AuthSlice";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { isLoading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    dispatch(userLoginStart());
    let user = { email, password };
    try {
      const response = await AuthService.loginUser(user);
      dispatch(userLoginSuccess(response.token));
      const userInfo = await AuthService.getUser(response.token);
      dispatch(getUserInfoSuccess(userInfo));
      navigate("/");
    } catch (error) {
      dispatch(userLoginFailure());
    }
  };
  return (
    <main className="form">
      <form>
        <h1 className="h3 fw-bold text-primary">Login</h1>

        <Input type="email" label="E-mail" value={email} setValue={setEmail} />
        <Input
          type="password"
          label="Password"
          value={password}
          setValue={setPassword}
        />
        <button
          className="w-100 btn btn-lg btn-primary"
          type="button"
          disabled={isLoading}
          onClick={handleSubmit}
        >
          {isLoading ? "loading..." : "Login"}
        </button>
        <Link to={"/register"} className="mt-4 d-block text-decoration-none">
          Don't have account?
        </Link>
      </form>
    </main>
  );
};

export default Login;
