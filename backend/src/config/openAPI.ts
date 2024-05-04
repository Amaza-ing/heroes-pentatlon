const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "HERO",
    version: "1.0.0",
    description: "This is a REST API for HERO endpoints.",
    contact: {
      name: "Adrián Maza",
      email: "adrian.mazav@gmail.com",
    },
  },
  servers: [
    {
      url:
        "http://localhost:" +
        process.env.PORT +
        "/api/v" +
        process.env.API_VERSION,
      description: "Development server",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/config/openAPI.ts", "./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);
const optionsSwaggerUI = {
  customCss:
    ".swagger-ui .topbar, .swagger-ui section.models { display: none }",
};

const openApi = {
  swaggerSpec: swaggerSpec,
  swaggerUi: swaggerUi,
  optionsSwaggerUI: optionsSwaggerUI,
};

module.exports = openApi;
