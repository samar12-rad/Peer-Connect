const express = require('express');
const cors = require('cors');
const rootRouter = require("./routes/index");
const session = require('express-session');
require('dotenv').config();

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(session({
    secret: 'secret',
    saveUninitialized: true
}));

app.use("/api/v1", rootRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
