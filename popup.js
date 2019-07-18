function generateString(stringLength) {
    /* generate a random string with provided length, adding length as prefix and '_e' as suffix */
    if (!Number.isInteger(stringLength) || stringLength < 0) {
        throw new TypeError('String length should be a positive integer');
    }
    const library = 'abcdefghijklmnopqrstuvwxyz';
    let randomString = '';
    let finalString = '';

    for (let i = 0; i < stringLength; i++) {
        const randomIndex = Math.floor(Math.random() * Math.floor(library.length));
        randomString += library[randomIndex];
    }

    // add prefix and suffix for longer strings in format: '20_smwonhwsjzrdcsp_e'
    if (stringLength >= 10) {
        finalString = stringLength + '_' + randomString.slice(randomString.length.toString().length + 1, -2) + '_e';
    } else {
        finalString = randomString;
    }

    // make sure only valid string is returned
    if (finalString.length === stringLength) {
        return finalString;
    } else {
        let errorMsg = `Generated string doesn't match the specified length. Expected: ${stringLength}, Actual: ${finalString.length}.`;
        throw new Error(errorMsg);
    }
}


// add event listener to Length input element
const lengthInputElement = document.getElementById("length");
lengthInputElement.addEventListener("input", lengthInputLimit);


// add event listener to Generate button element
const generateButtonElement = document.getElementById("generate");
generateButtonElement.addEventListener("click", processGenerateString);


function lengthInputLimit() {
    const lengthInputElement = document.getElementById("length");
    if (lengthInputElement.value.length > lengthInputElement.maxLength)
        lengthInputElement.value = lengthInputElement.value.slice(0, lengthInputElement.maxLength);
}


function processGenerateString() {
    const length = parseInt(document.getElementById("length").value);
    document.getElementById("result_string").value = generateString(length);
}


// add event listener to Generate button element
generateButtonElement.addEventListener("click", copyToClipboard);


function copyToClipboard() {
    const textareaElement = document.getElementById('result_string');
    textareaElement.focus();
    textareaElement.select();
    const copyResultElement = document.getElementById('copy_result');

    try {
        const successful = document.execCommand('copy');
        const msg = successful ? 'Copied to clipboard !' : 'Failed to copy';
        copyResultElement.innerText = msg;
        console.log('Copying text command was ' + msg);
    } catch (err) {
        console.log('Oops, unable to copy');
    }
}


// use jquery to enable clicking 'Generate' button via Enter keypress
$("#length").keypress(function (event) {
    if (event.keyCode === 13) {
        generateButtonElement.click();
    }
});


// TODO cleanup html, CSS, js
// TODO publish




