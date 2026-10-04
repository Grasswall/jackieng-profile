'use client';

export function DeliveryGap() {
  return (
    <section className="section" style={{ 
      background: 'linear-gradient(180deg, var(--bg) 0%, var(--bg-subtle) 100%)',
      padding: '4rem 2rem',
    }}>
      <div className="section-inner" style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h3 style={{ 
          textAlign: 'center', 
          color: 'var(--text-muted)',
          fontSize: '0.875rem',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: '2rem',
        }}>
          The Delivery Gap
        </h3>
        
        <svg viewBox="0 0 600 200" style={{ width: '100%', maxWidth: '600px', display: 'block', margin: '0 auto' }}>
          {/* Drug molecule */}
          <g>
            <circle cx="50" cy="100" r="30" fill="var(--accent-cyan)" opacity="0.2" />
            <circle cx="50" cy="100" r="20" fill="var(--accent-cyan)" opacity="0.6" />
            <circle cx="50" cy="100" r="10" fill="var(--accent-cyan)" />
            <text x="50" y="160" textAnchor="middle" fill="var(--text)" fontSize="14" fontWeight="600">
              Drug
            </text>
            <text x="50" y="178" textAnchor="middle" fill="var(--text-muted)" fontSize="11">
              Potent
            </text>
          </g>

          {/* Barrier (cell membrane) */}
          <g>
            <line x1="180" y1="40" x2="180" y2="160" stroke="var(--border)" strokeWidth="3" strokeDasharray="8,4" />
            <line x1="190" y1="40" x2="190" y2="160" stroke="var(--border)" strokeWidth="3" strokeDasharray="8,4" />
            <text x="185" y="25" textAnchor="middle" fill="var(--text-muted)" fontSize="12">
              Biological Barrier
            </text>
          </g>

          {/* Arrow path (curved, blocked) */}
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <polygon points="0 0, 10 3, 0 6" fill="#ef4444" opacity="0.6" />
            </marker>
          </defs>
          <path 
            d="M 80 100 Q 130 80, 160 100" 
            stroke="#ef4444" 
            strokeWidth="2" 
            fill="none" 
            markerEnd="url(#arrowhead)"
            opacity="0.6"
          />
          <text x="120" y="70" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="600">
            ✗ Blocked
          </text>

          {/* Arrow with carrier (successful) */}
          <defs>
            <marker id="arrowhead-success" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <polygon points="0 0, 10 3, 0 6" fill="var(--accent-cyan)" />
            </marker>
          </defs>
          <g>
            {/* Carrier bubble */}
            <circle cx="300" cy="100" r="25" fill="none" stroke="var(--accent-gold)" strokeWidth="2" strokeDasharray="4,2" opacity="0.8" />
            <circle cx="300" cy="100" r="10" fill="var(--accent-cyan)" opacity="0.8" />
            <text x="300" y="145" textAnchor="middle" fill="var(--text-muted)" fontSize="11">
              20nm carrier
            </text>
          </g>
          <path 
            d="M 80 100 Q 190 120, 275 100" 
            stroke="var(--accent-cyan)" 
            strokeWidth="2" 
            fill="none" 
            markerEnd="url(#arrowhead-success)"
          />
          <path 
            d="M 325 100 Q 410 100, 530 100" 
            stroke="var(--accent-cyan)" 
            strokeWidth="2" 
            fill="none" 
            markerEnd="url(#arrowhead-success)"
          />

          {/* Target cell */}
          <g>
            <circle cx="550" cy="100" r="30" fill="var(--accent-gold)" opacity="0.1" stroke="var(--accent-gold)" strokeWidth="2" />
            <circle cx="550" cy="100" r="8" fill="var(--accent-gold)" />
            <text x="550" y="160" textAnchor="middle" fill="var(--text)" fontSize="14" fontWeight="600">
              Target
            </text>
            <text x="550" y="178" textAnchor="middle" fill="var(--text-muted)" fontSize="11">
              Diseased Cell
            </text>
          </g>
        </svg>

        <p style={{ 
          textAlign: 'center', 
          color: 'var(--text-muted)', 
          marginTop: '2rem',
          fontSize: '0.9rem',
          maxWidth: '600px',
          margin: '2rem auto 0',
        }}>
          Most drugs fail not because they don&apos;t work — but because they can&apos;t reach the disease site.
        </p>
      </div>
    </section>
  );
}
