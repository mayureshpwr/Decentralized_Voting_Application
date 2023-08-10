import React from 'react';

const Help = () => {
  return (
    <div className="help-container">
        
      <h2>Documentation and Help</h2>
      <p>
        Welcome to the Documentation and Help section of the Decentralized Voting Application.
        Here you can find information on how to use the application, frequently asked questions,
        and other helpful details.
      </p>

      <h3>Getting Started</h3>
      <p>
        To participate in the voting process, follow these steps:
      </p>
      <ol>
        <li>Click the "Login Metamask" button to connect your wallet to the application.</li>
        <li>If you haven't registered, click the "Register" button and provide your name and age.</li>
        <li>Once registered, you'll see the list of candidates and their current vote counts.</li>
        <li>Enter the index of the candidate you want to vote for in the input field.</li>
        <li>Click the "Vote" button to cast your vote. Note that once you vote, you cannot change your choice.</li>
      </ol>

      <h3>Important Information</h3>
      <ul>
        <li>Voting is only available during the specified voting period. Check the remaining time to ensure you vote on time.</li>
        <li>You can vote for only one candidate.</li>
        <li>Your vote will be stored securely on the Ethereum blockchain.</li>
        <li>Ensure your Metamask wallet is connected and has enough funds for gas fees.</li>
      </ul>

      <h3>Frequently Asked Questions </h3>
      <p>
        Here are answers to some common questions:
      </p>
      <dl>
        <dt>Q: Can I change my vote after submitting?</dt>
        <dd>A: No, once you submit your vote, it cannot be changed.</dd>

        <dt>Q: How do I verify my vote?</dt>
        <dd>A: Your vote is recorded on the Ethereum blockchain. You can verify it using a blockchain explorer.</dd>

        <dt>Q: What happens if I miss the voting period?</dt>
        <dd>A: Unfortunately, you won't be able to vote once the voting period ends. Make sure to vote before the deadline.</dd>
      </dl>

      <p>
        If you encounter any issues or need further assistance, please contact our support team at <a href="mailto:@example.com">mannpawar20@gmail.com</a>.
      </p>
      
    </div>
  );
}

export default Help;