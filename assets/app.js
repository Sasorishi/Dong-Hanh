/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.scss';
import './styles/theme.css';

// start the Stimulus application
import './bootstrap';

$(document).ready(function () {
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll > 10) {
            $(".navbar").css("background", "#F2ECD2");
        } else {
            $(".navbar").css("background", "transparent");
        }
    })
})