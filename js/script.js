$(document).ready(function () {


  var bodyDir = $('body').css('direction')
  var dirAr
  if (bodyDir == "rtl") {
    dirAr = true
  }
  else {
    dirAr = false
  }


  // loading

  $("body").css('overflow-y', 'auto');

  $('#loading').fadeOut(500);

  $('select').niceSelect();

  $(".fav").click(function () {
    $(this).children(".bi").toggleClass('bi-heart-fill').toggleClass('bi-heart');
  });

  $('.toggleFav').click(function () {
    $(this).toggleClass('added')
  })


  // ----- scroll top button ------

  var btn_top = $('#scroll-top');
  var btn_bottom = $('.scroll-bottom');

  $(window).scroll(function () {
    if ($(window).scrollTop() > 300) {
      btn_top.addClass('show');
    } else {
      btn_top.removeClass('show');
    }
  })

  btn_top.on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, '300');
  });

  btn_bottom.on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 730 }, '300');
  });

  const qtyInput = document.getElementById('qtyInput');
  document.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      let current = parseInt(qtyInput.value) || 1;
      if (btn.dataset.action === 'increase') current++;
      else if (btn.dataset.action === 'decrease' && current > parseInt(qtyInput.min)) current--;
      qtyInput.value = current;
    });
  });


  const inputElements = [...document.querySelectorAll("input.code")];
  inputElements.forEach((ele, index) => {
    ele.addEventListener("keydown", (e) => {
      if (e.keyCode === 8 && e.target.value === "")
        inputElements[Math.max(0, index - 1)].focus();
    });
    ele.addEventListener("input", (e) => {
      inputElements[index].focus();
      const [first, ...rest] = e.target.value;
      e.target.value = first ?? ""; // first will be undefined when backspace was entered, so set the input to ""
      const lastInputBox = index === inputElements.length - 1;
      const didInsertContent = first !== undefined;
      if (didInsertContent && !lastInputBox) {
        inputElements[index + 1].focus();
        inputElements[index + 1].value = rest.join("");
        inputElements[index + 1].dispatchEvent(new Event("input"));
      }
    });
  });

  function onSubmit(e) {
    e.preventDefault();
    const code = inputElements.map(({ value }) => value).join("");
    console.log(code);
  }

  // toggle password type
  $('.pass').click(function () {
    $(this).children('i').toggleClass("bi-unlock bi-lock");
    var pass = $(this).closest('.input-group').find('input')[0];
    console.log(pass);
    if (pass.type == "password") {
      pass.setAttribute("type", "text");
    } else {
      pass.setAttribute("type", "password");
    }
  })

  $(".heroSec .owl-carousel").owlCarousel({
    loop: true,
    margin: 24,
    items: 1,
    rtl: dirAr,
    autoplay: true,
    dots: true,
    autoplayHoverPause: true,
  });

  $(".category .owl-carousel").owlCarousel({
    loop: true,
    autoplay: true,
    margin: 16,
    nav: true,
    navText: ['<i class="bi bi-arrow-right"></i>', '<i class="bi bi-arrow-left"></i>'],
    rtl: dirAr,
    responsive: {
      0: {
        items: 2,
        margin: 8,
      },
      768: {
        items: 4
      },
      998: {
        items: 6
      }
    }
  });
  $(".same-products .owl-carousel").owlCarousel({
    loop: true,
    autoplay: true,
    margin: 16,
    nav: true,
    navText: ['<i class="bi bi-arrow-right"></i>', '<i class="bi bi-arrow-left"></i>'],
    rtl: dirAr,
    responsive: {
      0: {
        items: 2,
        margin: 8,
      },
      768: {
        items: 4
      },
      998: {
        items: 5
      }
    }
  })
  $(".partners .owl-carousel").owlCarousel({
    loop: true,
    autoplay: true,
    margin: 16,
    nav: false,
    rtl: dirAr,
    responsive: {
      0: {
        items: 2,
        margin: 8,
      },
      768: {
        items: 4
      },
      998: {
        items: 6
      }
    }
  });

  var changeSlide = 4; // mobile -1, desktop + 1
  // Resize and refresh page. slider-two slideBy bug remove
  var slide = changeSlide;
  if ($(window).width() < 600) {
    var slide = changeSlide;
    slide--;
  } else if ($(window).width() > 999) {
    var slide = changeSlide;
    slide++;
  } else {
    var slide = changeSlide;
  }

  $(".one").owlCarousel({
    nav: false,
    items: 1,
    margin: 5,
    autoplay: 5000,
    rtl: dirAr,
  });
  $(".two").owlCarousel({
    nav: false,
    margin: 5,
    rtl: dirAr,
    responsive: {
      0: {
        items: changeSlide - 1,
        slideBy: changeSlide - 1,
      },
      600: {
        items: changeSlide,
        slideBy: changeSlide,
      },
      1000: {
        items: changeSlide + 1,
        slideBy: changeSlide + 1,
      },
    },
  });
  var owl = $(".one");
  owl.owlCarousel();
  owl.on("translated.owl.carousel", function (event) {
    $(".right").removeClass("nonr");
    $(".left").removeClass("nonl");
    if ($(".one .owl-next").is(".disabled")) {
      $(".slider .right").addClass("nonr");
    }
    if ($(".one .owl-prev").is(".disabled")) {
      $(".slider .left").addClass("nonl");
    }
    $(".slider-two .item").removeClass("active");
    var c = $(".slider .owl-item.active").index();
    $(".slider-two .item").eq(c).addClass("active");
    var d = Math.ceil((c + 1) / slide) - 1;
    $(".slider-two .owl-dots .owl-dot").eq(d).trigger("click");
  });
  $(".right").click(function () {
    $(".slider .owl-next").trigger("click");
  });
  $(".left").click(function () {
    $(".slider .owl-prev").trigger("click");
  });
  $(".slider-two .item").click(function () {
    var b = $(".item").index(this);
    $(".slider .owl-dots .owl-dot").eq(b).trigger("click");
    $(".slider-two .item").removeClass("active");
    $(this).addClass("active");
  });
  var owl2 = $(".two");
  owl2.owlCarousel();
  owl2.on("translated.owl.carousel", function (event) {
    $(".right-t").removeClass("nonr-t");
    $(".left-t").removeClass("nonl-t");
    if ($(".two .owl-next").is(".disabled")) {
      $(".slider-two .right-t").addClass("nonr-t");
    }
    if ($(".two .owl-prev").is(".disabled")) {
      $(".slider-two .left-t").addClass("nonl-t");
    }
  });
  $(".right-t").click(function () {
    $(".slider-two .owl-prev").trigger("click");
  });
  $(".left-t").click(function () {
    $(".slider-two .owl-next").trigger("click");
  });


  $("#your-rate").rateYo({
    starWidth: "15px",
    ratedFill: "#FA8232",
    rating: 0,
    fullStar: true,
    rtl: dirAr
  });


  $(".add-address").click(function () {
    if ($(".form-address").css("display") == "block") {
      $(".form-address").hide();
    } else {
      $(".form-address").show();
    }
  });
  $(".input-cridet").hide();

  $('.cart input[type="radio"]').change(function () {
    if ($(".lable-cridet").is(":checked")) {
      $(".input-cridet").show();
    } else {
      $(".input-cridet").hide();
    }
  });

  $("#filter").click(function () {
    $(".filter").toggleClass("filter-toggle");
  });
  $(".filter-header .btn-close").click(function () {
    $(".filter").toggleClass("filter-toggle");
  });

  $("#profile_nav").click(function () {
    $(".profile-nav").toggleClass("Pnav-toggle");
  });
  $(".profile-header .btn-close").click(function () {
    $(".profile-nav").toggleClass("Pnav-toggle");
  });

  /* -------------- upload profile pic ---------------- */
  if ($(".profile-pic").length > 0) {
    const imgDiv = document.querySelector(".profile-pic");
    const img = document.querySelector("#photo");
    const file = document.querySelector("#file");
    const uploadBtn = document.querySelector("#uploadBtn");

    //when we choose a pic to upload

    file.addEventListener("change", function () {
      const choosedFile = this.files[0];
      if (choosedFile) {
        const reader = new FileReader();
        reader.addEventListener("load", function () {
          img.setAttribute("src", reader.result);
        });
        reader.readAsDataURL(choosedFile);
      }
    });
  }

});