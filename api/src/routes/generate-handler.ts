import { db } from '@/db'
import { webhooks } from '@/db/schema'
import { google } from '@ai-sdk/google'
import { generateText } from 'ai'
import { inArray } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const generateHandler: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/api/generate',
    {
      schema: {
        summary: 'Generate a TypeScript handler',
        tags: ['Webhooks'],
        body: z.object({
          webhookIds: z.array(z.string()),
        }),
        response: {
          201: z.object({
            code: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { webhookIds } = request.body

      const result = await db
        .select({
          body: webhooks.body,
        })
        .from(webhooks)
        .where(inArray(webhooks.id, webhookIds))

      const webhooksBodies = result.map((webhook) => webhook.body).join('\n\n')

      const { text } = await generateText({
        model: google('gemini-2.5-flash-lite'),
        prompt: `
          You will receive several examples of webhook request bodies from different events.
          Your task is to generate a TypeScript handler function that can process these webhook events dynamically.

          Requirements:

          Use TypeScript and Zod for strict runtime validation and type inference.

          Create a Zod schema that matches all possible webhook event payloads based on the provided examples.

          The handler function must:

          Receive an incoming request body (as unknown).

          Validate it against the Zod schema.

          Identify the event type safely (e.g., by a type or event field if available).

          Execute event-specific logic inside a switch or if block for each supported event.

          Return a structured response or throw a typed error if validation fails.

          The generated code must be fully self-contained, type-safe, and ready to use in a real project (e.g., for an API route).

          Prefer clear variable names and concise but professional comments.

          Input (replace this section with your actual webhook payloads):

          """
          ${webhooksBodies}
          """


          Output:
          A complete TypeScript file containing:

          The Zod schema(s) for the webhook payloads.

          The unified schema for all event types.

          The TypeScript handler function that validates and routes events accordingly.

          Return only the code and do not return \`\`\`typescript or any other markdown symbols, do not include any introduction or text before or after the code.
        `.trim(),
      })

      return reply.status(201).send({
        code: text,
      })
    },
  )
}
