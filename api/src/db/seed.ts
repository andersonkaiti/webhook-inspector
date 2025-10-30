import { faker } from '@faker-js/faker'
import { db } from '.'
import { webhooks } from './schema'

const STRIPE_EVENTS = [
  'payment_intent.succeeded',
  'payment_intent.payment_failed',
  'charge.succeeded',
  'charge.failed',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
  'invoice.payment_succeeded',
  'invoice.payment_failed',
  'invoice.finalized',
  'checkout.session.completed',
  'checkout.session.expired',
  'payment_method.attached',
  'payment_method.detached',
  'plan.created',
  'plan.updated',
  'plan.deleted',
]

const HTTP_METHODS = ['POST']

const PATHS = [
  '/api/webhooks/stripe',
  '/webhook/stripe',
  '/api/v1/webhooks/stripe',
  '/stripe/webhook',
]

const STATUS_CODES = [200, 200, 200, 200, 200, 400, 401, 403, 404, 500]

function generateStripeEvent(eventType: string): string {
  const baseEvent = {
    id: `evt_${faker.string.alphanumeric(24)}`,
    object: 'event',
    api_version: '2023-10-16',
    created:
      Math.floor(Date.now() / 1000) - faker.number.int({ min: 0, max: 86400 }),
    data: {
      object: {},
    },
    livemode: faker.datatype.boolean(),
    pending_webhooks: faker.number.int({ min: 0, max: 5 }),
    request: {
      id: faker.string.uuid(),
      idempotency_key: faker.string.uuid(),
    },
    type: eventType,
  }

  switch (eventType) {
    case 'payment_intent.succeeded':
      baseEvent.data.object = {
        id: `pi_${faker.string.alphanumeric(24)}`,
        amount: faker.number.int({ min: 1000, max: 100000 }),
        currency: faker.finance.currencyCode().toLowerCase(),
        status: 'succeeded',
        customer: `cus_${faker.string.alphanumeric(24)}`,
        payment_method: `pm_${faker.string.alphanumeric(24)}`,
        created:
          Math.floor(Date.now() / 1000) -
          faker.number.int({ min: 60, max: 3600 }),
      }
      break
    case 'invoice.payment_succeeded':
      baseEvent.data.object = {
        id: `in_${faker.string.alphanumeric(24)}`,
        amount_due: faker.number.int({ min: 1000, max: 100000 }),
        amount_paid: faker.number.int({ min: 1000, max: 100000 }),
        customer: `cus_${faker.string.alphanumeric(24)}`,
        customer_email: faker.internet.email(),
        customer_name: faker.person.fullName(),
        subscription: `sub_${faker.string.alphanumeric(24)}`,
        status: 'paid',
        created:
          Math.floor(Date.now() / 1000) -
          faker.number.int({ min: 60, max: 3600 }),
      }
      break
    case 'customer.subscription.created':
      baseEvent.data.object = {
        id: `sub_${faker.string.alphanumeric(24)}`,
        customer: `cus_${faker.string.alphanumeric(24)}`,
        status: 'active',
        current_period_start: Math.floor(Date.now() / 1000),
        current_period_end: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60, // 30 days from now
        items: {
          data: [
            {
              id: `si_${faker.string.alphanumeric(24)}`,
              price: {
                id: `price_${faker.string.alphanumeric(24)}`,
                product: `prod_${faker.string.alphanumeric(24)}`,
              },
            },
          ],
        },
      }
      break
    default:
      baseEvent.data.object = {
        id: faker.string.alphanumeric(24),
        object: 'event_data',
        created: Math.floor(Date.now() / 1000),
      }
  }

  return JSON.stringify(baseEvent, null, 2)
}

function generateWebhook() {
  const eventType = faker.helpers.arrayElement(STRIPE_EVENTS)
  const method = faker.helpers.arrayElement(HTTP_METHODS)
  const pathname = faker.helpers.arrayElement(PATHS)
  const statusCode = faker.helpers.arrayElement(STATUS_CODES)
  const body = generateStripeEvent(eventType)

  return {
    method,
    pathname,
    ip: faker.internet.ipv4(),
    statusCode,
    contentType: 'application/json',
    contentLength: Buffer.byteLength(body, 'utf8'),
    queryParams: {},
    headers: {
      'content-type': 'application/json',
      'user-agent': 'Stripe/1.0',
      'stripe-signature': `t=${Math.floor(Date.now() / 1000)},v1=${faker.string.alphanumeric(64)},v0=${faker.string.alphanumeric(64)}`,
      host: faker.internet.domainName(),
      'x-forwarded-for': faker.internet.ip(),
    },
    body,
    createdAt: new Date(
      Date.now() - faker.number.int({ min: 0, max: 30 * 24 * 60 * 60 * 1000 }),
    ),
  }
}

async function seed() {
  console.log('🌱 Seeding database with Stripe webhook events...')

  const webhookData = Array.from({ length: 60 }, () => generateWebhook())

  const batchSize = 10
  for (let i = 0; i < webhookData.length; i += batchSize) {
    const batch = webhookData.slice(i, i + batchSize)
    await db.insert(webhooks).values(batch)
    console.log(
      `  → Inserted batch ${i / batchSize + 1} of ${Math.ceil(webhookData.length / batchSize)}`,
    )
  }

  console.log('✅ Database seeded successfully!')
  process.exit(0)
}

seed()
  .catch((err) => {
    console.error('❌ Error seeding database:', err)
    process.exit(1)
  })
  .finally(() => {
    process.exit(0)
  })
