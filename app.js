// UI elements
const calculateBtn = document.querySelector("#loan-form");
const amount = document.getElementById("amount");
const interest = document.getElementById("interest");
const years = document.getElementById("years");
const monthlyPaymentInput = document.getElementById("monthly-payment");
const totalPaymentInput = document.getElementById("total-payment");
const totalInterestInput = document.getElementById("total-interest");

// Event listeners loader
loadEventListeners();

// Event Listener loader
function loadEventListeners() {
    calculateBtn.addEventListener('submit', calculateLoan);
}

// Calculate Monthly Payment
function calculateMonthlyPayment(loanAmount, interestRate, numberOfMonths) {
    const convertedInterestRate = interestRate / 100;
    const numerator = Math.pow(1 + convertedInterestRate, numberOfMonths) * convertedInterestRate;
    const denominator = Math.pow(1 + convertedInterestRate, numberOfMonths) - 1;
    return loanAmount * (numerator / denominator);
}

// Show Error
function showError(error) {
    const errorDiv = document.createElement("div");
    errorDiv.className = "alert alert-danger";
    errorDiv.appendChild(document.createTextNode(error));
    const card = document.querySelector(".card");
    const heading = document.querySelector(".heading");
    card.insertBefore(errorDiv, heading);
    setTimeout(() => {
        document.querySelector(".alert").remove();
    }, 3000);
}

// Loan calculator
function calculateLoan(e) {
    // Error Checking
    if (amount.value === '' || interest.value === '' || years.value === '') {
        showError("Please check your values");
        e.preventDefault();
        return;
    }
    // Loan amount
    const loanAmount = amount.value;
    // Interest in Percentage
    const interestRate = Number(interest.value);
    // Years to repay
    const yearsToRepay = years.value;
    // Number Of Months
    const numberOfMonths = yearsToRepay * 12;
    // Monthly Payment
    const monthlyPayment = parseFloat(calculateMonthlyPayment(loanAmount, interestRate, numberOfMonths)).toFixed(2);
    // Total Payment
    const totalPayment = (monthlyPayment * numberOfMonths).toFixed(2);
    // Total Interest
    const interestPaid = (totalPayment - loanAmount).toFixed(2);
    // Results
    monthlyPaymentInput.value = monthlyPayment;
    totalPaymentInput.value = totalPayment;
    totalInterestInput.value = interestPaid;
    e.preventDefault();
}