import React, { useEffect, useMemo, useState } from "react";
import { BrowserProvider } from "ethers";
import { manifest } from "./config/manifest.js";

const config = manifest.site;
const commands = [
  { key: "mint", command: "//mint", label: "MINT", description: "Minting details", output: "The archive opens 31 OCT 2026 at 20:00 GMT+3. 4,088 unique 1/1 works.\nMinting will be announced through the official project links." },
  { key: "presale_check", command: "//presale_check", label: "PRESALE CHECK", description: "Checking your eligibility", output: "Connect your Ethereum wallet to verify whether it is included in the allowlist." },
  { key: "about", command: "//about", label: "ABOUT", description: "About Ether Archive", output: "Ethereum was never the work of a single hand. Ether Archive preserves traces people left on the network — 4,088 unique skies, each a record of a moment in time." },
  { key: "faq", command: "//faq", label: "FAQ", description: "Frequently asked questions", output: "Answers to the most common questions about Ether Archive." },
  { key: "roadmap", command: "//roadmap", label: "ROADMAP", description: "Project roadmap", output: "The archive opens on 31 October. Further milestones will be announced in due course." },
];
const faqItems = [
  ["What is Ether Archive?", "Ether Archive is a collection of 4,088 unique one-of-one digital artworks inspired by the traces people leave on Ethereum."],
  ["How many pieces are in the collection?", "The collection consists of 4,088 unique pieces. Each artwork is intended to stand on its own."],
  ["When does the project launch?", "The launch is scheduled for 31 October 2026 at 20:00 GMT+3. The countdown above displays the time remaining."],
  ["How do I check presale eligibility?", "Open //presale_check and connect the Ethereum wallet you want to verify. The site checks the address against the project's allowlist API."],
  ["Where can I follow updates?", "Use the OpenSea and X links at the top of this site for project updates. Additional links can be configured before launch."],
];

function BrandMark({ src, alt = "" }) { return <img className="brand-mark" src={src} alt={alt} />; }

function Countdown() {
  const target = new Date(config.mintDate).getTime();
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const timer = window.setInterval(() => setNow(Date.now()), 1000); return () => window.clearInterval(timer); }, []);
  const remaining = Math.max(0, target - now);
  const units = [["D", Math.floor(remaining / 86400000)], ["H", Math.floor((remaining / 3600000) % 24)], ["M", Math.floor((remaining / 60000) % 60)], ["S", Math.floor((remaining / 1000) % 60)]];
  return <div className="countdown" aria-label="Time to launch">{units.map(([label, value], i) => <React.Fragment key={label}><div className="countdown-unit"><span className="countdown-value">{String(value).padStart(2, "0")}</span><span className="countdown-label">{label}</span></div>{i < units.length - 1 && <span className="countdown-colon">:</span>}</React.Fragment>)}</div>;
}

