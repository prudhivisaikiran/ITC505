const storyNodes = {
    start: {
        text: "You stand at a crossroads in a mysterious forest. To your left, you see a dark cave. To your right, a glowing path leads deeper into the woods. Ahead, a narrow river flows with a shimmering light. What do you do?",
        choices: [
            { text: "Enter the cave", nextNode: "cave" },
            { text: "Follow the glowing path", nextNode: "glowingPath" },
            { text: "Cross the river", nextNode: "river" }
        ],
        image: "images/crossroads.jpg"
    },
    cave: {
        text: "You cautiously step into the dark cave. After a while, you hear a growl. Do you stay to investigate or run?",
        choices: [
            { text: "Stay and investigate", nextNode: "dragonFight" },
            { text: "Run back outside", nextNode: "runOutside" }
        ],
        image: "images/cave.jpg"
    },
    glowingPath: {
        text: "You follow the glowing path and encounter a wise old man. He offers you a choice: a magic potion, a mysterious key, or to enter a hidden garden. What do you take?",
        choices: [
            { text: "Take the potion", nextNode: "potion" },
            { text: "Take the key", nextNode: "key" },
            { text: "Enter the hidden garden", nextNode: "hiddenGarden" }
        ],
        image: "images/glowing-path.jpg"
    },
    river: {
        text: "As you cross the river, you see a boat with a ferryman. He offers to take you across to an island with hidden treasures. Do you accept?",
        choices: [
            { text: "Accept the offer", nextNode: "islandTreasure" },
            { text: "Decline and swim across", nextNode: "swimFail" }
        ],
        image: "images/river.jpg"
    },
    dragonFight: {
        text: "A fierce dragon appears! You draw your sword. Do you fight bravely or try to escape?",
        choices: [
            { text: "Fight the dragon", nextNode: "fightVictory" },
            { text: "Escape the cave", nextNode: "escapeFail" }
        ],
        image: "images/dragon.jpg"
    },
    runOutside: {
        text: "You run outside, but trip on a rock. You fall and lose consciousness. Game Over.",
        choices: [],
        image: "images/fall.jpg"
    },
    potion: {
        text: "The potion grants you super strength! You continue your adventure as a hero. The end.",
        choices: [],
        image: "images/potion.jpg"
    },
    key: {
        text: "The key unlocks a hidden treasure chest. You are rich beyond your wildest dreams! The end.",
        choices: [],
        image: "images/treasure.jpg"
    },
    fightVictory: {
        text: "You bravely slay the dragon and become a legend in the kingdom! The end.",
        choices: [],
        image: "images/victory.jpg"
    },
    escapeFail: {
        text: "As you try to escape, the dragon catches you and burns you to ashes. Game Over.",
        choices: [],
        image: "images/defeat.jpg"
    },
    islandTreasure: {
        text: "The ferryman takes you to an island where you find ancient treasures and magical artifacts. You live as a legend! The end.",
        choices: [],
        image: "images/island-treasure.jpg"
    },
    swimFail: {
        text: "You try to swim across, but the river pulls you under. You’re swept away. Game Over.",
        choices: [],
        image: "images/drown.jpg"
    },
    hiddenGarden: {
        text: "You stumble upon a hidden garden filled with mystical flowers. As you step inside, the flowers bloom, and a sense of peace fills you. You decide to stay in this serene place, living a peaceful life surrounded by nature. The end.",
        choices: [],
        image: "images/hidden-garden.jpg"
    }
};

let currentStoryNode = storyNodes.start;

function startGame() {
    currentStoryNode = storyNodes.start;
    updatePage();
}

function updatePage() {
    // Update story text
    document.getElementById("story-text").textContent = currentStoryNode.text;

    // Update story image
    const storyImage = document.getElementById("story-image");
    if (currentStoryNode.image) {
        storyImage.src = currentStoryNode.image;
        storyImage.style.display = "block";
    } else {
        storyImage.style.display = "none";
    }

    // Update choices
    const choicesContainer = document.getElementById("choices-container");
    choicesContainer.innerHTML = ""; // Clear previous choices

    if (currentStoryNode.choices.length === 0) {
        // End game scenario, no choices available
        const restartButton = document.createElement("button");
        restartButton.textContent = "Restart Game";
        restartButton.addEventListener("click", startGame);
        choicesContainer.appendChild(restartButton);
    } else {
        // Create buttons for each choice
        currentStoryNode.choices.forEach(choice => {
            const choiceButton = document.createElement("button");
            choiceButton.textContent = choice.text;
            choiceButton.addEventListener("click", () => {
                currentStoryNode = storyNodes[choice.nextNode];
                updatePage();
            });
            choicesContainer.appendChild(choiceButton);
        });
    }
}

window.onload = startGame;
