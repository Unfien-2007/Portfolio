// This URL asks ReliefWeb for:
// 1. Reports from the Philippines
// 2. Sorted by date (newest first)
// 3. Limit to 10 results
// Use v2 API and support optional proxy (set PROXY = '' for none)
const PROXY = ""; // For testing you can try: "https://api.allorigins.win/raw?url/"
const RELIEFWEB_URL = "https://api.reliefweb.int/v2/reports?appname=portfolio-demo&profile=list&preset=latest&slim=1&query[value]=primary_country.name:%22Philippines%22";
const API_URL = PROXY ? (PROXY + encodeURIComponent(RELIEFWEB_URL)) : RELIEFWEB_URL;

async function fetchDisasterNews() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            const text = await response.text();
            throw new Error(`HTTP ${response.status} ${response.statusText}: ${text}`);
        }
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
                const title = report.fields.title || 'Untitled';
                const date = report.fields.date && report.fields.date.created ? new Date(report.fields.date.created).toLocaleDateString() : '';
                let link = '#';
                if (report.fields.url) {
                    if (Array.isArray(report.fields.url)) {
                        link = report.fields.url[0];
                    } else if (typeof report.fields.url === 'object' && report.fields.url.href) {
                        link = report.fields.url.href;
                    } else {
                        link = report.fields.url;
                    }
                }

                // Inject HTML
                card.innerHTML = `
                    <h3>${title}</h3>
                    <small>📅 ${date}</small>
                    <p>Source: ReliefWeb</p>
                    ${link && link !== '#' ? `<a href="${link}" target="_blank" class="read-more">Read Full Report →</a>` : '<span class="no-link">No link available</span>'}
                `; 

                container.appendChild(card);
            });
        }
    } catch (error) {
        console.error("Error fetching news:", error);
        const loading = document.getElementById('loading-text');
        if (loading) loading.innerText = `Failed to load news: ${error.message}`;
    }
}

// Run the function when the page loads
if (document.getElementById('news-container')) {
    fetchDisasterNews();
}