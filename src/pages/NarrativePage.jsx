
import React, { useEffect } from "react";
import { manifest } from "../config/manifest.js";

const { site } = manifest;

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

const narrativeSections = [
  {
    number: "01",
    label: "THE STORY",
    title: "Every block leaves a trace.",
    paragraphs: [
      "Ethereum is more than a blockchain. It is a record of human activity — a place where people have built, experimented, exchanged value, created ideas, and shaped a continuously evolving digital history.",
      "Every block preserves a fragment of that history. Every transaction leaves a trace. Together, these traces form an immense, constantly growing record of human interaction in the digital world."
    ]
  },
  {
    number: "02",
    label: "THE ART",
    title: "History, reimagined as art.",
    paragraphs: [
      "Ether Archive transforms fragments of Ethereum's history into generative art.",
      "The collection consists of 4,088 unique digital skies, each shaped by the project's interpretation of Ethereum's on-chain history. What once existed as technical data becomes something visual, personal, and collectible — a different way to experience the history embedded in the network.",
      "The number 4,088 is part of the project's origin story, connecting the collection to the passage of time in Ethereum's history."
    ]
  },
  {
    number: "03",
    label: "THE VISION",
    title: "More than a moment in time.",
    paragraphs: [
      "Ether Archive is not only about looking backward. It is about exploring how digital history can be preserved, interpreted, and experienced through art.",
      "We envision an ecosystem where the artwork is the starting point for a deeper connection between blockchain history, artistic expression, and the people who become part of the archive."
    ]
  },
  {
    number: "04",
    label: "THE COMMUNITY",
    title: "Built to grow organically.",
    paragraphs: [
      "We believe that a meaningful project is built through more than visibility or short-term attention. It grows through genuine interest, shared values, and a community that contributes because it believes in what is being created.",
      "That is why we approach Ether Archive as a long-term creative endeavor. We want its community to grow organically, its artistic identity to develop over time, and its relationship with Ethereum's history to remain at the center of everything we build."
    ]
  }
];

export default function NarrativePage() {
  useEffect(() => {
    document.documentElement.classList.add("whitepaper-scroll-enabled");

    return () => {
      document.documentElement.classList.remove("whitepaper-scroll-enabled");
    };
  }, []);

  return (
    <div className="whitepaper-page narrative-page">
      <header className="whitepaper-header">
        <a
          className="whitepaper-brand"
          href="/"
          aria-label="Ether Archive home"
        >
          ETHER ARCHIVE<span> / NARRATIVE</span>
        </a>

        <nav className="whitepaper-header-nav" aria-label="Narrative links">
          <a href={site.xUrl} target="_blank" rel="noreferrer">
            FOLLOW ON X <Arrow />
          </a>
          <a href="/whitepaper">
            WHITEPAPER <Arrow />
          </a>
          <a href="/">
            BACK TO TERMINAL <Arrow />
          </a>
        </nav>
      </header>

      <main className="whitepaper-shell">
        <section className="whitepaper-hero narrative-hero">
          <p className="whitepaper-eyebrow">
            <span className="whitepaper-dot" />
            THE STORY BEHIND ETHER ARCHIVE
          </p>

          <h1>
            THE SKY
            <br />
            REMEMBERS<span>.</span>
          </h1>

          <p className="whitepaper-lede">
            Every block leaves a trace. Every trace tells a story.
            A living record of Ethereum, reimagined as 4,088 singular
            digital skies.
          </p>

          <div className="whitepaper-meta">
            <span>ETHER ARCHIVE</span>
            <span>ART / HISTORY / MEMORY</span>
            <span>4,088 UNIQUE SKIES</span>
          </div>

          <a
            className="whitepaper-narrative-button narrative-back-button"
            href="/whitepaper"
          >
            EXPLORE THE WHITEPAPER <Arrow />
          </a>
        </section>

        <div className="narrative-content">
          {narrativeSections.map((section) => (
            <section
              className="whitepaper-section narrative-section"
              key={section.number}
            >
              <p className="whitepaper-section-index">
                {section.number} / {section.label}
              </p>

              <h2>
                {section.title}<span>.</span>
              </h2>

              {section.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </section>
          ))}

          <section className="narrative-closing">
            <p className="whitepaper-eyebrow">ETHER ARCHIVE / THE VISION</p>

            <h2>
              We are not simply collecting digital skies.
              <span> We are preserving visual fragments of a history
              that continues to unfold.</span>
            </h2>

            <p className="narrative-signature">
              This is Ether Archive: Ethereum's past, reimagined as
              a living archive of digital art.
            </p>

            <div className="narrative-links">
              <a href={site.xUrl} target="_blank" rel="noreferrer">
                X / TWITTER <Arrow />
              </a>
              <a href={site.telegramUrl} target="_blank" rel="noreferrer">
                TELEGRAM <Arrow />
              </a>
              <a href={site.discordUrl} target="_blank" rel="noreferrer">
                DISCORD <Arrow />
              </a>
            </div>
          </section>
        </div>
      </main>

      <footer className="whitepaper-footer">
        <span>ETHER ARCHIVE / A RECORD OF THE NETWORK</span>
        <span>© 2026 ETHER ARCHIVE</span>
        <a href="/">RETURN TO TERMINAL ↑</a>
      </footer>
    </div>
  );
}
