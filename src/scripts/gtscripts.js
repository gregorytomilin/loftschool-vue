let currentYear  = new Date().getFullYear();
let userBithYear = +document.querySelectorAll('.user__table-content')[1]
let userAge = currentYear - (+ userBithYear.innerHtml);