# Certificate DApp

The **Certificate DApp** is a decentralized application that allows the issuance and verification of certificates securely on the blockchain. This DApp leverages **Ethereum** blockchain technology and **smart contracts** to ensure the integrity and authenticity of issued certificates. Built using **React** for the frontend and **Solidity** for the smart contract, this project ensures that certificate data remains tamper-proof and accessible to everyone.

## ✨ Features

- **Issue Certificates:** Only the admin account (who deployed the smart contract) can issue new certificates by connecting to MetaMask.
- **View Certificates:** Anyone can view issued certificates by connecting their MetaMask wallet.
- **Blockchain Storage:** All certificate details are stored on the blockchain, ensuring they are secure, immutable, and verifiable.
- **MetaMask Integration:** Connect your MetaMask wallet to interact with the DApp. Ensure you're on the correct network to interact with the deployed smart contract.

## 🚀 Getting Started

To get the Certificate DApp up and running on your local machine, follow these steps:

### Prerequisites

Ensure you have **Node.js**, **MetaMask**, and a preferred smart contract deployment tool installed.

### Smart Contract Deployment

1. **Deploy the Smart Contract:**

   - Deploy the `Cert.sol` smart contract located in the `contracts` folder using your preferred deployment application (e.g., **Hardhat**, **Truffle**, **Remix**, etc.).

   - After deploying, copy the contract ABI from the generated `Cert.json` file. Depending on your deployment tool, this file will be generated in the corresponding `artifacts` or `build` folder.

   - Paste the ABI into the `Cert.json` file located in the `src/scdata` folder of your project.

   - Copy the deployed contract address and paste it into the `deployed_addresses.json` file in the `src/scdata` folder.

### Installation

2. **Clone the repository:**

   ```bash
   git clone https://github.com/akhilkailas017/Certificate-dApp.git
   cd certificate-dapp
   ```

3. **Install the dependencies:**

   ```bash
   npm install
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```

5. **Connect MetaMask:**
   - Open MetaMask in your browser.
   - Connect to the correct network where the smart contract is deployed.

6. **Done!** Now you can start issuing and viewing certificates on the blockchain.

## 🔗 Connecting to MetaMask

- Before issuing or viewing certificates, make sure to connect your MetaMask wallet.
- Only the **admin account** (the account that deployed the smart contract) can issue certificates.
- Any connected user can view the issued certificates.

## 📜 Smart Contract Details

- **Technology Used:** React, Solidity
- **Smart Contract Deployment:** Can be deployed using **Hardhat**, **Truffle**, **Remix**, or any preferred application.
- **Smart Contract ABI and Address:** 
  - ABI: Stored in `src/scdata/Cert.json`.
  - Address: Stored in `src/scdata/deployed_addresses.json`.

## 👤 Admin Access

- The account that deploys the smart contract becomes the **admin**. This account has exclusive rights to issue certificates.
- Ensure that your MetaMask wallet is connected to the admin account to access the certificate issuance page.

## 🛠️ Tech Stack

- **Frontend:** React.js
- **Blockchain:** Ethereum
- **Smart Contract Language:** Solidity
- **Wallet Integration:** MetaMask

## 📝 Usage

1. **Issue Certificate:**
   - Navigate to the "Issue Certificate" page.
   - Ensure you're connected to MetaMask as the admin.
   - Fill in the certificate details and click "Issue".

2. **View Certificate:**
   - Navigate to the "View Certificate" page.
   - Connect to MetaMask with any account.
   - Enter the certificate ID to view its details on the blockchain.

## 🎥 Demo Video


[![Certifcate Dapp](https://img.youtube.com/vi/5krMRJRKiDY/0.jpg)](https://www.youtube.com/watch?v=5krMRJRKiDY)

## 📧 Contact

For any questions or issues, please contact [akhilkailas2001@gmail.com](mailto:akhilkailas2001@gmail.com).

## 📜 License

This project is licensed under the MIT License.
