import { PrismaClient } from "@prisma/client";
import Fastify from "fastify";
import cors from "@fastify/cors";

const prisma = new PrismaClient();

async function main() {
  const allQuestions = await prisma.question.findMany();
  console.log(allQuestions);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

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
  // const { data, error } = await supabase.auth.signUp({
  //   email: 'example@email.com',
  //   password: 'example-password',
  //   // options: {
  //   //   emailRedirectTo: 'https//example.com/welcome';
  //   // }
  // })
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
