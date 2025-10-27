// script.js

// Array
let groceryList = [
  { name: "Apples", price: 15 },
  { name: "Bread", price: 20 },
  { name: "Eggs", price: 20 },
  { name: "Milk", price: 33 },
];

const itemNameInput = document.getElementById("itemName");
const itemPriceInput = document.getElementById("itemPrice");
const addBtn = document.getElementById("addBtn");
const listContainer = document.getElementById("groceryList");
const totalBtn = document.getElementById("totalBtn");
const totalDisplay = document.getElementById("totalDisplay");

// ===== Function: Render List =====
function renderList() {
  listContainer.innerHTML = "";

  if (groceryList.length === 0) {
    const emptyMsg = document.createElement("li");
    emptyMsg.textContent = "No items in your grocery list yet.";
    emptyMsg.style.color = "#999";
    emptyMsg.style.textAlign = "center";
    listContainer.appendChild(emptyMsg);
    return;
  }

  groceryList.forEach((item, index) => {
    const li = document.createElement("li");

    const text = document.createElement("span");
    text.textContent = `${item.name} = $${item.price.toFixed(2)}`;

    // Delete button
    const delBtn = document.createElement("button");
    delBtn.textContent = "🗑️ Delete";
    delBtn.classList.add("delete-btn");

    // Handle delete with confirmation
    delBtn.addEventListener("click", () => {
      const confirmDelete = confirm(`Are you sure you want to delete "${item.name}" from your list?`);
      if (confirmDelete) {
        removeItem(index);
      }
    });

    li.appendChild(text);
    li.appendChild(delBtn);
    listContainer.appendChild(li);
  });

  if (totalBtn) {
    calculateTotal();
  }
}

// ===== Function: Add Item =====
function addItem() {
  const name = itemNameInput.value.trim();
  const priceValue = itemPriceInput.value.trim();

  if (name === "") {
    alert("Please enter an item name.");
    return;
  }

  if (priceValue === "" || isNaN(priceValue) || Number(priceValue) < 0) {
    alert("Please enter a valid price (non-negative number).");
    return;
  }

  const newItem = {
    name: name,
    price: Number(priceValue),
  };

  groceryList.push(newItem);
  renderList();

  itemNameInput.value = "";
  itemPriceInput.value = "";
  itemNameInput.focus();
}

// ===== Function: Remove Item =====
function removeItem(index) {
  groceryList.splice(index, 1);
  renderList();
}

// ===== Function: Calculate Total =====
function calculateTotal() {
  const total = groceryList.reduce((sum, item) => sum + item.price, 0);
  totalDisplay.textContent = `The Total Price of the Items is: $${total.toFixed(2)}`;
}

// ===== Event Listeners =====
addBtn.addEventListener("click", addItem);
totalBtn.addEventListener("click", calculateTotal);

[itemNameInput, itemPriceInput].forEach((input) => {
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addItem();
  });
});

// ===== Initial Render =====
renderList();
