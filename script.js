

// Get Quotes fron API
let apiQuotes = [];

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const author = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


function loading ()  {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

const myTimeout = () => setTimeout(loading, 500);
function myStopTimeout() {
    clearTimeout(myTimeout);
}

function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
    }
function newQuote() {     
    loading();
    const index = Math.floor(Math.random() * apiQuotes.length);

    const quote =  apiQuotes[index]   
    author.textContent = quote.author.length === null ? quote.author : 'Unknown';
    if (quote.text.length > 50)  {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }   
    quoteText.textContent = quote.text;
     
    complete();

}


async function getQuotes() {
    loading();
    const api_url = 'https://type.fit/api/quotes';
    try {        
        const response = await fetch(api_url);
        apiQuotes = await response.json();       
        newQuote();
        
    } catch (error) {
        console.log(error);
    }
}


// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?=${quoteText.textContent} - ${author.textContent} `;
    window.open(twitterUrl, '_blank');
}

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// onLoad
getQuotes();