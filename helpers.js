function formatNumberWithCommas(value) {
  return value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function parseNumber(value) {
  // Remove commas and dollar signs before parsing
  return parseFloat(value.replace(/,/g, "").replace("$", "")) || 0;
}

function formatInputField(fieldId) {
  const inputField = document.getElementById(fieldId);
  const value = parseNumber(inputField.value); // Parse the input value to a number
  inputField.value = formatNumberWithCommas(value);
}

function calculateBudget() {
  // Get values and convert them to numbers
  const retailRevenue = parseNumber(
    document.getElementById("retailRevenue").value
  );
  const categoryRevenue1 =
    parseNumber(document.getElementById("categoryRevenue1").value) / 100;
  const categoryRevenue2 =
    parseNumber(document.getElementById("categoryRevenue2").value) / 100;
  const mrktgRevenue1 =
    parseNumber(document.getElementById("mrktgRevenue1").value) / 100;
  const mrktgRevenue2 =
    parseNumber(document.getElementById("mrktgRevenue2").value) / 100;

  // Calculate the Rec Annual Budget
  const budget1 = retailRevenue * categoryRevenue1 * mrktgRevenue1;
  const budget2 = retailRevenue * categoryRevenue2 * mrktgRevenue2;
  const recAnnualBudget = budget1 + budget2;

  document.getElementById(
    "recAnnualBudget"
  ).textContent = `$${formatNumberWithCommas(recAnnualBudget)}`;
  document.getElementById(
    "actAnnualBudget"
  ).placeholder = `$${formatNumberWithCommas(recAnnualBudget)}`;

  // Update Monthly Budget in breakdown-table based on Act Annual Budget
  updateMonthlyBudget();
}

function updateMonthlyBudget() {
  // Get the Act Annual Budget value from the input or placeholder
  const actAnnualBudget = parseNumber(
    document.getElementById("actAnnualBudget").value ||
    document.getElementById("actAnnualBudget").placeholder
  );

  // Monthly percentages for each month
  const monthlyPercentages = [
    0.07, 0.08, 0.07, 0.07, 0.09, 0.09, 0.1, 0.09, 0.09, 0.07, 0.12, 0.07,
  ];
  let totalBudget = 0;

  monthlyPercentages.forEach((percentage, index) => {
    const monthlyBudget = actAnnualBudget * percentage;
    totalBudget += monthlyBudget;

    const monthId = `budget-${[
        "jan",
        "feb",
        "mar",
        "apr",
        "may",
        "jun",
        "jul",
        "aug",
        "sep",
        "oct",
        "nov",
        "dec",
      ][index]
      }`;
    document.getElementById(monthId).textContent = `$${formatNumberWithCommas(
      monthlyBudget
    )}`;
  });

  document.getElementById(
    "budget-total"
  ).textContent = `$${formatNumberWithCommas(totalBudget)}`;

  calculateEvergreenBudget();
  calculateGoogleBudget();
  calculateEmailBlogSocialBudget();
  calculateFBBudget();
  calculateSEOBudget();
  calculateOTTBudget();
  calculatePromoBudget();
}

function calculateEvergreenBudget() {
  const monthlyIds = [
    "budget-jan",
    "budget-feb",
    "budget-mar",
    "budget-apr",
    "budget-may",
    "budget-jun",
    "budget-jul",
    "budget-aug",
    "budget-sep",
    "budget-oct",
    "budget-nov",
    "budget-dec",
  ];

  const monthlyBudgets = monthlyIds.map((id) =>
    parseNumber(document.getElementById(id).textContent)
  );
  const minBudget = Math.min(...monthlyBudgets);

  let totalEvergreen = 0;
  monthlyIds.forEach((id, index) => {
    const evergreenId = `evergreen-${id.split("-")[1]}`;
    document.getElementById(
      evergreenId
    ).textContent = `$${formatNumberWithCommas(minBudget)}`;
    totalEvergreen += minBudget;
  });

  document.getElementById(
    "evergreen-total"
  ).textContent = `$${formatNumberWithCommas(totalEvergreen)}`;
}

function calculateGoogleBudget() {
  const actAnnualBudget = parseNumber(
    document.getElementById("actAnnualBudget").value ||
    document.getElementById("actAnnualBudget").placeholder
  );

  let googleFactor;
  if (actAnnualBudget < 28572) {
    googleFactor = 1;
  } else if (actAnnualBudget < 42858) {
    googleFactor = 0.8;
  } else if (actAnnualBudget < 228599.99) {
    googleFactor = 0.7;
  } else {
    googleFactor = 0.6;
  }

  document.getElementById("google-factor").textContent = `${(
    googleFactor * 100
  ).toFixed(0)}%`;

  const monthlyIds = [
    "evergreen-jan",
    "evergreen-feb",
    "evergreen-mar",
    "evergreen-apr",
    "evergreen-may",
    "evergreen-jun",
    "evergreen-jul",
    "evergreen-aug",
    "evergreen-sep",
    "evergreen-oct",
    "evergreen-nov",
    "evergreen-dec",
  ];

  let totalGoogleBudget = 0;
  monthlyIds.forEach((id, index) => {
    const evergreenValue = parseNumber(document.getElementById(id).textContent);
    const googleMonthlyValue = googleFactor * evergreenValue;
    totalGoogleBudget += googleMonthlyValue;

    const googleId = `google-${[
        "jan",
        "feb",
        "mar",
        "apr",
        "may",
        "jun",
        "jul",
        "aug",
        "sep",
        "oct",
        "nov",
        "dec",
      ][index]
      }`;
    document.getElementById(googleId).textContent = `$${formatNumberWithCommas(
      googleMonthlyValue
    )}`;
  });

  document.getElementById(
    "google-total"
  ).textContent = `$${formatNumberWithCommas(totalGoogleBudget)}`;
}

function calculateFBBudget() {
  const actAnnualBudget = parseNumber(
    document.getElementById("actAnnualBudget").value ||
    document.getElementById("actAnnualBudget").placeholder
  );

  const googleFactor =
    parseNumber(document.getElementById("google-factor").textContent) / 100;


  const emailPercentage = parseInt(document.getElementById("email-percentage").innerText);
  let fbFactor;
  if (actAnnualBudget < 28572) {
    fbFactor = 0 - emailPercentage;
  } else if (actAnnualBudget < 42858) {
    fbFactor = 0.2 - emailPercentage;
  } else if (actAnnualBudget < 228599.99) {
    fbFactor = 0.3 - emailPercentage;
  } else {
    fbFactor = 0.2;
  }

  document.getElementById("fb-factor").textContent = `${(
    fbFactor * 100
  ).toFixed(0)}%`;

  const monthlyIds = [
    "evergreen-jan",
    "evergreen-feb",
    "evergreen-mar",
    "evergreen-apr",
    "evergreen-may",
    "evergreen-jun",
    "evergreen-jul",
    "evergreen-aug",
    "evergreen-sep",
    "evergreen-oct",
    "evergreen-nov",
    "evergreen-dec",
  ];

  let totalFBBudget = 0;
  monthlyIds.forEach((id, index) => {
    const evergreenValue = parseNumber(document.getElementById(id).textContent);
    const fbMonthlyValue = fbFactor * evergreenValue;
    totalFBBudget += fbMonthlyValue;

    const fbId = `fb-${[
        "jan",
        "feb",
        "mar",
        "apr",
        "may",
        "jun",
        "jul",
        "aug",
        "sep",
        "oct",
        "nov",
        "dec",
      ][index]
      }`;
    document.getElementById(fbId).textContent = `$${formatNumberWithCommas(
      fbMonthlyValue
    )}`;
  });

  document.getElementById("fb-total").textContent = `$${formatNumberWithCommas(
    totalFBBudget
  )}`;
}

function calculateEmailBlogSocialBudget() {
  // Get Evergreen Budget values
  const monthlyIds = [
    "evergreen-jan", "evergreen-feb", "evergreen-mar", "evergreen-apr",
    "evergreen-may", "evergreen-jun", "evergreen-jul", "evergreen-aug",
    "evergreen-sep", "evergreen-oct", "evergreen-nov", "evergreen-dec"
  ];

  let totalEmailBudget = 0;

  monthlyIds.forEach((id, index) => {
    // Get the corresponding Evergreen Budget value
    const evergreenValue = parseNumber(document.getElementById(id).textContent);

    // Determine the Email/Blog/Social budget for the month
    let emailBudget;
    if (evergreenValue < 9999.99) {
      emailBudget = 0;
    } else if (evergreenValue < 13999.99) {
      emailBudget = 500;
    } else if (evergreenValue < 26249.99) {
      emailBudget = 700;
    } else {
      emailBudget = 1250;
    }

    totalEmailBudget += emailBudget;

    // Update the respective month cell
    const emailId = `email-${["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"][index]
      }`;
    document.getElementById(emailId).textContent = `$${formatNumberWithCommas(emailBudget)}`;

    // Update the first <td> if it's January
    if (index === 0) {
      const emailPercentage = evergreenValue > 0 ? emailBudget / evergreenValue : 0;
      document.getElementById("email-percentage").textContent = `${Math.round((emailPercentage * 100).toFixed(2))}%`;
    }
  });

  // Update the total for the E-Mail/Blog/Social row
  document.getElementById("email-total").textContent = `$${formatNumberWithCommas(totalEmailBudget)}`;
}

function calculateSEOBudget() {
  // Get Evergreen Budget values
  const monthlyIds = [
    "evergreen-jan", "evergreen-feb", "evergreen-mar", "evergreen-apr",
    "evergreen-may", "evergreen-jun", "evergreen-jul", "evergreen-aug",
    "evergreen-sep", "evergreen-oct", "evergreen-nov", "evergreen-dec"
  ];

  let totalSEOBudget = 0;

  monthlyIds.forEach((id, index) => {
    // Get the corresponding Evergreen Budget value
    const evergreenValue = parseNumber(document.getElementById(id).textContent);

    // Determine the SEO budget for the month
    let seoBudget;
    if (evergreenValue < 24999.99) {
      seoBudget = 0;
    } else if (evergreenValue < 49999.99) {
      seoBudget = 2000;
    } else if (evergreenValue > 50000) {
      seoBudget = 5000;
    }

    totalSEOBudget += seoBudget;

    // Update the respective month cell
    const seoId = `seo-${["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"][index]
      }`;
    document.getElementById(seoId).textContent = `$${formatNumberWithCommas(seoBudget)}`;

    // Update the first <td> if it's January
    if (index === 0) {
      const seoPercentage = seoBudget / evergreenValue;
      document.getElementById("seo-percentage").textContent = `${Math.round((seoPercentage * 100).toFixed(2))}%`;
    }
  });

  // Update the total for the seo row
  document.getElementById("seo-total").textContent = `$${formatNumberWithCommas(totalSEOBudget)}`;
}

function calculateOTTBudget() {
  const monthlyIds = [
    "jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"
  ];

  let totalOTTBudget = 0;

  monthlyIds.forEach((month) => {
    const evergreenValue = parseNumber(document.getElementById(`evergreen-${month}`).textContent);

    // Calculate the sum of other budgets (Google, FB/IG, E-Mail/Blog/Social, SEO)
    const googleValue = parseNumber(document.getElementById(`google-${month}`).textContent);
    const fbValue = parseNumber(document.getElementById(`fb-${month}`).textContent);
    const emailValue = parseNumber(document.getElementById(`email-${month}`).textContent);
    const seoValue = parseNumber(document.getElementById(`seo-${month}`).textContent);

    const totalOtherBudgets = googleValue + fbValue + emailValue + seoValue;

    // Calculate the OTT budget for the month
    const ottValue = evergreenValue - totalOtherBudgets;
    totalOTTBudget += ottValue;

    // Update the respective month cell in the OTT row
    document.getElementById(`ott-${month}`).textContent = `$${formatNumberWithCommas(ottValue)}`;

    // Update the percentage in the first <td> if it's January
    if (month === "jan") {
      const ottPercentage = evergreenValue > 0 ? (ottValue / evergreenValue) * 100 : 0;
      document.getElementById("ott-percentage").textContent = `${Math.round(ottPercentage.toFixed(2))}%`;
    }
  });

  // Update the total for the OTT row
  document.getElementById("ott-total").textContent = `$${formatNumberWithCommas(totalOTTBudget)}`;
}

function calculatePromoBudget() {
  // Parse necessary values from the respective budget rows
  const febBudget = parseNumber(document.getElementById("budget-feb").textContent);
  const febEvergreen = parseNumber(document.getElementById("evergreen-feb").textContent);

  const mayBudget = parseNumber(document.getElementById("budget-may").textContent);
  const mayEvergreen = parseNumber(document.getElementById("evergreen-may").textContent);

  const juneBudget = parseNumber(document.getElementById("budget-jun").textContent);
  const juneEvergreen = parseNumber(document.getElementById("evergreen-jun").textContent);

  const julyBudget = parseNumber(document.getElementById("budget-jul").textContent);
  const julyEvergreen = parseNumber(document.getElementById("evergreen-jul").textContent);

  const augBudget = parseNumber(document.getElementById("budget-aug").textContent);
  const augEvergreen = parseNumber(document.getElementById("evergreen-aug").textContent);

  const septBudget = parseNumber(document.getElementById("budget-sep").textContent);
  const septEvergreen = parseNumber(document.getElementById("evergreen-sep").textContent);

  const novBudget = parseNumber(document.getElementById("budget-nov").textContent);
  const novEvergreen = parseNumber(document.getElementById("evergreen-nov").textContent);

  // Calculate individual promotion budgets
  const presDay = febBudget - febEvergreen;
  const memDay = (mayBudget - mayEvergreen) + 0.5 * (juneBudget - juneEvergreen);
  const july4th = 0.5 * (juneBudget - juneEvergreen) + (julyBudget - julyEvergreen);
  const laborDay = (augBudget - augEvergreen) + (septBudget - septEvergreen);
  const blackFriday = novBudget - novEvergreen;

  // Calculate total promo budget
  const promoTotal = presDay + memDay + july4th + laborDay + blackFriday;

  // Update the DOM with calculated values
  document.getElementById("pres-day").textContent = `$${formatNumberWithCommas(presDay)}`;
  document.getElementById("mem-day").textContent = `$${formatNumberWithCommas(memDay)}`;
  document.getElementById("july-4").textContent = `$${formatNumberWithCommas(july4th)}`;
  document.getElementById("labor-day").textContent = `$${formatNumberWithCommas(laborDay)}`;
  document.getElementById("black-friday").textContent = `$${formatNumberWithCommas(blackFriday)}`;
  document.getElementById("promo-total").textContent = `$${formatNumberWithCommas(promoTotal)}`;
}

// Integrate E-Mail/Blog/Social Calculation into Existing Workflow
updateMonthlyBudget = (function (originalFunction) {
  return function () {
    originalFunction(); // Call the original function
    calculateEvergreenBudget(); // Ensure Evergreen budgets are recalculated
    calculateGoogleBudget(); // Ensure Google/YouTube budgets are recalculated
    calculateEmailBlogSocialBudget(); // Calculate E-Mail/Blog/Social budgets
    calculateFBBudget(); // Ensure FB/IG budgets are recalculated
    calculateSEOBudget(); 
    calculateOTTBudget();
    calculatePromoBudget();
  };
})(updateMonthlyBudget);

document
  .getElementById("retailRevenue")
  .addEventListener("blur", () => formatInputField("retailRevenue"));
document
  .getElementById("categoryRevenue1")
  .addEventListener("blur", () => formatInputField("categoryRevenue1"));
document
  .getElementById("categoryRevenue2")
  .addEventListener("blur", () => formatInputField("categoryRevenue2"));
document
  .getElementById("mrktgRevenue1")
  .addEventListener("blur", () => formatInputField("mrktgRevenue1"));
document
  .getElementById("mrktgRevenue2")
  .addEventListener("blur", () => formatInputField("mrktgRevenue2"));
document
  .getElementById("actAnnualBudget")
  .addEventListener("blur", () => formatInputField("actAnnualBudget"));
