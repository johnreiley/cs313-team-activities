let rateForm = document.querySelector('#rate-form');
var formSubmitBtn = document.querySelector('#submit-btn');
let formResult = document.querySelector('#form-result');

let postalWeight = document.querySelector('#postal-weight');
let postalType = document.querySelector('#postal-type');
let warnText = document.querySelector('#warn-txt')

formResult.style.display = "none";

formSubmitBtn.addEventListener('click', validateForm)
window.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
        e.preventDefault();
    }
});

async function validateForm() {
    formResult.style.display = "none";
    console.log(postalType.value);
    if (postalWeight.value == null) {
        warnText.innerText = 'Please enter a weight';
        return;
    }
    if (postalWeight.value > 13 || postalWeight.value < 0) {
        warnText.innerText = 'The package must be 32 oz. or less';
        return;
    }
    if (postalType.value == 0) {
        warnText.innerText = 'Please select a mailing type';
        return;
    }
    warnText.innerText = "";
    await handleFormResults(postalWeight.value, postalType.value);
    formResult.style.display = "block";
}


async function handleFormResults(weight, type) {
    let response = await fetch(`/getRates?weight=${weight}&type=${type}`);
    let json = await response.json();
    let price = Number(json.price).toFixed(2);

    formResult.innerText = `Price: $${price}`;
}