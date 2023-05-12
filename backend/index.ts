import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import initSocket from "./src/socket";

import auth from "./src/routes/auth";
import conversations from "./src/routes/conversations";
import users from "./src/routes/users";
import errorMiddleware from "./src/middleware/error";

const app = express();
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);

app.use((req, res, next) => {
  console.log("Got Request: ", req.method, decodeURI(req.url));
  res.on("finish", function () {
    console.log(
      req.method,
      decodeURI(req.url),
      res.statusCode,
      res.statusMessage,
      new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  });
  next();
});

app.use(errorMiddleware);
app.use("/users", users);
app.use("/auth", auth);
app.use("/conversations", conversations);

const httpServer = createServer(app);
initSocket(httpServer);

app.get("/", (req, res) => res.status(200).send("Stay connect backend"));

app.all("*", (req, res) => {
  res.status(404).send({ error: "Page not found." });
});

const port = process.env.PORT ? +process.env.PORT : 3001;
const hostname = "192.168.210.153";
httpServer.listen(port, hostname, () => {
  console.log(`Server is running on port http://${hostname}:${port}`);
});

export default app;
