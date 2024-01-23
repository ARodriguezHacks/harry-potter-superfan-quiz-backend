import { PrismaClient } from "@prisma/client";
import Fastify, { RequestGenericInterface } from "fastify";
import cors from "@fastify/cors";
import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

// Create a single supabase client for interacting with your database
const supabase = createClient<Database>(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

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
  const { data, error } = await supabase.auth.signInWithPassword({
    email: "example@email.com",
    password: "example-password",
  });
});

// Signing up a user
interface requestGeneric extends RequestGenericInterface {
  Body: string;
}
fastify.post<requestGeneric>("/signup", async (req, res) => {
  const userInput = JSON.parse(req.body)
  const { data, error } = await supabase.auth.signUp({
    email: userInput.email,
    password: userInput.password,
    options: {
      emailRedirectTo: "http://localhost:5173/homepage",
    },
  });
  if (data) {
    res.send(data);
  } else {
    console.error(error);
  }
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
