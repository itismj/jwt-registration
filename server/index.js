const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", require("./routes/jwtAuth"));

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
