export function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        padding: '2rem',
        textAlign: 'center',
        color: 'var(--text-muted)',
        fontSize: '0.875rem',
      }}
    >
      <p style={{ margin: '0 0 0.75rem 0' }}>
        © 2026 Jackie Ng · AtomBios
      </p>
      <nav aria-label="Footer links" style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
        <a
          href="https://linkedin.com/in/jackiengcc"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s ease' }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-cyan)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
        >
          LinkedIn
        </a>
        <a
          href="https://scholar.google.com/citations?user=jackieng"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s ease' }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-cyan)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
        >
          Google Scholar
        </a>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s ease' }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-cyan)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
        >
          GitHub
        </a>
      </nav>
    </footer>
  )
}
