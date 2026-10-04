import type { Metadata } from "next";
import { AtomBios } from "@/components/AtomBios";

export const metadata: Metadata = {
  title: "Work — Jackie Ng",
  description: "AtomBios: explore a protein's energy landscape in hours instead of weeks.",
};

export default function WorkPage() {
  return (
    <main style={{ minHeight: '100vh', paddingTop: '5rem', paddingBottom: '3rem' }}>
      <div className="container">
        <h1 className="section-heading">Work</h1>
        <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', marginBottom: '3rem' }}>
          The algorithm is already in the molecule. I built tools to read it.
        </p>
      </div>

      <AtomBios headshot="/jackieng-profile/assets/headshot.jpg" />

      <section className="container" style={{ paddingTop: '4rem' }}>
        <h2 className="section-heading">Publication</h2>
        <div style={{
          padding: '2rem',
          background: 'var(--card-bg)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
        }}>
          <p style={{ fontSize: '0.875rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            Journal of Biological Chemistry
          </p>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Published Research
          </h3>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Tang et al. — Novel host cell factors interacting with SARS-CoV-2 spike protein RBD.
            One of the world&apos;s top-10 biochemistry journals by impact factor.
          </p>
        </div>
      </section>
    </main>
  );
}
