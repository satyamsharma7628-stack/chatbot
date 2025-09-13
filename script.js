let storeData = [];

Papa.parse("stores_data.csv", {
    download: true,
    header: true,
    complete: function(results) {
        storeData = results.data;
    }
});

function sendMessage() {
    const input = document.getElementById("userInput").value.toLowerCase();
    const chat = document.getElementById("chat");

    let reply = "I couldn't find anything for that.";

    // Simple search by category
    const matches = storeData.filter(store => 
        store.Category && store.Category.toLowerCase().includes(input)
    );

    if (matches.length > 0) {
        reply = "Here are some stores:\n" + matches.map(s => 
            `${s.StoreName} (${s.ShopType}) - Brand: ${s.ProductBrand}, Distance Rank: ${s.DistanceRank}`
        ).join("\n");
    }

    chat.innerHTML += `<p><b>You:</b> ${input}</p>`;
    chat.innerHTML += `<p><b>Bot:</b> ${reply.replace(/\n/g, "<br>")}</p>`;
    document.getElementById("userInput").value = "";
}
