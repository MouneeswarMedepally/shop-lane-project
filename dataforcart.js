function productDataFunction(cartCount, productData) {
  cartCount++;
  localStorage.setItem("count", cartCount);
  var productsArray;
  if (!localStorage.getItem("products")) {
    productsArray = [];
    localStorage.getItem("products", productsArray);
  } else {
    productsArray = JSON.parse(localStorage.getItem("products"));
  }
  productsArray.push(productData);
  localStorage.setItem("products", JSON.stringify(productsArray));
}

function onPlaceOrder() {
  localStorage.clear();
}
