class Loot {
    constructor(name, rating, type, background, quantity) {
        this.name = name;
        this.rating = rating;
        this.type = type;
        this.background = background;
        this.quantity = quantity || 1; 
    }
}

function getLoot() {
    const loot = [
        new Loot("waxing gibbous", 0, "axe",'img/waxxingGib.png'),
        new Loot("windforce", 0, "bow",'img/windforce.png'),
        new Loot("asheara's khanjar", 0, "dagger",'img/asheeara.png'),
        new Loot("staff of endless rage", 0, "staff",'img/staffOfEmental.png'),
        new Loot("doombringer", 0, "sword", 'img/doombringer.png'),
        new Loot("hellhammer", 0, "mace", 'img/Hellhammer.png'),
        new Loot("stinger", 1, "dagger", 'img/stinger.png'),
        new Loot("staff of elemental command", 1, "staff",'img/staffOfEmental.png'),
        new Loot("infernal edge", 1, "sword", 'img/infernal.png'),
        new Loot("mace of blazing furor", 1, "mace", 'img/maceOfBalzing.png'),
        new Loot("butcher's cleaver", 2, "axe", 'img/butcher.png'),
        new Loot("skyhunter", 2, "bow", 'img/skyhunter.png'),
        new Loot("godfather", 2, "sword", 'img/godfahter.png'),
        new Loot("black river", 2, "mace", 'img/blackRiver.png'),
    ];
    return loot;
}


function startButtonClick(items) {
    const btns = document.querySelector('.btns');
    btns.addEventListener('click', (event) => {
        let lootItems = [];
        let saveItems = JSON.parse(localStorage.getItem("saveItems")) || [];

        let item = "";
        if (event.target.id === 'pullOne') {
            item = rollitem(items);
            lootItems.push(item);
            checkdblItems(item, saveItems);
        } else if (event.target.id === 'pullTen') {
            for (let i = 0; i < 10; i++) {
                item = rollitem(items);
                lootItems.push(item);
                checkdblItems(item, saveItems);
            }
        }
        localStorage.setItem("saveItems", JSON.stringify(saveItems));
        console.log(lootItems, 'loot');
        console.log(saveItems, 'save');
        createDiv(lootItems);
        displaySavedItems(); 
    })
}


function checkdblItems(item, saveItems) {
    let AlreadyExists = false;

    for (let i = 0; i < saveItems.length; i++) {
        const savedItem = saveItems[i];
        if (savedItem.name === item.name) {
            saveItems[i].quantity += 1; 
            AlreadyExists = true;
            break;
        }
    }

    if (!AlreadyExists) {
        saveItems.push(item);
    }
}


function getRandNum() {
    return Math.random();
}

function getRandIndex(items) {
    return Math.floor(Math.random() * items.length);
}


let pullsWithoutHighestRarity = 0;


function rollitem(items) {
    let itemList = [];
    const randomNum = getRandNum();
    console.log(randomNum, 'rdnNum');
    let randomInd = getRandIndex(items);
    console.log(randomInd, 'rdnIndex');
    let item = "";
    let highRateItem = false;


    if (randomNum < 0.01) {
        const itemList = items.filter(loot => loot.rating === 2);
        item = itemList[getRandIndex(itemList)];
    } else if (randomNum < 0.08) {
        const itemList = items.filter(loot => loot.rating === 1);
        item = itemList[getRandIndex(itemList)];
    } else {
        const itemList = items.filter(loot => loot.rating === 0);
        item = itemList[getRandIndex(itemList)];
    }

    itemList.forEach(element => {
        if (element.rating === 1) {
            highRateItem = true;
        }
    });

    if (highRateItem) {
        pullsWithoutHighestRarity = 0;
    } else {
        pullsWithoutHighestRarity++;
    }

    if (pullsWithoutHighestRarity >= 90) {
        itemList = items.filter(lo => lo.rating === 2);
        item = itemList[getRandIndex(itemList)];
        pullsWithoutHighestRarity = 0;
    }
    console.log(pullsWithoutHighestRarity, 'highcount');


    return item;
}

function createDiv(items) {
    const parent = document.getElementById('obtain');
    parent.innerHTML = ""

    items.forEach(element => {
        const div = document.createElement("div");
        parent.appendChild(div);
        div.style.backgroundImage = 'url(' + element.background + ')';
        div.style.backgroundSize = 'cover';
        div.style.borderRadius = '1em';
        div.classList.add('glow'); 
        div.style.backdropFilter = 'blur (10px);';
        const ue2 = document.createElement("h2");
        ue2.classList.add("item_h");
        ue2.innerText = element.name;
        div.appendChild(ue2);
        const type = document.createElement("p");
        type.classList.add('item_t');
        type.innerText = element.type;
        div.appendChild(type);
        const rating = document.createElement('p');
        rating.classList.add('item_r');
        if (element.rating === 0) {
            div.classList.add('c');
        } else if (element.rating === 1) {
            div.classList.add('r');
        } else {
            div.classList.add('l');
        }
        div.appendChild(rating);

    })



}


let clickCount = 0;


function count() {
    document.querySelector('#countDisplay').innerHTML = 'count : ' + 0;
    const btncount = document.querySelectorAll('.btns');
    btncount.forEach(button => {
        button.addEventListener('click', (event) => {
            if (event.target.id === 'pullOne') {
                clickCount++;

            } else if (event.target.id === 'pullTen') {
                clickCount = clickCount + 10;
            }

            console.log('Click count:', clickCount);
            document.querySelector('#countDisplay').innerHTML = 'count : ' + clickCount;


        });
    });



}

//function reset count und local storage 

function reset() {
    const reset = document.getElementById('resetBtn');
    reset.addEventListener('click', () => {
        console.log('reset');
        clickCount = 0;
        localStorage.clear();
        const parentObtain = document.getElementById('obtain');
        parentObtain.innerHTML = "";
        const parentSavedItems = document.getElementById('savedItems');
        parentSavedItems.innerHTML = "";

        document.querySelector('#countDisplay').innerHTML = 'count : ' + 0;
    })
}


function displaySavedItems() {
    const savedItems = JSON.parse(localStorage.getItem("saveItems")) || [];
    const parent = document.getElementById('savedItems');
    parent.innerHTML = "";

    savedItems.forEach(element => {
        const div = document.createElement("div");
        parent.appendChild(div);
        div.style.backgroundImage = 'url(' + element.background + ')';
        div.style.backgroundSize = 'cover';
        // div.style.filter = 'blur(1px)';

        const ue2 = document.createElement("h2");
        ue2.classList.add("item_name");
        ue2.innerText = element.name;
        div.appendChild(ue2);

        const type = document.createElement("p");
        type.classList.add('item_type');
        type.innerText = element.type;
        div.appendChild(type);

        const quantity = document.createElement('p');
        quantity.classList.add('item_quantity');
        quantity.innerText = 'Quantity: ' + element.quantity;
        div.appendChild(quantity);

        const rating = document.createElement('p');
        rating.classList.add('item_rare');
        if (element.rating === 0) {
            div.classList.add('common');
        } else if (element.rating === 1) {
            div.classList.add('rare');
        } else {
            div.classList.add('low');
        }
        div.appendChild(rating);
    });
}



function init() {
    const items = getLoot();
    displaySavedItems();
    startButtonClick(items);
    count();
    reset();
    

}

init();
