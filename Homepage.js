$(document).ready(function () {
  const APIEndPointForHomePage =
    "https://5d76bf96515d1a0014085cf9.mockapi.io/product";
  let searchElement = document.getElementById("searchBox");
  let searchButton = document.getElementById("searchButton");
  let searchDropDown = document.getElementById("search-dropdown");
  let cartCount;
  if (!localStorage.getItem("count")) {
    cartCount = 0;
    localStorage.getItem("count", cartCount);
  } else {
    cartCount = localStorage.getItem("count");
  }
  let cartCountSpan = document.getElementById("cart-items-count");
  cartCountSpan.innerText = cartCount;
  let filteredArray = [];
  $(".auto-play").slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    dots: true,
    arows: false,
    autoplaySpeed: 2000,
  });

  function onReadyStateChange(e) {
    if (e.target.readyState === 4) {
      if (e.target.status === 200) {
        let productList = JSON.parse(e.target.response);
        //change event function
        function onChange(e) {
          let searchItem = e.target.value.toLowerCase();
          // filter function
          function searchFunction(item) {
            trimmedSearchItem = searchInputTrim(searchItem);
            let includes =
              item.name.toLowerCase().includes(searchItem) ||
              item.name.toLowerCase().includes(trimmedSearchItem) ||
              item.brand.toLowerCase().includes(searchItem) ||
              item.name.toLowerCase().includes(trimmedSearchItem);
            return includes;
          }
          let items = productList.filter(searchFunction);
          filteredArray = items;
          function onButtonClick() {
            filteredItems(filteredArray);
          }
          searchButton.addEventListener("click", onButtonClick);
        }
        searchElement.addEventListener("change", onChange);

        // function to trim the input value:
        function searchInputTrim(searchInput) {
          if (searchInput[searchInput.length - 1] == "s") {
            searchInput = searchInput.slice(0, searchInput.length - 1);
            while (searchInput[searchInput.length - 1] == "s")
              searchInput = searchInput.slice(0, searchInput.length - 1);
            return searchInput;
          }
        }

        // Function to filer data as per searched input:
        function filteredItems(filteredItem) {
          if (filteredItem.length == 0) {
            alert("0 items found.");
          }
          //cards to be displayed
          let cards = document.querySelectorAll(".card");
          let cardsMatched = [];
          let cardsnotMatched = [];
          for (index = 0; index <= filteredItem.length - 1; index++) {
            for (ind = 0; ind <= cards.length - 1; ind++) {
              if (cards[ind].innerText.includes(filteredItem[index].name)) {
                cardsMatched.push(cards[ind]);
              } else {
                cardsnotMatched.push(cards[ind]);
              }
            }
          }
          for (i = 0; i <= cardsnotMatched.length - 1; i++) {
            cardsnotMatched[i].style.display = "none";
          }
          for (i = 0; i <= cardsMatched.length - 1; i++) {
            cardsMatched[i].style.display = "block";
          }

          let accessroiesDisplayNone = "";
          let clothingDisplayNone = "";

          // Function to not display respective section if it is empty:
          function sectionDisplay(container, displayNone, section) {
            for (i = 0; i <= container.children.length - 1; i++) {
              let child = container.children[i];
              if (child.style.display == "none") {
                displayNone += "f";
              } else {
                displayNone += "t";
              }
            }
            if (displayNone.includes("t")) {
              section.style.display = "block";
            } else {
              section.style.display = "none";
            }
          }
          sectionDisplay(
            cardContainerForClothing,
            clothingDisplayNone,
            clothingSection
          );
          sectionDisplay(
            cardContainerForAccessories,
            accessroiesDisplayNone,
            accessoriesSection
          );
        }

        //onKeyUp function to display list of related items in the dropdown :
        function onKeyUp(e) {
          // if key is 'enter' then items will be filtered as per searched word:
          if (e.key == "Enter") {
            filteredItems(filteredArray);
            searchElement.blur();
            elementFocus();
          }
          searchWord = e.target.value.toLowerCase();
          searchWordTrimmed = searchWord;
          function searchFunction(item) {
            let includes =
              item.name.toLowerCase().includes(searchWordTrimmed) ||
              item.brand.toLowerCase().includes(searchWordTrimmed);
            return includes;
          }
          if (searchWordTrimmed.length > 0) {
            if (
              searchWordTrimmed.length > 3 &&
              searchWordTrimmed[searchWordTrimmed.length - 1] == "s"
            ) {
              searchWordTrimmed = searchInputTrim(searchWordTrimmed);
            }
            let items = productList.filter(searchFunction);

            // Search Dropdown's option/suggestion click function:
            function onDropDownOptionClick(clicked) {
              let selectedItemArray = [];
              searchDropDown.style.display = "none";
              let selectedItem = clicked.target.innerText.toLowerCase();
              function searchWordMatch(word) {
                for (i = 0; i <= items.length - 1; i++) {
                  if (
                    items[i].name.toLowerCase().includes(word) ||
                    items[i].brand.toLowerCase().includes(word)
                  ) {
                    selectedItemArray.push(items[i]);
                  }
                }
              }
              if (selectedItem == searchWord) {
                searchWordMatch(searchWordTrimmed);
              } else {
                searchWordMatch(selectedItem);
              }
              filteredItems(selectedItemArray);
            }

            searchDropDown.innerHTML = "";

            // for loop to add option values/suggestions to the search dropdown div on item search:
            for (i = 0; i <= items.length; i++) {
              let option = document.createElement("a");
              option.classList.add("option");
              if (i == 0) {
                let p = document.createElement("p");
                p.innerText = "Are you looking for :";
                p.classList.add("search-items-text");
                searchDropDown.insertBefore(p, searchDropDown[0]);
                option.innerText = searchWord;
              } else {
                option.innerText = items[i - 1].name;
              }
              option.addEventListener("click", onDropDownOptionClick);
              searchDropDown.append(option);
            }
          } else {
            searchDropDown.innerHTML = "";
          }
        }
        searchElement.addEventListener("keyup", onKeyUp);

        // elementFocus() function to check whether searchELement has focus or not and to set dropdown div's display property:
        function elementFocus() {
          if (searchElement == document.activeElement) {
            searchDropDown.style.display = "block";
          } else {
            searchDropDown.style.display = "none";
          }
        }
        document.body.addEventListener("click", elementFocus);
        searchBarInsert();
        let productDetails = {};
        //Finding Clothing and Accessories sections present in HTML through JavaScript:
        let clothingSection = document.getElementById("clothing");
        let accessoriesSection = document.getElementById("accessories");

        // creating Card containers for both sections:
        let cardContainerForClothing = document.createElement("div");
        cardContainerForClothing.classList.add("card-container");
        let cardContainerForAccessories = document.createElement("div");
        cardContainerForAccessories.classList.add("card-container");

        //appending card containers to respective sections:
        clothingSection.append(cardContainerForClothing);
        accessoriesSection.append(cardContainerForAccessories);

        //For loop to access each object in the product list array:
        for (index = 0; index < productList.length; index++) {
          productDetails = productList[index];

          //creating anchor tag for card:
          let anchorCard = document.createElement("a");
          anchorCard.href = `/productdetails.html?id=${
            productDetails.id
          }`;
          anchorCard.classList.add("card-link");
          //creating div for card:
          let cardDiv = document.createElement("div");
          cardDiv.classList.add("card");

          //creating div for image in card:
          let imgDivForCardImg = document.createElement("div");
          imgDivForCardImg.classList.add("card-img-div");

          //creating div for card details:
          let cardDetailsDiv = document.createElement("div");
          cardDetailsDiv.classList.add("details");
          anchorCard.append(imgDivForCardImg, cardDetailsDiv);

          //creating each element for card:
          let img = document.createElement("img");
          img.src = productDetails.preview;
          img.classList.add("image");
          let h3 = document.createElement("h3");
          h3.innerText = productDetails.name;
          h3.classList.add("h-3");
          let h4 = document.createElement("h4");
          h4.innerText = productDetails.brand;
          h4.classList.add("h-4");
          let h5 = document.createElement("h5");
          h5.innerText = "Rs " + productDetails.price;
          h5.classList.add("h-5");

          //appending elements to their respective parent div:
          imgDivForCardImg.append(img);
          cardDetailsDiv.append(h3, h4, h5);
          cardDiv.append(anchorCard);

          //if-else statement to append cards according to their category:
          if (productDetails.isAccessory) {
            cardContainerForAccessories.append(cardDiv);
          } else {
            cardContainerForClothing.append(cardDiv);
          }
        }
      }
    } else if (e.target.status >= 400 && e.target.status <= 599) {
      console.log("ERROR IN API CALL");
    }
  }
  let ajax = new XMLHttpRequest();

  ajax.open("get", APIEndPointForHomePage);

  ajax.send();

  ajax.addEventListener("readystatechange", onReadyStateChange);
});
