# Ether Archive

Ether Archive is a digital art project built around the history of Ethereum.

The project consists of 4,088 unique artworks, each representing a different night sky generated from traces left on the Ethereum blockchain. The collection connects blockchain history with generative art, turning on-chain activity into visual records of the network's past.

The number 4,088 comes from the original idea behind the project. While researching Ethereum, the project was conceived on the network's 4,088th day. That number became the foundation of the collection and its identity.

**Website:** https://etherarchive.xyz

## The Collection

Ether Archive contains 4,088 unique 1/1 artworks. Each piece represents a distinct visual interpretation of Ethereum's history.

The artworks are generated using a structured system of visual elements and blockchain-related data. Each piece has its own metadata, allowing individual works to be identified and explored independently.

The collection is designed as an archive rather than a series of interchangeable images. Every artwork represents a separate record within the larger collection.

## Website

The Ether Archive website serves as the main access point for the project. It introduces the collection, presents project information, and provides access to relevant minting and community resources.

The website includes:

- Project information and background
- Collection and artwork presentation
- Mint information and countdown
- Presale eligibility checking
- Links to OpenSea and the project's social channels
- Roadmap and future project updates

Some features are developed separately from the main website and may become available as the project progresses.

## Technology

The website is built with React and Vite. Its frontend is deployed on Vercel, while Cloudflare is used for backend functionality and related infrastructure.

The project uses the following technologies and services:

- **React** — User interface
- **Vite** — Development server and production build
- **JavaScript / CSS** — Application logic and styling
- **Cloudflare Workers** — API endpoints and backend functionality
- **Cloudflare KV** — Allowlist data storage
- **IPFS** — Decentralized storage for NFT assets and metadata
- **Vercel** — Frontend deployment

## Presale Eligibility

The website includes a presale eligibility checker that allows users to verify whether a wallet address is eligible for presale access.

The frontend sends the wallet address to the backend API, which validates the address and checks it against the stored allowlist.

The API handles the eligibility check without requiring users to connect their wallets simply to check an address.

## Repository Structure

The repository contains the website source code, application assets, and configuration files required for development and deployment.

```text
ether-archive/
├── public/
├── src/
├── backend/
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

The exact structure may vary as the project develops. Backend deployment files and configuration are maintained separately where appropriate.

## Development

### Requirements

- Node.js
- npm

### Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/vaelord/ether-archive.git
cd ether-archive
npm install
```

### Run locally

Start the development server:

```bash
npm run dev
```

Vite will provide a local URL in the terminal.

### Production build

To create a production build:

```bash
npm run build
```

The generated files are placed in the `dist/` directory.

To preview the production build locally:

```bash
npm run preview
```

## Roadmap

The project is planned to expand beyond the initial collection and website.

- **December 2026 — Project Launch:** Launch of the project and online gallery.
- **January 2027 — Live Archive:** Development of an archive connected to Ethereum data.
- **Q1 2027 — Future Access:** Community Archive and additional access features.
- **Q2 2027 — EARC Token:** Planned token-related features and holder airdrop.
- **Q3 2027 — On-Chain Rewards:** Planned on-chain rewards and fine art prints.

The roadmap is subject to change as development progresses. Additional details will be announced through official channels.

## Links

- Website: https://etherarchive.xyz
- GitHub: https://github.com/vaelord/archive-terminal

---

Ether Archive is an ongoing project exploring the relationship between blockchain history, digital ownership, and generative art.