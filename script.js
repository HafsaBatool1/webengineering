

var form = document.getElementById("reserveForm");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    var username = document.getElementById("name").value.trim();
    var email = document.getElementById("email").value.trim();
    var message = document.getElementById("formMessage");

    if (username !== "" && email !== "") {
        message.textContent =
            "Thank you for visiting, " + username +
            "! We will contact you at " + email + ".";
    } else {
        message.textContent = "Please enter your name and email.";
    }


    var yearText = document.getElementById("birth-year").value.trim();
    var discount = document.getElementById("discountMessage");

    if (yearText === "") {
        discount.textContent = "Enter your birth year to check discount eligibility.";
    } else {
        var birthYear = parseInt(yearText, 10);
        var age = 2026 - birthYear;

        if (/^\d{4}$/.test(yearText) &&
            birthYear >= 1900 && birthYear <= 2026) {

            if (age <= 25 || age >= 60) {
                discount.textContent =
                    "You qualify for the example age-based discount.";
            } else {
                discount.textContent =
                    "You do not qualify for the example age-based discount.";
            }
        } else {
            discount.textContent = "Please enter a valid four-digit birth year.";
        }
    }
});


/* TASK 2: TABLE ROW HIGHLIGHTING */

var menuRows = document.querySelectorAll("#menuTable tbody tr");

menuRows.forEach(function(row) {
    row.addEventListener("mouseover", function() {
        row.style.backgroundColor = "#e0c8b0";
    });

    row.addEventListener("mouseout", function() {
        row.style.backgroundColor = "";
    });
});




var themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
});



var orderItems = document.querySelectorAll(".orderItem");
var total = document.getElementById("total");

function calculateTotal() {
    var sum = 0;

    orderItems.forEach(function(item) {
        if (item.checked) {
            sum = sum + parseInt(item.value, 10);
        }
    });

    total.textContent = "Total: Rs. " + sum;
}

orderItems.forEach(function(item) {
    item.addEventListener("change", calculateTotal);
});



var readBtn = document.getElementById("readBtn");
var extraText = document.getElementById("extraText");

readBtn.addEventListener("click", function() {
    if (extraText.hidden) {
        extraText.hidden = false;
        readBtn.textContent = "Read Less";
    } else {
        extraText.hidden = true;
        readBtn.textContent = "Read More";
    }
});




var filterButtons = document.querySelectorAll(".filterBtn");
var menuCards = document.querySelectorAll("#menu .card");

filterButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        var category = button.getAttribute("data-filter");

        menuCards.forEach(function(card) {
            var itemCategory = card.getAttribute("data-category");

            if (category === "all" || itemCategory === category) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        });

        menuRows.forEach(function(row) {
            var itemCategory = row.getAttribute("data-category");

            if (category === "all" || itemCategory === category) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });
    });
})

var statusBanner = document.getElementById("status");

function updateStatus() {
    var now = new Date();
    var day = now.getDay();
    var hour = now.getHours();

    var openTime;
    var closeTime;

    if (day === 0) {
        openTime = 10;
        closeTime = 21;
    } else if (day === 6) {
        openTime = 9;
        closeTime = 23;
    } else {
        openTime = 8;
        closeTime = 22;
    }

    if (hour >= openTime && hour < closeTime) {
        statusBanner.textContent = "We are Open!";
        statusBanner.style.color = "green";
    } else {
        var displayHour = openTime % 12 || 12;
        var period = openTime >= 12 ? "PM" : "AM";

        statusBanner.textContent =
            "Closed - Open at " + displayHour + " " + period;

        statusBanner.style.color = "red";
    }
}

updateStatus();




var notes = document.getElementById("special-notes");
var charCount = document.getElementById("charCount");

notes.addEventListener("input", function() {
    var remaining = 100 - notes.value.length;

    charCount.textContent = remaining + " characters remaining";
});