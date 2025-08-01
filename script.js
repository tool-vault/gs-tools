document.getElementById('processBtn').addEventListener('click', () => {
    const urlInput = document.getElementById('urlInput').value.trim();
    const urls = urlInput.split('\n').filter(url => url.trim() !== '');
    const resultContainer = document.getElementById('resultContainer');
    resultContainer.innerHTML = ''; // Clear previous results

    if (urls.length === 0) {
        resultContainer.innerHTML = '<p style="color: #e74c3c; text-align: center;">Please enter at least one URL.</p>';
        return;
    }

    const cleanedUrls = urls.map(url => url.split('?')[0]);

    // Handle single URL: auto-copy and show result with a copy button
    if (cleanedUrls.length === 1) {
        const cleanedUrl = cleanedUrls[0];
        navigator.clipboard.writeText(cleanedUrl).then(() => {
            const feedback = document.createElement('p');
            feedback.textContent = 'Cleaned URL auto-copied to clipboard!';
            feedback.style.color = '#2ecc71';
            feedback.style.textAlign = 'center';
            resultContainer.appendChild(feedback);
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
        displayResultItem(cleanedUrl); // Always display the result item
    } else {
        // Handle multiple URLs: Add "Copy All" button and then the list
        addCopyAllButton(cleanedUrls);
        cleanedUrls.forEach(url => displayResultItem(url));
    }
});

/**
 * Creates and displays a single result item with a URL and a copy button.
 * @param {string} url - The cleaned URL to display.
 */
function displayResultItem(url) {
    const resultContainer = document.getElementById('resultContainer');
    const item = document.createElement('div');
    item.className = 'result-item';

    const urlSpan = document.createElement('span');
    urlSpan.className = 'url';
    urlSpan.textContent = url;
    item.appendChild(urlSpan);

    const copyBtn = document.createElement('button');
    copyBtn.textContent = 'Copy';
    copyBtn.className = 'copy-btn';
    copyBtn.onclick = () => {
        navigator.clipboard.writeText(url).then(() => {
            copyBtn.textContent = 'Copied!';
            setTimeout(() => { copyBtn.textContent = 'Copy'; }, 2000);
        });
    };
    item.appendChild(copyBtn);
    
    resultContainer.appendChild(item);
}

/**
 * Creates and adds a "Copy All" button to the result container.
 * @param {string[]} urlArray - The array of cleaned URLs to copy.
 */
function addCopyAllButton(urlArray) {
    const resultContainer = document.getElementById('resultContainer');
    const copyAllBtn = document.createElement('button');
    copyAllBtn.textContent = 'Copy All for Google Sheets';
    copyAllBtn.id = 'copyAllBtn';
    copyAllBtn.onclick = () => {
        // Join with a newline character for easy pasting into spreadsheet columns
        const textToCopy = urlArray.join('\n');
        navigator.clipboard.writeText(textToCopy).then(() => {
            copyAllBtn.textContent = 'Copied All!';
            setTimeout(() => { copyAllBtn.textContent = 'Copy All for Google Sheets'; }, 2000);
        });
    };
    resultContainer.appendChild(copyAllBtn);
}
