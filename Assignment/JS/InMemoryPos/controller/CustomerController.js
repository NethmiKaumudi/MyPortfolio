//load all existing customers
getAllCustomers();

//add customer
$("#btnAddToCustomerTable").click(function () {
    if (checkAll()) {
        saveCustomer();
    } else {
        alert("Error");
    }

});

//get all customer
$("#btnGetCustomer").click(function () {
    getAllCustomers();
});

//bind tr events for getting back data of the rows to text fields
function bindTrEvents() {
    $('#tblCustomer>tr').click(function () {
        //get the selected rows data
        let id = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let address = $(this).children().eq(2).text();
        let salary = $(this).children().eq(3).text();

        //set the selected rows data to the input fields
        $("#Cus_Id").val(id);
        $("#Cus_Name").val(name);
        $("#Address").val(address);
        $("#Salary").val(salary);
    })
}

//delete
$("#btnDeleteCustomer").click(function () {
    let id = $("#Cus_Id").val();

    let consent = confirm("Do you want to delete.?");
    if (consent) {
        let response = deleteCustomer(id);
        if (response) {
            alert("Customer Deleted");
            clearCustomerInputFields();
            getAllCustomers();
        } else {
            alert("Customer Not Deleted..!");
        }
    }


});

//update
$("#btnUpdateCustomer").click(function () {
    let id = $("#Cus_Id").val();
    updateCustomer(id);
    clearCustomerInputFields();
});

//clear btn event
$("#btnClearCustomer").click(function () {
    clearCustomerInputFields();
});


// CRUD operation Functions
function saveCustomer() {
    let customerId = $("#Cus_Id").val();
    //check customer is exists or not?
    if (searchCustomer(customerId.trim()) == undefined) {

        //if the customer is not available then add him to the array
        let customerName = $("#Cus_Name").val();
        let customerAddress = $("#Address").val();
        let customerSalary = $("#Salary").val();

        //by using this one we can create a new object using
        //the customer model with same properties
        let newCustomer = Object.assign({}, customer);
        newCustomer.id = customerId;
        newCustomer.name = customerName;
        newCustomer.address = customerAddress;
        newCustomer.salary = customerSalary;

        //add customer record to the customer array (DB)
        customerDB.push(newCustomer);
        clearCustomerInputFields();
        getAllCustomers();

    } else {
        alert("Customer already exits.!");
        clearCustomerInputFields();
    }
}

function getAllCustomers() {
    //clear all tbody data before add
    $("#tblCustomer").empty();

    //get all customers
    for (let i = 0; i < customerDB.length; i++) {
        let id = customerDB[i].id;
        let name = customerDB[i].name;
        let address = customerDB[i].address;
        let salary = customerDB[i].salary;

        let row = `<tr>
                     <td>${id}</td>
                     <td>${name}</td>
                     <td>${address}</td>
                     <td>${salary}</td>
                    </tr>`;

        // //and then append the row to tableBody
        $("#tblCustomer").append(row);

        //invoke this method every time
        // we add a row // otherwise click
        //event will not work
        bindTrEvents();
    }
}

function deleteCustomer(id) {
    for (let i = 0; i < customerDB.length; i++) {
        if (customerDB[i].id == id) {
            customerDB.splice(i, 1);
            return true;
        }
    }
    return false;
}

function searchCustomer(id) {
    return customerDB.find(function (customer) {
        //if the search id match with customer record
        //then return that object
        return customer.id == id;
    });
}

function updateCustomer(id) {
    if (searchCustomer(id) == undefined) {
        alert("No such Customer..please check the ID");
    } else {
        let consent = confirm("Do you really want to update this customer.?");
        if (consent) {
            let customer = searchCustomer(id);
            //if the customer available can we update.?

            let customerName = $("#Cus_Name").val();
            let customerAddress = $("#Address").val();
            let customerSalary = $("#Salary").val();

            customer.name = customerName;
            customer.address = customerAddress;
            customer.salary = customerSalary;

            getAllCustomers();
        }
    }
}

//Search customer from input field
$('#customerSearchbtn').click(function () {
    console.log("working")
    var searchValue = $('#searchCustomerField').val();

    $('#div_03 tbody tr').each(function () {
        var id = $(this).find('td:first').text();

        console.log(searchValue)
        console.log(id)
        console.log(id.includes(searchValue))
        if (id.includes(searchValue)) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
});


$("#customerSearchClearBtn").click(function () {
    $("#searchCustomerField").val("");
    getAllCustomers();
});




