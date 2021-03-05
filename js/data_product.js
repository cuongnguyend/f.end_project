var data_json;
//Dùng ajax hoặc jetch của Jquery
var xhttp = new XMLHttpRequest();

xhttp.open("GET", "https://5f608abe90cf8d0016557ebb.mockapi.io/products", true);
xhttp.send();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        data_json = JSON.parse(this.responseText);
        var product = document.getElementsByClassName("product_item");
        for (var i = 0; i < data_json.length; i++) {
            var regular_price = data_json[i].regular_price;
            var discount = data_json[i].discount;

            function regular() {
                if (regular_price == 0)
                    return true;
                else
                    return false
            }
            product[i].innerHTML = `
                <div class="img_block">
                <div class="new"><span>New</span></div>
                <img src="${data_json[i].src}" alt="">
                <div class="add-to-links ">
                    <div class="favorite">
                        <a class="" title="" href="#">
                            <i class="ionicons ion-android-favorite-outline"></i>
                        </a>
                    </div>
                    <div class="shuffle">
                        <a class="icon_shuffle"  title="" href="javascript:void(0)" onclick="add_to_compare(${data_json[i].id})">
                            <i class="ionicons ion-ios-shuffle-strong"></i>
                        </a>
                    </div>
                    <div class="search">
                        <a class="" title="" href="#">
                            <i class="ionicons ion-ios-search-strong"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div class="product_desc">
                <div class="manufacturer"><a href="#">${data_json[i].manufacturer}</a></div>
                <h3 itemprop="name"><a class="product_name" href="" title="">${data_json[i].name}</a></h3>
                <div class="reviews">
                    <i class="ionicons ion-android-star"></i>
                    <i class="ionicons ion-android-star"></i>
                    <i class="ionicons ion-android-star"></i>
                    <i class="ionicons ion-android-star"></i>
                    <i class="ionicons ion-android-star"></i>
                </div>
                <div class="product-price">
                    <span class="sr-only">Regular price</span>
                    <span class="regular-price">${(regular()==true) ? '' : '$'+regular_price }</span>
                    <span class="sr-only">Price</span>
                    <span itemprop="price" class="price price-sale ${(regular()==true) ? 'text-dark' : ''} ">$${data_json[i].sale_price}</span>
                    <span class="discount-percentage  ${(regular()==true) ? '' : 'discount-product'}" >${(regular()==true) ? '' : '-'+discount+'%'}</span>
                </div>
                <button type="button" data-toggle="modal" data-target="#modalCart" class="btn" onclick="add_product_to_carts(${data_json[i].id});">Add to cart</button>
            </div>`;
        }

        localStorage.setItem("local_product", JSON.stringify(data_json));
        if (!localStorage.getItem("cart_product")) {
            cart_product = [];
            localStorage.setItem("cart_product", JSON.stringify(cart_product));
        }
        if (!localStorage.getItem("compare_product")) {
            compare_product = [];
            localStorage.setItem("compare_product", JSON.stringify(compare_product));
        }
        display();
    }
}

var total_product;

//Viết riêng 1 hàm hiển thị cart
// function display_cart() {
//     var display_product = document.getElementById('list');
//     display_product.innerHTML += `
//     <div class="product_added d-flex flex-row">
//         <div class="img_block">
//             <img src=" ${localData[localData.length-1].src} " alt="">
//             <div class="product_added_quantity">1</div>
//         </div>
//         <div class="product_added_desc">
//             <span class="product_name">${localData[localData.length-1].name}</span></br>
//             <span class="product_price">$${localData[localData.length-1].sale_price}</span>
//             <div class="attr_content">
//                 <span class="product_size">Size: ${localData[localData.length-1].size}</span></br>
//                 <span class="Product_color">Color: ${localData[localData.length-1].color}</span>
//             </div>
//         </div>
//     </div>`
// }
window.onload = function() {
    display();
    display_compare();
}

