const cartBtn = document.querySelector("#cart-button");
const cartExitBtn = document.querySelector(".cart-exit-button");
const cart = document.querySelector("#cart");
const productsBtns = document.querySelectorAll(".product-button");
const productsCartContainer = document.querySelector("#cart-products");

const openCart = function () {
  cart.classList.remove("hide");
};

const closeCart = function () {
  cart.classList.add("hide");
};

cartBtn.addEventListener("click", openCart);

cartExitBtn.addEventListener("click", closeCart);

const changeValue = function (value, element) {
  const target = element.querySelector("span .cart-product-value");
  if (Number(target.textContent) === 0) deleteProduct(element);
  target.textContent = Number(target.textContent) + value;
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

const addProduct = function (productBtn) {
  if (checkIfItemExist(productBtn.dataset.index)) return;
  const content = `  
    <div class="cart-product" data-cart-index="${productBtn.dataset.index}">
        <img class="cart-product-image" src="images/product_${productBtn.dataset.index}.png" alt="">
        <div class="cart-product-details">
            <span class="cart-product-name" >product</span>
            <span class="cart-product-price"><span class="cart-product-value">1</span>x699$</span>
            <div class="cart-product-edit">
                <button class="cart-product-plus">+</button>
                <button class="cart-product-minus">-</button>
            </div>
        </div>
        <button class="cart-product-exit">x</button>
    </div>`;
  productsCartContainer.innerHTML += content;
};

productsBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    addProduct(e.target);
  });
});

const deleteProduct = function (deleteBtn) {
  deleteBtn.parentElement.remove();
};

productsCartContainer.addEventListener("click", (e) => {
  const target = e.target.closest(".cart-product-exit");
  if (target) deleteProduct(target);
});

productsCartContainer.addEventListener("click", (e) => {
  console.log(e.target);
  const target = e.target.closest(".cart-product-plus");
  if (target) changeValue(1, target.closest(".cart-product"));
});

productsCartContainer.addEventListener("click", (e) => {
  console.log(e.target);
  const target = e.target.closest(".cart-product-minus");
  if (target) changeValue(-1, target.closest(".cart-product"));
});
