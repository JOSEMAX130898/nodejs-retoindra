const serverless = require("serverless-http");
const express = require("express");
const app = require("./src/app")

module.exports.handler = serverless(app);