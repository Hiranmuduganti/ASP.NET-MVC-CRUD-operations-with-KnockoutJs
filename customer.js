function CustomerViewModel(data) {
    var self = this;

    self.Name = ko.observable(data.CustomerName).extend({
        required: {
            params: true,
            message: "Please enter your Name."
        }

    });
    self.Address = ko.observable(data.CustomerAddress).extend({
        required: {
            params: true,
            message: "Please enter your Address."
        }

    });

   self.ModelErrors = ko.validation.group(self);
    self.IsValid = ko.computed(function () {
       self.ModelErrors.showAllMessages();
        return self.ModelErrors().length == 0;
    });
}


function ViewModel() {

    var self = this;

    var Customer = {
        CustomerName: self.CustomerName,
        CustomerAddress: self.CustomerAddress
    };

           
    self.CustomerName = ko.observable();
    self.CustomerAddress = ko.observable();
    self.Customers = ko.observableArray([]);
    self.SelectedCustomer = ko.observable();
   
          self.showEditModal = function (data) {
        var selected = ko.mapping.toJS(data);
        self.SelectedCustomer(new CustomerViewModel(selected));
        $('#myModal').modal('show');
    }
    self.ShowAdd = function () {
        self.SelectedCustomer(new CustomerViewModel(Customer));
        $('#myModal').modal('show');
    }

    self.SaveCustomer = function () {
        var data = ko.toJSON(self.SelectedCustomer);
        $.ajax({
            url: '/Customer/SaveCustomer',
            type: 'POST',
            dataType: 'json',
            contenType: 'application/json',
            success: function (response) {
                if (response.Success) {
                    // you can reload customer data here
                }
            }
        });
    }
    loadCustomers();
    function loadCustomers() {
        $.ajax({
            url: '/Customers/List/',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                
                self.Customers(data);
            }
        });
    }

 }
$(document).ready(function () {
    ko.applyBindings(new ViewModel());
});



//    loadCustomers();
//    function loadCustomers()
//    {
//    $.ajax({
//        url:'/Customers/List',
//        type: 'GET',
//        dataType: 'json',
//        success: function (response) {
//            response.forEach(function (item) {
//                self.Customers.push(new CustomerViewModel(item));
//            });
//        }
//        });
//    }
        


//    // Add New Store.
//    self.create = function () {
//        if (Customer.CustomerName() != "" && Customer.CustomerAddress() != "") {
//            $.ajax({
//                url: "/Customers/Add",
//                cache: false,
//                type: "POST",
//                contentType: 'application/json; charset=utf-8',
//                data: ko.toJSON(Customer),
//                success: function (data) {
//                    self.Customers.push(data);
//                   // self.CustomerId("");
//                    self.CustomerName("");
//                    self.CustomerAddress("");
//                    Window.location.href = 'Customers/Index/';
//                }
//            }).fail(
//                function (xhr, textStatus, err) {
//                    alert(err);
//                }
//                );
//        } else {
//            alert('Please Enter All the Values!');
//        }
//    };

//    self.delete = function (Customer) {
//        if (confirm('Are you sure to Delete "' + Customer.CustomerName + '" store ??')) {
//            var id = Customer.CustomerId;

//            $.ajax({
//                url: '/Customers/Delete/' + id,
//                cache: false,
//                type: 'POST',
//                contentType: 'application/json; charset=utf-8',
//                data: id,
//                success: function (result) {
//                    alert(result.msg);
//                    if (result.status == 200) {
//                        self.Customers.remove(Customer);
//                    }
//                }
//            }).fail(
//                function (xhr, textStatus, err) {
//                    self.status(err);
//                }
//                );
//        }
//    }

//    self.edit = function (Customer) {
//        console.log('edit: customer = ', Customer);
//        self.Customer(Customer);
//    };

//    self.update = function () {
//        var Customer = self.Customer;

//        $.ajax({
//            url: "Customers/Edit",
//            cache: false,
//            type: "POST",
//            contentType: "application/json; charset=utf-8",
//            data: ko.toJSON(Customer),
//            success: function (data) {
//                self.Customers.removeAll();
//                self.Customer(data);
//                self.Customer(null);
//                alert("Record update successfully!");
//            }
//        }).fail(
//            function (xhr, textStatus, err) {
//                alert(err);
//            }
//            );
//    };

//    self.reset = function () {
//        self.CustomerName("");
//        self.CustomerAddress("");
//    };

//    self.cancel = function () {
//        self.Customer(null);
//    }

//}

//var viewModel = new CustomerViewModel();
//ko.applyBindings(viewModel);
