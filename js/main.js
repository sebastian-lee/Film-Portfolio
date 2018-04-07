$(document).ready(function() {

    /* ==========================================================================
   Video background section
   ========================================================================== */
    var tag = document.createElement("script");

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var player = document.getElementById("player");
    window.onYouTubeIframeAPIReady = function onYouTubeIframeAPIReady() {
        player = new YT.Player("player", {
            height: "390",
            width: "640",
            videoId: "eWoWb1BZLeA",
            playerVars: {
                autoplay: 1,
                controls: 0,
                showinfo: 0,
                modestbranding: 1,
                loop: 1,
                playlist: "eWoWb1BZLeA",
                fs: 0,
                cc_load_policy: 0,
                iv_load_policy: 3,
                rel: 0
            },
            events: {
                onReady: onPlayerReady,
                onStateChange: onPlayerStateChange
            }
        });

        
    };

    function onPlayerReady(event) {
        var player = event.target;
        player.mute();
        player.playVideo();

        var videoButton = $("#videoButton");

        //Check if in mobile, if it is start the video paused
        if (videoButton.css("display") != "none") {
          player.pauseVideo();
        }

        var playButton = document.getElementById("videoButton");
        playButton.addEventListener("click", function(event) {
          if (!playing) {
            videoButton.text("PAUSE");
            player.playVideo();
          } else {
              videoButton.text("PLAY");
              player.pauseVideo();
          }
        });
    }

    var playing = false;
    function onPlayerStateChange(event) {
      if(event.data == YT.PlayerState.PLAYING){
        playing = true;
      }
      else if(event.data == YT.PlayerState.PAUSED){
        playing = false;
      }
    }

    /* ==========================================================================
   Jquery Smooth Scrolling
   ========================================================================== */

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

    /* ==========================================================================
  Nav menu button
  ========================================================================== */
    // Nav menu toggle for mobile view
    $(".nav_menu").click(function() {
        $(".nav").toggleClass("open_nav");
        $(this).toggleClass("nav_menu_change");
    });

    /* ==========================================================================
   Work Section
   ========================================================================== */

    //link for each showcase item
    var gifLinks = {
        first: "https://media.giphy.com/media/1k2wn5pqFnFrgJ78Fv/giphy.gif",
        second: "https://media.giphy.com/media/9GIhdOzGDqBBnuypoG/giphy.gif",
        third: "https://media.giphy.com/media/jHvAZF0NU9jP9ymTZH/giphy.gif"
    };

    var imageLinks = {
        first:  "https://i.imgur.com/JT4q2ci.jpg",
        second: "https://i.imgur.com/6I9Q5NS.jpg",
        third: "https://i.imgur.com/akyySnu.jpg"
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
                element_bottom_position >
                window_top_position + $element.height() / 2;
            const isNotScrolledPast =
                element_top_position <
                window_bottom_position - $element.height() / 2;
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
                        $element
                            .find(".showcase__description")
                            .addClass("fadeIn");
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
