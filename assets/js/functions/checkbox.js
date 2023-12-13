export function checkbox() {
    $(".check-agreement").on("change", function () {
        checkedFunc("waiver", "guardian");
    });

    function checkedFunc(element1Id, element2Id) {
        const mybutton = document.getElementById("register");
        const element1 = document.getElementById(element1Id);
        const element2 = document.getElementById(element2Id);
        if (element1.checked === true && element2.checked === true) {
            mybutton.class = "submit";
            mybutton.removeAttribute("disabled");
        } else {
            mybutton.class = "button:disabled";
            mybutton.setAttribute("disabled", "disabled");
        }
    }
}