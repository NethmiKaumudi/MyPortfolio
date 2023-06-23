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

function clearItemSection() {
    $("#selectItemCode").val("Select Code");
    $("#ItemDescription").val("");
    $("#ItemPrice").val("");
    $("#QTY").val("");
    $("#txtQty").val("");
}

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

function checkOrderAndItem(itemQty) {
    for (let j = 0; j < orderDB.length; j++) {
        if (orderDB[j].orderId === $("#txtOrderID").val() && orderDB[j].code === $("#selectItemCode").val()) {
            orderDB[j].itemQty = Number(orderDB[j].itemQty) + Number(itemQty);
            console.log(orderDB[j].itemQty)
            return true;
        }
    }
    return false;
}

$("#orderAdd").click(function () {
    let id = $("#selectCustomerId").val();
    let code = $("#selectItemCode").val();
    if (id !== "Select Id" && code !== "Select Code") {
        let date = $("#txtDate").val();
        let orderId = $("#txtOrderID").val();
        let id = $("#selectCustomerId").val();
        let code = $("#selectItemCode").val();
        let itemDesc = $("#ItemDescription").val();
        let itemPrice = $("#ItemPrice").val();
        let itemQty = $("#txtQty").val();

        if (!checkOrderAndItem(itemQty)) {
            orderDB.push({
                date: date,
                orderId: orderId,
                id: id,
                code: code,
                itemDesc: itemDesc,
                itemPrice: itemPrice,
                itemQty: itemQty,
            });
        }
        addToCart();
        updateItemQTY(code, itemQty);
    } else {
        if (id === "Select Id" && code === "Select Code") {
            $("#selectCustomerId").css("border", 'solid red 2px');
            $("#orderCustomerName").css("border", 'solid red 2px');
            $("#orderCustomerAddress").css("border", 'solid red 2px');
            $("#orderCustomerSalary").css("border", 'solid red 2px');

            $("#selectItemCode").css("border", 'solid red 2px');
            $("#ItemDescription").css("border", 'solid red 2px');
            $("#ItemPrice").css("border", 'solid red 2px');
            $("#QTY").css("border", 'solid red 2px');
        } else if (code === "Select Code") {
            $("#selectCustomerId").css("border", 'solid green 2px');
            $("#orderCustomerName").css("border", 'solid green 2px');
            $("#orderCustomerAddress").css("border", 'solid green 2px');
            $("#orderCustomerSalary").css("border", 'solid green 2px');

            $("#selectItemCode").css("border", 'solid red 2px');
            $("#ItemDescription").css("border", 'solid red 2px');
            $("#ItemPrice").css("border", 'solid red 2px');
            $("#QTY").css("border", 'solid red 2px');
        } else {
            $("#selectCustomerId").css("border", 'solid red 2px');
            $("#orderCustomerName").css("border", 'solid red 2px');
            $("#orderCustomerAddress").css("border", 'solid red 2px');
            $("#orderCustomerSalary").css("border", 'solid red 2px');

            $("#selectItemCode").css("border", 'solid green 2px');
            $("#ItemDescription").css("border", 'solid green 2px');
            $("#ItemPrice").css("border", 'solid green 2px');
            $("#QTY").css("border", 'solid green 2px');
        }
    }
});

function addToCart() {
    let tableBody = $("#tblOrder");
    tableBody.empty();
    for (let i = 0; i < orderDB.length; i++) {
        if (orderDB[i].orderId === $("#txtOrderID").val()) {
            let tr = `<tr>
                        <td>${orderDB[i].date}</td>
                        <td>${orderDB[i].orderId}</td>
                        <td>${orderDB[i].id}</td>
                        <td>${orderDB[i].code}</td>
                        <td>${orderDB[i].itemPrice}</td>
                        <td>${orderDB[i].itemQty}</td>

                        <td>
                          <button type="button" class="btn btn-danger border-0" style="background-color: #ff0014"><i class="fa-solid fa-trash-can"></i></button>
                        </td>
                      </tr>`;
            tableBody.append(tr);
        }
    }
    getDeleteCartItem();
    calculateTotal();
}

function updateItemQTY(code, itemQty) {
    for (let i = 0; i < itemDB.length; i++) {
        if (itemDB[i].code === code) {
            console.log("Number(itemDB[i].qty)", Number(itemDB[i].qty))
            console.log("Number(itemQty)", Number(itemQty));
            itemDB[i].qty = Number(itemDB[i].qty) - Number(itemQty); // 100 - 10
            console.log("itemDB[i].qty", itemDB[i].qty) // 90
            // searchItem(code).qty = itemDB[i].qty;

        }
    }
    // searchItem(code);
    clearItemSection();
}

