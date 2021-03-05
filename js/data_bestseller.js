var data_bestseller;
var xhttp = new XMLHttpRequest();
xhttp.open("GET", "https://5f608abe90cf8d0016557ebb.mockapi.io/bestseller", true);
xhttp.send();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        data_bestseller = JSON.parse(this.responseText);
        var product_seller = document.getElementsByClassName("product");
        for (var i = 0; i < data_bestseller.length; i++) {
            var regular_price = data_bestseller[i].regular_price;

            function regular() {
                if (regular_price == 0)
                    return true;
                else
                    return false
            }
            product_seller[i].innerHTML = `
               <div class="img ">
               <a href="#"><img src="${data_bestseller[i].src}" alt=""></a>
               <a class="search"><i class="material-icons">search</i></a>
           </div>
           <div class="product_desc">
               <div class="manufacturer"><a href="#">${data_bestseller[i].manufacturer}</a></div>
               <h3 itemprop="name"><a class="product_name" href="" title="${data_bestseller[i].name}">${data_bestseller[i].name}</a></h3>
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
                   <span itemprop="price" class="price price-sale ${(regular()==true) ? 'text-dark' : ''} ">$${data_bestseller[i].sale_price}</span>
               </div>
           </div>`;
        }

        //   localStorage.setItem("local_product", JSON.stringify(data));
        //   if (!localStorage.getItem("cart_product")) {
        //       cart_product = [];
        //       localStorage.setItem("cart_product", JSON.stringify(cart_product));
        //   }

    }
}