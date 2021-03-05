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
    document.querySelector('.compare .amount').textContent = localCompare.length;

}