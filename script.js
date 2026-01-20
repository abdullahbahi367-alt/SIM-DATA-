window.jsPDF = window.jspdf.jsPDF;

const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const resultsContainer = document.getElementById("resultsContainer");
const resultsList = document.getElementById("resultsList");

searchBtn.addEventListener("click", async () => {
    const query = searchInput.value.trim();
    if (query.length < 10) {
        alert("Please enter a valid number or CNIC");
        return;
    }

    searchBtn.innerText = "Searching...";
    searchBtn.disabled = true;

    try {
        // Free API call for demonstration
        const response = await fetch(`https://api.nexoracle.com/details/pak-sim-database-free?apikey=free_key@maher_apis&q=${query}`);
        const data = await response.json();

        resultsList.innerHTML = "";
        if (data.result && typeof data.result === "object") {
            resultsContainer.classList.remove("hidden");
            const res = Array.isArray(data.result) ? data.result[0] : data.result;
            resultsList.innerHTML = `
                <div class="bg-dark-800 p-6 rounded-xl border border-blue-500">
                    <h3 class="text-xl font-bold text-blue-400 mb-4">Record Found</h3>
                    <p>Name: ${res.name || "N/A"}</p>
                    <p>CNIC: ${res.cnic || "N/A"}</p>
                    <p>Number: ${res.number || "N/A"}</p>
                    <p>Address: ${res.address || "N/A"}</p>
                </div>
            `;
        } else {
            alert("No record found.");
        }
    } catch (e) {
        alert("Error connecting to server.");
    } finally {
        searchBtn.innerText = "Search Database";
        searchBtn.disabled = false;
    }
});
