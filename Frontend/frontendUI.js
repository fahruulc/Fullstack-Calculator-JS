document
  .getElementById("penjumlahanForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault(); // agar web kita gak reload

    const firstNumber = document.getElementById("firstNumber").value;
    const secondNumber = document.getElementById("secondNumber").value;
    const operator = document.getElementById("operator").value;
    const result = document.getElementById("result");

    try {
      const response = await fetch("http://localhost:3000/kalkulator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstNumber: firstNumber,
          operator: operator,
          secondNumber: secondNumber,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        result.textContent = data.result;
      } else {
        result.textContent = "error bro!";
      }
    } catch (error) {
      result.textContent = "terjadi kesalahan!";
    }
  });
