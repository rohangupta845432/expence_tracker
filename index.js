const exp_add_form = document.getElementById("exp_add_form");
const dis_ul = document.getElementById("dis");
let count = 0;
if(localStorage.getItem("count")){
    count = localStorage.getItem("count");
}else{
    localStorage.setItem("count", count);
}
displayData();
exp_add_form.addEventListener("submit", function(e){
    // alert("hh");
    
    e.preventDefault();
    count++;
    const amount  = document.getElementById("amount").value;
    const disc = document.getElementById("disc").value;
    const category = document.getElementById("category").value;
    const data = {
        "id" : count,
        "amount" : amount,
        "disc" : disc,
        "category" : category,
    }
    
    const str_data = JSON.stringify(data);
    localStorage.setItem(count , str_data);
    
    localStorage.setItem("count", count);
    displayData();
    exp_add_form.reset();
    console.log("success")

});

function displayData(){
    let count = localStorage.getItem("count");
    dis_ul.innerHTML = "";
    for(let i=1; i<=count; i++){
        if(localStorage.getItem(i)){
            let data = localStorage.getItem(i);
            data = JSON.parse(data);
            const li = document.createElement("li");
            const edit_btn = "<button onclick='edit(event)'>Edit</button>";
            const del_btn = '<button onclick="delete_item(event)">Delete</button>';
            li.innerHTML = data.amount+"-"+data.disc+"-"+data.category+"-"+edit_btn+"-"+del_btn;
            li.id = i;
            dis_ul.appendChild(li);
        }
    }
}
function edit(e){
    const li = e.target.parentElement;
    const id = li.id;
    let data = localStorage.getItem(id);
    console.log(data);
    data = JSON.parse(data);
    document.getElementById("amount").value = data.amount;
    document.getElementById("disc").value = data.disc;
    document.getElementById("category").value = data.category;
    localStorage.removeItem(data.id);
    displayData();
}

function delete_item(e){
    const pr_li = e.target.parentElement;
    const id = pr_li.id;
    localStorage.removeItem(id);
    pr_li.remove();
}
