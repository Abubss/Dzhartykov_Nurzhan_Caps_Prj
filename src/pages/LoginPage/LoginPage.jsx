import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./LoginPage.module.scss";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isIncorrectData, setIsIncorrectData] = useState(true);

  const checkLogin = async () => {
    const body = {
      email: `${email}`,
      password: `${password}`,
    };
    try {
      const response = await fetch("http://localhost:5000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(response);
      console.log(response.status);
      const jsonData = await response.json();
      console.log(jsonData);

      if (jsonData.message === "Success") navigate("/home");
      else setIsIncorrectData(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className={styles.LoginPage}>
      <div className={styles.loginText}>
        <h1>Welcome Back</h1>
        {isIncorrectData ? (
          <p>Log in to continue</p>
        ) : (
          <p style={{ color: "red" }}>Login or password incorrect</p>
        )}
      </div>

      <div className={styles.dataInputs}>
        <div className={styles.inputFields}>
          <span>Email</span>
          <input type="email" onChange={onChangeEmail} />
        </div>
        <div className={styles.inputFields}>
          <span>Password</span>
          <input type="password" onChange={onChangePassword} />
        </div>
      </div>

      <div className={styles.loginRegisterBtns}>
        <button onClick={checkLogin}>Login</button>
        <a href="/register">Open Register Page</a>
      </div>
    </div>
  );
}

export default LoginPage;
