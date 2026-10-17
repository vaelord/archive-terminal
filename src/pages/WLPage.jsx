import React, { useState, useRef } from "react";
import { toPng } from "html-to-image";
import { manifest } from "../config/manifest.js";

const config = manifest.site;

const tasks = [
  {
    id: "follow",
    number: "01",
    title: "FOLLOW ETHER ARCHIVE ON X",
    description: "very archive begins with a signal. Find Ether Archive and become part of the story.",
    actions: [{ id: "open-profile", label: "FOLLOW THE SIGNAL ↗", kind: "follow" }]
  },
  {
    id: "engage",
    number: "02",
    title: "LIKE + REPOST THE CAMPAIGN",
    description: "Let the signal travel further. Help the story reach new horizons..",
    actions: [
      { id: "like", label: "LEAVE A SIGN ↗", kind: "like" },
      { id: "repost", label: "PASS IT ON ↗", kind: "repost" }
    ]
  },
  {
    id: "quote",
    number: "03",
    title: "QUOTE THE CAMPAIGN POST",
    description: "Add your voice to the archive. Every perspective gives the story another dimension.",
    actions: [{ id: "quote-post", label: "ADD YOUR VOICE ↗", kind: "quote" }]
  },
  {
    id: "reply",
    number: "04",
    title: "REPLY TO THE CAMPAIGN POST",
    description: "No trace should be left alone. Tag a friend who deserves a place in the archive.",
    actions: [{ id: "reply-post", label: "LEAVE A TRACE ↗", kind: "reply" }]
  }
];

