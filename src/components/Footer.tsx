export function Footer() {
  return (
    <footer className="footer">
      <p className="footer-text">
        © 2026 Jackie Ng · AtomBios
      </p>
      <nav aria-label="Footer links" className="footer-nav">
        <a
          href="https://linkedin.com/in/jackiengcc"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          LinkedIn
        </a>
        <a
          href="https://scholar.google.com/citations?user=jackieng"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          Google Scholar
        </a>
        <a
          href="#"
          rel="noopener noreferrer"
          className="footer-link"
        >
          GitHub
        </a>
      </nav>
    </footer>
  )
}
