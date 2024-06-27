$(document).ready(function () {
  // fetch all foods

  let backendurl = "http://localhost:8000";

  $.ajax({
    type: "get",
    crossDomain: true,
    url: "http://localhost:8000/allfoods/",
    dataType: "json",
    success: function (response) {
      $.map(response, function (food, index) {
        let eachFood = `<div class="col-lg-4 menu-item">

                <a href="${backendurl + food.image}" class="glightbox">
                <img src="${
                  backendurl + food.image
                }" class="menu-img img-fluid" alt="">
                </a>
                <h3>${food.name}</h3>
                <p class="price">
                 ${food.price}
                </p>
                <p>${food.description}</p>

                <button onclick="addToCart(${
                  food.id
                })" class="btn btn-outline-danger rounded-3">ADD</button
                </div>`;
        $("#allfoods").append(eachFood);
      });
    },

    error: function (error) {
      console.log(error);
    },
  });

  // fetch carts

let userid = localStorage.getItem('userid');

$.ajax({
    type: "get",
    url: `http://localhost:8000/fetchcart/${userid}`,
    dataType: "json",
    success: function (response) {
        $('#total').text(response.length)
        
        
    }
});
});

//Signup

$("#signupform").submit(function (e) {
  e.preventDefault();

  let form = new FormData(e.currentTarget);

  $.ajax({
    type: "post",
    url: "http://localhost:8000/signup/",
    data: form,
    dataType: "json",
    processData: false,
    cache: false,
    contentType: false,
    success: function (response) {
      alert("Signup Successful");
      window.location.href = "/login.html";
    },
    error: function (error) {
      $.map(error.responseJSON, function (value, key) {
        alert(key + ": " + value);
      });
    },
  });
});

// login

$("#loginform").submit(function (e) {
  e.preventDefault();

  let form = new FormData(e.currentTarget);

  $.ajax({
    type: "post",
    url: "http://localhost:8000/login/",
    data: form,
    dataType: "json",
    processData: false,
    cache: false,
    contentType: false,
    success: function (response) {
      localStorage.setItem("userid", response);
      localStorage.setItem("login", true);
      window.location.href = "/index.html";

      // window.location.href = "/index.html"
    },
    error: function (error) {
      // $.map(error.responseJSON, function (value, key){
      //     alert(key + ': ' + value)

      console.log(error);

      // });
    },
  });
});

// adding food to cart

function addToCart(id) {
  let userid = localStorage.getItem("userid");

  if (userid == null) {
    window.location.href = "login.html";
  } else {
    $.ajax({
      type: "get",
      url: `http://localhost:8000/addtocart/${userid}/${id}`,
      dataType: "json",
      contentType: false,
      processData: false,
      cache: false,
      success: function (response) {
        alert("added successfully");
        window.location.reload();
      },
      error: function (error) {
        alert(error.responseJSON);
      },
    });
  }

  // alert(id)
  // alert(userid)
}


