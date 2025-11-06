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
          You will be provided with several examples of webhook request bodies, delimited by """.

          Your task is to generate a robust, type-safe TypeScript handler function to process these webhook events dynamically. The solution must use TypeScript and Zod for strict runtime validation and type inference.

          Requirements:

          1. Zod Schema Generation
          Analyze the provided examples to identify distinct event types.

          Create an individual Zod schema for each distinct event payload.

          Infer the common discriminator field (e.g., type, event, event_name) used to distinguish events.

          Create a single, unified schema (preferably a z.discriminatedUnion) that can parse any of the provided event types.

          2. TypeScript Handler Function
          The handler function (e.g., handleWebhookEvent) must:

          Accept an incoming request body (as unknown).

          Use the unified Zod schema's .safeParse() method to validate and parse the body.

          If parsing fails, throw a custom WebhookError (which you should define) or return a structured error response (e.g., { success: false, error: validationIssues }).

          If parsing succeeds, use a switch statement on the discriminator field to route to event-specific logic.

          Each case block must demonstrate complete type safety, with the data object correctly narrowed to the specific event's type.

          Include placeholder comments (e.g., // Handle user created event) inside each case block.

          Return a structured success response (e.g., { success: true, message: "Event processed" }).

          3. Code Quality
          The generated code must be a single, self-contained, and complete TypeScript file.

          Include all necessary import statements from zod.

          Use clear variable names and concise, professional comments.

          The code must be production-ready, type-safe, and free of linting errors.

          Input (Webhook Payloads):

          """
          ${webhooksBodies}
          """

          Output Format:

          Strictly return only the raw TypeScript code.

          DO NOT include markdown backticks like \`\`\`typescript.

          DO NOT include any introductory text, explanations, or concluding remarks before or after the code.
        `.trim(),
      })

      return reply.status(201).send({
        code: text,
      })
    },
  )
}
