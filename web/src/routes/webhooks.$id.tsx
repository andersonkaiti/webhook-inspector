import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'
import { LoadingSkeleton } from '../components/webhook-details/loading-skeleton'
import { WebhookDetails } from '../components/webhook-details/webhook-details'

export const Route = createFileRoute('/webhooks/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()

  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <WebhookDetails id={id} />
    </Suspense>
  )
}
