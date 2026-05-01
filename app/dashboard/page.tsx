import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import DashboardClient from './DashboardClient'

export default async function DashboardPage() {
  const { userId } = auth()
  if (!userId) redirect('/sign-in')

  const user = await currentUser()

  const metadata = user?.publicMetadata as { tools?: string[] } | undefined
  const allowedTools = metadata?.tools ?? []

  const isAdmin = (user?.publicMetadata as any)?.role === 'admin'

  return (
    <DashboardClient
      userName={user?.firstName ?? user?.emailAddresses[0]?.emailAddress ?? 'there'}
      userEmail={user?.emailAddresses[0]?.emailAddress ?? ''}
      userInitials={
        user?.firstName && user?.lastName
          ? `${user.firstName[0]}${user.lastName[0]}`
          : (user?.firstName?.[0] ?? user?.emailAddresses[0]?.emailAddress?.[0] ?? 'U').toUpperCase()
      }
      allowedTools={isAdmin ? ['po-analysis', 'zoho-utility'] : allowedTools}
      isAdmin={isAdmin}
    />
  )
}
