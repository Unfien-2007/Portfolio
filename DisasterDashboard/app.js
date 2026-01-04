// This URL asks ReliefWeb for:
// 1. Reports from the Philippines
// 2. Sorted by date (newest first)
// 3. Limit to 10 results
const API_URL = "https://api.reliefweb.int/v1/reports?appname=rwint-user-0&profile=list&preset=latest&slim=1&query[value]=primary_country.name:%22Philippines%22";

async function fetchDisasterNews() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        const container = document.getElementById('news-container');
        const loadingText = document.getElementById('loading-text');

        // Hide loading text
        if(loadingText) loadingText.style.display = 'none';

        // Check if we have data
        if (data && data.data) {
            data.data.forEach(report => {
                // Create a card for each news item
                const card = document.createElement('div');
                card.classList.add('news-card');

                // Format the title and date
                const title = report.fields.title;
                const date = new Date(report.fields.date.created).toLocaleDateString();
                const link = report.fields.url;
                
                // Inject HTML
                card.innerHTML = `
                    <h3>${title}</h3>
                    <small>📅 ${date}</small>
                    <p>Source: ReliefWeb</p>
                    <a href="${link}" target="_blank" class="read-more">Read Full Report →</a>
                `;

                container.appendChild(card);
            });
        }
    } catch (error) {
        console.error("Error fetching news:", error);
        document.getElementById('loading-text').innerText = "Failed to load news. Please try again later.";
    }
}

// Run the function when the page loads
if (document.getElementById('news-container')) {
    fetchDisasterNews();
}