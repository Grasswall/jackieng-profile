// Route fade. Opacity only (no transform) so sticky and fixed children keep
// working, and the page is never left invisible if the animation does not run.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-in" style={{ minHeight: '100vh' }}>
      {children}
    </div>
  )
}
