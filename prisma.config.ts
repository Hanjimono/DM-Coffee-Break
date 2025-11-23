import "dotenv/config"
import { defineConfig, env } from "prisma/config"

export default defineConfig({
  schema: "./electron/database/schema.prisma",
  migrations: {
    path: "./electron/database/migrations"
  },
  engine: "classic",
  datasource: {
    url: env("DATABASE_URL")
  }
})
