function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const info = document.getElementById('cartInfo');
    info.innerHTML = '';
    let totalPrice = document.getElementById('TotalPrice')
    totalSum = 0

    cart.forEach((item, index)=> {
        const productElement = document.createElement('div');
        productElement.className = 'cart-item';

        const img = document.createElement('img');
        img.id = 'imgwith';
        img.src = item.url;

        const flexDiv = document.createElement('div');
        flexDiv.id = 'flexdiv';

        const productName = document.createElement('p');
        productName.textContent = item.product_name;
        productName.id = 'productName'

        const productDescription = document.createElement('p');
        productDescription.textContent = item.product_description;
        productDescription.id = 'productDescription'

        const productPrice = document.createElement('p');
        const sum = item.quantity * item.product_price;
        productPrice.textContent = `Цена: ${sum} AZN`;
        productPrice.id = 'productPrice'


        const quantityInput = document.createElement('input');
        quantityInput.value = item.quantity;
        quantityInput.disabled = true;

        const plusButton = document.createElement('button');
        plusButton.id = 'quantityPlus';
        plusButton.textContent = '+';
        plusButton.addEventListener('click',()=>{
            updateQuantity(index, item.quantity + 1)
        })

        const minusButton = document.createElement('button');
        minusButton.id = 'quantityMinus';
        minusButton.textContent = '-';
        minusButton.addEventListener('click',()=>{
            updateQuantity(index,item.quantity -1)
        })

        flexDiv.appendChild(productName);
        flexDiv.appendChild(productDescription);
        flexDiv.appendChild(productPrice);
        flexDiv.appendChild(quantityInput);
        flexDiv.appendChild(plusButton);
        flexDiv.appendChild(minusButton);

        productElement.appendChild(img);
        productElement.appendChild(flexDiv);

        totalSum+=sum

        info.appendChild(productElement);
    });
    totalPrice.innerText = `Итого: ${totalSum}`;
}

displayCart();




const btn_clear = document.getElementById("cardClear")
btn_clear.addEventListener('click',clearCart);

function clearCart() {
    localStorage.removeItem('cart');
    displayCart();
}
const btn_continue = document.getElementById('shoppingContinue').addEventListener('click', () => {
    window.location.href = "index.html";
})

function updateQuantity(index,newQuantity){
    if (newQuantity<1){
        return
    }
    let cart = JSON.parse(localStorage.getItem('cart'))
    cart[index].quantity = newQuantity;
    localStorage.setItem('cart',JSON.stringify(cart))
    displayCart();
}
const moduleWindows = document.getElementById('moduleWindows')
const btn_order = document.getElementById('btn_order').addEventListener('click',(event)=>{

    event.preventDefault();
    moduleWindows.style.display = 'block';
    setTimeout(() => {
        moduleWindows.style.display = 'none';
    }, 5000);
})

