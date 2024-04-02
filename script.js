//INPUTS
const inputDay = document.querySelector('#dayOfBirth');
const inputMonth = document.querySelector('#monthOfBirth');
const inputYear = document.querySelector('#yearOfBirth');

//OUTPUTS
const ageInDays = document.querySelector('.days');
const ageInMonths = document.querySelector('.months');
const ageInYears = document.querySelector('.years');

//FORM ELEMENT
const form = document.querySelector('form');
//FORM ELEMENT
const button = document.querySelector('button');


//GETTING THE PRESENT DAY, MONTH AND YEAR BASED ON THE DEVICES DATE AND TIME
const today = new Date();
const  currentDay = today.getDay();
const  currentMonth = today.getMonth() + 1;//Added one so that january is "1" and december is "12"
const  currentYear = today.getFullYear();

//FUNCTION FOR GETTING THE TOTAL NUMBER OF DAYS IN A MONTH
function getDaysInMonth(year, month){
    return new Date(year, month, 0).getDate();
};

//FUNCTION FOR VALIDATING THE FIELDS
function validate() {
    const inputs = document.querySelectorAll('input');
    let validator = true;
    
    inputs.forEach(input => {
        const parent = input.parentElement;
        if (!input.value) {
            input.style.borderColor = "var(--light-red)";
            parent.querySelector('.feedback').style.opacity = "1";
            parent.querySelector('.feedback').textContent = "This field is required";
            parent.querySelector('label').style.color = "var(--light-red)";
            validator = false;
        } else if (inputMonth.value > 12 || inputMonth.value < 1 ){
            inputMonth.style.borderColor = "var(--light-red)";
            inputMonth.parentElement.querySelector('.feedback').style.opacity = "1";
            inputMonth.parentElement.querySelector('label').style.color = "var(--light-red)";
            validator = false;
        } else if ((inputDay.value > getDaysInMonth(inputYear.value, inputMonth.value)) || (inputDay.value < 1)){
            inputDay.style.borderColor = "var(--light-red)";
            inputDay.parentElement.querySelector('.feedback').style.opacity = "1";
            inputDay.parentElement.querySelector('label').style.color = "var(--light-red)";
            validator = false;
        } else if (inputYear.value > currentYear){
            inputYear.style.borderColor = "var(--light-red)";
            inputYear.parentElement.querySelector('.feedback').style.opacity = "1";
            inputYear.parentElement.querySelector('label').style.color = "var(--light-red)";
            validator = false;
        } else if (((inputYear.value == currentYear) && (inputMonth.value > currentMonth))) {
            input.style.borderColor = "var(--light-red)";
            input.parentElement.querySelector('label').style.color = "var(--light-red)";
            parent.querySelector('.feedback').style.whiteSpace = "wrap";
            parent.querySelector('.feedback').style.opacity = "1";
            parent.querySelector('.feedback').textContent = "Oops! Looks like you haven't been born yet";
            validator = false;
        } else if (((inputYear.value == currentYear) && (inputMonth.value == currentMonth) && (inputDay.value > currentDay))) {
            input.style.borderColor = "var(--light-red)";
            input.parentElement.querySelector('label').style.color = "var(--light-red)";
            parent.querySelector('.feedback').style.whiteSpace = "wrap";
            parent.querySelector('.feedback').style.opacity = "1";
            parent.querySelector('.feedback').textContent = "Oops! Looks like you haven't been born yet";
            validator = false;
        } else {
            input.style.borderColor = "var(--smokey-grey)";
            parent.querySelector('.feedback').style.opacity = "0";
            parent.querySelector('label').style.color = "var(--smokey-grey)";
            validator = true;
        }
    });
    return validator;
}


//ADDING THE SUBNIT EVENT LISTENER TO FORM
button.addEventListener('click', e => {
    e.preventDefault();//Stop the page from refreshing by default

    //STORING THE VALUES OF VARIOUS INPUTS
    let birthDay = inputDay.value;
    let birthMonth = inputMonth.value;
    let birthYear = inputYear.value;

    if (validate()) {
        let calculatedAgeInDays, calculatedAgeInMonths, calculatedAgeInYears;

        calculatedAgeInYears = currentYear - birthYear;

        if (currentMonth >= birthMonth){
            calculatedAgeInMonths = currentMonth - birthMonth;
        } else {
            calculatedAgeInYears--;
            calculatedAgeInMonths = 12 + currentMonth - birthMonth;
        }
        
        if (currentDay >= birthDay) {
            calculatedAgeInDays = currentDay - birthDay;
        } else {
            calculatedAgeInMonths--;
            calculatedAgeInDays = getDaysInMonth(currentYear, currentMonth) + currentDay - birthDay;
        }
        if (calculatedAgeInMonths < 0) {
            calculatedAgeInMonths = 11;
            calculatedAgeInYears--;
        }
        //ANIMATING THE OUTPUT VALUE
        let outputDay = 0;
        const dayTimer = setInterval(() => {
        
            ageInDays.textContent = outputDay;
        
            if(outputDay === calculatedAgeInDays){
                clearInterval(dayTimer);
            } else {
                outputDay++;
            }
        }, 50);
        
        
        let outputMonth = 0;
        const monthTimer = setInterval(() => {
        
            ageInMonths.textContent = outputMonth;
        
            if(outputMonth === calculatedAgeInMonths){
                clearInterval(monthTimer);
            } else {
                outputMonth++;
            }
        }, 50);
        
        
        let outputYear = 0;
        const yearTimer = setInterval(() => {
        
            ageInYears.textContent = outputYear;
        
            if(outputYear === calculatedAgeInYears){
            clearInterval(yearTimer);
            } else {
            outputYear++;
            }
        }, 50);
    }
});