// ----- ADD CART MANIPULATION -----:
const addButton = document.querySelectorAll('.add');
const currentCart = document.querySelector('.your-cart');
const addedItems = document.querySelector('.added-items');
let cartTotal = 0;

function updateCartDisplay() {
    currentCart.innerHTML = `Your cart (${cartTotal})`;
}

addButton.forEach(button => {
    let counter = 0;
    let cartItem = null;

    button.addEventListener('click', () => {

        const card = button.closest('.card');
        const foodSummaryText = card.querySelector('.food-summary').textContent;
        const costText = card.querySelector('.cost').textContent;
        const price = parseFloat(costText.replace('$', ''));

        if (!button.classList.contains('active')) {
            counter = 1;
            cartTotal += 1;
            updateCartDisplay();

            button.innerHTML = `
                <img class="increment-decrement dec" src="product-list-with-cart-main/assets/images/icon-decrement-quantity.svg" alt="decrement">
                <span class="counter-number">${counter}</span>
                <img class="increment-decrement inc" src="product-list-with-cart-main/assets/images/icon-increment-quantity.svg" alt="increment">
            `;
            button.classList.add('active');

            if (addedItems.querySelector('.your-added-items')) {
                addedItems.innerHTML = "";
            }

            cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <p>${foodSummaryText}</p>
                <span class="counter-number">${counter}x</span>
                <span class="unit-price">@ ${costText}</span>
                <span class="total-price">$${(price * counter).toFixed(2)}</span>
                <div class="cutter"></div>
            `;
            addedItems.appendChild(cartItem);

            const decrement = button.querySelector('img[alt="decrement"]');
            const increment = button.querySelector('img[alt="increment"]');
            const number = button.querySelector('.counter-number');

            increment.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent triggering the parent button click
                counter++;
                cartTotal++;
                number.textContent = counter;
                cartItem.querySelector('.counter-number').textContent = `${counter}x`;
                cartItem.querySelector('.total-price').textContent = `$${(price * counter).toFixed(2)}`;
                updateCartDisplay();
            });

            decrement.addEventListener('click', (e) => {
                e.stopPropagation();
                if (counter > 1) {
                    counter--;
                    cartTotal--;
                    number.textContent = counter;
                    cartItem.querySelector('.counter-number').textContent = `${counter}x`;
                    cartItem.querySelector('.total-price').textContent = `$${(price * counter).toFixed(2)}`;
                    updateCartDisplay();
                } else {
                    button.classList.remove('active');
                    button.innerHTML = `
                        <img class="cart-icon" src="product-list-with-cart-main/assets/images/icon-add-to-cart.svg" alt="">
                        <p class="add-to-cart">Add to Cart</p>
                    `;
                    cartTotal--;
                    updateCartDisplay();
                    cartItem.remove();

                    if(cartTotal === 0) {
                        addedItems.innerHTML = `
                            <img class="cart-image" src="product-list-with-cart-main/assets/images/illustration-empty-cart.svg" alt="">
                            <p class="your-added-items">Your added items will appear here</p>
                        `;
                    }
                }
            });

        }
    });
});
