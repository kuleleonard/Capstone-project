/* External Javascript file for Capstone project 2 - Online store */

// Get status of "hasRun" variable from sessionStorage
let hasRun = JSON.parse(sessionStorage.getItem("hasRun"));

/* When "hasRun" is null/undefined, meaning this is the first time the user is seeing the page, then proceed to 
declare variables and add products to objects and array. However, if that's already been done once, skip ahead */
console.log("hasRun is - " + hasRun);

if (hasRun == false || hasRun == undefined || hasRun == null) {
    console.log("hasRun is false/null")
    // Create empty array for product objects
    let productArray = [];

    // Declare other variables
    let cartContentsArray = [];
    let cartSubTotal = 0;
    let cartTotal = 0;
    let numOfCartItems = 0;
    let addDeliveryAmount = 0;
    let subtractCouponAmount = 0;

    // Create constructor function to add product info to objects
    function productObj(pname, price, image) {
        this.pname = pname;
        this.price = price;
        this.image = image
    }

    // Add product info to objects
    let product1 = new productObj("Mask Group", 20.95, "images/Mask-Group.png");
    let product2 = new productObj("Calfskin Bag", 8995, "images/maroon-bag.png");
    let product3 = new productObj("Nice bag", 3995, "images/nicebag.png");
    let product4 = new productObj("Hat", 99, "images/hat.png");
    let product5 = new productObj("Gray Short", 3885, "images/Grayshort.png");

    // Add product objects to array
    productArray = [product1, product2, product3, product4, product5];

    /* Set the "hasRun" variable to true */
    hasRun = true;

    // Add arrays and variable values to sessionStorage to be available on any page of website
    sessionStorage.setItem("hasRun", JSON.stringify(hasRun));
    sessionStorage.setItem("productArray", JSON.stringify(productArray));
    sessionStorage.setItem("cartSubTotal", JSON.stringify(cartSubTotal));
    sessionStorage.setItem("cartTotal", JSON.stringify(cartTotal));
    sessionStorage.setItem("numOfCartItems", JSON.stringify(numOfCartItems));
    sessionStorage.setItem("cartContentsArray", JSON.stringify(cartContentsArray));

    sessionStorage.setItem("addDeliveryAmount", JSON.stringify(addDeliveryAmount));
    sessionStorage.setItem("subtractCouponAmount", JSON.stringify(subtractCouponAmount));

    console.log("Products have been added to array and sessionStorage.");

} 

// This function makes it easier to set sessionStorage in one go, instead of repeatedly copying all these onto page
function setSessionStorage() {
    sessionStorage.setItem("hasRun", JSON.stringify(hasRun));
    sessionStorage.setItem("productArray", JSON.stringify(productArray));
    sessionStorage.setItem("cartSubTotal", JSON.stringify(cartSubTotal));
    sessionStorage.setItem("cartTotal", JSON.stringify(cartTotal));
    sessionStorage.setItem("numOfCartItems", JSON.stringify(numOfCartItems));
    sessionStorage.setItem("cartContentsArray", JSON.stringify(cartContentsArray));
    sessionStorage.setItem("addDeliveryAmount", JSON.stringify(addDeliveryAmount));
    sessionStorage.setItem("subtractCouponAmount", JSON.stringify(subtractCouponAmount));
}

// This function makes it easier to get sessionStorage in one go, instead of repeatedly copying all these onto page
function getSessionStorage() {
    hasRun = JSON.parse(sessionStorage.getItem("hasRun"));
    productArray = JSON.parse(sessionStorage.getItem("productArray"));
    cartSubTotal = JSON.parse(sessionStorage.getItem("cartSubTotal"));
    cartTotal = JSON.parse(sessionStorage.getItem("cartTotal"));
    numOfCartItems = JSON.parse(sessionStorage.getItem("numOfCartItems"));
    cartContentsArray = JSON.parse(sessionStorage.getItem("cartContentsArray"));
    addDeliveryAmount = JSON.parse(sessionStorage.getItem("addDeliveryAmount"));
    subtractCouponAmount = JSON.parse(sessionStorage.getItem("subtractCouponAmount"));

}

