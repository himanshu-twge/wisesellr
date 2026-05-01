import { SignIn } from '@clerk/nextjs'
import styles from './signin.module.css'

export default function SignInPage() {
  return (
    <div className={styles.page}>
      <div className={styles.left}>
        <div className={styles.brand}>
          <div className={styles.logo}>WS</div>
          <span className={styles.brandName}>Wiseseller</span>
        </div>
        <div className={styles.tagline}>
          <h1>Your Amazon<br />toolkit, in one place.</h1>
          <p>Sign in to access your tools and analytics dashboard.</p>
        </div>
        <div className={styles.tools}>
          <div className={styles.toolPill}>📊 PO Analysis</div>
          <div className={styles.toolPill}>⚡ Zoho Utility</div>
        </div>
      </div>
      <div className={styles.right}>
        <SignIn
          appearance={{
            elements: {
              rootBox: styles.clerkRoot,
              card: styles.clerkCard,
              headerTitle: styles.clerkTitle,
              headerSubtitle: styles.clerkSubtitle,
              formButtonPrimary: styles.clerkButton,
              footerAction: styles.clerkFooter,
            }
          }}
        />
      </div>
    </div>
  )
}
