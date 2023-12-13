export function navbar() {
    $(document).ready(function () {
        // Change navbar background on scroll
        window.addEventListener("scroll", function () {
            const navbar = $(".navbar");
            if (window.scrollY > 10) {
                navbar.css("background", "#F2ECD2");
            } else {
                navbar.css("background", "transparent");
            }
        });

        // Scroll and keep the background navbar color after reload
        checkHeaderStatus();
        $(window).scroll(function () {
            checkHeaderStatus();
        });

        function checkHeaderStatus() {
            const navbar = $(".navbar");
            const scrollPosition = $(window).scrollTop();
            if (scrollPosition < 10) {
                navbar.css("background-color", "#EFBE4C");
            } else {
                navbar.css("background-color", "#F2ECD2");
            }
        }
    });
}
