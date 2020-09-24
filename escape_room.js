const readline = require("readline");
const rlInterface = readline.createInterface(process.stdin, process.stdout);

// utility functions
function ask(questionText) {
  return new Promise((resolve, reject) => {
    rlInterface.question(questionText, resolve);
  });
}

function sanitizeInput(input) {
  return input.toLowerCase().trim()
}

function checkTarget(action, target) {
  let availableTargets = ["desk", "rug", "clock", "small key", "smallkey", "large key", "largekey"]
  if (action === "leave") {
    return [action, target]
  }
  if (availableTargets.includes(target)) {
    if (target === "desk" || target === "rug" || target === "clock") {
      return [action, target]
    } else if (target.includes("small")) {
      return [action, "smallKey"]
    } else if (target.includes("large")) {
      return [action, "largeKey"]
    }
  } else {
    return ["action", "target"]
  }
}

let inventory = [];

class Item {
  constructor(name, desc, takeable, action) {
    this.name = name;
    this.desc = desc;
    this.takeable = takeable;
    this.action = action;
  }

  take() {
    if (this.takeable) {
      inventory.push(this.name);
      return `You picked up ${this.name}`;
    } else {
      return "You can't take this!";
    }
  }

  use() {
    if (this.name === "desk" && inventory.includes("smallKey")) {
      return "You open the drawer, there was a bigger key inside!";
    } else {
      return this.action;
    }
  }
}

let desk = new Item(
  "desk",
  "A small desk, it has a drawer, but it is locked",
  false,
  "The desk is locked"
);
let rug = new Item(
  "rug",
  "A dusty rug on the floor",
  false,
  "You lift up the rug, there is a small key underneath!"
);
let clock = new Item(
  "clock",
  "The clock keeps ticking, reminding you of how long you've been stuck here",
  false,
  "The clock looks nice, but it doesn't do anything"
);
let smallKey = new Item(
  "smallKey",
  "A small key",
  true,
  "This looks like it might fit in the desk"
);
let largeKey = new Item(
  "largeKey",
  "A large key",
  true,
  "This key looks like it fits in the door!"
);

let lookupTable = {
  desk: desk,
  rug: rug,
  clock: clock,
  smallKey: smallKey,
  largeKey: largeKey
}

async function play() {
  let userAction = await ask("What would you like to do?\n")
  userAction = sanitizeInput(userAction);
  let inputArray = userAction.split(' ')
  let action = inputArray[0]
  let target = inputArray.splice(1).join(" ")
  let correctedTarget = checkTarget(action, target)
  action = correctedTarget[0]
  target = correctedTarget[1]

  if (action === "use") {
    console.log(lookupTable[target].use())
    return play()
  } else if (action === "examine") {
    console.log(lookupTable[target].desc)
    return play()
  } else if (action === "take") {
    console.log(lookupTable[target].take())
    return play()
  } else if (action === "leave") {
    if (inventory.includes("largeKey")) {
      console.log("Congrats! You got out!");
      process.exit()
    } else {
      console.log("The door is locked! Find the key!");
      return play()
    }
  } else {
    console.log("Sorry, I don't understand...")
    return play()
  }
}

console.log("Welcome to the escape room, there is a rug on the floor, a desk in the corner, and an antique grandfather clock next to the exit door");
console.log(desk);
play();
