const http = require("http");

const server = http.createServer((req, res) => {
  const { method, url } = req;

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (url === "/kalkulator" && method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        const data = JSON.parse(body);

        const firstNumber = parseFloat(data.firstNumber);
        const secondNumber = parseFloat(data.secondNumber);
        const operator = data.operator;

        let result = 0;

        if (operator === "+") {
          result = firstNumber + secondNumber;
        } else if (operator === "-") {
          result = firstNumber - secondNumber;
        } else if (operator === "*") {
          result = firstNumber * secondNumber;
        } else if (operator === "/") {
          result = firstNumber / secondNumber;
        } else {
          result = 0;
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            result: `Hasil ${firstNumber} ${operator} ${secondNumber} = ${result}`,
          })
        );
      } catch (error) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid JSON" }));
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end({ response: "page not found!" });
  }
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
