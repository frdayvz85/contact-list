import { connectDB } from "./src/config/db";
import express, { Request, Response } from "express";
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

// import routes
import userRoutes from "./src/routes/userRoutes";

// 1 ways to connect to the server
app.prepare().then(() => {
  const server = express();

  server.use(express.json());

  //connect to DB
  connectDB();

  //checking api is ok
  server.get("/api/v1/test", (req, res) => {
    res.send("Hello World! It is for testing purposes");
  });

  server.use("/api/v1/users", userRoutes);

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
