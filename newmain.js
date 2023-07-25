class Loot {
    constructor(name, rating, type) {
        this.name = name;
        this.rating = rating;
        this.type = type;
    }
}

function getLoot() {
    const loot = [
        new Loot("waxing gibbous", 0, "axe"),
        new Loot("windforce", 0, "bow"),
        new Loot("asheara's khanjar", 0, "dagger"),
        new Loot("staff of endless rage", 0, "staff"),
        new Loot("doombringer", 0, "sword"),
        new Loot("hellhammer", 0, "mace"),
        new Loot("stinger", 1, "dagger"),
        new Loot("staff of elemental command", 1, "staff"),
        new Loot("infernal edge", 1, "sword"),
        new Loot("mace of blazing furor", 1, "mace"),
        new Loot("butcher's cleaver", 2, "axe"),
        new Loot("skyhunter", 2, "bow"),
        new Loot("godfather", 2, "sword"),
        new Loot("black river", 2, "mace")
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
        console.log(saveItems,'save');
        createDiv(lootItems);

    })
}

function checkdblItems(item, saveItems) {
    let AlreadyExists = false;

    for (let i = 0; i < saveItems.length; i++) {
        const savedItem = saveItems[i];
        if (savedItem.name === item.name) {
            saveItems[i] = item;
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
    let num = Math.floor(Math.random() * items.length);
    return num;
}

let pullsWithoutHighestRarity = 0; 


function rollitem(items) {
    let itemList = [];
    const randomNum = getRandNum();
    console.log(randomNum,'rdnNum');
    let randomInd = getRandIndex(items);
    console.log(randomInd,'rdnIndex');
    let item = "";
    let highRateItem = false;


    if (randomNum < 0.01) {
        itemList = items.filter(loot => loot.rating === 2);
        console.log(itemList,'higlist');
        item = items[randomInd];
    } else if (randomNum < 0.08) {
        itemList = items.filter(loot => loot.rating === 1);
        console.log(itemList,'midlist');
        item = items[randomInd];
    } else {
        itemList = items.filter(loot => loot.rating === 0);
        console.log(itemList,'lowlist');

        item = items[randomInd];
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
    console.log(pullsWithoutHighestRarity,'highcount');


    return item;
}

function createDiv(items) {
    const parent = document.getElementById('obtain');
    parent.innerHTML = ""

    items.forEach(element => {
        const div = document.createElement("div");
        parent.appendChild(div);
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
        const parent = document.getElementById('obtain');
        parent.innerHTML = ""

        document.querySelector('#countDisplay').innerHTML = 'count : ' + 0;;
    })

}




function init() {
    const items = getLoot();
    startButtonClick(items);
    count();
    reset();

}

init();
