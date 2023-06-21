function setDate() {
    $("#txtDate").val(new Date().toISOString().slice(0, 10));
}

function setOrderId() {
    if (orderDB.length > 0) {
        $("#txtOrderID").val("O00" + (orderDB.length + 1));
    } else {
        $("#txtOrderID").val("O001");
    }
    $("#selectCustomerId").focus();
}

$('#selectCustomerId').change(function () { //the event here is change
    for (let i = 0; i < customerDB.length; i++) {
        if ($(this).val() == customerDB[i].id) {
            $('#orderCustomerName').val(customerDB[i].name);
            $('#orderCustomerAddress').val(customerDB[i].address)
            $('#orderCustomerSalary').val(customerDB[i].salary)
            break;
        }
    }
});

$('#selectItemCode').change(function () { //the event here is change
    for (let i = 0; i < itemDB.length; i++) {
        if ($(this).val() == itemDB[i].code) {
            $('#ItemDescription').val(itemDB[i].description);
            $('#ItemPrice').val(itemDB[i].unitPrice);
            $('#QTY').val(itemDB[i].qty)
            break;
        }
    }
    $("txtQty").focus();
});
$("#txtQty").keyup(function () {
    let qty = $("#txtQty").val();
    if (Number($("#txtQty").val()) !== 0 && $("#txtQty").val() !== "") {
        if (Number(qty) <= Number($("#QTY").val())) {
            $("#txtQty").css("border", 'solid green 2px');
        } else {
            $("#txtQty").css("border", 'solid red 2px');
        }
    } else {
        $("#txtQty").css("border", 'solid red 2px');
    }
});
$("#orderAdd").click(function () {
    // calculateTotal();
    let date = $("#txtDate").val();
    let orderId = $("#txtOrderID").val();
    let id = $("#selectCustomerId").val();
    let code = $("#selectItemCode").val();
    let unitPrice = $("#ItemPrice").val();
    let quantity = $("#txtQty").val();
    let total = unitPrice * quantity;

    // let oTotal = oUnitPrice*oQty;

    let cartOb = {
        date: date,
        orderId: orderId,
        id: id,
        code: code,
        unitPrice: unitPrice,
        quantity: quantity,
        total: total
    }

    //add customer record to the customer array
    orderDB.push(cartOb);


    //create row and add text field values
    let row = `<tr>
                    <td>${cartOb.date}</td>
                    <td>${cartOb.orderId}</td>
                    <td>${cartOb.id}</td>
                    <td>${cartOb.code}</td>
                     <td>${cartOb.unitPrice}</td>
                    <td>${cartOb.quantity}</td>
                     <td>${cartOb.total}</td>
                    <td>
                          <button type="button" class="btn btn-danger border-0" style="background-color: #ff0014"><i class="fa-solid fa-trash-can"></i></button>
                        </td>
                   </tr>`;
    //and then append the row to tableBody
    $("#tblOrder").append(row);
    clearItemSection();
})
$("#Discount,#Cash").keydown(function (event) {
    if (event.key === "Enter") {
        let cash = $("#Cash").val();
        let discount = $("#Discount").val();
        if (discount >= 0 && discount < 100) {
            $("#Discount").css("border", "green solid 2px");
            setBalance(cash, discount);
        } else {
            $("#Discount").css("border", "red solid 2px");
            $("#Discount").focus();
        }
    }
});


function loadCustomerIds() {
    var optionCustomer = '';
    for (var i = 0; i < customerDB.length; i++) {
        optionCustomer += '<option value="' + customerDB[i].id + '">' + customerDB[i].id + '</option>';
    }
    $('#selectCustomerId').append(optionCustomer);
}

function loadItemCodes() {
    var optionItem = '';
    for (var i = 0; i < itemDB.length; i++) {
        optionItem += '<option value="' + itemDB[i].code + '">' + itemDB[i].code + '</option>';
    }
    $('#selectItemCode').append(optionItem);
}

function calculateTotal() {
    let price = 0, qty = 0, tot = 0;
    const table = $("#tblOrder")[0];
    for (let i = 0; i < $("#tblOrder > tr").length; i++) {
        price = Number(table.rows[i].cells[4].textContent);
        qty = Number(table.rows[i].cells[5].textContent);
        tot = tot + (price * qty);
    }
    $("#Total").text(tot);
}


function setBalance(cash, discount) {
    let tot = ($("#Total").text() - ($("#Total").text() * (discount / 100)));
    // $("#total").text(tot);
    let balance = cash - tot;
    console.log(tot);
    if (balance >= 0) {
        $("#Balance").val(balance);
        $("#Balance").css("border", "solid 2px green");
    } else {
        $("#Balance").css("border", "solid 2px red");
    }
}

function clearItemSection() {
    $("#selectItemCode").val("Select Code");
    $("#ItemDescription").val("");
    $("#ItemPrice").val("");
    $("#QTY").val("");
    $("#txtQty").val("");
}