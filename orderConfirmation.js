if (!localStorage.getItem("count")) {
    cartCount = 0;
    localStorage.getItem("count", cartCount);
  } else {
    cartCount = localStorage.getItem("count");
  }
  let cartCountSpan = document.getElementById("cart-items-count");
  cartCountSpan.innerText = cartCount;