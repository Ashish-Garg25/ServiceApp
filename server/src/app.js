
import http from 'http'
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import express from "express";
// ENV Config
import dotenv from "dotenv";
import ConnectToMongo from "../settings/config.js";
dotenv.config();

// Mongo DB Connection
ConnectToMongo();

// Import Routes
import userRouter from "./routes/user.js";
import categoryRouter from "./routes/category.js";
import serviceRouter from "./routes/service.js";
import offerRouter from "./routes/offer.js";
import taskRouter from "./routes/task.js";
import chatRouter from "./routes/chat.js";

// Models
import user from "./models/user.js";
import category from "./models/category.js";
import review from "./models/review.js";
import serivce from "./models/serivce.js";
import chat from "./models/chat.js";
import task from "./models/task.js";
import offer from "./models/offer.js";

const app = express();
app.use(express.json());

// const swaggerUi = require("swagger-ui-express");
// const swaggerDocument = require("./swagger.json");

const appVersion = "/api/v1";

app.use(`${appVersion}/`, userRouter);
app.use(`${appVersion}/category`, categoryRouter);
app.use(`${appVersion}/service`, serviceRouter);
app.use(`${appVersion}/offer`, offerRouter);
app.use(`${appVersion}/task`, taskRouter);
app.use(`${appVersion}/chat`, chatRouter);

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
{
  /* THIS CODE IS FOR CHECKING SWAGGER ON LIVE ---- AWS <a href =${process.env.URL || 'http://localhost'}:${process.env.PORT}/api-docs style='color: #FFFFFF'>Kinoverse Docs</a> */
}
app.get("/", (req, res) => {
  res.send(
    `<body style='background-color: #1E293B; padding: 16px'><h4 style='font-weight: 500; color: #FFFFFF'>Application in Development. Please find the API Docs at <a href =${"http://localhost"}:${
      process.env.PORT
    }/api-docs style='color: #FFFFFF'>Service App Docs</a></h4></body>`
  );
});

const port = process.env.PORT || 5001;
// app.listen(port, () => console.log(`Server started on PORT ${port}`));

const start = async () => {
  const app = express();

  const adminOptions = {
    // We pass Category to `resources`
    resources: [
      {
        resource: user,
        options: {
          properties: {
            password: {
              isVisible: {
                edit: true,
                show: false,
                list: false,
                filter: false,
              }
            },
            token: {
              isVisible: {
                edit: false,
                show: true,
                list: false,
                filter: false,
              }
            },
            createdAt: {
              isVisible: {
                edit: false,
                show: true,
                list: true,
                filter: false,
              }
            },
            updatedAt: {
              isVisible: {
                edit: false,
                show: true,
                list: true,
                filter: false,
              }
            }
          }
        }
      },
      category,
      task,
      serivce,
      review,
      chat,
      offer
    ]
  };

  const admin = new AdminJS(adminOptions);

  const adminRouter = AdminJSExpress.buildRouter(admin);
  app.use(admin.options.rootPath, adminRouter);

  app.listen(3000, () => {
    console.log(
      `AdminJS started on http://localhost:3000${admin.options.rootPath}`
    );
  });
};

start();

http.createServer(app).listen(port, (req, res) => {
  console.log(`SERVER STARTED ON PORT ${port}`)
})