// This function updates items in the shopping cart
function updateCartItemsText() {
    console.log("UpdateCartItemsText has run");
    // Get number of cart items from sessionStorage
    numOfCartItems = JSON.parse(sessionStorage.getItem("numOfCartItems"));
    let selectCartText = document.querySelector(".cart-text");

    // If there are any items in the cart AND the "cart-text" div exists on the page, write number of cart items to page
    if (numOfCartItems > 0 && selectCartText) {
        
        selectCartText.innerHTML = numOfCartItems;
    }

// End of updateCartItemsText() function
}

/* This function is called when user clicks the "Add to cart" button on one of the product details pages. It creates a button that says "Go to cart" next to "Add to cart" button. Clicking "Go to cart" takes the user to the 
"shoppingCart.html" page where they can see the contents of their cart. */
function createGoToCart() {
    let selectButtonDiv = document.querySelector(".priceAndButton");

    /* If the "priceAndButton" div exists (i.e. because user is on one of the product details pages), create button that says "Go to cart" */
    if (selectButtonDiv) {
        console.log("createGotoCart has run");
        let createButton = document.createElement("button");

        // Add button to Bootstrap classes for styling
        createButton.className = "btn btn-outline-primary goToCart";
        createButton.innerHTML = "Go to Cart";

        /* Add event listener, so that clicking the button takes user to shopping cart page. Learned to use location.href
         to direct user to new page here: 
         https://stackoverflow.com/questions/503093/how-do-i-redirect-to-another-webpage */

        createButton.addEventListener("click", function() {
            
            window.location.href = "shoppingCart.html";
        })

        // Add button to parent div
        selectButtonDiv.appendChild(createButton);
    
    // End of if statement
    }

// createGoToCart() function ends
}

/* This function is called when user clicks the "Submit" button at bottom of form on the shipping page. It adds the
 cost of delivery and subtracts any coupon discounts from total cost of products in cart */
function addDeliveryInfo() {
    let selectShippingButton = document.querySelector(".shippingButton");

    // Checks if user is on correct page (i.e. shipping page)
    if (selectShippingButton) {
        console.log("addDeliveryInfo has run");
        // Get cart sub total from session storage
        cartSubTotal = JSON.parse(sessionStorage.getItem("cartSubTotal"));
        addDeliveryAmount = JSON.parse(sessionStorage.getItem("addDeliveryAmount"));
        subtractCouponAmount = JSON.parse(sessionStorage.getItem("subtractCouponAmount"));

        let collectOrDeliver = document.getElementById("collect-or-deliver").value;

        /* I learned how to get the value of a radio button selection here:
        https://stackoverflow.com/questions/9618504/how-to-get-the-selected-radio-button-s-value */

        let couponChosen = document.querySelector("input[name='coupon-radio']:checked").value;

        // Use "Number" function to change strings from form to numbers we can use in calculations
        subtractCouponAmount = Number(couponChosen);
        addDeliveryAmount = Number(collectOrDeliver);

        // Calculate final total by adding delivery fee to cart sub total and subtracting any discount coupons
        cartTotal = cartSubTotal + addDeliveryAmount - subtractCouponAmount;

        /* console.log("Add delivery amount of: R " + addDeliveryAmount + " and minus coupon amount of R " + subtractCouponAmount + ". Cart subtotal is: R " + cartTotal); */

        // Update session storage with new final total
        sessionStorage.setItem("addDeliveryAmount", JSON.stringify(addDeliveryAmount));
        sessionStorage.setItem("subtractCouponAmount", JSON.stringify(subtractCouponAmount));
        sessionStorage.setItem("cartTotal", JSON.stringify(cartTotal));

    // End of if statement to check if user is on correct page
    }

// End of addDeliveryInfo() function
}

// This function creates the order number when the user clicks the confirm order button
function createOrderNumber() {

    /* I learned how to use the following functions to create random numbers here:
    https://www.w3schools.com/js/js_random.asp and then converted them to a string so I could concatenate them to make
    a longer order number. Learned about "toString()" here:
    https://www.geeksforgeeks.org/javascript-tostring-function/ */

    let num1 = Math.floor(Math.random() * 1000) + 1;
    num1 = num1.toString();

    let num2 = Math.floor(Math.random() * 1000) + 1;
    num2 = num2.toString();

    let orderNum = "order" + num1 + num2;
    sessionStorage.setItem("orderNum", JSON.stringify(orderNum));

}

