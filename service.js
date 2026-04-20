<script>
let step = 0;

function updateStatus() {
  const status = document.getElementById("status");
  const message = document.getElementById("message");
  const progress = document.getElementById("progress");
  const driverCard = document.getElementById("driverCard");

  step++;

  if (step === 1) {
    status.innerText = "Driver Assigned 🚗";
    message.innerText = "Driver is on the way";
    progress.style.width = "40%";

    driverCard.style.display = "block"; // 👈 SHOW DRIVER
  }

  else if (step === 2) {
    status.innerText = "Driver Arriving 📍";
    message.innerText = "Driver is almost at your location";
    progress.style.width = "70%";
  }

  else if (step === 3) {
    status.innerText = "Trip Started 🚀";
    message.innerText = "You are on the way";
    progress.style.width = "90%";
  }

  else {
    status.innerText = "Completed ✅";
    message.innerText = "Trip completed successfully";
    progress.style.width = "100%";
  }
}
const loanForm = document.getElementById("loanForm");
const loanSuccessMessage = document.getElementById("loanSuccessMessage");
const loanPlan = document.getElementById("loanPlan");

const loanParams = new URLSearchParams(window.location.search);
const selectedPlan = loanParams.get("plan");

if (selectedPlan && loanPlan) {
  const planMap = {
    starter: "Starter Loan",
    business: "Business Loan",
    property: "Property Support",
    quick: "Quick Approval"
  };

  if (planMap[selectedPlan]) {
    loanPlan.value = planMap[selectedPlan];
  }
}

if (loanForm) {
  loanForm.addEventListener("submit", function (e) {
    e.preventDefault();
    loanSuccessMessage.textContent = "Loan application submitted successfully. We will review it shortly.";
    loanForm.reset();
  });
}

let loanStep = 0;

function updateLoanStatus() {
  const loanStatus = document.getElementById("loanStatus");
  const loanMessage = document.getElementById("loanMessage");
  const loanProgress = document.getElementById("loanProgress");

  loanStep++;

  if (loanStep === 1) {
    loanStatus.innerText = "Pre-Qualified";
    loanMessage.innerText = "Your application has passed the first review stage.";
    loanProgress.style.width = "55%";
  } else if (loanStep === 2) {
    loanStatus.innerText = "Approved";
    loanMessage.innerText = "Your loan application has been approved.";
    loanProgress.style.width = "80%";
  } else {
    loanStatus.innerText = "Disbursed";
    loanMessage.innerText = "Your funds have been prepared for release.";
    loanProgress.style.width = "100%";
  }
}
const paymentForm = document.getElementById("paymentForm");
const paymentSuccess = document.getElementById("paymentSuccess");

if (paymentForm) {
  paymentForm.addEventListener("submit", function (e) {
    e.preventDefault();
    paymentSuccess.textContent = "Payment completed successfully. Your transaction has been recorded.";
    paymentForm.reset();
  });
}
const signupForm = document.getElementById("signupForm");
const signupMessage = document.getElementById("signupMessage");

if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    const userData = {
      name,
      email,
      password
    };

    localStorage.setItem("ihUser", JSON.stringify(userData));
    signupMessage.textContent = "Account created successfully. Redirecting to login...";

    setTimeout(() => {
      window.location.href = "login.html";
    }, 1200);
  });
}

const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const savedUser = JSON.parse(localStorage.getItem("ihUser"));

    if (savedUser && savedUser.email === email && savedUser.password === password) {
      loginMessage.textContent = "Login successful. Redirecting...";
      localStorage.setItem("ihLoggedIn", "true");

      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1000);
    } else {
      loginMessage.textContent = "Invalid email or password.";
      loginMessage.style.color = "red";
    }
  });
}
const welcomeText = document.getElementById("welcomeText");

const currentUser = JSON.parse(localStorage.getItem("ihUser"));
const isLoggedIn = localStorage.getItem("ihLoggedIn");

if (welcomeText && isLoggedIn && currentUser) {
  welcomeText.textContent = `Welcome, ${currentUser.name}`;
}
if (window.location.pathname.includes("dashboard.html")) {
  if (!localStorage.getItem("ihLoggedIn")) {
    window.location.href = "login.html";
  }
}
const welcomeText = document.getElementById("welcomeText");

const currentUser = JSON.parse(localStorage.getItem("ihUser"));
const isLoggedIn = localStorage.getItem("ihLoggedIn");

if (welcomeText && isLoggedIn && currentUser) {
  welcomeText.textContent = `Welcome, ${currentUser.name}`;
}
if (window.location.pathname.includes("dashboard.html")) {
  if (!localStorage.getItem("ihLoggedIn")) {
    window.location.href = "login.html";
  }
}
function logout() {
  localStorage.removeItem("ihLoggedIn");
  window.location.href = "login.html";
}
// SHOW USERS
const userList = document.getElementById("userList");

if (userList) {
  const user = JSON.parse(localStorage.getItem("ihUser"));

  if (user) {
    userList.innerHTML = `
      <p><strong>Name:</strong> ${user.name}</p>
      <p><strong>Email:</strong> ${user.email}</p>
    `;
  }
}

// SAVE BOOKINGS
if (bookingForm) {
  bookingForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const service = document.getElementById("serviceType").value;

    localStorage.setItem("ihBooking", service);

    successMessage.textContent = "Request submitted successfully.";
    bookingForm.reset();
  });
}

// SHOW BOOKINGS
const bookingList = document.getElementById("bookingList");

if (bookingList) {
  const booking = localStorage.getItem("ihBooking");

  if (booking) {
    bookingList.innerHTML = `<p>Service: ${booking}</p>`;
  }
}

// SAVE LOANS
if (loanForm) {
  loanForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const loan = document.getElementById("loanPlan").value;

    localStorage.setItem("ihLoan", loan);

    loanSuccessMessage.textContent = "Loan application submitted.";
    loanForm.reset();
  });
}

// SHOW LOANS
const loanList = document.getElementById("loanList");

if (loanList) {
  const loan = localStorage.getItem("ihLoan");

  if (loan) {
    loanList.innerHTML = `<p>Loan Plan: ${loan}</p>`;
  }
}
const protectedPages = [
  "dashboard.html",
  "wallet.html",
  "payment.html",
  "profile.html"
];

const currentPage = window.location.pathname;

protectedPages.forEach(page => {
  if (currentPage.includes(page)) {
    if (!localStorage.getItem("ihLoggedIn")) {
      window.location.href = "login.html";
    }
  }
});