export default function WLPage() {
  const ticketRef = useRef(null);
const [copied, setCopied] = useState(false);

async function downloadTicket() {
  if (!ticketRef.current) return;

  try {
    const dataUrl = await toPng(ticketRef.current, {
      pixelRatio: 4,
      cacheBust: true,
      backgroundColor: "#08090c"
    });

    const link = document.createElement("a");
    link.download = `Ether-Archive-${ticket?.serial || "Ticket"}.png`;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error("Ticket PNG export failed:", error);
    setNotice("Could not export the ticket. Please try again.");
  }
}

async function copyTicketSerial() {
  if (!ticket?.serial) return;

  try {
    await navigator.clipboard.writeText(ticket.serial);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  } catch {
    setNotice("Could not copy the ticket serial.");
  }
}

  const [activeIndex, setActiveIndex] = useState(0);
  const [completed, setCompleted] = useState({});
  const [username, setUsername] = useState("");
  const [wallet, setWallet] = useState("");
  const [notice, setNotice] = useState("");
  const [animating, setAnimating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticket, setTicket] = useState(null);
  const campaignUrl = String(config.wlCampaignTweetUrl || "").trim();
  const currentTask = tasks[activeIndex];
  const doneCount = tasks.filter((task) => completed[task.id]).length;
  const validWallet = /^0x[a-fA-F0-9]{40}$/.test(wallet.trim());
  const cleanUsername = username.trim().replace(/^@/, "");
  const validUsername = /^[A-Za-z0-9_]{1,15}$/.test(cleanUsername);
  const allTasksComplete = tasks.every((task) => completed[task.id]);

  function markActionComplete(task, action) {
    const nextCompleted = { ...completed, [action.id]: true };
    const taskDone = task.actions.every((item) => nextCompleted[item.id]);
    if (taskDone) nextCompleted[task.id] = true;
    setCompleted(nextCompleted);
    setNotice("");

    if (taskDone) {
      setAnimating(true);
      window.setTimeout(() => {
        setActiveIndex((previous) => Math.min(previous + 1, tasks.length));
        setAnimating(false);
      }, 360);
    }
  }

  function openAction(task, action) {
    if (action.kind !== "follow" && !campaignUrl) {
      setNotice("Campaign post URL has not been configured yet. No task has been marked complete.");
      return;
    }

    // Open the relevant X destination synchronously so popup blockers are less likely to interfere.
    if (action.kind === "follow") {
      window.open(config.xUrl, "_blank", "noopener,noreferrer");
    } else {
      const postId = campaignUrl.match(/status\/(\d+)/)?.[1];
      if (action.kind === "like" && postId) {
        window.open(`https://twitter.com/intent/like?tweet_id=${postId}`, "_blank", "noopener,noreferrer");
      } else if (action.kind === "repost" && postId) {
        window.open(`https://twitter.com/intent/retweet?tweet_id=${postId}`, "_blank", "noopener,noreferrer");
      } else if (action.kind === "quote") {
        const text = encodeURIComponent("One day, the internet will be history. What will we leave behind? ✦ @EthArchiveNFT");
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(campaignUrl)}`, "_blank", "noopener,noreferrer");
      } else if (action.kind === "reply" && postId) {
        const text = encodeURIComponent("Every trace tells a story. Who will leave theirs with us? @ @ ✦ @EthArchiveNFT");
        window.open(`https://twitter.com/intent/tweet?in_reply_to=${postId}&text=${text}`, "_blank", "noopener,noreferrer");
      } else {
        window.open(campaignUrl, "_blank", "noopener,noreferrer");
      }
    }
    markActionComplete(task, action);
  }

  async function submitEntry(event) {
    event.preventDefault();
    if (!validUsername || !validWallet || !allTasksComplete) {
      setNotice("Check the required fields and complete every campaign step before continuing.");
      return;
    }
    const apiBase = String(config.wlApiBaseUrl || "").trim().replace(/\/$/, "");
    if (!apiBase) {
      setNotice("WL API is not configured yet. Set site.wlApiBaseUrl in src/config/manifest.js, then rebuild and redeploy the site.");
      return;
    }
    setIsSubmitting(true);
    setNotice("");
    try {
      const response = await fetch(`${apiBase}/api/wl/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: cleanUsername,
          wallet: wallet.trim(),
          tasks: {
            follow: Boolean(completed.follow),
            like: Boolean(completed.like),
            repost: Boolean(completed.repost),
            quote: Boolean(completed.quote),
            reply: Boolean(completed.reply)
          }
        })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || `WL API returned HTTP ${response.status}`);
      if (!data.ticket?.serial) throw new Error("The API response did not include a ticket serial.");
      setTicket(data.ticket);
      setNotice("");
    } catch (error) {
      setNotice(error?.message || "Could not save your entry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const showForm = activeIndex >= tasks.length;

  return <div className="wl-page">
    <header className="wl-header">
      <a className="wl-brand" href="/" aria-label="Ether Archive home">ETHER ARCHIVE</a>
      <div className="wl-header-actions"><a href={config.xUrl} target="_blank" rel="noreferrer">FOLLOW ON X ↗</a><a href="/">BACK TO TERMINAL ↗</a></div>
    </header>
    <main className="wl-main">
      <p className="wl-eyebrow">A PLACE IN THE ARCHIVE</p>
      <h1 className="wl-title">LEAVE YOUR<br/>TRACE IN THE ARCHIVE.</h1>
      <p className="wl-intro">Every trace becomes part of a greater story. Leave yours among the skies of Ether Archive and claim your place in its unfolding history.</p>

      <div className="wl-progress">
        <span>{showForm ? "CAMPAIGN TASKS COMPLETE" : `STEP ${String(activeIndex + 1).padStart(2, "0")} / ${String(tasks.length).padStart(2, "0")}`}</span>
        <strong>{String(doneCount).padStart(2, "0")} / {String(tasks.length).padStart(2, "0")} TASKS COMPLETE</strong>
      </div>

      {!showForm && currentTask && <section className={`wl-task-stage ${animating ? "wl-task-exit" : "wl-task-enter"}`} key={currentTask.id} aria-live="polite">
        <article className="wl-task wl-task-current">
          <div className="wl-task-number">{currentTask.number}</div>
          <div className="wl-task-content">
            <h2>{currentTask.title}</h2>
            <p>{currentTask.description}</p>
            {currentTask.actions.map((action) => <div className="wl-action-row" key={action.id}>
              <button className="wl-task-action" type="button" onClick={() => openAction(currentTask, action)} disabled={Boolean(completed[action.id])}>
                {completed[action.id] ? "COMPLETED ✓" : action.label}
              </button>
              {currentTask.id === "engage" && <span className="wl-action-status">{completed[action.id] ? "DONE" : "PENDING"}</span>}
            </div>)}
            {currentTask.id === "engage" && <p className="wl-small-note">LIKE and REPOST are counted separately. Complete both to continue.</p>}
          </div>
          <div className="wl-task-status">{completed[currentTask.id] ? "COMPLETE" : "IN PROGRESS"}</div>
        </article>
        {notice && <p className="wl-notice" role="status">{notice}</p>}
      </section>}

      {showForm && !ticket && <section className="wl-form wl-form-enter">
        <h2>ENTRY DETAILS</h2>
        <p className="wl-form-note">Every trace has an origin. Leave the name by which you are known and the wallet you wish to associate with your place in the archive. Never provide a seed phrase or private key.</p>
        <form onSubmit={submitEntry}>
          <div className="wl-fields">
            <label className="wl-field">X USERNAME
              <input value={username} onChange={(event) => setUsername(event.target.value)} placeholder="@yourusername" autoComplete="off" maxLength={16} required/>
            </label>
            <label className="wl-field">ETHEREUM WALLET ADDRESS
              <input value={wallet} onChange={(event) => setWallet(event.target.value)} placeholder="0x..." autoComplete="off" spellCheck="false" required/>
            </label>
          </div>
          <button className="wl-submit" type="submit" disabled={isSubmitting}>{isSubmitting ? "CONNECTING..." : "PRESERVE MY PLACE ↗"}</button>
        </form>
        {notice && <p className="wl-notice" role="status">{notice}</p>}
      </section>}
      {ticket && <section className="wl-ticket wl-form-enter" aria-live="polite">
        <p className="wl-eyebrow">YOUR TRACE HAS BEEN PRESERVED</p>
        <h2>A PLACE IN THE ARCHIVE</h2>
        <p className="wl-ticket-intro">Your trace now has a place in the archive. Keep this token of your passage as a reminder that you were here.</p>
        <div className="wl-ticket-card" ref={ticketRef}>
          <span className="wl-ticket-label">ETHER ARCHIVE / WL</span>
          <strong className="wl-ticket-serial">{ticket.serial}</strong>
          <span className="wl-ticket-username">@{ticket.username}</span>
          <span className="wl-ticket-stamp">ENTRY RECORDED</span>
          <svg
  className="wl-ticket-logo"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 1500 1500"
  fill="#fff"
  aria-label="Ether Archive logo"
>
  <polygon points="1055.52 706.59 1012.11 589.27 968.7 706.59 968.64 706.61 840.73 659.27 750 414.09 659.27 659.27 531.36 706.61 531.3 706.59 487.89 589.27 444.48 706.59 327.16 750 444.48 793.41 487.89 910.73 531.3 793.41 531.36 793.39 659.27 840.73 750 1085.91 840.73 840.73 968.64 793.39 968.7 793.41 1012.11 910.73 1055.52 793.41 1172.84 750 1055.52 706.59" />
</svg>
        </div>
        <div className="wl-ticket-actions">
  <button
    className={`wl-task-action wl-copy-button ${copied ? "is-copied" : ""}`}
    type="button"
    onClick={copyTicketSerial}
  >
    {copied ? "COPIED! ✓" : "COPY ARCHIVE CODE"}
  </button>

  <button
    className="wl-task-action"
    type="button"
    onClick={downloadTicket}
  >
    PRESERVE YOUR TICKET ↓
  </button>
</div>
      </section>}
    </main>
    <footer className="wl-footer"><span>ETHER ARCHIVE / A PLACE PRESERVED</span><span>MADE OF TRACES. BUILT TO REMEMBER.</span></footer>
  </div>;
}
