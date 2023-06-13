const apiEndPoint = "https://api.npoint.io/4557f96de63f54bb0175";
const display = document.querySelector("#display-data");
const input = document.querySelector("#input");

const getData = async () => {
    const res = await fetch(apiEndPoint);
    const data = await res.json();
    return data;
}

const displayQuotes = async () => {
    let q = input.value;

    const payload = await getData();
    
    let dataDisplay = payload.filter((eventData) => {
        if (q === "") {return eventData}
        else if (eventData.quote.toLowerCase().includes(q.toLowerCase())) {return eventData}
    }).map((object) => {
        const {quote, author} = object;

        return `
        <div class="container">
            <p>Quote: ${quote}</p>
            <p>Auther: ${author}</p>
        </div>
        <hr>
        `
    }).join("");

    display.innerHTML = dataDisplay;
}
displayQuotes();

input.addEventListener("input", () => {
    displayQuotes();
});