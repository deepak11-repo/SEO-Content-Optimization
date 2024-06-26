import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import UserInput from "./components/UserInput/UserInput";
import MainTab from "./components/MainTab/MainTab";

function App() {
  const [formValid, setFormValid] = useState(false);

  const handleFormValid = (isValid) => {
    setFormValid(isValid);
  };

  return (
    <>
      <Navbar />
      <UserInput onFormValid={handleFormValid} />
      {formValid && <MainTab />}
    </>
  );
}

export default App;
