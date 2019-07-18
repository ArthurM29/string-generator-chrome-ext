const lengthInputElement = document.getElementById("length");
const generateButtonElement = document.getElementById("generate");
const textareaElement = document.getElementById("result_string");
const copyResultElement = document.getElementById('copy_result');


function generateString(stringLength) {
    /* generate a random string with provided length, adding length as prefix and '_e' as suffix */
    if (!Number.isInteger(stringLength) || stringLength < 0) {
        throw new TypeError('String length should be integer > 0');
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

function lengthInputLimit() {
    if (lengthInputElement.value.length > lengthInputElement.maxLength)
        lengthInputElement.value = lengthInputElement.value.slice(0, lengthInputElement.maxLength);
}

function processGenerateString() {
    const length = parseInt(document.getElementById("length").value);
    textareaElement.value = generateString(length);
}

function copyToClipboard() {
    if (textareaElement.value) {
        textareaElement.focus();
        textareaElement.select();

        try {
            const successful = document.execCommand('copy');
            const msg = successful ? 'Copied to clipboard !' : 'Failed to copy';
            copyResultElement.innerText = msg;
            console.log('Copying text command was ' + msg);
        } catch (err) {
            console.log('Oops, unable to copy');
        }
    }
}

function removeCopiedResultMsg() {
    copyResultElement.innerText = '';
}


// use jquery to enable clicking 'Generate' button via Enter keypress
$("#length").keypress(function (event) {
    if (event.keyCode === 13) {
        generateButtonElement.click();
    }
});


// add event listeners
lengthInputElement.addEventListener("input", lengthInputLimit);
lengthInputElement.addEventListener("focus", removeCopiedResultMsg);
generateButtonElement.addEventListener("click", processGenerateString);
generateButtonElement.addEventListener("click", copyToClipboard);