/* Function to display contents of shopping cart (if there are any items in cart). If no items yet, display message
to say "Cart is empty" */
function showCart() {
    let selectCartDiv = document.querySelector(".cartContents");

    // Check if "cartContents" div exists (i.e. is the user on the shopping cart page?). If not, simply end function.
    if (selectCartDiv) {
        console.log("showcart function has run - cart empty.");
        
        // Get cart contents from session storage
        cartContentsArray = JSON.parse(sessionStorage.getItem("cartContentsArray"));

        /* Check if there are any items in shopping cart. If not, display "cart is empty" message, else display cart contents and cart summary info (price, vat etc) */
        if (cartContentsArray.length == 0) {
            selectCartDiv = document.querySelector(".cartContents");
            let createPara = document.createElement("p");

            // Create message
            createPara.innerHTML = "Your shopping cart is empty.";
            createPara.style.color = "red";

            selectCartDiv.appendChild(createPara);

        } else {
            // Create and display list of product items in shopping cart

            console.log("showcart function has run - cart has items.");

            // Declare variables
            productArray = JSON.parse(sessionStorage.getItem("productArray"));

            let createPara3 = document.createElement("p");
            let createPara4 = document.createElement("p");
            let createPara5 = document.createElement("p");
            let createShippingButton = document.createElement("button");

            let selectCartPageDiv = document.querySelector(".cartPage");
            let createCartSummaryDiv = document.createElement("div");

            // For loop to display each product in cart
            for (let i = 0; i <= cartContentsArray.length - 1; i++) {
                
                let createDiv = document.createElement("div");
                let createImg = document.createElement("img");
                let createPara = document.createElement("p");
                let createPara2 = document.createElement("p");
                let selectCartDiv = document.querySelector(".cartContents");

                // Create variable with reference to cart item. Useful for accessing product info objects in productArray
                let ref = cartContentsArray[i];

                // Create contents of each cart item (image, name, price)
                createImg.src = productArray[ref].image;
                createImg.alt = productArray[ref].pname;

                createPara.innerHTML = productArray[ref].pname + "<br><b>In stock</b>";
                createPara2.innerHTML = "R " + productArray[ref].price;
                createPara2.className = "itemPricePara";

                // Shadow around div using Bootstrap styles
                createDiv.className = "cartItem shadow-sm";

                createDiv.appendChild(createImg);
                createDiv.appendChild(createPara);
                createDiv.appendChild(createPara2);
                
                // Add/append elements to parent div
                selectCartDiv.appendChild(createDiv);

            // End of "for (let i = 0; i <= cartContentsArray.length - 1; i++)" statement that adds each cart item to page
            }

            // Get current subtotal from session storage
            cartSubTotal = JSON.parse(sessionStorage.getItem("cartSubTotal"));

            // Get number of cart items from session storage
            let numOfCartItems = JSON.parse(sessionStorage.getItem("numOfCartItems"));

            // Calculate vat
            let vatAmount = cartSubTotal * 0.15;

            // Add VAT to subtotal
            cartSubTotal = vatAmount + cartSubTotal;

            // Create "Cart Summary" on right side of Shopping cart page
            createPara3.innerHTML = "Cart Summary";
            createPara3.style.fontWeight = "bold";

            /* Reminded myself how to round number to 2 decimal places here:
            https://www.w3schools.com/jsref/jsref_tofixed.asp */
            createPara4.innerHTML = "Incl. VAT(15%): R " + vatAmount.toFixed(2); 
            createPara4.style.fontSize = "14px";
            createPara4.style.marginTop = "20px";
            createPara4.style.marginBottom = "0px";

            // Add subtotal and number of cart items
            createPara5.innerHTML = "<b>SubTotal:</b> <span style='font-size:13px;'>(" + numOfCartItems + " item/s )</span> R " + cartSubTotal.toFixed(2);
            createPara5.style.borderBottom = "1px dotted #b3b3b3";

            // Give shadow with Bootstrap class and add elements to parent div
            createCartSummaryDiv.className = "cartSummary shadow-sm";
            createCartSummaryDiv.appendChild(createPara3);
            createCartSummaryDiv.appendChild(createPara4);
            createCartSummaryDiv.appendChild(createPara5);

            // Get cart total from session storage
            cartTotal = JSON.parse(sessionStorage.getItem("cartTotal"));
           
            /* Check if total has been calculated yet. If not, skip displaying total and creating "Confirm order" button, and create "Proceed to shipping" button instead. */
            if (cartTotal > 0) {
                console.log("Cart total is being calculated");

                // Get amounts from sessionStorage
                addDeliveryAmount = JSON.parse(sessionStorage.getItem("addDeliveryAmount"));
                subtractCouponAmount = JSON.parse(sessionStorage.getItem("subtractCouponAmount"));

                // Assign variables
                let createPara6 = document.createElement("p");
                let createPara7 = document.createElement("p");
                let createPara8 = document.createElement("p");

                let createConfirmOrderButton = document.createElement("button");

                // Add delivery fee and coupon info
                createPara7.innerHTML = "Delivery fee R " + addDeliveryAmount;
                createPara8.innerHTML = "Less coupon discount - R " + subtractCouponAmount; 
                createPara8.style.borderBottom = "1px dotted #b3b3b3"

                // Display final total
                createPara6.innerHTML = "Total R " + cartTotal.toFixed(2);

                // Create "Confirm order" button (style with Bootstrap)
                createConfirmOrderButton.innerHTML = "Confirm Order";
                createConfirmOrderButton.className = "btn btn-primary confirmOrder";
                
                // Append paragraphs to parent div
                createCartSummaryDiv.appendChild(createPara7);
                createCartSummaryDiv.appendChild(createPara8);
                createCartSummaryDiv.appendChild(createPara6);
                createCartSummaryDiv.appendChild(createConfirmOrderButton);

            } else {
                // if no total yet, just create "Proceed to shipping" button
                createShippingButton.innerHTML = "Proceed to shipping";
                createShippingButton.className = "btn btn-primary toShipping";
                createCartSummaryDiv.appendChild(createShippingButton);
            
            // End of if statement to check if total has been calculated yet.
            }

            // Add cart summary div to parent div
            selectCartPageDiv.appendChild(createCartSummaryDiv);
            
        // End of "if (cartContentsArray.length == 0" statement
        }

    // End of "if (selectCartDiv)" statement
    }

// End of showCart() function
}

