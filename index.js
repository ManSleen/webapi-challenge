const server = require("./server");

const port = process.env.PORT || 8090;

server.get("/", (req, res) => {
  res.send("Hello world, its Mike! Here's my sprint challenge!");
});

server.listen(port, () => {
  console.log(`\nAPI is running strong on port ${port}\n`);
});
