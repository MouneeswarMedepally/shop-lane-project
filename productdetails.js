function DomcontentLoaded() {
  const urlObject = new URLSearchParams(location.search);
  const productId = urlObject.get("id");
  let headerAddtoCart = document.querySelector(".header-cart-section");
  let cartCount;
  if (!localStorage.getItem("count")) {
    cartCount = 0;
    localStorage.getItem("count", cartCount);
  } else {
    cartCount = localStorage.getItem("count");
  }
  let headerCartCountSpan = document.getElementById("cart-items-count");
  headerCartCountSpan.innerText = cartCount;
  function onReadyStateChange(e) {
    if (e.target.readyState === 4) {
      if (e.target.status === 200) {
        // let product=e.target.response;
        let productData = JSON.parse(e.target.response);
        //Creating and adding ID's, classes all the html tags required for the assignment page:
        let main = document.getElementById("body-main");

        let section1 = document.createElement("section");
        section1.classList.add("main-section-1");

        let section2 = document.createElement("section");
        section2.classList.add("main-section-2");

        let section1Div = document.createElement("div");
        section1Div.classList.add("section-1-div");

        let section2Div = document.createElement("div");
        section2Div.classList.add("section-2-div");

        let productDetailsDiv = document.createElement("div");
        productDetailsDiv.classList.add("product-Details-Div");
        let productDescriptionDiv = document.createElement("div");
        productDescriptionDiv.classList.add("product-Description-Div");
        let productPreviewDiv = document.createElement("div");
        productPreviewDiv.classList.add("product-Preview-div");

        // Prview image to be shown in left section:
        let section1DivImg = document.createElement("img");
        section1DivImg.id = "section-1-div-img";
        section1DivImg.src = productData.photos[0];
        // or
        //section1DivImg.src=productData.preview;
        section1Div.append(section1DivImg);
        section1.append(section1Div);

        //Right section inner Html:
        let h1ForProductName = document.createElement("h1");
        h1ForProductName.classList.add("h-1");
        h1ForProductName.innerText = productData.name;
        let h4ForProductBrand = document.createElement("h4");
        h4ForProductBrand.classList.add("h-4");
        h4ForProductBrand.innerText = productData.brand;
        let h3ForProductPrice = document.createElement("h3");
        h3ForProductPrice.classList.add("h-3");
        let spanForProductPrice = document.createElement("span");
        spanForProductPrice.id = "price";
        spanForProductPrice.innerText = productData.price;
        h3ForProductPrice.innerText = "Price: Rs ";
        h3ForProductPrice.append(spanForProductPrice);

        productDetailsDiv.append(
          h1ForProductName,
          h4ForProductBrand,
          h3ForProductPrice
        );

        let h3ForProductDescription = document.createElement("h3");
        h3ForProductDescription.classList.add("h-3");
        h3ForProductDescription.innerText = "Description";

        let pForProductDescription = document.createElement("p");
        pForProductDescription.classList.add("text");
        pForProductDescription.innerText = productData.description;

        productDescriptionDiv.append(
          h3ForProductDescription,
          pForProductDescription
        );

        let h3ForProductPreview = document.createElement("h3");
        h3ForProductPreview.classList.add("h-3");
        h3ForProductPreview.innerText = "Product Preview";

        let previewPhotosDiv = document.createElement("div");
        previewPhotosDiv.classList.add("preview-photos-div");
        function onImageClick(e) {
          let prevPhoto = e.target;
          let src = e.target.src;
          let siblings = previewPhotosDiv.children;
          for (i = 0; i <= siblings.length - 1; i++) {
            let prevImg = siblings[i].children;
            if (prevImg.src != src) {
              siblings[i].classList.remove("active-state");
            }
          }
          prevPhoto.classList.add("active-state");
          section1DivImg.src = src;
        }

        //Adding preview photos to the div:
        let previewPhotos = productData.photos;
        for (i = 0; i <= previewPhotos.length - 1; i++) {
          let previewPhoto = document.createElement("img");
          if (i == 0) {
            previewPhoto.classList.add("active-state");
          }
          previewPhoto.classList.add("preview-photo");
          previewPhoto.src = previewPhotos[i];
          previewPhoto.addEventListener("click", onImageClick);
          previewPhotosDiv.append(previewPhoto);
        }
        productPreviewDiv.append(h3ForProductPreview, previewPhotosDiv);

        let prev = previewPhotosDiv.children;
        function previewPhotosStyling(prevPhotosDivWidth, photosWidth) {
          previewPhotosDiv.style.width = prevPhotosDivWidth;
          for (i = 0; i < prev.length; i++) {
            prev[i].style.width = photosWidth;
          }
        }
        if (prev.length > 5) {
          previewPhotosStyling("80%", "15%");
        } else if (prev.length == 4) {
          previewPhotosStyling("70%", "21%");
        } else if (prev.length == 3) {
          previewPhotosStyling("50%", "30%");
        } else if (prev.length == 2) {
          previewPhotosStyling("40%", "35%");
        }
        let addToCart = document.createElement("button");
        addToCart.id = "add-to-cart";
        addToCart.innerText = "Add to cart";
        function onAddToCartClick(e) {
          cartCount = localStorage.getItem("count");
          productDataFunction(cartCount, productData);
          headerCartCountSpan.innerText = localStorage.getItem("count");
        }

        addToCart.addEventListener("click", onAddToCartClick);
        function onHeaderCartClick(e) {
          location.href = "/checkoutPage.html";
        }
        headerAddtoCart.addEventListener("click", onHeaderCartClick);
        section2.append(
          productDetailsDiv,
          productDescriptionDiv,
          productPreviewDiv,
          addToCart
        );
        main.append(section1, section2);
      }
    } else if (e.target.status >= 400 && e.target.status <= 599) {
      console.log("ERROR IN API CALL");
    }
  }

  let APIEndPointForProductDetails = `https://5d76bf96515d1a0014085cf9.mockapi.io/product/${productId}`;
  let ajax = new XMLHttpRequest();

  ajax.open("get", APIEndPointForProductDetails);

  ajax.send();

  ajax.addEventListener("readystatechange", onReadyStateChange);
}
document.addEventListener("DOMContentLoaded", DomcontentLoaded);
