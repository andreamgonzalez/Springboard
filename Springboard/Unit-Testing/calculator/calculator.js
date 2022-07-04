window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  const initialValues = {amount:10000, years:10, rate:6};
  let currentAmount =  document.getElementById("loan-amount");
  let currentYears =  document.getElementById("loan-years");
  let currentRate =  document.getElementById("loan-rate");
  //initial values set from array
  currentAmount.value = initialValues.amount;
  currentYears.value = initialValues.years;
  currentRate.value = initialValues.rate;
  update();
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  const currentValues = getCurrentUIValues();
  updateMonthly(calculateMonthlyPayment(currentValues));
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  //(annual rate / 100 = % ) / months
  let monthlyRate = (values.rate / 100) / 12;
  //total number of payments for the leangth of loan repayment period
  let n = values.years * 12;
  //                      Principle    x      i
  let monthlyPayment = (values.amount * monthlyRate) /
                        (1 - Math.pow(( 1 + monthlyRate), -n));
  //                          1 - (1+(i))^-n)
  return monthlyPayment.toFixed(2);
}


// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  const currentMonthlyPayment = document.getElementById('monthly-payment');
  currentMonthlyPayment.innerText = monthly;
}
