# blockchain-voting
Distributed Voting App based on ethereum blockchain.

Install dependencies 
```
npm install
```

Now run Ganache (Download here: https://www.trufflesuite.com/ganache) with its default settings on Port 8545.

Now open terminal in project directory and run:
```
node Deploy.js
```

The contract will be deployed and at last the contract address will be present. Copy the contract address and paste it in the index.js file (replace the old address).

Now run the application (index.html) in browser to vote.
