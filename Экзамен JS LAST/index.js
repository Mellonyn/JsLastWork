let list = document.getElementById('Container');

function showlist() {
    fetch("http://localhost:5000/goods")
        .then(res => res.json())
        .then(data => {
            const selected = document.getElementById('Choose').value;
            data.sort((a, b) => {
                return selected === "asc" ? a.product_price - b.product_price : b.product_price - a.product_price;
            });

            list.innerHTML = "";
            data.forEach(item => {
                const card = document.createElement("div");
                card.className = "Card";

                const divblock = document.createElement('div');
                divblock.className = "Catalog";

                const img = document.createElement("img");
                img.src = item.url;
                img.alt = "";

                const icon = document.createElement('span');
                icon.className = "material-symbols-outlined";
                icon.textContent = 'shopping_cart';
                

                divblock.appendChild(icon);
                divblock.appendChild(img);
                card.appendChild(divblock);

                const name = document.createElement("p");
                name.className = "Name";
                name.textContent = item.product_name;
                card.appendChild(name);

                const description = document.createElement("p");
                description.className = "Description";
                description.textContent = "Основание из полированной нержавеющей стали, придает оригинальный парящий эффект.";
                card.appendChild(description);

                const price = document.createElement("p");
                price.className = "Price";
                price.textContent = `${item.product_price} р`;
                card.appendChild(price);

                list.appendChild(card);

                icon.addEventListener('click', () => {
                    addToCart(item); 
                });
            });
        });

    document.getElementById('Choose').addEventListener('change', showlist);
}
showlist();

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}

