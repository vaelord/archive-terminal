import React, { useEffect } from "react";
import { manifest } from "../config/manifest.js";

const { site } = manifest;

const sections = [
  { id: "overview", number: "01", title: "Abstract", content: [
    "Ether Archive is a digital art project exploring Ethereum as a living record of human activity. The collection consists of 4,088 unique skies: one-of-one artworks that turn the idea of on-chain history into a visual archive.",
    "Rather than treating the blockchain only as infrastructure, Ether Archive approaches it as a cultural record — a place where exchanges, experiments, communities, and ideas leave persistent traces."
  ]},
  { id: "vision", number: "02", title: "Vision", content: [
    "The project begins with a simple question: if the history of a network could be viewed as a sky, what might it look like?",
    "Ether Archive uses cosmic imagery as a visual language for scale, time, connection, and memory. Each work is intended to stand on its own while remaining part of a larger collection — a fragment of a history that continues to grow."
  ]},
  { id: "artwork", number: "03", title: "The Collection", content: [
    "The collection is limited to 4,088 unique pieces. Each artwork is presented as a singular digital artifact within the Ether Archive collection.",
    "Individual artwork metadata and identifiers should be treated as the authoritative source for piece-specific details. Visual interpretation is part of the project's artistic framing; it should not be mistaken for a complete representation of Ethereum's history."
  ], facts: [["Supply", "4,088"], ["Format", "One-of-one digital artworks"], ["Theme", "Ethereum history and digital memory"]]},
  { id: "method", number: "04", title: "Data & Method", content: [
    "Ether Archive is conceptually grounded in the traces left by Ethereum. On-chain data can provide a historical reference point for an artwork, while the generative system translates selected inputs into visual parameters.",
    "The precise relationship between a specific on-chain field and a rendered visual feature depends on the project's implemented generation pipeline and published metadata. Unless explicitly documented for a given artwork, no claim should be made that every visible detail maps directly to one specific metric."
  ]},
  { id: "ownership", number: "05", title: "Ownership & Collecting", content: [
    "A token can provide a verifiable on-chain record of ownership for a digital artwork, subject to the relevant smart contract and marketplace records. Collectors should review the collection contract, metadata, and marketplace listing before making a purchase.",
    "Owning an Ether Archive NFT does not, by itself, grant intellectual-property rights, guaranteed financial returns, or rights to future tokens or benefits unless those rights are expressly stated in applicable project terms."
  ]},
  { id: "ecosystem", number: "06", title: "Community & Ecosystem", content: [
    "Ether Archive is intended to grow through its community, public project updates, collection discovery, and future experiences that deepen the relationship between collectors and the archive.",
    "Community initiatives, access programs, and future features may evolve over time. Eligibility, timing, and participation requirements will be defined in the relevant official announcement rather than inferred from this document."
  ]},
  { id: "earc", number: "07", title: "EARC & Future Development", content: [
    "EARC is part of the project's planned ecosystem development. Any token deployment, distribution, utility, eligibility criteria, or claim process must be confirmed through official project communications and verifiable on-chain information.",
    "References to future token-related initiatives are forward-looking plans, not a guarantee that a particular feature, distribution, reward, or timeline will be delivered. Never trust unsolicited messages asking for private keys, seed phrases, or payment to unlock an unannounced benefit."
  ]},
  { id: "roadmap", number: "08", title: "Roadmap", content: [
    "The roadmap is an evolving outline, not a binding promise of delivery dates. Priorities and timing may change as the project develops."
  ], milestones: [
    ["Collection launch", "Opening the archive to collectors and the wider community."],
    ["Online gallery", "A dedicated way to browse and revisit the collection."],
    ["Live archive experiences", "Exploring Ethereum history through additional digital experiences."],
    ["Community and ecosystem initiatives", "Potential future access, token-related, and collector initiatives, subject to official announcements."]
  ]},
  { id: "security", number: "09", title: "Security & Verification", content: [
    "Use only official Ether Archive channels and links. Verify contract addresses and announcements before interacting with a token, NFT, mint page, or claim site.",
    "The project team will never need your seed phrase or private key. Do not sign transactions you do not understand, and be cautious of impersonators, fake support accounts, and unofficial claim links."
  ]},
  { id: "risks", number: "10", title: "Risks & Disclaimer", content: [
    "Digital assets involve risk, including price volatility, smart-contract vulnerabilities, marketplace changes, wallet compromise, network fees, and the possibility of loss. Artwork values are not guaranteed and may fluctuate or become illiquid.",
    "This document is informational and describes the project's artistic direction and intended development at a high level. It is not financial, investment, legal, or tax advice, and it is not an offer or solicitation to buy a financial product.",
    "Roadmap items and ecosystem concepts may change, be delayed, or not be implemented. Always rely on current official announcements and relevant on-chain records for final details."
  ]}
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function WhitepaperPage() {
  useEffect(() => {
    document.documentElement.classList.add("whitepaper-scroll-enabled");

    return () => {
      document.documentElement.classList.remove("whitepaper-scroll-enabled");
    };
  }, []);

  return (
    <div className="whitepaper-page">
      <header className="whitepaper-header">
        <a className="whitepaper-brand" href="/" aria-label="Ether Archive home">ETHER ARCHIVE<span> / WHITEPAPER</span></a>
        <nav className="whitepaper-header-nav" aria-label="Whitepaper links">
          <a href={site.xUrl} target="_blank" rel="noreferrer">FOLLOW ON X <Arrow /></a>
          <a href="/">BACK TO TERMINAL <Arrow /></a>
        </nav>
      </header>

      <main className="whitepaper-shell">
        <section className="whitepaper-hero">
          <p className="whitepaper-eyebrow"><span className="whitepaper-dot" /> PROJECT DOCUMENT / 001</p>
          <h1>THE SKY<br />REMEMBERS<span>.</span></h1>
          <p className="whitepaper-lede">A living record of Ethereum, reimagined as 4,088 singular digital skies.</p>
          <div className="whitepaper-meta">
            <span>ETHER ARCHIVE</span><span>VERSION 1.0.2</span><span>OCTOBER 2026</span>
          </div>
        </section>

        <div className="whitepaper-layout">
          <aside className="whitepaper-toc">
            <p className="whitepaper-toc-title">CONTENTS</p>
            {sections.map((section) => <a key={section.id} href={`#${section.id}`}><span>{section.number}</span>{section.title}</a>)}
            <button type="button" onClick={() => window.print()}>PRINT / SAVE PDF ↓</button>
          </aside>

          <div className="whitepaper-content">
            {sections.map((section) => (
              <section className="whitepaper-section" id={section.id} key={section.id}>
                <p className="whitepaper-section-index">{section.number} / WHITEPAPER</p>
                <h2>{section.title}<span>.</span></h2>
                {section.content.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                {section.facts && <div className="whitepaper-facts">{section.facts.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>}
                {section.milestones && <div className="whitepaper-milestones">{section.milestones.map(([title, description], index) => <div className="whitepaper-milestone" key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{description}</p></div><small>PLANNED</small></div>)}</div>}
              </section>
            ))}
            <section className="whitepaper-endnote">
              <span>END OF DOCUMENT</span>
              <p>Made of traces. Built to remember.</p>
              <div><a href={site.xUrl} target="_blank" rel="noreferrer">X / TWITTER <Arrow /></a><a href={site.telegramUrl} target="_blank" rel="noreferrer">TELEGRAM <Arrow /></a><a href={site.discordUrl} target="_blank" rel="noreferrer">DISCORD <Arrow /></a></div>
            </section>
          </div>
        </div>
      </main>

      <footer className="whitepaper-footer"><span>ETHER ARCHIVE / A RECORD OF THE NETWORK</span><span>© 2026 ETHER ARCHIVE</span><a href="/">RETURN TO TERMINAL ↑</a></footer>
    </div>
  );
}
