import "dotenv/config";
import  app  from "./app.js";
import dataBase from "./config/dataBase.config.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await dataBase();

    app.listen(PORT, () => {
        console.log(`server running in port ${PORT} database connect`);
    })
}
startServer();