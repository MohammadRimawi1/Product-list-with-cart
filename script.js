// ----- ADD CART MANIPULATION -----:
const addButton = document.querySelectorAll('.add');

addButton.forEach(button => {
    let counter = 0;

    button.addEventListener('click', () => {
        if (!button.classList.contains('active')) {
            counter = 1;
            button.innerHTML = `
                <img class="increment-decrement dec" src="product-list-with-cart-main/assets/images/icon-decrement-quantity.svg" alt="decrement">
                <span class="counter-number">${counter}</span>
                <img class="increment-decrement inc" src="product-list-with-cart-main/assets/images/icon-increment-quantity.svg" alt="increment">
            `;
            button.classList.add('active');

            const decrement = button.querySelector('img[alt="decrement"]');
            const increment = button.querySelector('img[alt="increment"]');
            const number = button.querySelector('.counter-number');

            increment.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent triggering the parent button click
                counter++;
                number.textContent = counter;
            });

            decrement.addEventListener('click', (e) => {
                e.stopPropagation();
                if (counter > 1) {
                    counter--;
                    number.textContent = counter;
                } else {
                    button.classList.remove('active');
                    button.innerHTML = `
                        <img class="cart-icon" src="product-list-with-cart-main/assets/images/icon-add-to-cart.svg" alt="">
                        <p class="add-to-cart">Add to Cart</p>
                    `;
                }
            });
        }
    });
});
