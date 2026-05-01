'use client'
import { UserButton } from '@clerk/nextjs'
import styles from './dashboard.module.css'

const ALL_TOOLS = [
  {
    id: 'po-analysis',
    name: 'PO Analysis',
    description: 'Analyse purchase orders, track performance and spot trends across your Amazon business.',
    icon: '📊',
    url: 'https://po-analysis.bolt.host',
    color: '#edf7f2',
  },
  {
    id: 'zoho-utility',
    name: 'Zoho Utility',
    description: 'Connect and manage your Zoho data, automate workflows and sync records seamlessly.',
    icon: '⚡',
    url: 'https://zoho-utility.bolt.host',
    color: '#fdf4e3',
  },
]

interface Props {
  userName: string
  userEmail: string
  userInitials: string
  allowedTools: string[]
  isAdmin: boolean
}

export default function DashboardClient({ userName, userEmail, userInitials, allowedTools, isAdmin }: Props) {
  const visibleTools = ALL_TOOLS.filter(t => allowedTools.includes(t.id))
  const lockedTools = ALL_TOOLS.filter(t => !allowedTools.includes(t.id))

  return (
    <div className={styles.page}>
      <header className={styles.nav}>
        <div className={styles.navBrand}>
          <div className={styles.navLogo}>WS</div>
          <span className={styles.navName}>Wiseseller</span>
        </div>
        <div className={styles.navRight}>
          <span className={styles.navEmail}>{userEmail}</span>
          <UserButton afterSignOutUrl="/sign-in" />
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.greeting}>
          <div className={styles.avatar}>{userInitials}</div>
          <div>
            <h1 className={styles.greetingTitle}>Good to see you, {userName}</h1>
            <p className={styles.greetingSubtitle}>
              {visibleTools.length === 0
                ? 'No tools assigned yet. Contact your admin.'
                : `You have access to ${visibleTools.length} tool${visibleTools.length > 1 ? 's' : ''}.`}
            </p>
          </div>
        </div>

        {visibleTools.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Your tools</h2>
            <div className={styles.grid}>
              {visibleTools.map(tool => (
                
                  key={tool.id}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.card}
                >
                  <div className={styles.cardTop}>
                    <div className={styles.iconWrap} style={{ background: tool.color }}>
                      <span className={styles.icon}>{tool.icon}</span>
                    </div>
                    <div className={styles.cardArrow}>↗</div>
                  </div>
                  <h3 className={styles.cardTitle}>{tool.name}</h3>
                  <p className={styles.cardDesc}>{tool.description}</p>
                  <div className={styles.cardFooter}>
                    <span className={styles.openBtn}>Open tool</span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {lockedTools.length > 0 && visibleTools.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Not available</h2>
            <div className={styles.grid}>
              {lockedTools.map(tool => (
                <div key={tool.id} className={`${styles.card} ${styles.cardLocked}`}>
                  <div className={styles.cardTop}>
                    <div className={styles.iconWrap} style={{ background: '#f4f3f0', opacity: 0.5 }}>
                      <span className={styles.icon}>{tool.icon}</span>
                    </div>
                    <div className={styles.lockBadge}>No access</div>
                  </div>
                  <h3 className={styles.cardTitle}>{tool.name}</h3>
                  <p className={styles.cardDesc}>Contact your admin to request access to this tool.</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {isAdmin && (
          <section className={styles.adminBox}>
            <div className={styles.adminIcon}>🛡</div>
            <div>
              <div className={styles.adminTitle}>You are an admin</div>
              <div className={styles.adminDesc}>
                To control which tools each user can see, go to{' '}
                <strong>clerk.com → Dashboard → Users → select a user → Public Metadata</strong>
                {' '}and set:
                <code className={styles.code}>{'{"tools": ["po-analysis", "zoho-utility"]}'}</code>
                Use <code className={styles.codeInline}>po-analysis</code> and/or <code className={styles.codeInline}>zoho-utility</code> to grant access.
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
