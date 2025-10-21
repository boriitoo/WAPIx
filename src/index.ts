import "reflect-metadata";
import app from "@/app";
import config from "@/config/config";
import { AppDataSource } from "@/data-source";
import { ClientRegistry } from "@/client.registery";

AppDataSource.initialize()
  .then(async () => {
    await ClientRegistry.init();
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
