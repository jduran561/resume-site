// Visitor Counter Integration
const FUNCTION_URL = 'https://resume-visitor-counter2-btdyc8dxhncnd2cz.westus2-01.azurewebsites.net/api/GetVisitorCount';

async function updateVisitorCount() {
    try {
        const response = await fetch(FUNCTION_URL);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        document.getElementById('visitorCount').textContent = data.count;
    } catch (error) {
        console.error('Error fetching visitor count:', error);
        document.getElementById('visitorCount').textContent = 'offline';
    }
}

// Call on page load
document.addEventListener('DOMContentLoaded', updateVisitorCount);
