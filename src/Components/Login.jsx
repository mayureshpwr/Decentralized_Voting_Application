import React from 'react';

const Login = (props) => {
  return (
    <div className="login-container">
      {/* Background video */}
      <video
        className="background-video"
        autoPlay
        muted
        loop
        playsInline
        src="backgroundvideo.mp4" // Path to your background video
      ></video>

      {/* Login content */}
      <div className="login-content">
        <h1 className="welcome-message">"EMBRACE THE POWER OF DEMOCRACY"</h1>
        <button className="login-button" onClick={props.connectWallet}>
          Login Metamask
        </button>
      </div>

      {/* Documentation and Help button */}
      <button className="help-button" onClick={props.toggleHelp}>
        Documentation & Help
      </button>

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          color: "white",
          fontSize: "16px",
        }}
      >
        &copy; 2023 Mayuresh Pawar. All rights reserved.
      </footer>
    </div>
  );
};

export default Login;
