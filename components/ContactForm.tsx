"use client";

import { useState, type CSSProperties } from "react";

// Paste your Web3Forms access key here to enable real email delivery to omgvics@gmail.com.
// Get a free key at https://web3forms.com (set the recipient to omgvics@gmail.com when creating it).
const ACCESS_KEY: string = "71d3325e-8109-454b-8fd6-70e3d1859c40";

const fieldBase: CSSProperties = {
  border: "none",
  background: "#fff",
  fontFamily: "var(--font-montserrat)",
  color: "#212121",
};

const buttonStyle = (padding: string, busy: boolean): CSSProperties => ({
  background: "#fbd0ca",
  border: "1.5px solid #000",
  padding,
  fontSize: 18,
  color: "#000",
  cursor: busy ? "default" : "pointer",
  opacity: busy ? 0.7 : 1,
  whiteSpace: "nowrap",
});

export interface ContactFormProps {
  variant: "desktop" | "mobile";
}

/**
 * Ported 1:1 from sayhi.html's doSend/showSuccess/showForm/showError: honeypot
 * check, Web3Forms POST with the same access key/payload shape, busy button
 * label while sending, inline error message, and a Send Another reset.
 */
export function ContactForm({ variant }: ContactFormProps) {
  const isDesktop = variant === "desktop";
  const fontSize = isDesktop ? 20 : 18;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [botcheck, setBotcheck] = useState(false);
  const [view, setView] = useState<"form" | "success">("form");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const field = (extra?: CSSProperties): CSSProperties => ({ ...fieldBase, fontSize, ...extra });

  const resetForm = () => {
    setName("");
    setEmail("");
    setMessage("");
    setBotcheck(false);
    setError("");
    setView("form");
  };

  const handleSend = async () => {
    // honeypot: real visitors never check this hidden box; bots that auto-fill do.
    if (botcheck) {
      setView("success");
      return;
    }
    setError("");
    const configured = Boolean(ACCESS_KEY) && ACCESS_KEY !== "YOUR_WEB3FORMS_ACCESS_KEY";
    if (configured) {
      setBusy(true);
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: ACCESS_KEY,
            botcheck: false,
            subject: "New message from the OMGVICS site",
            from_name: name || "OMGVICS visitor",
            name,
            email,
            message,
          }),
        });
        const json = await res.json().catch(() => ({}));
        if (!json.success) {
          setBusy(false);
          setError(json.message || "Delivery failed — please try again.");
          return;
        }
      } catch {
        setBusy(false);
        setError("Network error — please check your connection and try again.");
        return;
      }
      setBusy(false);
    }
    setView("success");
  };

  if (view === "success") {
    return (
      <div className={isDesktop ? "flex flex-grow flex-col items-end gap-6 self-stretch" : "flex flex-col gap-4"}>
        <span className={`font-pixelify text-lg text-[#212121] ${isDesktop ? "self-stretch" : ""}`}>
          Success! Your message was sent.
        </span>
        <img
          src="/assets/images/paperplane.png"
          alt=""
          draggable={false}
          className={
            isDesktop
              ? "my-2 block h-auto w-full max-w-[584px] self-center select-none"
              : "block h-auto w-full select-none"
          }
        />
        <button
          type="button"
          onClick={resetForm}
          className={`font-pixelify ${isDesktop ? "mt-auto" : "self-start"}`}
          style={buttonStyle(isDesktop ? "8px 16px" : "10px 22px", false)}
        >
          Send Another?
        </button>
      </div>
    );
  }

  return (
    <div className={isDesktop ? "flex flex-col items-end gap-6 self-stretch" : "flex flex-col gap-5"}>
      {isDesktop ? (
        <div className="flex flex-row gap-6 self-stretch">
          <input
            type="text"
            placeholder="Name"
            className="sayhi-field"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={field({ height: 46, flex: 1, minWidth: 0, padding: "0 16px" })}
          />
          <input
            type="email"
            placeholder="Email address"
            className="sayhi-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={field({ height: 46, flex: 1, minWidth: 0, padding: "0 16px" })}
          />
        </div>
      ) : (
        <>
          <input
            type="text"
            placeholder="Name"
            className="sayhi-field"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={field({ height: 48, padding: "0 16px" })}
          />
          <input
            type="email"
            placeholder="Email address"
            className="sayhi-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={field({ height: 48, padding: "0 16px" })}
          />
        </>
      )}

      <textarea
        placeholder="What's on your mind?"
        className="sayhi-field"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={field({
          minHeight: isDesktop ? 290 : 180,
          resize: "vertical",
          padding: "14px 16px",
          lineHeight: 1.35,
          alignSelf: isDesktop ? "stretch" : undefined,
        })}
      />

      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        checked={botcheck}
        onChange={(e) => setBotcheck(e.target.checked)}
        style={{ position: "absolute", left: -9999, width: 1, height: 1, opacity: 0, pointerEvents: "none" }}
      />

      <button
        type="button"
        onClick={handleSend}
        disabled={busy}
        className={`font-pixelify ${isDesktop ? "" : "self-start"}`}
        style={buttonStyle(isDesktop ? "8px 16px" : "10px 22px", busy)}
      >
        {busy ? "Sending…" : "Send"}
      </button>

      {error ? (
        <div
          className={`font-pixelify ${isDesktop ? "self-stretch" : ""}`}
          style={{ fontSize: 15, color: "#8b1a1a" }}
        >
          {error}
        </div>
      ) : null}
    </div>
  );
}
