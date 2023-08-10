import React, { useState } from 'react';

const Register = (props) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const handleRegister = () => {
    if (name.trim() !== '' && age.trim() !== '') {
      // Assuming you have a function to handle the registration logic
      // For simplicity, let's assume it's called 'handleRegistration'
      props.handleRegistration(name, age);
    } else {
      alert('Please fill in both Name and Age fields.');
    }
  };

  return (
    <div className="register-container">
      <video
        className="background-video"
        autoPlay
        muted
        loop
        playsInline
        src="backgroundvideo.mp4" // Path to your background video
      ></video>

<h1 className="welcome-message">
          WELCOME TO DECENTRALIZED VOTING APPLICATION
        </h1>
      <form>
        <div>
          <label>Name: </label>
          <input type="text" value={name} onChange={handleNameChange} />
        </div>
        <div>
          <label>Age: </label>
          <input type="number" value={age} onChange={handleAgeChange} />
        </div>
      </form>
      <button className="register-button" onClick={handleRegister}>
        Register
      </button>

      <footer
        style={{
          textAlign: "center",
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          color: "white",
          fontSize: "17px",
        }}
      >
        &copy; 2023 Mayuresh Pawar. All rights reserved.
      </footer>
    </div>
  );
};

export default Register;
