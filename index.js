const { app } = require("./app.js");

const port = process.env.PORT || 3000;

app.listen(port, async () => {
    console.log(`listening on port ${port} ...`)
});