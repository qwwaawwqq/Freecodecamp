let price = 19.5;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

const cashInput = document.getElementById("cash");
const changeDueDiv = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");

purchaseBtn.addEventListener("click", () => {
  const cash = parseFloat(cashInput.value);

  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  if (cash === price) {
    changeDueDiv.textContent = "No change due - customer paid with exact cash";
    return;
  }

  const change = cash - price;
  const result = calculateChange(change, cid);

  if (result.status === "INSUFFICIENT_FUNDS") {
    changeDueDiv.textContent = "Status: INSUFFICIENT_FUNDS";
  } else if (result.status === "CLOSED") {
    changeDueDiv.textContent = `Status: CLOSED ${formatChange(result.change)}`;
  } else {
    changeDueDiv.textContent = `Status: OPEN ${formatChange(result.change)}`;
  }
});

function calculateChange(change, cid) {
  const currency = [
    ["ONE HUNDRED", 100],
    ["TWENTY", 20],
    ["TEN", 10],
    ["FIVE", 5],
    ["ONE", 1],
    ["QUARTER", 0.25],
    ["DIME", 0.1],
    ["NICKEL", 0.05],
    ["PENNY", 0.01]
  ];

  let totalCID = cid.reduce((sum, coin) => sum + coin[1], 0);
  let remainingChange = change;
  let changeBreakdown = [];

  if (totalCID < change) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }

  for (let i = 0; i < currency.length; i++) {
    const [currencyName, currencyValue] = currency[i];
    let currencyAmount = cid.find(coin => coin[0] === currencyName)[1];
    let currencyCount = 0;

    while (remainingChange >= currencyValue && currencyAmount > 0) {
      remainingChange -= currencyValue;
      remainingChange = Math.round(remainingChange * 100) / 100;
      currencyAmount -= currencyValue;
      currencyCount++;
    }

    if (currencyCount > 0) {
      changeBreakdown.push([currencyName, currencyCount * currencyValue]);
    }
  }

  if (remainingChange > 0) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }

  if (totalCID === change) {
    return { status: "CLOSED", change: cid };
  }

  return { status: "OPEN", change: changeBreakdown };
}

function formatChange(change) {
  return change
    .map(coin => `${coin[0]}: $${coin[1].toFixed(2)}`)
    .join(" ");
}