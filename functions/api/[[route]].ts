import { Hono } from 'hono'
import { handle } from 'hono/cloudflare-pages'

type Bindings = {
  mars_portfolio_kv: KVNamespace
}

const app = new Hono<{ Bindings: Bindings }>().basePath('/api')

app.get('/data', async (c) => {
  const lang = c.req.query('lang')
  const key = lang ? `data-${lang}` : 'data'
  const value = await c.env.mars_portfolio_kv.get(key)
  return c.text(value)
})

app.post('/data', async (c) => {
  const lang = c.req.query('lang')
  const key = lang ? `data-${lang}` : 'data'
  const data = await c.req.text()
  await c.env.mars_portfolio_kv.put(key, data)
  return c.json({ success: true })
})

app.delete('/data', async (c) => {
  const lang = c.req.query('lang')
  const key = lang ? `data-${lang}` : 'data'
  await c.env.mars_portfolio_kv.delete(key)
  return c.json({ success: true })
})

app.get('/md', async (c) => {
  const list = await c.env.mars_portfolio_kv.list({ prefix: 'md-' });
  const keys = list.keys.map((entry) => entry.name as `md-${string}-${string}` | `md-${string}`)
  const result = keys.map((key) => {
    const [, slug, lang] = key.split('-')
    return { slug, lang }
  })
  return c.json(result)
})

app.get('/md/:slug', async (c) => {
  const lang = c.req.query('lang')
  const slug = c.req.param('slug')
  const key = lang ? `md-${slug}-${lang}` : `md-${slug}`
  const value = await c.env.mars_portfolio_kv.get(key)
  return c.text(value)
})

app.post('/md/:slug', async (c) => {
  const lang = c.req.query('lang')
  const slug = c.req.param('slug')
  const key = lang ? `md-${slug}-${lang}` : `md-${slug}`
  const data = await c.req.text()
  await c.env.mars_portfolio_kv.put(key, data)
  return c.json({ success: true })
})

app.delete('/md/:slug', async (c) => {
  const lang = c.req.query('lang')
  const slug = c.req.param('slug')
  const key = lang ? `md-${slug}-${lang}` : `md-${slug}`
  await c.env.mars_portfolio_kv.delete(key)
  return c.json({ success: true })
})

export const onRequest = handle(app)