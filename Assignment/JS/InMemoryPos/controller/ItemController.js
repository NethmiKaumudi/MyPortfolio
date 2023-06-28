//load all existing items
getAllItems();
//add item
$("#btnAddItem").click(function () {
    if (checkAll()) {
        saveItem();
    } else {
        alert("Error");
    }

});

//get all items
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
$("#btnClearAllItem").click(function () {
    clearItemInputFields();
});


// CRUD operation Functions
function saveItem() {
    let code = $("#txtItemCode").val();
    //check item is exists or not?
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

        //add item record to the item array (DB)
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

    //get all item
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
            //if the item available can we update.?

            let itemDescription = $("#txtItemDescription").val();
            let itemUnitPrice = $("#txtItemPrice").val();
            let itemQty = $("#txtQTYOnHand").val();

            item.description = itemDescription;
            item.unitPrice = itemUnitPrice;
            item.qty = itemQty;

            getAllItems()
        }
    }
}
//Search
$('#itemSearchbtn').click(function () {
    console.log("working")
    var searchValue = $('#searchItemField').val();

    $('#tableItem tbody tr').each(function () {
        var code = $(this).find('td:first').text();

        console.log(searchValue)
        console.log(code)
        console.log(code.includes(searchValue))
        if (code.includes(searchValue)) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
});


$("#itemSearchClearBtn").click(function () {
    $("#searchItemField").val("");
    getAllItems();
});




