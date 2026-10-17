import React, { useEffect, useMemo, useState } from "react";
import { BrowserProvider } from "ethers";
import { manifest } from "./config/manifest.js";
import WLPage from "./pages/WLPage.jsx";

const { site, terminal: content, assets, footer } = manifest;
const commands = content.commands;
const faqItems = content.faqItems;

function BrandMark({ src, alt = "" }) {
  return <img className="brand-mark" src={src} alt={alt} />;
}

function Countdown() {
  const target = site.mintDate ? new Date(site.mintDate).getTime() : NaN;
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  if (!Number.isFinite(target)) {
    return <div className="countdown countdown-tba"><span className="countdown-value">{content.countdownTba}</span></div>;
  }

  const remaining = Math.max(0, target - now);
  const units = [
    [content.countdownUnits.days, Math.floor(remaining / 86400000)],
    [content.countdownUnits.hours, Math.floor((remaining / 3600000) % 24)],
    [content.countdownUnits.minutes, Math.floor((remaining / 60000) % 60)],
    [content.countdownUnits.seconds, Math.floor((remaining / 1000) % 60)],
  ];

  return (
    <div className="countdown" aria-label={content.countdownAriaLabel}>
      {units.map(([label, value], index) => (
        <React.Fragment key={label}>
          <div className="countdown-unit">
            <span className="countdown-value">{String(value).padStart(2, "0")}</span>
            <span className="countdown-label">{label}</span>
          </div>
          {index < units.length - 1 && <span className="countdown-colon">:</span>}
        </React.Fragment>
      ))}
    </div>
  );
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
    const goHome = () => {
      setActive(null);
      setInput("");
      setStatus("idle");
      setResult("");
      setWallet("");
    };
    window.addEventListener("terminal-home", goHome);
    return () => window.removeEventListener("terminal-home", goHome);
  }, []);

  useEffect(() => {
    if (activeCommand) {
      setTyped("");
      return undefined;
    }

    const phrases = content.introPhrases;
    let phraseIndex = 0;
    let index = 0;
    let deleting = false;
    let timeout;

    const tick = () => {
      const phrase = phrases[phraseIndex];
      if (!deleting) {
        index += 1;
        setTyped(phrase.slice(0, index));
        if (index >= phrase.length) {
          deleting = true;
          timeout = window.setTimeout(tick, content.typing.pauseAtEnd);
          return;
        }
        timeout = window.setTimeout(tick, content.typing.typeSpeed);
      } else {
        index -= 1;
        setTyped(phrase.slice(0, index));
        if (index <= 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          timeout = window.setTimeout(tick, content.typing.pauseAtStart);
          return;
        }
        timeout = window.setTimeout(tick, content.typing.deleteSpeed);
      }
    };

    tick();
    return () => window.clearTimeout(timeout);
  }, [activeCommand]);

  useEffect(() => {
    if (!activeCommand) {
      setDisplayed("");
      return undefined;
    }

    setDisplayed("");
    let index = 0;
    const interval = window.setInterval(() => {
      index += 1;
      setDisplayed(activeCommand.output.slice(0, index));
      if (index >= activeCommand.output.length) window.clearInterval(interval);
    }, content.typing.outputSpeed);
    return () => window.clearInterval(interval);
  }, [activeCommand]);

  function resetCommandState() {
    setInput("");
    setStatus("idle");
    setResult("");
    setWallet("");
  }

  function chooseCommand(value) {
    const raw = String(value || "").trim();
    const normalized = raw.toLowerCase().replace(/^\/+/, "").replace(/\s+/g, "_");

    if (content.commandAliases.home.includes(normalized) || content.commandAliases.clear.includes(normalized)) {
      setActive(null);
      resetCommandState();
      return;
    }

    const found = commands.find((item) =>
      item.key === normalized ||
      item.command.toLowerCase() === `//${normalized}` ||
      item.label.toLowerCase().replace(/\s+/g, "_") === normalized
    );

    if (found) {
      setActive(found.key);
      resetCommandState();
      return;
    }

    if (content.commandAliases.next.includes(normalized)) {
      const currentIndex = commands.findIndex((item) => item.key === active);
      setActive(commands[(currentIndex + 1 + commands.length) % commands.length].key);
      resetCommandState();
      return;
    }

    if (content.commandAliases.previous.includes(normalized)) {
      const currentIndex = commands.findIndex((item) => item.key === active);
      setActive(commands[(currentIndex <= 0 ? commands.length : currentIndex) - 1].key);
      resetCommandState();
      return;
    }

    setResult(content.messages.unknownCommand.replace("{input}", raw || content.messages.emptyInput).replace("{commands}", commands.map((item) => item.command).join(", ")).replace("{next}", content.commandAliases.next[0]));
    setStatus("error");
  }

  async function connectWallet() {
    setStatus("loading");
    setResult("");
    try {
      if (!window.ethereum) throw new Error(content.messages.noWallet);
      const provider = new BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setWallet(address);

      const base = String(site.apiBaseUrl || "").replace(/\/$/, "");
      const path = site.presaleCheckPath || content.apiFallbackPath;
      const response = await fetch(`${base}${path}`, {
        method: content.apiMethod,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [content.walletRequestField]: address }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || content.messages.apiHttpError.replace("{status}", response.status));
      if (typeof data.eligible !== "boolean") throw new Error(content.messages.unexpectedApiResponse);

      setStatus(data.eligible ? "eligible" : "ineligible");
      setResult(data.eligible ? content.messages.eligible : content.messages.ineligible);
    } catch (error) {
      setStatus("error");
      setResult(error?.code === 4001 ? content.messages.walletRejected : (error?.message || content.messages.walletError));
    }
  }

  return (
    <main className="terminal-layout">
      <aside className="command-column">
        <div className="column-label">{content.availableCommands} <span>{content.commandCount.replace("{count}", String(commands.length).padStart(2, "0"))}</span></div>
        {commands.map((item, index) => (
          <button key={item.key} className={`command-link ${active === item.key ? "active" : ""}`} onClick={() => chooseCommand(item.key)}>
            <span className="command-number">{String(index + 1).padStart(2, "0")}</span>
            <span>{item.command}</span>
            <span className="command-arrow">{content.commandArrow}</span>
          </button>
        ))}
        <div className="command-hint">{content.selectCommand}<span className="blinking-cursor">_</span></div>
      </aside>

      <section className="terminal-output" aria-live="polite">
        <div className="output-topline">
          <span>{content.outputBrand}</span>
          <span>{activeCommand ? content.outputCommand.replace("{command}", activeCommand.command) : content.awaitingInput}</span>
        </div>
        <div className={`typing-line ${activeCommand ? "typing-line-active" : ""}`}>
          <span className="prompt-mark">›</span>
          {activeCommand ? <><span className="active-page-name">{activeCommand.command}</span><span className="next-hint">{content.nextHint}</span></> : <span>{typed}</span>}
          <span className="typing-cursor">█</span>
        </div>

        {activeCommand && (
          <div className="command-output">
            <div className="output-heading">{activeCommand.label} <span>/{activeCommand.key.toUpperCase()}</span></div>
            <p className="output-text">{displayed}</p>
            {active === "mint" && <div className="output-actions"><a href={site.reminderUrl} target="_blank" rel="noreferrer">{content.openSeaAction}</a><span>{content.mintStatus}</span></div>}
            {active === "presale_check" && (
              <div className="wallet-check">
                <div className="wallet-address">{wallet ? `${wallet.slice(0, 8)}…${wallet.slice(-6)}` : content.walletNotConnected}</div>
                <button className="terminal-button" onClick={connectWallet} disabled={status === "loading"}>
                  {status === "loading" ? content.verifyingButton : wallet ? content.retryButton : content.connectWalletButton}
                </button>
                {result && <p className={`terminal-result ${status}`}>{result}</p>}
              </div>
            )}
            {active === "about" && <div className="output-actions"><a href={site.openSeaUrl} target="_blank" rel="noreferrer">{content.collectionAction}</a><span>{content.collectionMeta.replace("{supply}", site.supply)}</span></div>}
            {active === "faq" && (
              <div className="faq-list">
                {faqItems.map(([question, answer], index) => (
                  <div className={`faq-item ${openFaq === index ? "faq-open" : ""}`} key={question}>
                    <button className="faq-question" onClick={() => setOpenFaq(openFaq === index ? -1 : index)} aria-expanded={openFaq === index}>
                      <span>{String(index + 1).padStart(2, "0")}</span><b>{question}</b><i>{openFaq === index ? content.faqCollapse : content.faqExpand}</i>
                    </button>
                    {openFaq === index && <p className="faq-answer">{answer}</p>}
                  </div>
                ))}
              </div>
            )}
            {active === "roadmap" && (
              <div className="roadmap-list">
                {content.roadmapItems.map((item) => (
                  <div className={`roadmap-item ${item.className}`} key={`${item.date}-${item.title}`}>
                    <span className="roadmap-node"/><span className="roadmap-date">{item.date}</span>
                    <div><b>{item.title}</b><p>{item.description}</p></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <form className="terminal-input-row" onSubmit={(event) => { event.preventDefault(); chooseCommand(input); }}>
          <label htmlFor="terminal-command">›</label>
          <input id="terminal-command" value={input} onChange={(event) => setInput(event.target.value)} placeholder={content.inputPlaceholder} autoComplete="off" spellCheck="false" aria-label={content.inputAriaLabel}/>
          <button type="submit">{content.enterButton}</button>
        </form>
        {status === "error" && result && active !== "presale_check" && <p className="terminal-result error command-error">{result}</p>}
      </section>
    </main>
  );
}

export default function App() {
  if (window.location.pathname.replace(/\/$/, "") === site.wlPath) return <WLPage />;

  const socialLinks = [
    { key: "openSea", href: site.openSeaUrl, label: content.socialLabels.openSea, icon: assets.openSeaIcon },
    { key: "x", href: site.xUrl, label: content.socialLabels.x, icon: assets.xIcon },
    { key: "telegram", href: site.telegramUrl, label: content.socialLabels.telegram, icon: assets.telegramIcon },
    { key: "farcaster", href: site.farcasterUrl, label: content.socialLabels.farcaster, icon: assets.farcasterIcon },
    { key: "discord", href: site.discordUrl, label: content.socialLabels.discord, icon: assets.discordIcon },
  ];

  return (
    <div className="terminal-site">
      <header className="terminal-header">
        <a className="header-brand" href={content.homeHref} aria-label={content.homeAriaLabel} onClick={(event) => { event.preventDefault(); window.dispatchEvent(new CustomEvent("terminal-home")); }}><span>{manifest.brand.logoText} {manifest.brand.logoSuffix}</span></a>
        <a className="wl-header-link" href={site.wlPath}>{content.wlAccessLabel}</a>
        <div className="header-logos" aria-label={content.socialLinksAriaLabel}>
          {socialLinks.map((link) => (
            <a key={link.key} href={link.href} target="_blank" rel="noreferrer" aria-label={link.label} title={link.label}>
              <BrandMark src={link.icon} alt={link.label}/>
            </a>
          ))}
        </div>
      </header>
      <section className="launch-strip" id="top">
        <div className="launch-caption"><span className="live-dot" />{content.launchCaption}</div>
        <Countdown />
        <div className="launch-date">{content.mintDateLabel} <span>/</span> {content.mintDateTba}</div>
      </section>
      <Terminal />
      <footer className="terminal-footer">
        <span>{footer.bottomLine}</span><span>{footer.copyright}</span>
        <span>{content.networkLabel} <i className="blinking-cursor">_</i></span>
      </footer>
    </div>
  );
}
