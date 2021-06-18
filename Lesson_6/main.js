class Product {
    constructor(itemId, name, price, image, description) {
        this.itemId = itemId;
        this.name = name;
        this.price = price;
        this.image = image;
        this.description = description;
    }
}

class ShoppingCartItem {
    constructor(itemId, count, price) {
        this.itemId = itemId;
        this.count = count;
        this.price = price;
    }

    getTotal() {
        return this.count * this.price;
    }
}   

function countBasketPrice(cart) {
    let res = 0;
    for (let i = 0; i < cart.length; i++) {
        res += cart[i].getTotal();
    }   
    return res;     
}

function countBasket(cart) {
    let res = 0;
    for (let i = 0; i < cart.length; i++) {
        res += cart[i].count;
    }   
    return res;     
}

function drawCart() {
    let cart_elem = document.getElementsByClassName("cart_cont");
    cart_elem[0].textContent = "";
    if (cart.length == 0) 
        cart_elem[0].insertAdjacentHTML("beforeend", "Корзина пуста.");
    else {
        let str = "В корзине: " + countBasket(cart) + " товаров на сумму" + countBasketPrice(cart) + " рублей";
        cart_elem[0].insertAdjacentHTML("beforeend", str);
    }

}

function clearCart() {
    cart = [];
    drawCart();
}

function addGood(event) {
    if (event.target.className == "add_btn"){
        let id = event.target.getAttribute("data_id")
        let good = products.find(item => item.itemId == id);
        cart.push(new ShoppingCartItem(good.itemId, 1, good.price));
        drawCart();
    }
    event.stopPropagation();
}

let products = [];

let cart = [];

products.push(new Product(1, "Шуруповерт", 2374, "1.png", "Дрель-шуруповерт аккумуляторная Dexter ML-CD62-120S, 12 В Li-ion 1.5 Ач"));
products.push(new Product(2, "Шуруповерт", 5405, "2.png", "Дрель-шуруповерт аккумуляторная Metabo PowerMaxx BS, 12 В Li-ion 2х2 Ач"));
products.push(new Product(3, "Шуруповерт", 4613, "3.jpg", "Дрель-шуруповерт аккумуляторная Bosch GSR 120, 12 В Li-ion 2x2 Ач"));
products.push(new Product(4, "Шуруповерт", 6934, "4.png", "Дрель-шуруповерт аккумуляторная Makita DF347DWE, 14.4 В Li-ion 2x1.5 Ач"));
products.push(new Product(5, "Шуруповерт", 8505, "5.png", "Дрель-шуруповерт аккумуляторная DeWalt DCD771S2, 18 В Li-ion 2х1.5 Ач"));
products.push(new Product(6, "Шуруповерт", 9517, "6.png", "Шуруповерт аккумуляторный Stanley Fatmax FMC600D2, 18 В Li-ion 2х2 Ач"));


let goods = document.getElementsByClassName("goods");

products.forEach(product => {
    goods[0].insertAdjacentHTML("beforeend",
        `<div class="good">
            <h1 class="good_name">${product.name}</h1>
            <p class="good_desc">${product.description}</p>
            <img class="good_img" src="img/${product.image}">
            <p class="good_price">${product.price} р.</p>
            <button class="add_btn" data_id="${product.itemId}">КУПИТЬ</button>
        </div>`)
});

drawCart();

document.getElementById("clear_cart").addEventListener('click', clearCart);

goods[0].addEventListener('click', addGood);