function clearItemSection() {
    $("#selectItemCode").val("Select Code");
    $("#ItemDescription").val("");
    $("#ItemPrice").val("");
    $("#QTY").val("");
    $("#txtQty").val("");
}

function calculateTotal() {
    let price = 0, qty = 0, tot = 0;
    const table = $("#tblOrder")[0];
    for (let i = 0; i < $("#tblOrder > tr").length; i++) {
        price = Number(table.rows[i].cells[4].textContent);
        qty = Number(table.rows[i].cells[5].textContent);
        tot = tot + (price * qty);
    }
    $("#Total").val(tot);
}

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


function setBalance(cash, discount) {
    let total = ($("#Total").val() - ($("#Total").val() * (discount / 100)));
    let balance = cash - total;
    console.log("total", total);
    if (balance >= 0) {
        $("#Balance").val(balance);
        $("#Balance").css("border", "solid 2px green");
    } else {
        $("#Balance").css("border", "solid 2px red");
    }
}

function getDeleteCartItem() {
    $("#tblOrder>tr>td>button:nth-child(1)").click(function () {
        // let id = $(this).parents("#order-table>tr").children().eq(2).text();
        let code = $(this).parents("#tblOrder>tr").children().eq(3).text();
        let qty = $(this).parents("#tblOrder>tr").children().eq(5).text();
        let oid = $("#txtOrderID").val();
        let consent = confirm("Do you want to delete.?");
        if (consent) {
            let response = deleteCartItem(oid, code, qty);
            if (response) {
                alert("Item Deleted");
                $("#tblOrder").empty();
                addToCart();
            } else {
                alert("Item Not Removed..!");
            }
        }
    });
}

function deleteCartItem(oid, code, newQTY) {
    for (let i = 0; i < orderDB.length; i++) {
        if (orderDB[i].orderId === oid && orderDB[i].code === code) {
            let item = searchItem(code);
            item.qty = Number(item.qty) + Number(newQTY);
            orderDB.splice(i, 1);
            return true;
        }
    }
    return false;
}

$("#btnPurchaseOrder").click(function () {
    console.log($("#tblOrder>tr").length > 0 && $("#selectCustomerId").val() !== "Select NIC");
    if ($("#tblOrder>tr").length > 0 && $("#selectItemCode").val() !== "Select NIC") {
        let date = $("#txtDate").val();
        let orderID = $("#txtOrderID").val();
        let id = $("#selectCustomerId").val();
        let total = $("#Total").val();
        let cash = $("#Cash").val();
        let discount = $("#Discount").val();
        let balance = $("#Balance").val();
        purchaseOrderDetailsDB.push({
            date: date,
            orderID: orderID,
            id: id,
            total: total,
            cash: cash,
            discount: discount,
            balance: balance
        });
        clearItemSection();
        clearInvoiceSection();
        $("#tblOrder").empty();
        setOrderId();
        $("#Total").text("0.0");
        $("#Cash").val("");
        $("#Discount").val(0);
        $("#Balance").val("");
    } else {
        $("#selectCustomerId").focus();
    }
});

function clearInvoiceSection() {
    $("#selectCustomerId").val("Select NIC");
    $("#orderCustomerName").val("");
    $("#orderCustomerAddress").val("");
    $("#orderCustomerSalary").val("");
}

$("#txtOrderID").keydown(function (event) {
    if (event.key === "Enter") {
        let orderID = $("#txtOrderID").val();
        let order = searchOrder(orderID);

        if (order !== undefined) {
            addToCart();
            let customer = searchCustomer(order.id);
            $("#selectCustomerId").val(order.id);
            $("#orderCustomerName").val(customer.name);
            $("#orderCustomerAddress").val(customer.address);
            $("#orderCustomerSalary").val(customer.salary);

            $("#txtDate").text(order.date);
            $("#Total").text(order.total);
            $("#Cash").val(order.cash);
            $("#Discount").val(order.discount);
            $("#Balance").val(order.balance);

        } else {
            $("#txtOrderID").focus();
        }

    }
});

function searchOrder(orderID) {
    return purchaseOrderDetailsDB.find(function (purchaseOrderDetails) {
        return purchaseOrderDetails.orderID === orderID;
    });
}
