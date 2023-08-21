import Fastify from 'fastify';
import cors from '@fastify/cors'

const fastify = Fastify({
  logger: true
})

const build = async function () {
  await fastify.register(cors, {
    origin: true
  })
  return fastify
}


fastify.get('/', async (req, res) => {
  console.log("Success")
})

fastify.get('/homepage', async (req, res) => {
  console.log("Success")
  return { hello: 'world' }
})

const start = async () => {
  try {
    await build()
    await fastify.listen({ port: 5000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()