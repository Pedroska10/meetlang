const express = require("express");
const app = express();
const PORT = 8081;

app.use(express.static(__dirname));

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
