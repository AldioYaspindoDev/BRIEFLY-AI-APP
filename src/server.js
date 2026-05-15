import "dotenv/config";
import  app  from "./app.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    app.listen(PORT, () => {
        console.log(`server running in port ${PORT}`);
    })
}
startServer();