//Hàm này là hàm hiển thị khi thêm product vào cart
function display() {
    var localData = JSON.parse(localStorage.getItem("cart_product"));
    var display_product = document.getElementById('list');
    var empty = $(".empty");
    localData.length <= 0 ? (empty.show()) && $("#list").addClass("listEmpty") : (empty.hide());
    document.querySelector('.cart_icon .amount').textContent = localData.length;
    var shipping = 7.00;
    var cost = 0;
    //chỉ tạo 1 div sao đó append vào cái div chứa giỏ hàng
    for (var i = 0; i < localData.length; i++) {
        display_product.innerHTML += `
        <div class="product_added d-flex flex-row">
        <div class="img_block">
            <img src=" ${localData[i].src} " alt="">
            <div class="product_added_quantity">1</div>
        </div>
        <div class="product_added_desc">
            <span class="product_name">${localData[i].name}</span>
            <span class="delete_product_cart"><a href="javascript:void(0)" onclick="delete_product(${localData[i].id})"><i class="material-icons">close</i></a></span>
            </br>
            <span class="product_price">$${localData[i].sale_price}</span>
            <div class="attr_content">
                <span class="product_size">Size: ${localData[i].size}</span></br>
                <span class="Product_color">Color: ${localData[i].color}</span>
            </div>
        </div>
    </div>`
        cost += localData[i].sale_price;
    }
    total_product = cost;
    //Dùng Jquery
    document.querySelector('.shipping  .value').textContent = '$' + shipping + '.00';
    document.querySelector('.subtotal  .value').textContent = '$' + cost.toFixed(2);
    document.querySelector('.total  .value').textContent = '$' + (cost + shipping);
    document.querySelector('.cart  .cost').textContent = '$' + (cost + shipping).toFixed(2);
}
// display carts


// delete product in cart 
function delete_product(i) {
    var localData = JSON.parse(localStorage.getItem("cart_product"));
    let item = localData.find(e => e.id == i);
    console.log(localData.indexOf(item));
    localData.splice(localData.indexOf(item), 1);
    localStorage.setItem("cart_product", JSON.stringify(localData));
    window.location.reload();
    // display();
}


function add_product_to_carts(i) {
    var list = JSON.parse(localStorage.getItem("local_product"));
    let item = list.find(e => e.id == i);
    var set_cart = JSON.parse(localStorage.getItem("cart_product"));
    let itemCartIndex = set_cart.findIndex(item => item.id === i);
    if (item && itemCartIndex == -1) {
        set_cart.push(item);
        localStorage.setItem("cart_product", JSON.stringify(set_cart));
    }
    var item_cart = set_cart.find(item => item.id == i);
    if (item && itemCartIndex !== -1) {
        set_cart[i] = item_cart;
        localStorage.setItem("cart_product", JSON.stringify(set_cart));
    }
    // display modal 
    var count_cart = parseInt(document.querySelector('.cart_icon .amount').textContent);
    document.querySelector('.modal-body img').src = item.src;
    document.querySelector('.modal-body .product-name').textContent = item.name;
    document.querySelector('.modal-body .sale_price').textContent = "  $" + item.sale_price;
    document.querySelector('.modal-body .size').textContent = item.size;
    document.querySelector('.modal-body img').src = item.src;
    document.querySelector('.modal-body .cart-products-count').textContent = "There are " + (count_cart + 1) + " items in your cart";
    document.querySelector('.modal-body .total_products').textContent = (total_product + item.sale_price).toFixed(2);
    document.querySelector('.modal-body .total_').textContent = "$" + (total_product + item.sale_price + 7.00).toFixed(2) + " (tax excl.)";
    display();
}

function display_compare() {
    var localCompare = JSON.parse(localStorage.getItem("compare_product"));
    document.querySelector('.compare .amount').textContent = localCompare.length;
}
// add to compare
function add_to_compare(i) {
    var list = JSON.parse(localStorage.getItem("local_product"));
    let item = list.find(e => e.id == i);


    var set_compare = JSON.parse(localStorage.getItem("compare_product"));
    let itemCompareIndex = set_compare.findIndex(item => item.id === i);
    if (item && itemCompareIndex == -1) {
        set_compare.push(item);
        localStorage.setItem("compare_product", JSON.stringify(set_compare));
    }
    var item_compare = set_compare.find(item => item.id == i);
    if (item && itemCompareIndex !== -1) {
        set_compare[i] = item_compare;
        localStorage.setItem("compare_product", JSON.stringify(set_compare));
    }
    display_compare();
    // only 1 click add to compare 
    var product_item = $(".product_item")[list.indexOf(item)];
    product_item.classList.add("unbind");
}