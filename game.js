// Oyun verilerini saklama ve yükleme
function saveGameState() {
    const gameState = {
        money,
        moneyPerClick,
        moneyPerSecond,
        bottleCount,
        machineCount,
        factoryCount
    };
    localStorage.setItem('lemonadeGame', JSON.stringify(gameState));
}

function loadGameState() {
    const savedState = localStorage.getItem('lemonadeGame');
    if (savedState) {
        const gameState = JSON.parse(savedState);
        Object.assign(this, gameState);
        updateMoney();
        updateBottleUI();
        updateMachineUI();
        updateFactoryUI();
    }
}

// Oyun değişkenleri
let money = 0;
let moneyPerClick = 1;
let moneyPerSecond = 0;
let bottleCount = 0;
let machineCount = 0;
let factoryCount = 0;

// Başlangıç maliyetleri
const initialCosts = {
    bottle: 100,
    machine: 1000,
    factory: 10000
};

// Otomatik gelir miktarları
const incomeRates = {
    bottle: 10,
    machine: 100,
    factory: 1000
};

// Para güncelleme fonksiyonu
function updateMoney() {
    document.getElementById('money').textContent = money.toFixed(0);
    saveGameState();
}

// Otomatik gelir kaynakları için maliyet hesaplama
function calculateCost(baseCost, count) {
    return Math.floor(baseCost * Math.pow(1.15, count));
}

// Tıklama fonksiyonu
function clickLemonade() {
    money += moneyPerClick;
    updateMoney();
}

// Otomatik gelir fonksiyonu
function updateIncome() {
    money += moneyPerSecond;
    updateMoney();
}

// Satın alma fonksiyonları
function buyBottle() {
    const cost = calculateCost(initialCosts.bottle, bottleCount);
    if (money >= cost) {
        money -= cost;
        bottleCount++;
        moneyPerSecond += incomeRates.bottle;
        updateMoney();
        updateBottleUI();
    }
}

function buyMachine() {
    const cost = calculateCost(initialCosts.machine, machineCount);
    if (money >= cost) {
        money -= cost;
        machineCount++;
        moneyPerSecond += incomeRates.machine;
        updateMoney();
        updateMachineUI();
    }
}

function buyFactory() {
    const cost = calculateCost(initialCosts.factory, factoryCount);
    if (money >= cost) {
        money -= cost;
        factoryCount++;
        moneyPerSecond += incomeRates.factory;
        updateMoney();
        updateFactoryUI();
    }
}

// UI güncelleme fonksiyonları
function updateBottleUI() {
    const cost = calculateCost(initialCosts.bottle, bottleCount);
    document.getElementById('bottleCost').textContent = cost;
    document.getElementById('bottleCount').textContent = bottleCount;
}

function updateMachineUI() {
    const cost = calculateCost(initialCosts.machine, machineCount);
    document.getElementById('machineCost').textContent = cost;
    document.getElementById('machineCount').textContent = machineCount;
}

function updateFactoryUI() {
    const cost = calculateCost(initialCosts.factory, factoryCount);
    document.getElementById('factoryCost').textContent = cost;
    document.getElementById('factoryCount').textContent = factoryCount;
}

// Oyun başlatma
function startGame() {
    // Oyun durumunu yükle
    loadGameState();
    
    // Tıklama olayı
    document.getElementById('lemonade').addEventListener('click', clickLemonade);
    
    // Otomatik gelir güncelleme
    setInterval(updateIncome, 1000);
    
    // Başlangıç değerlerini güncelle
    updateBottleUI();
    updateMachineUI();
    updateFactoryUI();
}

// Oyunu başlat
startGame();
