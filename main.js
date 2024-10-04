// localStorage.clear();
let filteration = document.querySelectorAll(".filteration button");
let inputTxt = document.querySelector('[name="siteName"]');
const table = document.querySelector("table tbody");
// console.log(table);
let inputUrl = document.querySelector('[name="websiteUrl"]');
let inputFav = document.querySelector('[type="checkbox"]');
// console.log(inputFav);
let arr = [];
let initialize = 0;
let flag = 0;
if (localStorage.data) {
  // console.log(localStorage.data.length);

  arr = JSON.parse(localStorage.data);
  if (arr.length != 0) {
    // console.log(arr);

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
  }
} else {
  arr = [];
  initialize = 0;
}

inputFav.parentElement.querySelector("label").addEventListener("click", (e) => {
  if (e.target.dataset.label == "l") {
    if (inputFav.value == "false") {
      e.target.querySelector("i").classList.add("checked");
      inputFav.value = true;
    } else {
      e.target.querySelector("i").classList.remove("checked");
      inputFav.value = false;
    }
  } else {
    if (inputFav.value == "false") {
      e.target.classList.add("checked");
      inputFav.value = true;
    } else {
      e.target.classList.remove("checked");
      inputFav.value = false;
    }
  }

  // console.log(e.target.dataset.label);
});

// inputFav.parentElement.querySelector("label i").addEventListener("click", (e) => {
//   if (inputFav.value == "false") {
//     e.target.classList.add("checked");
//     inputFav.value = true;
//   } else {
//     e.target.classList.remove("checked");
//     inputFav.value = false;
//   }
// console.log(inputFav);
// });

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
    console.log(inputFav.value);
    arr.push({
      name: inputTxt.value,
      url: inputUrl.value,
      favorite: inputFav.value,
      idx: ++initialize,
    });
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
    inputFav.checked = false;
    inputFav.value = false;
    inputFav.parentElement.querySelector("label i").classList.remove("checked");
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      html: `<ul>
      <li>BookMark Name must be  greater than 3 char </li>
      <li>Website must be (https://www.example.com) </li>
      
      </ul>`,
      customClass: {
        popup: "custom-width", // Class name to modify the width
      },
      // footer: '<a href="#">Why do I have this issue?</a>',
    });
  }
});

// ------------------------------------------------------
filteration.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    table.innerHTML = "";
    if (e.target.dataset.fav_all == "fav") {
      const arrFilter = arr.filter((site) => {
        return site.favorite == "true";
      });
      arrFilter.forEach((e, index) => {
        table.innerHTML += `
            <tr>
            <td>${index + 1}</td>
            <td>${e.name}</td>
            <td>
            <a href=${e.url} target="_blank"><i class="fa-solid fa-eye"></i>Visit</a>
            </td>
            <td>
               <a data-id=${
                 e.idx
               }-UPDATE href="#"><i class="fa-solid fa-pen-to-square"></i>Update</a>
             </td>
            <td>
            <a data-id=${e.idx}-DELETE href="#"><i class="fa-solid fa-trash"></i>Delete</a>
            </td>
            </tr>
            `;
      });
    } else if (e.target.dataset.fav_all == "all") {
      console.log("all");
      arr.forEach((e, index) => {
        table.innerHTML += `
            <tr>
            <td>${index + 1}</td>
            <td>${e.name}</td>
            <td>
            <a href=${e.url} target="_blank"><i class="fa-solid fa-eye"></i>Visit</a>
            </td>
            <td>
               <a data-id=${
                 e.idx
               }-UPDATE href="#"><i class="fa-solid fa-pen-to-square"></i>Update</a>
             </td>
            <td>
            <a data-id=${e.idx}-DELETE href="#"><i class="fa-solid fa-trash"></i>Delete</a>
            </td>
            </tr>
            `;
      });
    }
  });
});
// -----------------------------------------------------

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
      if (ansVal.favorite == "true") {
        console.log("true");
        inputFav.parentElement.querySelector("label i").classList.add("checked"); // Add the class for styling
        inputFav.value = true;

        inputFav.checked = true; // Set the checkbox as checked
      } else {
        inputFav.parentElement.querySelector("label i").classList.remove("checked"); // Remove the class
        inputFav.value = false;
        inputFav.checked = false; // Set the checkbox as unchecked
      }
      // inputFav.setAttribute("checked");
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
               <a data-id=${
                 e.idx
               }-UPDATE href="#"><i class="fa-solid fa-pen-to-square"></i>Update</a>
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
