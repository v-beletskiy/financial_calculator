//Adding handler for income input field
let incomeTotal = document.querySelector('#your-monthly-income-sum');
incomeTotal.addEventListener('input', onPaymentInput);

//Adding handlers for input fields (sum inputs)
let yourCompulsoryPaymentsInputs = document.querySelectorAll('div.compulsory-payments-item input.input-for-your-sums');
for (let i = 0; i < yourCompulsoryPaymentsInputs.length; i++) {
    yourCompulsoryPaymentsInputs[i].addEventListener('input', onPaymentInput);
}

//Adding the handler to add other expenses button and performing operations after users add  new fields (pressing "Добавить статью расходов")
let compulsoryPaymentsItemAdd = document.querySelector('#compulsory-payments-item-add');
compulsoryPaymentsItemAdd.addEventListener('click', function(addButtonPressed) {
    addButtonCompulsoryPayments();
})

//Everything that happens after Add Button is pressed (creating new div, adding input, substituting it via span block containig data after Enter has been pressed)
function addButtonCompulsoryPayments() {
    try {
        //Moving add button to the bottom of #compulsory-payments-wrap if clicked
       let addButtonToBottom = document.querySelector('#addButton');
        addButtonToBottom.addEventListener('click', function() {
            let compulsoryPayments = document.querySelector('#compulsory-payments-wrap');
            let addButtonToBottom1 = document.querySelector('#addButton');
            compulsoryPayments.appendChild(addButtonToBottom1);
        })

        //Creating new div block
        let newCompulsoryPaymentsItemAdded = document.createElement('div');
        newCompulsoryPaymentsItemAdded.className = "compulsory-payments-item";
        let compulsoryPayments = document.querySelector('#compulsory-payments-wrap');
        compulsoryPayments.appendChild(newCompulsoryPaymentsItemAdded);


       ///Adding pop-up help while mouse is over payments item element added
        newCompulsoryPaymentsItemAdded.addEventListener('mouseenter', function() {
            let helpHover = document.createElement('span');
            helpHover.className = 'help-hover-added-fields';
            helpHover.innerText = 'Есть еще расходы? Добавьте их в поле слева, нажмите Enter. Предполагаемые траты введите в поле справа и нажмите Enter.';
            newCompulsoryPaymentsItemAdded.appendChild(helpHover);

            //Removing help while mouse is out
            newCompulsoryPaymentsItemAdded.addEventListener('mouseleave', function() {
                newCompulsoryPaymentsItemAdded.removeChild(helpHover);
            })
        })

        //Adding inner elements to added div #compulsory-payments-item-add
        let addInputItemName = document.createElement('input');
        addInputItemName.className = 'input-for-your-sums';
        newCompulsoryPaymentsItemAdded.insertBefore(addInputItemName, null);
        //Adding second input for entering sums
        let addInputItemSum = document.createElement('input');
        addInputItemSum.className = 'input-for-your-sums';
        newCompulsoryPaymentsItemAdded.appendChild(addInputItemSum, null);

        //If Enter (13) is pressed, span substitutes inputName. Defining pressed key code.
        addInputItemName.addEventListener('keyup', function(e) {
            if (e.keyCode === 13) {
                //Saving name input value (1st) and deleting input (to change it by span)
                let addInputItemNameValue = addInputItemName.value;
                addInputItemName.parentNode.removeChild(addInputItemName);
                //Creating span inside div and placing it before 2nd input
                let addInputItemNameSpan = document.createElement('span');
                newCompulsoryPaymentsItemAdded.insertBefore(addInputItemNameSpan, newCompulsoryPaymentsItemAdded.firstChild);
                addInputItemNameSpan.innerText = addInputItemNameValue;
            }
        })

        //If Enter (13) is pressed, span substitutes inputSum. Defining pressed key code.
        addInputItemSum.addEventListener('keyup', function(e) {
            if (e.keyCode === 13) {
                let addInputItemSumValue = addInputItemSum.value;
                addInputItemSum.parentNode.removeChild(addInputItemSum);
                //Creating span inside div and placing it at the end
                let addInputItemSumSpan = document.createElement('span');
                newCompulsoryPaymentsItemAdded.insertBefore(addInputItemSumSpan, null);
                addInputItemSumSpan.innerText = addInputItemSumValue;
            }
        })
        return true;
    }
    catch (e) {
        return false;
    }
}

//Calculating total value ("Итого")
function onPaymentInput() {
    //Getting income input value
    let incomeTotal = document.querySelector('#your-monthly-income-sum');
    let incomeTotalString = incomeTotal.value;
    incomeTotal = parseInt(incomeTotalString);
    //Test for NaN (NaN is not self-identical)
    if (incomeTotal !== incomeTotal) {
        incomeTotal = 0;
    }

    //Getting total sum of payments of all inputs
    let paymentsTotal = 0;
    let yourCompulsoryPaymentsInputs = document.querySelectorAll('div.compulsory-payments-item input.input-for-your-sums');
    for (let i = 0; i < yourCompulsoryPaymentsInputs.length; i++) {
        let yourCompulsoryPaymentsInputsString = yourCompulsoryPaymentsInputs[i].value;
        let yourCompulsoryPaymentsInputsVal = parseInt(yourCompulsoryPaymentsInputsString);
        //Test for NaN
        if (yourCompulsoryPaymentsInputsVal !== yourCompulsoryPaymentsInputsVal) {
            paymentsTotal += 0;
        }
        else {
            paymentsTotal += yourCompulsoryPaymentsInputsVal;
        }
    }


    //Printing income value ("Доходы")
    let totalIncomeSpan = document.querySelector('.total-income-sum');
    totalIncomeSpan.innerHTML = incomeTotal;

    //Printing sum of expense values ("Расходы")
    let totalExpenseSpan = document.querySelector('.total-expense-sum');
    totalExpenseSpan.innerHTML = paymentsTotal;

    //Printing the calculated value to span "Итого" and making this block green if sum is > 0 and red otherwise
    let balanceConclusion = document.querySelector('.balance-conclusion');
    let estimatedTotalBlock = document.querySelector('.total-sum');
    let estimatedTotalSpan = document.querySelector('#estimatedTotal');
    if ((incomeTotal - paymentsTotal) > 0) {
        estimatedTotalBlock.style.backgroundColor = '#4a9027';
        balanceConclusion.style.backgroundColor = '#4a9027';
        estimatedTotalSpan.innerHTML = incomeTotal - paymentsTotal;
    }
    else {
        estimatedTotalBlock.style.backgroundColor = '#ff0011';
        balanceConclusion.style.backgroundColor = '#ff0011';
        estimatedTotalSpan.innerHTML = incomeTotal - paymentsTotal;
    }
}

//Adding pop-up help while mouse is over payments items elements
let paymentItemHover = document.querySelectorAll('.compulsory-payments-item');
paymentItemHover.forEach (function helpWindow(value, i) {
    value.addEventListener('mouseenter', function() {
        let helpHover = document.createElement('span');
        helpHover.className = 'help-hover';
        helpHover.innerText = 'Введите в поле справа предполагаемые траты по данному виду расходов.';
        paymentItemHover[i].appendChild(helpHover);

        //Removing help while mouse is out
        value.addEventListener('mouseleave', function() {
            //value.removeChild(helpHover);
            helpHover.style.display = 'none';
        })
    })
})
