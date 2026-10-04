export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="container">
        <p>&copy; {year} Jackie Ng &mdash; Computational Structural Biologist, Hong Kong</p>
      </div>
    </footer>
  )
}
