'use client'
import { UserButton } from '@clerk/nextjs'
import styles from './dashboard.module.css'

const ALL_TOOLS = [
  {
    id: 'po-analysis',
    name: 'PO Analysis',
    description: 'Analyse purchase orders and spot trends.',
    icon: '📊',
    url: 'https://po-analysis.bolt.host',
    color: '#edf7f2',
  },
  {
    id: 'zoho-utility',
    name: 'Zoho Utility',
    description: 'Manage your Zoho data and workflows.',
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

function ToolCard(props: { tool: typeof ALL_TOOLS[0] }) {
  const tool = props.tool
  return (
    <a href={tool.url} target="_blank" rel="noopener noreferrer" className={styles.card}>
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
  )
}

function LockedCard(props: { tool: typeof ALL_TOOLS[0] }) {
  const tool = props.tool
  return (
    <div className={styles.card + ' ' + styles.cardLocked}>
      <div className={styles.cardTop}>
        <div className={styles.iconWrap} style={{ background: '#f4f3f0' }}>
          <span className={styles.icon}>{tool.icon}</span>
        </div>
        <div className={styles.lockBadge}>No access</div>
      </div>
      <h3 className={styles.cardTitle}>{tool.name}</h3>
      <p className={styles.cardDesc}>Contact your admin to request access.</p>
    </div>
  )
}

export default function DashboardClient(props: Props) {
  const userName = props.userName
  const userEmail = props.userEmail
  const userInitials = props.userInitials
  const allowedTools = props.allowedTools
  const isAdmin = props.isAdmin

  const visibleTools = ALL_TOOLS.filter(function(t) { return allowedTools.includes(t.id) })
  const lockedTools = ALL_TOOLS.filter(function(t) { return !allowedTools.includes(t.id) })

  const toolCount = visibleTools.length
  const subtitle = toolCount === 0
    ? 'No tools assigned yet. Contact your admin.'
    : 'You have access to ' + toolCount + (toolCount === 1 ? ' tool.' : ' tools.')

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
            <p className={styles.greetingSubtitle}>{subtitle}</p>
          </div>
        </div>
        {toolCount > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Your tools</h2>
            <div className={styles.grid}>
              {visibleTools.map(function(tool) { return <ToolCard key={tool.id} tool={tool} /> })}
            </div>
          </section>
        )}
        {lockedTools.length > 0 && toolCount > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Not available</h2>
            <div className={styles.grid}>
              {lockedTools.map(function(tool) { return <LockedCard key={tool.id} tool={tool} /> })}
            </div>
          </section>
        )}
        {isAdmin && (
          <section className={styles.adminBox}>
            <div className={styles.adminIcon}>🛡</div>
            <div>
              <div className={styles.adminTitle}>You are an admin</div>
              <div className={styles.adminDesc}>
                Go to clerk.com, open Users, select a user, edit Public Metadata and add the tools array.
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
