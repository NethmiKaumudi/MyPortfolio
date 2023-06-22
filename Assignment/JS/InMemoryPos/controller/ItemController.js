//load all existing customers
getAllItems();
//add customer
$("#btnAddItem").click(function () {
    if (checkAll()) {
        saveItem();
    } else {
        alert("Error");
    }

});

//get all customer
$("#btnGetAllItem").click(function () {
    getAllItems();
});

//bind tr events for getting back data of the rows to text fields
function bindTrEvents() {
    $('#tblItem>tr').click(function () {
        //get the selected rows data
        let code = $(this).children().eq(0).text();
        let description = $(this).children().eq(1).text();
        let unitPrice = $(this).children().eq(2).text();
        let qty = $(this).children().eq(3).text();

        //set the selected rows data to the input fields
        $("#txtItemCode").val(code);
        $("#txtItemDescription").val(description);
        $("#txtItemPrice").val(unitPrice);
        $("#txtQTYOnHand").val(qty);
    })
}

//delete
$("#btnDeleteItem").click(function () {
    let code = $("#txtItemCode").val();

    let consent = confirm("Do you want to delete.?");
    if (consent) {
        let response = deleteItem(code);
        if (response) {
            alert("Item Deleted");
            clearItemInputFields();
            getAllItems();
        } else {
            alert("Item Not Deleted..!");
        }
    }


});

//update
$("#btnUpdateItem").click(function () {
    let code = $("#txtItemCode").val();
    updateItem(code);
    clearItemInputFields();
});

//clear btn event
$("#btnClearCustomer").click(function () {
    clearItemInputFields();
});


// CRUD operation Functions
function saveItem() {
    let code = $("#txtItemCode").val();
    //check customer is exists or not?
    if (searchItem(code.trim()) == undefined) {

        //if the item is not available then add him to the array
        let description = $("#txtItemDescription").val();
        let unitPrice = $("#txtItemPrice").val();
        let qty = $("#txtQTYOnHand").val();

        //by using this one we can create a new object using
        //the item model with same properties
        let newItem = Object.assign({}, item);
        newItem.code = code;
        newItem.description = description;
        newItem.unitPrice = unitPrice;
        newItem.qty = qty;

        //add customer record to the customer array (DB)
        itemDB.push(newItem);
        clearItemInputFields();
        getAllItems();

    } else {
        alert("Item already exits.!");
        clearItemInputFields();
    }
}

function getAllItems() {
    //clear all tbody data before add
    $("#tblItem").empty();

    //get all customers
    for (let i = 0; i < itemDB.length; i++) {
        let code = itemDB[i].code;
        let description = itemDB[i].description;
        let unitPrice = itemDB[i].unitPrice;
        let qty = itemDB[i].qty;

        let row = `<tr>
                     <td>${code}</td>
                     <td>${description}</td>
                     <td>${unitPrice}</td>
                     <td>${qty}</td>
                    </tr>`;

        // //and then append the row to tableBody
        $("#tblItem").append(row);

        //invoke this method every time
        // we add a row // otherwise click
        //event will not work
        bindTrEvents();
    }
}

function deleteItem(code) {
    for (let i = 0; i < itemDB.length; i++) {
        if (itemDB[i].code == code) {
            itemDB.splice(i, 1);
            return true;
        }
    }
    return false;
}

function searchItem(code) {
    return itemDB.find(function (itemDB) {
        //if the search code match with item record
        //then return that object
        return itemDB.code == code;
    });
}

function updateItem(code) {
    if (searchItem(code) == undefined) {
        alert("No such Item..please check the CODE");
    } else {
        let consent = confirm("Do you really want to update this item.?");
        if (consent) {
            let item = searchItem(code);
            //if the customer available can we update.?

            let itemDescription = $("#txtItemDescription").val();
            let itemUnitPrice = $("#txtItemPrice").val();
            let itemQty = $("#txtQTYOnHand").val();

            item.description = itemDescription;
            item.unitPrice = itemUnitPrice;
            item.qty = itemQty;

            getAllItems()
        }
    }
    //Search item from input field
    // $("#itemSearchbtn").click(function () {
    //     let x = $("#searchItemField").val();
    //     item.filter(function (e) {
    //         if (e.code === x) {
    //             $("#tblItem").empty();
    //             let tableBody = $("#tblItem");
    //             let tr = `<tr>
    //                 <td>${e.code}</td>
    //                 <td>${e.description}</td>
    //                 <td>${e.unitPrice}</td>
    //                 <td>${e.qty}</td>
    //               </tr>`;
    //             tableBody.append(tr);
    //             updateItem(code);
    //             deleteItem(code);
    //         } else {
    //             alert("This item code does not match");
    //         }
    //     });
    // });
    $("#itemSearchbtn").click(function () {
        let x = $("#searchItemField").val();
        let matchingItems = itemDB.filter(function (e) {
            return e.code === x;
        });

        if (matchingItems.length > 0) {
            $("#tblItem").empty();
            let tableBody = $("#tblItem");

            matchingItems.forEach(function (e) {
                let tr = `<tr>
        <td>${e.code}</td>
        <td>${e.description}</td>
        <td>${e.unitPrice}</td>
        <td>${e.qty}</td>
      </tr>`;
                tableBody.append(tr);
                updateItem(e.code);
                deleteItem(e.code);
            });
        } else {
            alert("No matching items found for the provided code");
        }
    });

    $("#itemSearchClearBtn").click(function () {
        $("#searchItemField").val("");
        getAllItems();
    });

}


