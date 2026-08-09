/* =========================================
   EEZA MODEST - SCRIPT.JS
   ========================================= */

let cart = [];


/* =========================================
   SHOPPING CART
   ========================================= */

// Add product to cart
function addToCart(name, price) {

    const existingProduct = cart.find(
        item => item.name === name
    );

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();
    openCart();

    showMessage(name + " added to your cart!");
}


// Update cart display
function updateCart() {

    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    if (!cartItems || !cartTotal) return;

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

        cartTotal.innerText = "0";

        return;
    }

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

        const itemTotal =
            item.price * item.quantity;

        total += itemTotal;

        const cartItem =
            document.createElement("div");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <strong>${item.name}</strong>

            <br>

            Rs. ${item.price.toLocaleString()}

            <br>

            <div class="quantity-controls">

                <button onclick="decreaseQuantity(${index})">
                    −
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button onclick="increaseQuantity(${index})">
                    +
                </button>

            </div>

            <button onclick="removeItem(${index})">
                Remove
            </button>
        `;

        cartItems.appendChild(cartItem);
    });

    cartTotal.innerText =
        total.toLocaleString();
}


// Increase quantity
function increaseQuantity(index) {

    cart[index].quantity++;

    updateCart();
}


// Decrease quantity
function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);
    }

    updateCart();
}


// Remove product
function removeItem(index) {

    cart.splice(index, 1);

    updateCart();

    showMessage("Product removed from cart.");
}


/* =========================================
   OPEN / CLOSE CART
   ========================================= */

function openCart() {

    const cartElement =
        document.getElementById("cart");

    if (cartElement) {
        cartElement.classList.add("open");
    }
}


function closeCart() {

    const cartElement =
        document.getElementById("cart");

    if (cartElement) {
        cartElement.classList.remove("open");
    }
}


/* =========================================
   WISHLIST
   ========================================= */

function wishlist(element) {

    if (element.innerText === "♡") {

        element.innerText = "♥";

        element.classList.add("liked");

        showMessage("Added to wishlist ❤️");

    } else {

        element.innerText = "♡";

        element.classList.remove("liked");

        showMessage("Removed from wishlist.");
    }
}


/* =========================================
   PRODUCT FILTER
   ========================================= */

function filterProducts(category) {

    const products =
        document.querySelectorAll(".product");

    const buttons =
        document.querySelectorAll(".filter-btn");


    // Update active button

    buttons.forEach(button => {

        button.classList.remove("active");

    });


    // Find clicked filter

    buttons.forEach(button => {

        const text =
            button.innerText
                .toLowerCase()
                .trim();

        if (
            category === "all" &&
            text === "all"
        ) {

            button.classList.add("active");

        }

        if (
            category === "abaya" &&
            text === "abayas"
        ) {

            button.classList.add("active");

        }

        if (
            category === "hijab" &&
            text === "hijabs"
        ) {

            button.classList.add("active");

        }

        if (
            category === "skirt" &&
            text === "skirts"
        ) {

            button.classList.add("active");

        }
    });


    // Filter products

    products.forEach(product => {

        const productCategory =
            product.dataset.category;

        if (
            category === "all" ||
            productCategory === category
        ) {

            product.style.display = "block";

        } else {

            product.style.display = "none";
        }
    });
}


/* =========================================
   NEWSLETTER
   ========================================= */

function subscribe() {

    const emailInput =
        document.getElementById("email");

    if (!emailInput) return;

    const email =
        emailInput.value.trim();


    if (email === "") {

        showMessage(
            "Please enter your email address."
        );

        emailInput.focus();

        return;
    }


    // Basic email validation

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailPattern.test(email)) {

        showMessage(
            "Please enter a valid email address."
        );

        return;
    }


    showMessage(
        "Thank you for joining EEZA MODEST! ✨"
    );


    emailInput.value = "";
}


/* =========================================
   POP-UP MESSAGE
   ========================================= */

function showMessage(message) {

    let notification =
        document.getElementById(
            "eezaNotification"
        );


    // Create notification if it doesn't exist

    if (!notification) {

        notification =
            document.createElement("div");

        notification.id =
            "eezaNotification";

        document.body.appendChild(
            notification
        );


        // Notification styling

        notification.style.position =
            "fixed";

        notification.style.bottom =
            "25px";

        notification.style.right =
            "25px";

        notification.style.background =
            "#29251f";

        notification.style.color =
            "#ffffff";

        notification.style.padding =
            "14px 22px";

        notification.style.borderRadius =
            "4px";

        notification.style.zIndex =
            "9999";

        notification.style.fontFamily =
            "Georgia, serif";

        notification.style.boxShadow =
            "0 5px 20px rgba(0,0,0,0.2)";

        notification.style.transition =
            "opacity 0.3s ease";
    }


    notification.innerText = message;

    notification.style.opacity = "1";


    // Hide after 3 seconds

    setTimeout(() => {

        notification.style.opacity = "0";

    }, 3000);
}


/* =========================================
   SEARCH FUNCTION
   ========================================= */

function searchProducts() {

    const searchInput =
        document.getElementById(
            "searchInput"
        );

    if (!searchInput) return;

    const searchValue =
        searchInput.value
            .toLowerCase()
            .trim();


    const products =
        document.querySelectorAll(".product");


    products.forEach(product => {

        const productName =
            product
                .querySelector("h3")
                .innerText
                .toLowerCase();


        if (
            productName.includes(searchValue)
        ) {

            product.style.display =
                "block";

        } else {

            product.style.display =
                "none";
        }
    });
}


/* =========================================
   SMOOTH SCROLL
   ========================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(link => {

    link.addEventListener(
        "click",
        function(event) {

            const target =
                document.querySelector(
                    this.getAttribute("href")
                );

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth"
                });
            }
        }
    );
});


/* =========================================
   CLOSE CART WITH ESCAPE KEY
   ========================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            closeCart();

        }
    }
);


/* =========================================
   PAGE LOAD
   ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateCart();

        console.log(
            "EEZA MODEST website loaded successfully ✨"
        );

    }
);