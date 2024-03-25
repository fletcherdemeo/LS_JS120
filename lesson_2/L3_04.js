// Question 1
// What are two disadvantages of working with factory functions?

// 1. Each returned object will contain all methods from the template
//    object - this can cause memory issues.
// 2. Can't tell if an object has been created using a factory function
//    or not. 

// Question 2
// Rewrite the following code to use object-literal syntax to generate
// the returned object:

// function makeObj() {
//   return {
//     propA: 10,
//     propB: 20
//   }
// }

// Question 3
function createInvoice(services = {}) {
  return {
    phone: services.phone || 3000,
    internet: services.internet || 5500,
    total: function () {
      return this.phone + this.internet
    },
    payments: 0,
    addPayment: function (payment) {
        this.payments += payment.total();
    },
    addPayments: function (payments) {
      payments.forEach(payment => {
        this.payments += payment.total();
      })
    },
    amountDue: function () {
      return this.total() - this.payments;
    }
  }
}

function invoiceTotal(invoices) {
  let total = 0;

  for (let index = 0; index < invoices.length; index += 1) {
    total += invoices[index].total();
  }

  return total;
}

let invoices = [];
invoices.push(createInvoice());
invoices.push(createInvoice({ internet: 6500 }));
invoices.push(createInvoice({ phone: 2000 }));
invoices.push(createInvoice({
  phone: 1000,
  internet: 4500,
}));

// console.log(invoiceTotal(invoices)); // 31000

// Question 4
function createPayment(services = {}) {
  return {
    phone: services.phone || 0,
    internet: services.internet || 0,
    amount: services.amount || 0,
    total: function() {
      return this.amount || (this.phone + this.internet);
    }
  }
}

function paymentTotal(payments) {
  return payments.reduce((sum, payment)  => sum + payment.total(), 0);
}

let payments = [];
payments.push(createPayment());
payments.push(createPayment({
  internet: 6500,
}));

payments.push(createPayment({
  phone: 2000,
}));

payments.push(createPayment({
  phone: 1000,
  internet: 4500,
}));

payments.push(createPayment({
  amount: 10000,
}));

// console.log(paymentTotal(payments));      // => 24000

let invoice = createInvoice({
  phone: 1200,
  internet: 4000,
});

let payment1 = createPayment({ amount: 2000 });
let payment2 = createPayment({
  phone: 1000,
  internet: 1200
});

let payment3 = createPayment({ phone: 1000 });

invoice.addPayment(payment1);
invoice.addPayments([payment2, payment3]);
invoice.amountDue();       // this should return 0
console.log(invoice.amountDue());