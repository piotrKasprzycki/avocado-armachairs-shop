"use strict";
const cartBtn = document.querySelector("#cart-button");
const cartExitBtn = document.querySelector(".cart-exit-button");
const cart = document.querySelector("#cart");
const productsBtns = document.querySelectorAll(".product-button");
const productsCartContainer = document.querySelector("#cart-products");
const addedWindow = document.querySelector("#product-added");
const addedWindowCart = document.querySelector("#go-to-cart");
const addedWindowContinue = document.querySelector("#continue-shopping");
const summaryPrice = document.querySelector(".cart-summary-price");
const summaryBtn = document.querySelector(".cart-summary-button");

const openCart = function () {
  cart.classList.remove("hide");
};

const closeCart = function () {
  cart.classList.add("hide");
};

cartBtn.addEventListener("click", openCart);

cartExitBtn.addEventListener("click", closeCart);

const changeValue = function (value, element) {
  const target = element.querySelector("span .cart-product-quantity");
  target.textContent = Number(target.textContent) + value;
  if (Number(target.textContent) === 0) deleteProduct(element);
  sumTotal();
};

const checkIfItemExist = function (index) {
  const items = [...document.querySelectorAll(".cart-product")];
  const correctItem = items.find((el) => el.dataset.cartIndex === index);
  if (correctItem) {
    changeValue(1, correctItem);
    return true;
  }

  return false;
};

const openAddedWindow = function () {
  if (cart.classList.contains("hide")) addedWindow.classList.remove("hide");
};

const closeAddedWindow = function () {
  addedWindow.classList.add("hide");
};

addedWindowContinue.addEventListener("click", closeAddedWindow);

addedWindowCart.addEventListener("click", () => {
  closeAddedWindow();
  openCart();
});

const addProduct = function (productBtn) {
  openAddedWindow();
  if (checkIfItemExist(productBtn.dataset.index)) return;
  const content = `  
    <div class="cart-product" data-cart-index="${productBtn.dataset.index}">
        <img class="cart-product-image" src="images/product_${productBtn.dataset.index}.png" alt="">
        <div class="cart-product-details">
            <span class="cart-product-name">${productBtn.previousElementSibling.textContent}</span>
            <span class="cart-product-value">
              <span class="cart-product-quantity">1</span>x<span class="cart-product-price">${productBtn.firstChild.textContent}</span>$
            </span>
            <div class="cart-product-edit">
                <button class="cart-product-plus">+</button>
                <button class="cart-product-minus">-</button>
            </div>
        </div>
        <button class="cart-product-delete">x</button>
    </div>`;
  productsCartContainer.innerHTML += content;
  sumTotal();
};

productsBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    addProduct(e.target);
  });
});

const deleteProduct = function (deleteBtn) {
  deleteBtn.remove();
  sumTotal();
};

productsCartContainer.addEventListener("click", (e) => {
  const target = e.target.closest(".cart-product-delete");
  if (target) deleteProduct(target.closest(".cart-product"));
});

productsCartContainer.addEventListener("click", (e) => {
  const target = e.target.closest(".cart-product-plus");
  if (target) changeValue(1, target.closest(".cart-product"));
});

productsCartContainer.addEventListener("click", (e) => {
  const target = e.target.closest(".cart-product-minus");
  if (target) changeValue(-1, target.closest(".cart-product"));
});

let sum = 0;

const sumTotal = function () {
  const values = [...document.querySelectorAll(".cart-product-value")];
  sum = values.reduce((acc, val) => {
    acc += val.firstElementChild.textContent * val.lastElementChild.textContent;
    return acc;
  }, 0);
  summaryPrice.textContent = `${sum}$`;
  cartBtn.textContent = `Cart (${values.length})`;
};

const emptyCart = function () {
  const products = [...document.querySelectorAll(".cart-product")];
  products.forEach((product) => product.remove());
  sumTotal();
};

const summaryAlert = function () {
  if (sum < 500) {
    alert(`Sorry, minimal cart value is 500$. Add more products please.`);
    return;
  }
  alert(
    "Thank you for choosing us! We’re dedicated to giving you the best products possible."
  );
  emptyCart();
};

summaryBtn.addEventListener("click", () => {
  summaryAlert();
});
