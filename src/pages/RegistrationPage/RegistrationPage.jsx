import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./RegistrationPage.module.scss";

function RegistrationPage() {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isIncorrectData, setIsIncorrectData] = useState(true);

  const checkLogin = async () => {
    const body = {
      firstname: `${firstname}`,
      lastname: `${lastname}`,
      email: `${email}`,
      phone: Number(phone),
      password: `${password}`,
    };
    try {
      const response = await fetch("http://localhost:5000/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(response);
      console.log(response.status);
      const jsonData = await response.json();
      console.log(jsonData);

      if (jsonData.message === "Success") navigate("/");
      else setIsIncorrectData(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  const onChangeFirstname = (e) => {
    setFirstname(e.target.value);
  };

  const onChangeLastname = (e) => {
    setLastname(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePhone = (e) => {
    setPhone(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className={styles.RegistrationPage}>
      <div className={styles.loginText}>
        <h1>Create New Account</h1>
        {isIncorrectData ? (
          <p>Enter your data</p>
        ) : (
          <p style={{ color: "red" }}>Login already exists</p>
        )}
      </div>

      <div className={styles.dataInputs}>
        <div className={styles.inputFields}>
          <span>Firstname</span>
          <input type="text" onChange={onChangeFirstname} />
        </div>
        <div className={styles.inputFields}>
          <span>Lastname</span>
          <input type="text" onChange={onChangeLastname} />
        </div>
        <div className={styles.inputFields}>
          <span>Email</span>
          <input type="text" onChange={onChangeEmail} />
        </div>
        <div className={styles.inputFields}>
          <span>Phone</span>
          <input type="text" onChange={onChangePhone} />
        </div>
        <div className={styles.inputFields}>
          <span>Password</span>
          <input type="password" onChange={onChangePassword} />
        </div>
      </div>

      <div className={styles.loginRegisterBtns}>
        <button onClick={checkLogin}>Regiter</button>
        <a href="/">Open Login Page</a>
      </div>
    </div>
  );
}

export default RegistrationPage;
