//.........................SPA.................................................
document.getElementById("homeContent").style.display = 'block';
document.getElementById("customerContent").style.display = 'none';
document.getElementById("itemContent").style.display = 'none';
document.getElementById("orderContent").style.display = 'none';

document.getElementById("home").addEventListener("click", function () {
    document.getElementById("homeContent").style.display = 'block';
    document.getElementById("customerContent").style.display = 'none';
    document.getElementById("itemContent").style.display = 'none';
    document.getElementById("orderContent").style.display = 'none';
})
document.getElementById("customer").addEventListener("click", function () {
    document.getElementById("homeContent").style.display = 'none';
    document.getElementById("customerContent").style.display = 'block';
    document.getElementById("itemContent").style.display = 'none';
    document.getElementById("orderContent").style.display = 'none';
})
document.getElementById("items").addEventListener("click", function () {
    document.getElementById("homeContent").style.display = 'none';
    document.getElementById("customerContent").style.display = 'none';
    document.getElementById("itemContent").style.display = 'block';
    document.getElementById("orderContent").style.display = 'none';
})
document.getElementById("orders").addEventListener("click", function () {
    document.getElementById("homeContent").style.display = 'none';
    document.getElementById("customerContent").style.display = 'none';
    document.getElementById("itemContent").style.display = 'none';
    document.getElementById("orderContent").style.display = 'block';
})
