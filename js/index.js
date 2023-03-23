let page = 1;
document.addEventListener("DOMContentLoaded", ()=>{
    const back = document.querySelector("#back");
    const forward = document.querySelector("#forward");

    loadMonsters(page);

    back.addEventListener("click", ()=>{
        page--;
        if(page < 1){
            page =1;
        }
        loadMonsters(page);
    });
    forward.addEventListener("click", ()=>{
        page++;
        loadMonsters(page);
    })

    const name = document.createElement("input");
    const age =document.createElement("input");
    const bio =document.createElement("input");
    const button = document.createElement("button");
    const form = document.createElement("form");
    const createMonster = document.getElementById("create-monster");
    name.type = "text";
    name.placeholder= "Name";
    age.type="text";
    age.placeholder= "Age";
    bio.type="text";
    bio.placeholder= "Bio/description";
    button.innerText="Create Monster";
    form.appendChild(name);
    form.appendChild(age);
    form.appendChild(bio);
    form.appendChild(button);
    createMonster.appendChild(form);

    button.addEventListener("click", (e)=>{
        e.preventDefault();
        createMonsters(name.value,age.value,bio.value);
    })


})

function loadMonsters(page){
    const body = document.getElementById("monster-container");
    body.innerHTML="";
    fetch(`http://localhost:3000/monsters/?_limit=50&${page}`)
    .then(res => res.json())
    .then(monsters =>{
        monsters.forEach(monster =>{
            const monsterDiv = document.createElement("div");
            const monsterName = document.createElement("h2");
            const monsterAge = document.createElement("h4");
            const monsterBio = document.createElement("p");
            monsterName.innerText=monster.name;
            monsterAge.innerText=monster.age;
            monsterBio.innerText=monster.description;
            monsterDiv.appendChild(monsterName);
            monsterDiv.appendChild(monsterAge);
            monsterDiv.appendChild(monsterBio);
            body.appendChild(monsterDiv);
        })
    }).catch(err => console.log(err.message));
}

function createMonsters(name, age, bio){
    fetch(`http://localhost:3000/monsters/`, {
        method:"POST",
        headers: {
            "Content-Type":"application/json",
            accept: "application/json"
        }, body: JSON.stringify({
            "name" : name,
            "age": age,
            "description": bio
        })
    })
    .then(res => res.json())
    .then(monsters =>console.log(monsters))
    .catch(err => console.log(err.message));
}