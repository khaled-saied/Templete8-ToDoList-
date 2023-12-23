// Variable
let tmp = 0;
let mode = "add";
let updateItemId = null; // New variable to store the ID of the item being updated

// Element
let showDome = document.getElementById("show");
let input = document.getElementById("input");
let btnSubmit = document.getElementById("btnSubmit");

// Event
btnSubmit.addEventListener("click", addOrUpdateItem);

// Function
let data = [];
if (localStorage.data != null) {
  showDome.style.display = 'block';
  data = JSON.parse(localStorage.data);
  tmp = data[data.length - 1].id;
} else {
  data = [];
  tmp = 0;
}
showData();

function addOrUpdateItem() {
  if (mode == "add") {
    if (input.value != "") {
      let obj = {
        id: (tmp += 1),
        value: input.value,
      };
      data.push(obj);
      localStorage.setItem("data", JSON.stringify(data));
      showData();
      input.focus();
      input.select();
    } else {
      alert("Please Enter text");
    }
  } else if (mode == "update") {
    if (updateItemId != null) {
      // Find the index of the item to update
      const index = data.findIndex((item) => item.id == updateItemId);

      if (index != -1) {
        data[index].value = input.value;
        localStorage.setItem("data", JSON.stringify(data));
        showData();
        input.value = "";
        input.focus();
        mode = "add";
        btnSubmit.innerHTML = "Add";
        updateItemId = null; // Reset the updateItemId after updating
      }
    }
  }
  console.log(data);
}

//Show
function showData() {
  let show = data.map(
    (ele, index) =>
      `<div class="item">
      <div class="text">
        <p class="id">${index + 1}</p>
        <p style="display: block;">${ele.value}</p>
      </div>
      <div class="icon">
        <i class="fa-solid fa-trash" style="color: #ffff" onclick={handleDelete(${
          ele.id
        })}></i>
        <i class="fa-solid fa-pen-to-square" style="color: #ffff" onclick={setUpdateMode(${
          ele.id
        })}></i>
      </div>
    </div>`
  );
  showDome.innerHTML = show.join("");
}

// Delete
function handleDelete(id) {
  const index = data.findIndex((item) => item.id == id);
  data.splice(index, 1);
  localStorage.setItem("data", JSON.stringify(data));
  showData();
}

// Set update mode
function setUpdateMode(id) {
  mode = "update";
  btnSubmit.innerHTML = "Update";
  const index = data.findIndex((item) => item.id == id);
  updateItemId = id;
  if (index != -1) {
    input.value = data[index].value;
    input.select();
  }
}
