
function getProducts() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const products = [
        { id: 101, name: "mAcBook PrO", price: 2500, inStock: true },
        { id: 102, name: "iPhOnE 15", price: 1200, inStock: false },
        { id: 103, name: "AiRpOds mAx", price: 500, inStock: true },
        { id: 104, name: "iPaD AiR", price: 800, inStock: true },
        { id: 105, name: "ApPle WaTcH", price: 400, inStock: false }
      ];

      const success = true;

      if (success) {
        resolve(products);
      } else {
        reject("Error al obtener los productos");
      }
    }, 2000);
  });
}

async function initInventory() {
  const container = document.getElementById("inventory-container");
  container.innerHTML = "<p>Cargando productos...</p>";

  try {
    const products = await getProducts();
    container.innerHTML = "";

    const normalizedProducts = products.map((product) => {
      const normalizedName = product.name
        .toLowerCase()
        .split(" ")
        .map((word) => {
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" ");

      const finalPrice = (product.price * 1.15).toFixed(2);

      return {
        ...product,
        name: normalizedName,
        price: finalPrice
      };
    });


    normalizedProducts.forEach((product) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.classList.add(product.inStock ? "available" : "out");

      const statusText = product.inStock ? "Disponible" : "Agotado";
      const buttonText = product.inStock ? "Comprar" : "No disponible";

      card.innerHTML = `
        <h3>${product.name}</h3>
        <p>Precio final: $${product.price}</p>
        <p class="status">Estado: ${statusText}</p>
        <button ${!product.inStock ? "disabled" : ""}>
          ${buttonText}
        </button>
      `;

      const button = card.querySelector("button");
      const statusElement = card.querySelector(".status");

      button.addEventListener("click", () => {
        product.inStock = false;

        card.classList.remove("available");
        card.classList.add("out");

        statusElement.textContent = "Estado: Agotado";
        button.textContent = "Comprado ✔";
        button.disabled = true;
      });

      container.appendChild(card);
    });

  } catch (error) {
    container.innerHTML = `<p style="color:red;">${error}</p>`;
  }
}


initInventory();