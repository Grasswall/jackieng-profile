interface SocialLink {
  label: string
  href: string
  icon: 'linkedin' | 'instagram' | 'github'
}

export interface SiteMeta {
  email: string
  copyright: string
  socialLinks: SocialLink[]
}

interface FooterProps {
  meta: SiteMeta
}

export function Footer({ meta }: FooterProps) {
  return (
    <footer className="bg-bg" style={{ paddingInline: 'var(--margin)', paddingBlock: '2rem' }}>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[13px] text-muted">
        <div className="flex items-center gap-5">
          {meta.socialLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link text-muted hover:text-ink transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>
        <p>{meta.copyright}</p>
      </div>
    </footer>
  )
}
