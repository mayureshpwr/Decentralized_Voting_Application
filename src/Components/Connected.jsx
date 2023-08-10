import React from "react";

const Connected = (props) => {
  const containerStyle = {
    backgroundImage: "url('connectedbg.jpg')",
    /* Set other background properties as needed */
    backgroundSize: "cover",
    backgroundPosition: "center",
    /* Add any other styles you want for the container */
    minHeight: "100vh", // Set a minimum height to cover the whole viewport // Change the text color for better readability
  };

  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "center",
    // Add any other styles you want for the button container
  };

  return (
    <div className="connected-container" style={containerStyle}>
      <h2 className="connected-header">You are Connected to Metamask!</h2>
      <p className="connected-account">Metamask Account: {props.account}</p>
      <p className="connected-account">Remaining Time: {props.remainingTime}</p>
      {props.showButton ? (
        <p className="connected-account">You have already voted</p>
      ) : (
        <div>
          <input
            type="number"
            placeholder="Enter Candidate Index"
            value={props.number}
            onChange={props.handleNumberChange}
          />
          <br />
          <div style={buttonContainerStyle}>
            <button className="login-button" onClick={props.voteFunction}>
              Vote
            </button>
          </div>
        </div>
      )}
      <table id="myTable" className="candidates-table">
        <thead>
          <tr>
            <th>Index</th>
            <th>Candidate name</th>
            <th>Candidate votes</th>
          </tr>
        </thead>
        <tbody>
          {props.candidates.map((candidate, index) => (
            <tr key={index}>
              <td>{candidate.index}</td>
              <td>{candidate.name}</td>
              <td>{candidate.voteCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

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

export default Connected;