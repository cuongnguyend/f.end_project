$(document).ready(function() {
    $(window).scroll(function() {
        if ($(this).scrollTop() > 20) {
            $('#toTopBtn').fadeIn();
        } else {
            $('#toTopBtn').fadeOut();
        }
    });

    $('#toTopBtn').click(function() {
        $("html, body").animate({
            scrollTop: 0
        }, 1000);
        return false;
    });
});
$(window).on('load', function() {
    $('#mdb-preloader').delay(1000).fadeOut(300);
});
window.onload = function() {
    display();
    display_compare();
}

function display() {
    var localData = JSON.parse(localStorage.getItem("cart_product"));
    if (localData.length != 0) {
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
        document.querySelector('.total  .value').textContent = '$' + (cost + shipping).toFixed(2);
        document.querySelector('.cart  .cost').textContent = '$' + (cost + shipping).toFixed(2);
    }

}


function delete_product(i) {
    var localData = JSON.parse(localStorage.getItem("cart_product"));
    let item = localData.find(e => e.id == i);
    localData.splice(localData.indexOf(item), 1);
    localStorage.setItem("cart_product", JSON.stringify(localData));
    window.location.reload();
    // display();
}

function display_compare() {
    var localCompare = JSON.parse(localStorage.getItem("compare_product"));
    if (localCompare.length == 0) {
        document.getElementById("poscompare-table").style.display = "none";
        document.getElementsByClassName("no_product_compare")[0].style.display = "block";
    } else {
        document.querySelector('.compare .amount').textContent = localCompare.length;
        var product_compare = document.getElementsByClassName("list_compare_product")[0];
        var desc_compare_product = document.getElementsByClassName("desc_compare_product")[0];
        for (var i = 0; i < localCompare.length; i++) {
            var regular_price = localCompare[i].regular_price;

            function regular() {
                if (regular_price == 0)
                    return true;
                else
                    return false
            }
            product_compare.innerHTML += `
        <div class="compare_product poscompare-product-td">
            <a href="javascript:void(0)" onclick="remove_product_compare(${localCompare[i].id})" class="js-poscompare-remove poscompare-remove" onclick="">Remove</a>
            <div class="img_block">
                <img src="${localCompare[i].src}" alt="">
            </div>
            <div class="product_desc">
                <h3 itemprop="name"><a class="product_name" href="" title="">${localCompare[i].name}</a></h3>
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
                    <span itemprop="price" class="price price-sale ${(regular()==true) ? 'text-dark' : ''}  ">$${localCompare[i].sale_price}</span>
                </div>
                <button type="button" data-toggle="modal" data-target="#modalCart" class="btn" onclick="add_product_to_carts(1);">Add to cart</button>
            </div>
        </div>`
            desc_compare_product.innerHTML += `
        <div class="type_desc product-td">
                    <div class="type1 poscompare-product-td compositions">${localCompare[i].compositions}</div>
                    <div class="type2 poscompare-product-td compositions">${localCompare[i].papertype}</div>
                    <div class="type1 poscompare-product-td compositions">${localCompare[i].color}</div>
                    <div class="type2 poscompare-product-td compositions">${localCompare[i].size}</div>
                    <div class="type1 poscompare-product-td compositions">60x90cm </div>
                </div>`
        }
    }

}
// remove all compare product 
function removeAll() {
    var localCompare = JSON.parse(localStorage.getItem("compare_product"));
    localCompare.length = 0;
    localStorage.setItem("compare_product", JSON.stringify(localCompare));
    display_compare();
}

function remove_product_compare(i) {
    var localCompare = JSON.parse(localStorage.getItem("compare_product"));
    let item = localCompare.find(e => e.id == i);
    localCompare.splice(localCompare.indexOf(item), 1);
    localStorage.setItem("compare_product", JSON.stringify(localCompare));
    window.location.reload();
}