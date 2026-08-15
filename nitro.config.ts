import { defineNitroConfig } from 'nitro'

// Ensure Nitro builds use the Vercel preset so the server bundle is
// compatible with Vercel deployments (not the default Cloudflare target).
export default defineNitroConfig({
  preset: 'vercel',
})
