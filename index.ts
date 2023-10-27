import Fastify from "fastify";
import cors from "@fastify/cors";

const fastify = Fastify({
  logger: true,
});

const build = async function () {
  await fastify.register(cors, {
    origin: true,
  });
  return fastify;
};

fastify.get("/", async (req, res) => {
  console.log("Success");
});

// fastify.get("/homepage", async (req, res) => {
//   console.log("Success");
//   return { hello: "world" };
// });

// Logging in a user
fastify.post("/login", async (req, res) => {
  console.log(req.body);
  res.send({ message: "Hello?" });
});

// fastify.route({
//   method: "GET",
//   url: "/api",
//   schema: {
//     querystring: {
//       level: { type: "enum" },
//     },
//     response: {
//       200: {
//         type: "object",
//         properties: {
//           hello: { type: "string" },
//         },
//       },
//     },
//   },
//   handler: function (request, reply) {
//     reply.send({ hello: "Quiz level chosen!" });
//   },
// });

const start = async () => {
  try {
    await build();
    await fastify.listen({ port: 5000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
