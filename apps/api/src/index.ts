import cors from "@fastify/cors";
import rateLimit from "@fastify/rate-limit";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import Fastify from "fastify";
import { registerApiKeyRoutes } from "./routes/api-keys.js";
import { registerGroupRoutes } from "./routes/groups.js";
import { registerLocationRoutes } from "./routes/locations.js";
import { loadEnv } from "./utils/env.js";

loadEnv();

async function buildServer() {
  const app = Fastify({
    logger: {
      transport: process.env.NODE_ENV === "production" ? undefined : {
        target: "pino-pretty",
        options: { colorize: true },
      },
    },
  });

  await app.register(cors, {
    origin: process.env.CORS_ORIGIN?.split(",") ?? true,
  });

  await app.register(rateLimit, {
    max: Number(process.env.RATE_LIMIT_MAX ?? 300),
    timeWindow: process.env.RATE_LIMIT_WINDOW ?? "1 minute",
  });

  await app.register(swagger, {
    openapi: {
      info: {
        title: "FleetLink Location API",
        version: process.env.API_VERSION ?? "1.0.0",
        description: "Receive, store, and relay location updates from mobile clients.",
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
          apiKey: {
            type: "apiKey",
            in: "header",
            name: "x-api-key",
          },
        },
      },
    },
  });

  await app.register(swaggerUi, {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "list",
      deepLinking: true,
    },
  });

  // Health check endpoint
  app.get("/health", async () => ({ status: "ok" }));

  // OpenAPI spec endpoint for Readme.com integration
  app.get("/openapi.json", async (request, reply) => {
    const spec = app.swagger();
    reply.type("application/json").send(spec);
  });

  // Readme.com webhook endpoint for automatic spec updates
  app.post("/readme/webhook", async (request, reply) => {
    const readmeApiKey = process.env.README_API_KEY;
    const providedKey = request.headers["x-readme-api-key"];

    // Verify Readme.com API key if configured
    if (readmeApiKey && providedKey !== readmeApiKey) {
      reply.code(401);
      return { error: "Invalid Readme.com API key" };
    }

    // Return the OpenAPI spec for Readme.com to consume
    const spec = app.swagger();
    reply.type("application/json").send(spec);
  });

  await registerGroupRoutes(app);
  await registerApiKeyRoutes(app);
  await registerLocationRoutes(app);

  return app;
}

const port = Number(process.env.PORT ?? 3333);
const host = process.env.HOST ?? "0.0.0.0";

buildServer()
  .then((app) => app.listen({ port, host }))
  .then(() => {
    console.log(`Location API listening on http://${host}:${port}`);
  })
  .catch((error) => {
    console.error("Failed to start API", error);
    process.exit(1);
  });
