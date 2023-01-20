document.addEventListener("DOMContentLoaded", function () {
  let mainDiv = document.getElementById("main-div");
  let totalNoOfItems = document.getElementById("no-of-items");
  let noOfItems = 0;
  let totalBill = 0;
  let productsDiv = document.getElementById("products-div");
  let placeorderBtn = document.getElementById("order-btn");
  let cartCount;
  if (!localStorage.getItem("count")) {
    cartCount = 0;
    localStorage.getItem("count", cartCount);
  } else {
    cartCount = localStorage.getItem("count");
  }
  let headerCartCountSpan = document.getElementById("cart-items-count");
  headerCartCountSpan.innerText = cartCount;
  let productDataArray = JSON.parse(localStorage.getItem("products"));
  let productsAlreadyInCart = [];
  if (String(productDataArray) == "null") {
    mainDiv.innerHTML =
      '<p class="no-items-para">No items in cart! Continue shopping.</p>';
  } else {
    for (i = 0; i < productDataArray.length; i++) {
      let quantity = 1;
      for (j = i + 1; j < productDataArray.length; j++) {
        if (productDataArray[i].id == productDataArray[j].id) {
          quantity++;
        }
      }
      let productDataObject = {
        data: productDataArray[i],
        quantity: quantity,
      };
      productsAlreadyInCart.push(productDataObject);
    }
    for (i = 0; i < productsAlreadyInCart.length; i++) {
      for (j = i + 1; j < productsAlreadyInCart.length; j++) {
        if (
          productsAlreadyInCart[i].data.id == productsAlreadyInCart[j].data.id
        ) {
          productsAlreadyInCart.splice(j, 1);
          j--;
        }
      }
    }
    for (i = 0; i < productsAlreadyInCart.length; i++) {
      let productData = productsAlreadyInCart[i].data;
      let productCard = document.createElement("div");
      productCard.classList.add("product-card");
      let imageDiv = document.createElement("div");
      let productDetailsDiv = document.createElement("div");
      productDetailsDiv.classList.add("product-details-div");
      let productImage = document.createElement("img");
      let productName = document.createElement("p");
      productName.classList.add("product-name");
      let quantitydiv = document.createElement("div");
      quantitydiv.classList.add("quantity-div");
      let quantityDivSpan1 = document.createElement("span");
      quantityDivSpan1.classList.add("quantity-div-span-1");
      let quantityDivSpan2 = document.createElement("span");
      quantityDivSpan2.classList.add("quantity-div-span-2");
      let amount = productData.price * productsAlreadyInCart[i].quantity;
      totalBill += amount;
      let amountDiv = document.createElement("div");
      amountDiv.classList.add("amount-div");
      let amountDivSpan1 = document.createElement("span");
      amountDivSpan1.classList.add("amount-div-span1");
      let amountDivSpan2 = document.createElement("span");
      amountDivSpan2.classList.add("amount-div-span2");
      productImage.src = productData.preview;
      productImage.classList.add("product-image");
      imageDiv.append(productImage);

      productName.innerText = productData.name;
      quantityDivSpan1.innerText = "Quantity X ";
      quantityDivSpan2.innerText = productsAlreadyInCart[i].quantity;
      quantitydiv.append(quantityDivSpan1, quantityDivSpan2);
      amountDivSpan1.innerText = "Amount : Rs ";
      amountDivSpan2.innerText = amount;
      amountDiv.append(amountDivSpan1, amountDivSpan2);
      productDetailsDiv.append(productName, quantitydiv, amountDiv);
      productCard.append(imageDiv, productDetailsDiv);
      productsDiv.append(productCard);
    }
    let totalBillSpan = document.getElementById("total-bill");
    totalBillSpan.classList.add("total-bill-span");
    totalBillSpan.innerText = totalBill;
    let cartCountSpan = document.getElementById("cart-items-count");
    cartCountSpan.innerText = cartCount;
    noOfItems = productsAlreadyInCart.length;
    totalNoOfItems.innerText = noOfItems;

    function onPlaceOrderBtnClick() {
      location.href = "/orderConfirmationPage.html";
      onPlaceOrder();
    }
    placeorderBtn.addEventListener("click", onPlaceOrderBtnClick);
  }
});
