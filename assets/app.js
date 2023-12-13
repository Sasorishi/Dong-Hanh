/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.scss';
import './styles/theme.css';
import $ from 'jquery';

// start the Stimulus application
import './bootstrap';

// this "modifies" the jquery module: adding behavior to it
// the bootstrap module doesn't export/return anything
require('bootstrap');

// or you can include specific pieces
require('bootstrap/js/dist/tooltip');
require('bootstrap/js/dist/popover');
require('bootstrap/js/dist/modal');

import { checkbox } from './js/functions/checkbox';
import { navbar } from './js/functions/navbar';

$(document).ready(function () {
    checkbox();
    navbar();
    $(window).scroll(function () {
        navbar();
    });

    $(".check-agreement").on("change", function () {
        checkedFunc("waiver", "guardian");
    });

    // ...
});