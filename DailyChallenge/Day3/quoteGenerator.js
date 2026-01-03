// script.js

// 1. Create the database of quotes
const quotes = [
    "Love is not finding someone to live with. It's finding someone you can't live without.",
    "You are my sun, my moon, and all my stars.",
    "I love you more than pizza. And I really love pizza.",
    "Every love story is beautiful, but ours is my favorite.",
    "You stole my heart, but I'll let you keep it.",
    "Life is the flower for which love is the honey.",
    "To the world you may be one person, but to one person you are the world."
];

// 2. Select the HTML elements we need to control
const quoteText = document.getElementById("quote-display");
const btn = document.getElementById("generate-btn");

// 3. Define the function to generate a quote
function generateQuote() {
    // Get a random number between 0 and the length of the array
    const randomIndex = Math.floor(Math.random() * quotes.length);
    
    // Update the HTML text with the new quote
    quoteText.textContent = `"${quotes[randomIndex]}"`;
}

// 4. Add the event listener (click action)
btn.addEventListener("click", generateQuote);