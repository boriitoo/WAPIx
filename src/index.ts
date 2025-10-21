import "reflect-metadata";
import { container } from "tsyringe";
import app from "@/app";
import config from "@/config/config";
import { AppDataSource } from "@/data-source";
import { ClientRegistry } from "@/client.registery";
import { Session } from "@/sessions/session";
import { logger } from "@/logger";

AppDataSource.initialize()
  .then(async () => {
    container.registerInstance(
      "SessionRepository",
      AppDataSource.getRepository(Session),
    );
    const clientRegistry = container.resolve(ClientRegistry);
    await clientRegistry.init();
    logger.info("Database and DI initialized.");
  })
  .catch((err) => {
    logger.error(err);
  });

app.listen(config.port, () => {
  logger.info(`Server running on port ${config.port}`);
});
