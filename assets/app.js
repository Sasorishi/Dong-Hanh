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

const $ = require('jquery');
// this "modifies" the jquery module: adding behavior to it
// the bootstrap module doesn't export/return anything
require('bootstrap');

// or you can include specific pieces
require('bootstrap/js/dist/tooltip');
require('bootstrap/js/dist/popover');
require('bootstrap/js/dist/modal');

$(document).ready(function () {
    $('[data-toggle="popover"]').popover();
});

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

//Check if both policy boxes are :checked before enable submit button
$(".check-aggreement").on("change", function () {
    checkedFunc("waiver", "guardian");
});

function checkedFunc(element1Id, element2Id) {
    var mybutton = document.getElementById("register");
    var element1 = document.getElementById(element1Id);
    var element2 = document.getElementById(element2Id);
    if (element1.checked == true && element2.checked == true) {
        mybutton.class = "submit";
        mybutton.removeAttribute("disabled");
    } else {
        mybutton.class = "button:disabled";
        mybutton.setAttribute("disabled", "disabled");
    }
}

// const phoneInputField = document.querySelector("#phone");
// const phoneInput = window.intlTelInput(phoneInputField, {
//     utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
// });