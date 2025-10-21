import "reflect-metadata";
import { container } from "tsyringe";
import app from "@/app";
import config from "@/config/config";
import { AppDataSource } from "@/data-source";
import { ClientRegistry } from "@/client.registery";
import { Session } from "@/sessions/session";

AppDataSource.initialize()
  .then(async () => {
    container.registerInstance(
      "SessionRepository",
      AppDataSource.getRepository(Session),
    );
    const clientRegistry = container.resolve(ClientRegistry);
    await clientRegistry.init();
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
