const priceElement = document.getElementById("productos");
const numberElement = document.getElementById("number");
let purchases = [];

function add() {
  const price = parseInt(priceElement.value);
  const number = parseInt(numberElement.value);
  let existingPurchase = purchases.find(purchase => purchase.price === price);
  
  if (existingPurchase) {
    existingPurchase.number += number;
  } else {
    let purchase = {
      price: price,
      number: number,
    };
    purchases.push(purchase);
  }

  console.log(purchases);
}

function calc() {
  let sum = 0;
  let totalCantidad = 0;
  let detalleProductos = "";

  for (let index = 0; index < purchases.length; index++) {
    sum += purchases[index].price * purchases[index].number;
    totalCantidad += purchases[index].number;
    detalleProductos += `${purchases[index].number} producto(s) de ${purchases[index].price} JPY (${purchases[index].price * purchases[index].number} JPY)\n`;
  }

  let postage;
  if (sum == 0 || sum >= 3000) {
    postage = 0;
  } else if (sum < 2000) {
    postage = 500;
  } else {
    postage = 250;
  }

  window.alert(`Detalle de productos:\n${detalleProductos}\nCantidad total: ${totalCantidad}\nEl costo del envío es ${postage} JPY. El costo total es de ${sum + postage} JPY`);

  purchases = [];
  priceElement.value = "";
  numberElement.value = "";
}
