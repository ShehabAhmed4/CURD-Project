let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("Ads");
let discound = document.getElementById("Discound");
let total = document.getElementById("total");
let count = document.getElementById("Count");
let category = document.getElementById("Category");
let submit = document.getElementById("submit");

let mood = "create";
let temp;

function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discound.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.style.background = "red";
  }
}

// create product

let datapro;
if (localStorage.product != null) {
  datapro = JSON.parse(localStorage.product);
} else {
  datapro = [];
}

submit.onclick = function () {
  let newpro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discound: discound.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    newpro.count < 100 != ""
  ) {
    if (mood === "create") {
      if (newpro.count > 1) {
        for (let i = 1; i < newpro.count; i++) {
          datapro.push(newpro);
        }
      } else {
        datapro.push(newpro);
      }
    } else {
      datapro[temp] = newpro;
      count.style.display = "block";
      submit.innerHTML = "Create";
      getTotal();
    }
    cleardata();
  }

  // save
  localStorage.setItem("product", JSON.stringify(datapro));
  show();
};

// clear product

function cleardata() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discound.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

//read product

function show() {
  getTotal();
  let table = "";
  for (i = 0; i < datapro.length; i++) {
    table += `
    <tr>
    <td>${i + 1}</td>
    <td>${datapro[i].title}</td>
    <td>${datapro[i].price}</td>
    <td>${datapro[i].taxes}</td>
    <td>${datapro[i].ads}</td>
    <td>${datapro[i].discound}</td>
    <td>${datapro[i].total}</td>
    <td> ${datapro[i].category} </td>
    <td> <button onclick = "updateDate(${i})" id="update">update</button> </td>
    <td> <button onclick="deleteData( ${i} )" id="delete">delete</button> </td>
</tr>  
    
    `;
  }
  document.querySelector("#table").innerHTML = table;
  let btnAll = document.getElementById("deleteAll");
  if (datapro.length > 0) {
    btnAll.innerHTML = `
      <button onclick = "deleteDate()">delet All  (${datapro.length})</button>
      
      `;
  } else {
    btnAll.innerHTML = "";
  }
}
show();

// delete

function deleteData(i) {
  console.log(i);
  datapro.splice(i, 1);
  localStorage.product = JSON.stringify(datapro);
  show();
}

function deleteDate() {
  datapro.splice(0);
  show();
}

// update

function updateDate(i) {
  title.value = datapro[i].title;
  price.value = datapro[i].price;
  taxes.value = datapro[i].taxes;
  ads.value = datapro[i].ads;
  discound.value = datapro[i].discound;
  category.value = datapro[i].category;
  getTotal();
  count.style.display = "none";
  submit.innerHTML = "Update";
  mood = "update";
  empt = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// search
let getSearchMood = "title";

function searchMood(id) {
  let search = document.getElementById("search");
  if (id == "searchTitle") {
    getSearchMood = "title";

    for (let i = 0; i < datapro.length; i++) {}
  } else {
    getSearchMood = "Category";
  }
  search.placeholder = "Search By " + getSearchMood;
  search.focus();
  search.value = "";
  show();
}

function searchDate(value) {
  let table = "";
  for (let i = 0; i < datapro.length; i++) {
    if (getSearchMood == "title") {
      if (datapro[i].title.includes(value.toLowerCase())) {
        table += `
        <tr>
        <td>${i}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discound}</td>
        <td>${datapro[i].total}</td>
        <td> ${datapro[i].category} </td>
        <td> <button onclick = "updateDate(${i})" id="update">update</button> </td>
        <td> <button onclick="deleteData( ${i} )" id="delete">delete</button> </td>
    </tr>  
        
        `;
      }
    } else {
      if (datapro[i].category.includes(value.toLowerCase())) {
        table += `
        <tr>
        <td>${i}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discound}</td>
        <td>${datapro[i].total}</td>
        <td> ${datapro[i].category} </td>
        <td> <button onclick = "updateDate(${i})" id="update">update</button> </td>
        <td> <button onclick="deleteData( ${i} )" id="delete">delete</button> </td>
    </tr>  
        
        `;
      }
    }
  }
  document.querySelector("#table").innerHTML = table;
}