// jQuery functions -------------------------------- // 


$(document).ready(function () {
    
    // Update little number at top right of header to show number of items in shopping cart (if any)
    updateCartItemsText();

    // Display contents of shopping cart (only runs if user is on shopping cart page) 
    showCart(); 

    /* Functions that are called when user clicks on "Add to cart" button for a product on the Product Catalogue page. Adds price of product to subTotal price variable. */

    // Calfskin Bag - R 8995, productArray[1]    
    $(".calfskinBagProduct").click(function () {

        // Get variables from sessionStorage
        getSessionStorage();

        console.log("Cart subtotal is: " + cartSubTotal);

        // add price of product to subtotal
        cartSubTotal += Number(productArray[1].price);
        // increment number of cart items
        numOfCartItems += 1;
        // add array position for this product to cartContentsArray. Will use later to access info in product array easily
        cartContentsArray.push(1);

        // Save changed variables in sessionstorage
        setSessionStorage();

        // Create "Go to Cart" button next to "Add to cart" button on product details page for product
        createGoToCart();

        // Create alert to user, letting them know that their purchase has been added to cart and current total.
        alert(productArray[1].pname + " has been added to your shopping cart. Your current total is R" + cartSubTotal);

        /* Learned that page refreshes unless I make the alert "return false", which was making the "go to cart"
        button disappear. This site helped me figure it out: 
        https://stackoverflow.com/questions/2092090/page-re-load-refresh-after-javascript-alert-dont-want-it-do */

        // Prevents page from refreshing
        return false;

    });

    // Mask Group - R20.95, productArray[0]  
    $(".maskGroupProduct").click(function () {
        getSessionStorage();

        cartSubTotal += Number(productArray[0].price);
        numOfCartItems += 1;
        cartContentsArray.push(0);

        setSessionStorage();
        createGoToCart();
        alert(productArray[0].pname + " has been added to your shopping cart. Your current total is R" + cartSubTotal);
        /* Learned that page refreshes unless I make the alert "return false", which was making the "go to cart"
        button disappear. This site helped me figure it out: 
        https://stackoverflow.com/questions/2092090/page-re-load-refresh-after-javascript-alert-dont-want-it-do */

        return false;

    });

    // Nice bag - R20, productArray[2] 
    $(".niceBagProduct").click(function () {
        getSessionStorage();

        cartSubTotal += Number(productArray[2].price);
        numOfCartItems += 1;
        cartContentsArray.push(2);

        setSessionStorage();
        createGoToCart();
        alert(productArray[2].pname + " has been added to your shopping cart. Your current total is R" + cartSubTotal);
        /* Learned that page refreshes unless I make the alert "return false", which was making the "go to cart"
        button disappear. This site helped me figure it out: 
        https://stackoverflow.com/questions/2092090/page-re-load-refresh-after-javascript-alert-dont-want-it-do */

        return false;

    });

    // Hat - R99, productArray[3] 
    $(".hatProduct").click(function () {
        getSessionStorage();

        cartSubTotal += Number(productArray[3].price);
        numOfCartItems += 1;
        cartContentsArray.push(3);

        setSessionStorage();
        createGoToCart();
        alert(productArray[3].pname + " has been added to your shopping cart. Your current total is R" + cartSubTotal);
        /*  
        https://stackoverflow.com/questions/2092090/page-re-load-refresh-after-javascript-alert-dont-want-it-do */

        return false;

    });

    // Gray Short - R3995, productArray[4] 
    $(".grayShortProduct").click(function () {
        getSessionStorage();

        cartSubTotal += Number(productArray[4].price);
        numOfCartItems += 1;
        cartContentsArray.push(4);

        setSessionStorage();
        createGoToCart();
        alert(productArray[4].pname + " has been added to your shopping cart. Your current total is R" + cartSubTotal);
        /* Learned that page refreshes unless I make the alert "return false", which was making the "go to cart"
        button disappear. This site helped me figure it out: 
        https://stackoverflow.com/questions/2092090/page-re-load-refresh-after-javascript-alert-dont-want-it-do */

        return false;

    });

    // Function to redirect user to shipping.html when they click the "Proceed to shipping" button on the "Cart summary" section of the "shopping cart" page
    $(".toShipping").click(function() {
        window.location.href = "shipping.html";
    });

    /* Function to call "addDeliveryInfo()" function when user clicks on the "Submit" button at bottom of the shipping options form on shipping.html page. */
    $(".shippingButton").click(function() {
        addDeliveryInfo();
    
        /* I really struggled to get the redirect to the shopping cart page to work. Eventually, I learned that I needed 
        to set the type of button to "type="reset" before it would redirect. I learned the solution at this website:
        https://stackoverflow.com/questions/15759020/window-location-href-doesnt-redirect */
        
        window.location.href = "shoppingCart.html";
    }); 

    /* function that is called when user clicks the "Confirm order" button. Creates order number ("createOrderNumber()"
     function) and creates alert to user with message and order number */
    $(".confirmOrder").click(function() {
        createOrderNumber();
        orderNum = JSON.parse(sessionStorage.getItem("orderNum"));
        alert("Your order was successful! Your order number is: " + orderNum);
    });

    /*
    // Fades out office image on homepage when user hover over the image
   $(".officeImg").mouseover(function() {
       $(this).css("opacity", "50%").css("border","blue 2px solid").fadeOut(3000);
        
   });

   // Brings office image back to normal when user hovers over header section
   $(".header-backgrnd").mouseover(function() {
        $(".officeImg")
        .css("class","shadow p-3 mb-1 bg-white rounded img-fluid officeImg")
        .css("opacity", "100%").css("border", "0px")
        .fadeIn(1200);
   });

   // Slides out hidden product menu when user hovers over "Products" menu item in navigation
   $(".productMenu").hover(function() {
        $(".hiddenDiv").slideDown();
   });
   
   // Slides menu back up when mouse leaves menu
   $(".hiddenDiv").mouseleave(function() {
        $(this).slideUp();
    });

    // Animates "Visit our product catalogue" link/box when mouse enters
    $(".call-to-action").mouseenter(function() {
        $(this).animate({left: '100px'})
        .css("backgroundColor", "#0b79bf")
        .css("color", "#e5e7eb")
        .css("textDecoration", "none");
    });

    // Returns link/box to normal when mouse leaves
    $(".call-to-action").mouseleave(function() {
        $(this).animate({left: '-=100px'})
        .css("backgroundColor", "#e5e7eb")
        .css("color", "#0b79bf")
        .css("textDecoration", "underline");
    }); */

});


// End of jQuery functions section -------------------------------------------- //