import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Impressum / Legal Notice | Immo-Showcase",
  description: "Impressum und rechtliche Angaben / Legal notice.",
};

// Real Impressum data is injected at deploy time via IMPRESSUM_* environment
// variables (set in Vercel). The repo only ever holds neutral placeholders —
// no real name, address, phone, VAT ID or private contact data is committed.
const impressum = {
  company: process.env.IMPRESSUM_COMPANY ?? "Musterfirma",
  owner: process.env.IMPRESSUM_OWNER ?? "Max Mustermann",
  street: process.env.IMPRESSUM_STREET ?? "Musterstraße 1",
  city: process.env.IMPRESSUM_CITY ?? "12345 Musterstadt",
  phone: process.env.IMPRESSUM_PHONE ?? "+49 000 0000000",
  email: process.env.IMPRESSUM_EMAIL ?? "impressum@example.com",
  vat: process.env.IMPRESSUM_VAT ?? "DE000000000",
  web: process.env.IMPRESSUM_WEB ?? "example.com",
} as const;

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: "'Haboro Norm Regular', serif",
        fontSize: 20,
        fontWeight: 400,
        marginBottom: 12,
      }}
    >
      {children}
    </h2>
  );
}

export default function Impressum() {
  const bodyText: React.CSSProperties = {
    fontFamily: "var(--font-geist), sans-serif",
    fontSize: 15,
    lineHeight: 1.8,
  };

  return (
    <div style={{ minHeight: "100vh", background: "#fff", color: "#171717" }}>
      <div
        style={{
          maxWidth: 720,
          margin: "0 auto",
          padding: "clamp(64px, 10vh, 120px) clamp(24px, 6vw, 48px) clamp(80px, 10vh, 120px)",
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-geist), sans-serif",
            color: "#737373",
            fontSize: 14,
            textDecoration: "none",
          }}
        >
          ← Zurück zu Immo-Showcase / Back to Immo-Showcase
        </Link>

        <h1
          style={{
            fontFamily: "'Haboro Norm Regular', serif",
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: 400,
            textTransform: "uppercase",
            letterSpacing: "0.02em",
            margin: "32px 0 24px",
          }}
        >
          Impressum
        </h1>

        {/* ===================== German (authoritative) ===================== */}
        <p style={{ ...bodyText, fontSize: 15, color: "#525252", marginBottom: 40 }}>
          Immo-Showcase ist ein fiktives Showcase-Projekt zu Demonstrationszwecken. Es handelt sich nicht um
          ein reales Immobilienunternehmen, die dargestellten Objekte, Preise und Kontaktdaten sind frei
          erfunden. Für den Betrieb dieser Demo-Seite gelten dieselben rechtlichen Angaben wie für{" "}
          <a href={`https://${impressum.web}`} style={{ color: "#171717" }}>
            {impressum.web}
          </a>
          .
        </p>

        <section style={{ marginBottom: 32 }}>
          <SectionHeading>Angaben gemäß § 5 TMG</SectionHeading>
          <p style={bodyText}>
            {impressum.owner}
            <br />
            {impressum.company}
            <br />
            {impressum.street}
            <br />
            {impressum.city}
            <br />
            Deutschland
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <SectionHeading>Kontakt</SectionHeading>
          <p style={bodyText}>
            Telefon: {impressum.phone}
            <br />
            E-Mail:{" "}
            <a href={`mailto:${impressum.email}`} style={{ color: "#171717" }}>
              {impressum.email}
            </a>
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <SectionHeading>Umsatzsteuer-Identifikationsnummer</SectionHeading>
          <p style={bodyText}>gemäß § 27 a Umsatzsteuergesetz: {impressum.vat}</p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <SectionHeading>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</SectionHeading>
          <p style={bodyText}>{impressum.owner}, Anschrift wie oben.</p>
        </section>

        <section style={{ marginBottom: 64 }}>
          <SectionHeading>Streitschlichtung</SectionHeading>
          <p style={{ ...bodyText, color: "#525252" }}>
            Ich bin nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </section>

        {/* ===================== English (translation, non-authoritative) ===================== */}
        <div style={{ borderTop: "1px solid #e5e5e5", paddingTop: 48 }}>
          <h1
            style={{
              fontFamily: "'Haboro Norm Regular', serif",
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 400,
              textTransform: "uppercase",
              letterSpacing: "0.02em",
              marginBottom: 24,
            }}
          >
            Legal Notice
          </h1>

          <p style={{ ...bodyText, color: "#525252", marginBottom: 40 }}>
            Immo-Showcase is a fictional showcase project for demonstration purposes only. It is not a real
            real-estate company; the properties, prices and contact details shown are made up. This English
            section is a translation provided for convenience; the German Impressum above is the legally
            authoritative version.
          </p>

          <section style={{ marginBottom: 32 }}>
            <SectionHeading>Information according to § 5 TMG (German Telemedia Act)</SectionHeading>
            <p style={bodyText}>
              {impressum.owner}
              <br />
              {impressum.company}
              <br />
              {impressum.street}
              <br />
              {impressum.city}
              <br />
              Germany
            </p>
          </section>

          <section style={{ marginBottom: 32 }}>
            <SectionHeading>Contact</SectionHeading>
            <p style={bodyText}>
              Phone: {impressum.phone}
              <br />
              Email:{" "}
              <a href={`mailto:${impressum.email}`} style={{ color: "#171717" }}>
                {impressum.email}
              </a>
            </p>
          </section>

          <section style={{ marginBottom: 32 }}>
            <SectionHeading>VAT identification number</SectionHeading>
            <p style={bodyText}>pursuant to § 27 a of the German VAT Act: {impressum.vat}</p>
          </section>

          <section style={{ marginBottom: 32 }}>
            <SectionHeading>Responsible for content pursuant to § 55 (2) RStV</SectionHeading>
            <p style={bodyText}>{impressum.owner}, address as above.</p>
          </section>

          <section>
            <SectionHeading>Dispute resolution</SectionHeading>
            <p style={{ ...bodyText, color: "#525252" }}>
              I am not willing or obliged to participate in dispute resolution proceedings before a consumer
              arbitration board.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
