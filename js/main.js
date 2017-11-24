$(document).ready(function() {
  //Video section
  var bgVideo = $("#bgVid");
  var videoButton = $("#videoButton");

  //Check if in mobile
  if (videoButton.css("display") != "none") {
    bgVideo.get(0).pause();
  }

  videoButton.click(function() {
    if (bgVideo.get(0).paused) {
      videoButton.text("PAUSE");
      bgVideo.get(0).play();
    } else {
      videoButton.text("PLAY");
      bgVideo.get(0).pause();
    }
  });

  //Jquery Smooth Scrolling
  // Select all links with hashes
  $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length
          ? target
          : $("[name=" + this.hash.slice(1) + "]");
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $("html, body").animate(
            {
              scrollTop: target.offset().top
            },
            1000,
            function() {
              // Callback after animation
              // Must change focus!
              var $target = $(target);
              $target.focus();
              if ($target.is(":focus")) {
                // Checking if the target was focused
                return false;
              } else {
                $target.attr("tabindex", "-1"); // Adding tabindex for elements not focusable
                $target.focus(); // Set focus again
              }
            }
          );
        }
      }
    });

  $(".nav_menu").click(function() {
    $(".nav").toggleClass("open_nav");
    $(this).toggleClass("nav_menu_change");
  });

  //link for each showcase item
  var gifLinks = {
    first: "https://media.giphy.com/media/ptvUgESCNlBWU/giphy.gif",
    second: "https://media.giphy.com/media/ptvUgESCNlBWU/giphy.gif",
    third: "https://media.giphy.com/media/ptvUgESCNlBWU/giphy.gif"
  };

  var imageLinks = {
    first: "http://i.imgur.com/xfk1vYW.png",
    second:
      "https://img1.goodfon.com/original/1920x1080/3/ca/art-igra-hearthstone-heroes.jpg",
    third:
      "http://wow.zamimg.com/uploads/screenshots/normal/524249-jason-wang-ragnaros.jpg"
  };

  var $animation_elements = $(".showcase");
  var $window = $(window);

  function check_if_in_view() {
    var window_height = $window.height();
    var window_top_position = $window.scrollTop();
    var window_bottom_position = window_top_position + window_height;

    $.each($animation_elements, function() {
      var $element = $(this);
      var element_height = $element.outerHeight();
      var element_top_position = $element.offset().top;
      var element_bottom_position = element_top_position + element_height;

      const isInView =
        element_bottom_position > window_top_position + $element.height() / 2;
      const isNotScrolledPast =
        element_top_position < window_bottom_position - $element.height() / 2;
      //check to see if this current container is within viewport
      if (isInView && isNotScrolledPast) {
        $element
          .find("hr")
          .removeClass("hide")
          .addClass("expand");
        $element.find(".container__background").addClass("expand");
        $element.one(
          "webkitAnimationEnd oanimationend msAnimationEnd animationend",
          function(e) {
            $element.find(".showcase__title").addClass("fadeIn");
            $element.find(".showcase__description").addClass("fadeIn");
            $element.find(".button").addClass("fadeIn");
          }
        );

        $element
          .find(".full_background--center")
          .css(
            "background-image",
            "url(" + gifLinks[$element.attr("id")] + ")"
          );
      } else {
        $element
          .find("hr")
          .addClass("hide")
          .removeClass("expand");
        $element.find(".container__background").removeClass("expand");
        $element.find(".showcase__title").removeClass("fadeIn");
        $element.find(".showcase__description").removeClass("fadeIn");
        $element.find(".button").removeClass("fadeIn");
        $element
          .find(".full_background--center")
          .css(
            "background-image",
            "url(" + imageLinks[$element.attr("id")] + ")"
          );
      }
    });
  }

  function debounce(func, wait = 20, immediate = true) {
    var timeout;
    return function() {
      var context = this,
        args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  $window.on("scroll resize", debounce(check_if_in_view));
  $window.trigger("scroll");
});
