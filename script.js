// ----- ADD CART MANIPULATION -----:
const addButton = document.querySelectorAll('.add');
const currentCart = document.querySelector('.your-cart');
const cart = document.querySelector('.cart');
const addedItems = document.querySelector('.added-items');
let cartTotal = 0;

function updateCartDisplay() {
    currentCart.innerHTML = `Your cart (${cartTotal})`;
    updateOrderTotal();
}

function updateOrderTotal() {
    const prices = cart.querySelectorAll('.total-price');
    let sum = 0;
    prices.forEach(p => {
        sum += parseFloat(p.textContent.replace('$', ''));
    });

    const totalSumEl = cart.querySelector('.total-sum');
    if(totalSumEl) {
        totalSumEl.textContent = `$${sum.toFixed(2)}`;
    }
}

addButton.forEach(button => {
    let counter = 0;
    let cartItem = null;
    let cartInfo = null;

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

            const chosen = button.closest('.card');
            const selectedImage = chosen.querySelector('.image-content');
            selectedImage.classList.add('selected');

            if(!cart.querySelector('.cart-Information')) {
                cartInfo = document.createElement('div');
                cartInfo.classList.add('cart-Information');
                cartInfo.innerHTML = `
                    <div class="final-price">
                        <p class="order-total">Order Total</p>
                        <p class="total-sum">$0.00</p>
                    </div>
    
                    <div class="company">
                        <img class="neutral-logo" src="product-list-with-cart-main/assets/images/icon-carbon-neutral.svg" alt="">
                        <p class="company-explain">This is a <span>carbon-neutral</span> delivery</p>
                    </div>

                    <div class="btn">
                        <button class="confirm-btn">Confirm Order</button>
                    </div>
                `;
                cart.appendChild(cartInfo);
            }

            if (addedItems.querySelector('.your-added-items')) {
                addedItems.innerHTML = "";
            }

            addedItems.classList.add('on');
            cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <p class="food-summary-text">${foodSummaryText}</p>
                <div class="cart-flexing">
                    <div class="cart-content">
                        <p class="counter-number">${counter}x</p>
                        <p class="unit-price">@ ${costText}</p>
                        <p class="total-price">$${(price * counter).toFixed(2)}</p>
                    </div>
                    <img class="remove-logo" src="product-list-with-cart-main/assets/images/icon-remove-item.svg" alt="">
                </div>
                <div class="cutter"></div>
            `;
            addedItems.appendChild(cartItem);
            updateOrderTotal();

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

                    if (cartTotal === 0) {
                        const info = cart.querySelector('.cart-Information');
                        if(info){
                            info.remove();  
                        } 

                        addedItems.innerHTML = `
                            <img class="cart-image" src="product-list-with-cart-main/assets/images/illustration-empty-cart.svg" alt="">
                            <p class="your-added-items">Your added items will appear here</p>
                        `;
                        addedItems.classList.remove('on');

                    }
                }
            });

        }
    });
});