function Terminal() {
  const [active, setActive] = useState(null);
  const [typed, setTyped] = useState("");
  const [input, setInput] = useState("");
  const [displayed, setDisplayed] = useState("");
  const [wallet, setWallet] = useState("");
  const [status, setStatus] = useState("idle");
  const [result, setResult] = useState("");
  const [openFaq, setOpenFaq] = useState(0);
  const activeCommand = useMemo(() => commands.find((item) => item.key === active), [active]);

  useEffect(() => {
    const goHome = () => { setActive(null); setInput(""); setStatus("idle"); setResult(""); setWallet(""); };
    window.addEventListener("terminal-home", goHome);
    return () => window.removeEventListener("terminal-home", goHome);
  }, []);

  // The intro hint cycles quickly; once a command is selected, its title and next hint stay fixed.
  useEffect(() => {
    if (activeCommand) { setTyped(""); return; }
    const phrases = ["type //mint for minting details", "type //presale_check to check eligibility", "type //about to learn about the archive", "type //faq for questions", "type //roadmap to view milestones"];
    let phraseIndex = 0, index = 0, deleting = false, timeout;
    const tick = () => {
      const phrase = phrases[phraseIndex];
      if (!deleting) {
        index += 1; setTyped(phrase.slice(0, index));
        if (index >= phrase.length) { deleting = true; timeout = window.setTimeout(tick, 850); return; }
        timeout = window.setTimeout(tick, 35);
      } else {
        index -= 1; setTyped(phrase.slice(0, index));
        if (index <= 0) { deleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; timeout = window.setTimeout(tick, 120); return; }
        timeout = window.setTimeout(tick, 12);
      }
    };
    tick(); return () => window.clearTimeout(timeout);
  }, [activeCommand]);

  useEffect(() => {
    if (!activeCommand) { setDisplayed(""); return; }
    setDisplayed(""); let i = 0;
    const interval = window.setInterval(() => { i += 1; setDisplayed(activeCommand.output.slice(0, i)); if (i >= activeCommand.output.length) window.clearInterval(interval); }, 7);
    return () => window.clearInterval(interval);
  }, [activeCommand]);

  function chooseCommand(key) {
    if (key === "home" || key === "clear") { setActive(null); setInput(""); setStatus("idle"); setResult(""); setWallet(""); return; }
    const normalized = String(key || "").trim().toLowerCase().replace(/^\//, "").replace(/\s+/g, "_");
    const found = commands.find((item) => item.key === normalized || item.command.toLowerCase() === `//${normalized}` || item.label.toLowerCase().replace(/\s+/g, "_") === normalized);
    if (found) { setActive(found.key); setInput(""); setStatus("idle"); setResult(""); setWallet(""); return; }
    if (normalized === "next" || normalized === "//next") {
      const idx = commands.findIndex((item) => item.key === active);
      setActive(commands[(idx + 1 + commands.length) % commands.length].key); setInput(""); setStatus("idle"); setResult(""); setWallet(""); return;
    }
    if (normalized === "prev" || normalized === "previous" || normalized === "back") {
      const idx = commands.findIndex((item) => item.key === active);
      setActive(commands[(idx <= 0 ? commands.length : idx) - 1].key); setInput(""); setStatus("idle"); setResult(""); setWallet(""); return;
    }
    setResult(`UNKNOWN COMMAND: ${String(key).trim() || "(empty)"}. Try //mint, //presale_check, //about, //faq, //roadmap, or //next.`);
    setStatus("error");
  }

  async function connectWallet() {
    setStatus("loading"); setResult("");
    try {
      if (!window.ethereum) throw new Error("No Ethereum wallet detected. Open this site in MetaMask or install a wallet extension.");
      const provider = new BrowserProvider(window.ethereum); await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner(); const address = await signer.getAddress(); setWallet(address);
      const base = String(config.apiBaseUrl || "").replace(/\/$/, ""); const path = config.presaleCheckPath || "/api/presale/check";
      const response = await fetch(`${base}${path}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ wallet: address }) });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || `API returned HTTP ${response.status}`);
      if (typeof data.eligible !== "boolean") throw new Error("Unexpected response from allowlist API.");
      setStatus(data.eligible ? "eligible" : "ineligible"); setResult(data.eligible ? "ACCESS GRANTED — YOU ARE ELIGIBLE." : "ACCESS DENIED — WALLET NOT FOUND IN ALLOWLIST.");
    } catch (error) { setStatus("error"); setResult(error?.code === 4001 ? "WALLET CONNECTION REJECTED." : (error?.message || "COULD NOT VERIFY ELIGIBILITY.")); }
  }

  return <main className="terminal-layout">
    <aside className="command-column">
      <div className="column-label">AVAILABLE COMMANDS <span>[ 05 ]</span></div>
      {commands.map((item, i) => <button key={item.key} className={`command-link ${active === item.key ? "active" : ""}`} onClick={() => chooseCommand(item.key)}><span className="command-number">0{i + 1}</span><span>{item.command}</span><span className="command-arrow">↗</span></button>)}
      <div className="command-hint">SELECT A COMMAND TO CONTINUE<span className="blinking-cursor">_</span></div>
    </aside>

    <section className="terminal-output" aria-live="polite">
      <div className="output-topline"><span>STDOUT / ETHER ARCHIVE</span><span>{activeCommand ? `COMMAND: ${activeCommand.command}` : "AWAITING INPUT"}</span></div>
      <div className={`typing-line ${activeCommand ? "typing-line-active" : ""}`}>
        <span className="prompt-mark">›</span>
        {activeCommand ? <><span className="active-page-name">{activeCommand.command}</span><span className="next-hint">type //next for next page</span></> : <span>{typed}</span>}
        <span className="typing-cursor">█</span>
      </div>
      {activeCommand && <div className="command-output">
        <div className="output-heading">{activeCommand.label} <span>/{activeCommand.key.toUpperCase()}</span></div>
        <p className="output-text">{displayed}</p>
        {active === "mint" && <div className="output-actions"><a href={config.reminderUrl} target="_blank" rel="noreferrer">OPEN OPENSEA ↗</a><span>PUBLIC MINT / 31 OCT 2026</span></div>}
        {active === "presale_check" && <div className="wallet-check"><div className="wallet-address">{wallet ? `${wallet.slice(0, 8)}…${wallet.slice(-6)}` : "WALLET: NOT CONNECTED"}</div><button className="terminal-button" onClick={connectWallet} disabled={status === "loading"}>{status === "loading" ? "VERIFYING…" : wallet ? "CHECK AGAIN" : "CONNECT WALLET ↗"}</button>{result && <p className={`terminal-result ${status}`}>{result}</p>}</div>}
        {active === "about" && <div className="output-actions"><a href={config.openSeaUrl} target="_blank" rel="noreferrer">VIEW COLLECTION ↗</a><span>4,088 / 1 OF 1</span></div>}
        {active === "faq" && <div className="faq-list">{faqItems.map(([question, answer], i) => <div className={`faq-item ${openFaq === i ? "faq-open" : ""}`} key={question}><button className="faq-question" onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}><span>{String(i + 1).padStart(2, "0")}</span><b>{question}</b><i>{openFaq === i ? "−" : "+"}</i></button>{openFaq === i && <p className="faq-answer">{answer}</p>}</div>)}</div>}
        {active === "roadmap" && <div className="roadmap-list"><div className="roadmap-item roadmap-current"><span className="roadmap-node"/><span className="roadmap-date">OCT 31</span><div><b>PROJECT LAUNCH</b><p>The archive opens.</p></div></div><div className="roadmap-item roadmap-future"><span className="roadmap-node"/><span className="roadmap-date">TBA</span><div><b>TO BE ANNOUNCED</b><p>Further details coming soon.</p></div></div></div>}
      </div>}
      <form className="terminal-input-row" onSubmit={(event) => { event.preventDefault(); chooseCommand(input); }}><label htmlFor="terminal-command">›</label><input id="terminal-command" value={input} onChange={(event) => setInput(event.target.value)} placeholder="type a command and press enter…" autoComplete="off" spellCheck="false" aria-label="Enter a site command"/><button type="submit">ENTER ↵</button></form>
      {status === "error" && result && active !== "presale_check" && <p className="terminal-result error command-error">{result}</p>}
    </section>
  </main>;
}

export default function App() {
  return <div className="terminal-site">
    <header className="terminal-header">
      <a className="header-brand" href="#top" aria-label="Ether Archive home" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent("terminal-home")); }}><span>ETHER ARCHIVE</span></a>
      <div className="header-logos" aria-label="Project links"><a href={config.openSeaUrl} target="_blank" rel="noreferrer" aria-label="OpenSea"><BrandMark src={manifest.assets.openSeaIcon} /></a><a href={config.xUrl} target="_blank" rel="noreferrer" aria-label="X"><BrandMark src={manifest.assets.xIcon} /></a><a href={config.telegramUrl} target="_blank" rel="noreferrer" aria-label="Telegram"><BrandMark src={manifest.assets.telegramIcon} /></a></div>
    </header>
    <section className="launch-strip" id="top"><div className="launch-caption"><span className="live-dot" />TIME TO LAUNCH</div><Countdown /><div className="launch-date">31 OCT 2026 <span>/</span> 20:00 GMT+3</div></section>
    <Terminal />
    <footer className="terminal-footer"><span>{manifest.footer.bottomLine}</span><span>{manifest.footer.copyright}</span><span>NETWORK: ETHEREUM MAINNET <i className="blinking-cursor">_</i></span></footer>
  </div>;
}
