const server = require("./server");

const port = process.env.PORT || 8090;

server.listen(port, () => {
  console.log(`\nAPI is running strong on port ${port}\n`);
});
