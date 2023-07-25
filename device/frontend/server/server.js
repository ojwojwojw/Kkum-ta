const express = require("express");
const app = express();
const test = require("./Router/test.js");
const cors = require("cors");

app.use("/", test);

const port = 5000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
