var table = null, tableBody = null, products = null, scipt = null;
window.onload = function () {
    table = document.getElementById('orderTable');
    tableBody = table.tBodies[0];
    products = document.getElementById('products');
    scipt = document.getElementById('scipt');
};
function addToCard() {
    var kolvo = parseFloat(document.getElementById('kolvo').value);
    if (isNaN(kolvo)) {
        kolvo = 1
    }

    var usd = parseFloat(document.getElementById('kurs').value);
    
    var selectedProduct = products.options[products.selectedIndex].text;
    for (var i = 0; i < tableBody.rows.length; i++) {
        var row = tableBody.rows[i];
        if (row.cells[1].innerText == selectedProduct) {
            row.cells[3].innerText = (parseFloat(row.cells[3].innerText) + kolvo).toFixed(2);
            row.cells[4].innerText = (parseFloat(row.cells[4].innerText) + products.value * kolvo).toFixed(2);
            row.cells[5].innerText = (parseFloat(row.cells[5].innerText) + (products.value * kolvo * usd)).toFixed(2);

            
            calculate();
            return;
        }
    }
    var newRow = tableBody.insertRow(-1);
    newRow.insertCell(-1).innerHTML = '<input type="checkbox">';
    var productCell = newRow.insertCell(-1);
    productCell.setAttribute('class', 'left-align');
    productCell.innerText = selectedProduct;
    newRow.insertCell(-1).innerText = products.value;
    newRow.insertCell(-1).innerText = kolvo.toString();
    newRow.insertCell(-1).innerText = (products.value * kolvo).toFixed(2).toString();
    newRow.insertCell(-1).innerText = (products.value * kolvo * usd).toFixed(2).toString();

    
    newRow.insertCell(-1).innerHTML = '<button onclick="removeProduct(this)">Удалить</button>';
    calculate();
}

function removeProduct(element) {
    table.deleteRow(element.parentNode.parentNode.rowIndex);
    calculate();
}
function removeSelected() {
    var inputs = tableBody.getElementsByTagName('input');

    var i = 0;
    while (i < inputs.length) {
        var input = inputs[i];
        if (input.type == 'checkbox' && input.checked) {
            removeProduct(input);
        } else {
            i++;
        }
    }
    table.tHead.rows[0].cells[0].querySelector('input[type="checkbox"]').checked= false;
}
function toggleAll(checkbox) {
    var toggle = checkbox.checked;
    for (var i = 0; i < tableBody.rows.length; i++) {
        tableBody.rows[i].cells[0].querySelector('input[type="checkbox"]').checked = toggle;
    }
}
function calculate() {
    var tFoot = table.tFoot.rows[0];
    if (tableBody.rows.length == 0) {
        tFoot.cells[1].innerText = 0;
        tFoot.cells[2].innerText = '';
        return;
    }
    var amount = 0, kolvo = 0, usdammount = 0;
    for (var i = 0, n = tableBody.rows.length; i < n; i++) {
        kolvo += parseFloat(tableBody.rows[i].cells[3].innerText);
        amount += parseFloat(tableBody.rows[i].cells[4].innerText);
        usdammount  += parseFloat(tableBody.rows[i].cells[5].innerText);
    }
    tFoot.cells[1].innerText = kolvo.toFixed(2);
    
    if (amount>100) {
        Bonus.removeAttribute("disabled");
        tFoot.cells[2].innerText = amount.toFixed(2);
        tFoot.cells[3].innerText = usdammount.toFixed(2);
    } else {
        Bonus.setAttribute("disabled", "true");
        tFoot.cells[2].innerText = amount.toFixed(2);
        tFoot.cells[3].innerText = usdammount.toFixed(2);
      
    }
}

function addBonus(){
    var tFoot = table.tFoot.rows[0];
    if (tableBody.rows.length == 0) {
        tFoot.cells[1].innerText = 0;
        tFoot.cells[2].innerText = '';
        return;
    }
    var amount = 0, kolvo = 0, usdammount = 0;
    for (var i = 0, n = tableBody.rows.length; i < n; i++) {
        kolvo += parseFloat(tableBody.rows[i].cells[3].innerText);
        amount += parseFloat(tableBody.rows[i].cells[4].innerText);
        usdammount  += parseFloat(tableBody.rows[i].cells[5].innerText);
    }
    tFoot.cells[1].innerText = kolvo.toFixed(2);

    tFoot.cells[2].innerText = amount.toFixed(2) + ' - ' + 5 + '% = ' + (amount - (amount * 5 / 100));
    tFoot.cells[3].innerText = usdammount.toFixed(2) + ' - ' + 5 + '% = ' + (usdammount - (usdammount * 5 / 100));

}
