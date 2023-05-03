let Billing_Amount = document.getElementById('Billing_Amount');
let User_Cash = document.getElementById('User_Cash');

document.getElementById('billing_form').addEventListener('submit', (e) => {
    e.preventDefault();

    let bill = Number(Billing_Amount.value);
    let useramount = Number(User_Cash.value);

    let Returning_amount = 0;

    if (bill < 0) {
        alert('Bill Amount Should Be greater than 0.')
    } else if (useramount < 0) {
        alert('User Amount Should Be greater than 0.')
    } else if (bill < useramount) {
        Returning_amount = useramount - bill

        //call calculate notes function 
        Calculate_cash(Returning_amount);

    } else if ((bill < 0) || (useramount < 0)) {
        alert("Amount Should Be Greater Than 0")
    } else if (bill > useramount) {
        alert(`user Has Given Less Amount ask for ${bill - useramount} Rs`)
    }
})









//calculate cash here 
let Calculate_cash = (amount) => {

    //notes
    let note = [2000, 500, 200, 100, 50, 20, 10, 5, 2, 1];

    //object to store counts
    let obj = {
        "2000": 0,
        "500": 0,
        "200": 0,
        "100": 0,
        "50": 0,
        "20": 0,
        "10": 0,
        "5": 0,
        "2": 0,
        "1": 0,
    }


    for (let i = 0; i < note.length; i++) {

        obj[note[i]] = Math.floor(amount / note[i]);

        amount = amount % note[i];
    }


    let reversed_keys = Object.keys(obj).reverse();

    //call set Note count On web
    setNotes(obj);
}







//show result and returning amount to customer
let setNotes = async(obj) => {

    document.getElementById('modal').style.display = 'flex';

    let content = `
    <div class="content" id="content">
    <h1 id="return_cash">Return ${User_Cash.value - Billing_Amount.value} Rs To Customer</h1>
    <table class="table">
        <tr>
            <th>Note</th>
            <th>Count</th>
            <th>Total</th>
        </tr>

        ${obj[2000] > 0 ? `
        <tr style="background : black; color : white;">
        <td>2000</td>
        <td>${obj[2000]}</td>
        <td>${obj[2000] * 2000}</td>
       </tr>` :
            `<tr>
       <td>2000</td>
       <td>${obj[2000]}</td>
       <td>${obj[2000] * 2000}</td>
   </tr>`}

        

   ${obj[500] > 0 ? `
        <tr style="background : black; color : white;">
        <td>500</td>
        <td>${obj[500]}</td>
        <td>${obj[500] * 500}</td>
       </tr>` :
            `<tr>
       <td>500</td>
       <td>${obj[500]}</td>
       <td>${obj[500] * 500}</td>
   </tr>`}



   ${obj[200] > 0 ? `
        <tr style="background : black; color : white;">
        <td>200</td>
        <td>${obj[200]}</td>
        <td>${obj[200] * 200}</td>
       </tr>` :
            `<tr>
       <td>200</td>
       <td>${obj[200]}</td>
       <td>${obj[200] * 200}</td>
   </tr>`}




   ${obj[100] > 0 ? `
        <tr style="background : black; color : white;">
        <td>100</td>
        <td>${obj[100]}</td>
        <td>${obj[100] * 100}</td>
       </tr>` :
            `<tr>
       <td>100</td>
       <td>${obj[100]}</td>
       <td>${obj[100] * 100}</td>
   </tr>`}





   ${obj[50] > 0 ? `
        <tr style="background : black; color : white;">
        <td>50</td>
        <td>${obj[50]}</td>
        <td>${obj[50] * 50}</td>
       </tr>` :
            `<tr>
       <td>50</td>
       <td>${obj[50]}</td>
       <td>${obj[50] * 50}</td>
   </tr>`}




   ${obj[20] > 0 ? `
        <tr style="background : black; color : white;">
        <td>20</td>
        <td>${obj[20]}</td>
        <td>${obj[20] * 20}</td>
       </tr>` :
            `<tr>
       <td>20</td>
       <td>${obj[20]}</td>
       <td>${obj[20] * 20}</td>
   </tr>`}





   ${obj[10] > 0 ? `
        <tr style="background : black; color : white;">
        <td>10</td>
        <td>${obj[10]}</td>
        <td>${obj[10] * 10}</td>
       </tr>` :
            `<tr>
       <td>10</td>
       <td>${obj[10]}</td>
       <td>${obj[10] * 10}</td>
   </tr>`}




   ${obj[5] > 0 ? `
        <tr style="background : black; color : white;">
        <td>5</td>
        <td>${obj[5]}</td>
        <td>${obj[5] * 5}</td>
       </tr>` :
            `<tr>
       <td>5</td>
       <td>${obj[5]}</td>
       <td>${obj[5] * 5}</td>
   </tr>`}




   ${obj[2] > 0 ? `
        <tr style="background : black; color : white;">
        <td>2</td>
        <td>${obj[2]}</td>
        <td>${obj[2] * 2}</td>
       </tr>` :
            `<tr>
       <td>2</td>
       <td>${obj[2]}</td>
       <td>${obj[2] * 2}</td>
   </tr>`}


   
   ${obj[1] > 0 ? `
        <tr style="background : black; color : white;">
        <td>1</td>
        <td>${obj[1]}</td>
        <td>${obj[1] * 1}</td>
       </tr>` :
            `<tr>
       <td>1</td>
       <td>${obj[1]}</td>
       <td>${obj[1] * 1}</td>
   </tr>`}


   <tr style="background : black; color : white;">
        <td>Total Returning Amount</td>
        <td>--</td>
        <td>${User_Cash.value - Billing_Amount.value}</td>
    </tr>

    <tr style="background : black; color : white;">
    <td colspan="3" style="text-align:center;">${await convertToWord(User_Cash.value-Billing_Amount.value)}</td>
</tr>


    </table>

</div>
    `



    document.getElementById('modal').innerHTML = content;
}







//convert number to word
let convertToWord  = async(amount) => {
    let response = await fetch(`https://api.funtranslations.com/translate/numbers.json?text=${amount}`)
    let data = await response.json();
    return data.contents.translated;
}