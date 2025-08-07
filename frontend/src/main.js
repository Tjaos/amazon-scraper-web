document.getElementById("searchButton").addEventListener("click", async () => {
  const keyword = document.getElementById("keyword").value.trim();
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "Loading...";

  if (!keyword) {
    resultsDiv.innerHTML = "<p style='color:red;'>Type a keyword!</p>";
    return;
  }

  try {
    const res = await fetch(
      `http://localhost:3000/api/scrape?keyword=${encodeURIComponent(keyword)}`
    );
    const data = await res.json();

    if (res.ok) {
      resultsDiv.innerHTML = "";
      data.forEach((product) => {
        const div = document.createElement("div");
        div.className = "product";
        div.innerHTML = `
          <h3>${product.title}</h3>
          <p>⭐ ${product.rating} - ${product.reviews} reviews</p>
          <img src="${product.image}" alt="Product image" />
        `;
        resultsDiv.appendChild(div);
      });
    } else {
      resultsDiv.innerHTML = `<p style="color:red;">Error: ${data.error}</p>`;
    }
  } catch (error) {
    resultsDiv.innerHTML = "<p style='color:red;'>Conection server error.</p>";
  }
});
