// localStorage.clear();

let inputTxt = document.querySelector('[name="siteName"]');
const table = document.querySelector("table tbody");
// console.log(table);
let inputUrl = document.querySelector('[name="websiteUrl"]');
let arr = [];
let initialize = 0;
let flag = 0;
if (localStorage.data) {
  console.log(localStorage.data.length);
  arr = JSON.parse(localStorage.data);
  initialize = arr[arr.length - 1].idx;
  table.innerHTML = "";
  arr.forEach((e, index) => {
    table.innerHTML += `
    <tr>
     <td>${index + 1}</td>
     <td>${e.name}</td>
     <td>
       <a href=${e.url} target="_blank"><i class="fa-solid fa-eye"></i>Visit</a>
     </td>
      <td>
       <a data-id=${e.idx}-UPDATE href="#"><i class="fa-solid fa-pen-to-square"></i>Update</a>
     </td>
     <td>
       <a data-id=${e.idx}-DELETE    href="#"><i class="fa-solid fa-trash"></i>Delete</a>
     </td>
   </tr>
`;
  });
} else {
  arr = [];
  initialize = 0;
}

inputTxt.addEventListener("input", (e) => {
  if (!/^[\w\s]{3,15}$/.test(inputTxt.value)) {
    inputTxt.classList.remove("correct");
    inputTxt.classList.add("error");
    inputTxt.parentElement.querySelector(".hide-2").classList.add("error");
    inputTxt.parentElement.querySelector(".hide-1").classList.remove("correct");
  } else {
    inputTxt.classList.add("correct");
    inputTxt.classList.remove("error");
    inputTxt.parentElement.querySelector(".hide-2").classList.remove("error");
    inputTxt.parentElement.querySelector(".hide-1").classList.add("correct");
  }
});

inputUrl.addEventListener("input", (e) => {
  if (!/^(https:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/.test(inputUrl.value)) {
    inputUrl.classList.add("error");
    inputUrl.classList.remove("correct");
    inputUrl.parentElement.querySelector(".hide-2").classList.add("error");
    inputUrl.parentElement.querySelector(".hide-1").classList.remove("correct");
  } else {
    inputUrl.classList.remove("error");
    inputUrl.classList.add("correct");
    inputUrl.parentElement.querySelector(".hide-2").classList.remove("error");
    inputUrl.parentElement.querySelector(".hide-1").classList.add("correct");
  }
});

document.forms[0].addEventListener("submit", (e) => {
  let inp_1 = false,
    inp_2 = false;

  e.preventDefault();
  if (!/^[\w\s]{3,15}$/.test(inputTxt.value)) {
    inputTxt.classList.add("error");
    inputTxt.parentElement.querySelector(".hide-2").classList.add("error");
    inputTxt.parentElement.querySelector(".hide-1").classList.remove("correct");
    // inputTxt.parentElement.querySelector(".hide-2").classList.add('error')
    // console.log(inputTxt.parentElement.querySelector(".hide-2"));
  } else {
    inp_2 = true;
    inputTxt.classList.add("correct");
    inputTxt.parentElement.querySelector(".hide-2").classList.remove("error");
    inputTxt.parentElement.querySelector(".hide-1").classList.add("correct");
  }

  if (!/^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/.test(inputUrl.value)) {
    inputUrl.classList.add("error");
    inputUrl.parentElement.querySelector(".hide-2").classList.add("error");
    inputUrl.parentElement.querySelector(".hide-1").classList.remove("correct");
  } else {
    inp_1 = true;
    inputUrl.classList.add("correct");
    inputUrl.parentElement.querySelector(".hide-2").classList.remove("error");
    inputUrl.parentElement.querySelector(".hide-1").classList.add("correct");
  }

  if (inp_1 && inp_2) {
    if (flag) {
      console.log(flag);
      arr = arr.filter((e) => {
        return e.idx != flag;
      });
    }
    arr.push({ name: inputTxt.value, url: inputUrl.value, idx: ++initialize });
    // console.log(arr);
    localStorage.setItem("data", JSON.stringify(arr));
    table.innerHTML = "";
    arr.forEach((e, index) => {
      table.innerHTML += `
        <tr>
         <td>${index + 1}</td>
         <td>${e.name}</td>
         <td>
           <a href=${e.url} target="_blank"><i class="fa-solid fa-eye"></i>Visit</a>
         </td>
         <td>
       <a data-id=${e.idx}-UPDATE href="#"><i class="fa-solid fa-pen-to-square"></i>Update</a>
     </td>
         <td>
           <a data-id=${e.idx}-DELETE href="#"><i class="fa-solid fa-trash"></i>Delete</a>
         </td>
       </tr>
    `;
    });

    inputUrl.classList.remove("correct");
    inputUrl.parentElement.querySelector(".hide-2").classList.remove("error");
    inputUrl.parentElement.querySelector(".hide-1").classList.remove("correct");
    inputTxt.classList.remove("correct");
    inputTxt.parentElement.querySelector(".hide-2").classList.remove("error");
    inputTxt.parentElement.querySelector(".hide-1").classList.remove("correct");
    inputTxt.value = "";
    inputUrl.value = "";
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      html: `<ul>
      <li>BookMark Name must be  greater than 3 char </li>
      <li>Website must be (https://www.example.com) </li>
      
      </ul>`,
      // footer: '<a href="#">Why do I have this issue?</a>',
    });
  }
});

table.addEventListener("click", (el) => {
  // if(el.target.dataset);
  // console.log(el.target.dataset.id);
  if (el.target.dataset.id) {
    if (el.target.dataset.id.split("-")[1] == "UPDATE") {
      // console.log("UPDATE");
      flag = el.target.dataset.id.split("-")[0];
      const ansVal = arr.find((e) => {
        return el.target.dataset.id.split("-")[0] == e.idx;
      });
      console.log(ansVal);
      inputTxt.value = ansVal.name;
      inputUrl.value = ansVal.url;
      inputUrl.classList.add("correct");
      inputUrl.parentElement.querySelector(".hide-1").classList.add("correct");
      inputTxt.classList.add("correct");
      inputTxt.parentElement.querySelector(".hide-1").classList.add("correct");
    } else if (el.target.dataset.id.split("-")[1] == "DELETE") {
      table.innerHTML = "";
      arr = arr.filter((e) => {
        return el.target.dataset.id.split("-")[0] != e.idx;
      });
      localStorage.setItem("data", JSON.stringify(arr));
      console.log(arr);
      arr.forEach((e, index) => {
        table.innerHTML += `
            <tr>
            <td>${index + 1}</td>
            <td>${e.name}</td>
            <td>
            <a href=${e.url} target="_blank"><i class="fa-solid fa-eye"></i>Visit</a>
            </td>
            <td>
               <a data-id=${e.idx}-UPDATE href="#"><i class="fa-solid fa-pen-to-square"></i>Update</a>
             </td>
            <td>
            <a data-id=${e.idx}-DELETE href="#"><i class="fa-solid fa-trash"></i>Delete</a>
            </td>
            </tr>
            `;
      });
    }
  }
  // else {

  // }
});

/*




*/

/*
 table.innerHTML = "";
    arr.forEach((e) => {
      console.log(e);
      table.innerHTML += `
        <tr>
         <td>${e.idx}</td>
         <td>${e.name}</td>
         <td>
           <a href=${e.url} target="_blank"><i class="fa-solid fa-eye"></i>Visit</a>
         </td>
         <td>
           <a data-id=${e.idx} href="#"><i class="fa-solid fa-trash"></i>Delete</a>
         </td>
       </tr>
    `;
    });   

*/
