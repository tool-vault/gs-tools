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

    // Handle single URL: auto-copy to clipboard
    if (cleanedUrls.length === 1) {
        const cleanedUrl = cleanedUrls[0];
        navigator.clipboard.writeText(cleanedUrl).then(() => {
            resultContainer.innerHTML = `<p style="color: #2ecc71; text-align: center;">Cleaned URL copied to clipboard!</p>`;
            displayResult(cleanedUrl);
        }).catch(err => {
            console.error('Failed to copy: ', err);
            resultContainer.innerHTML = `<p style="color: #e74c3c; text-align: center;">Failed to copy URL.</p>`;
            displayResult(cleanedUrl);
        });
    } else {
        // Handle multiple URLs: display list with copy buttons
        cleanedUrls.forEach(url => displayResult(url, true));
    }
});

function displayResult(url, showButton = false) {
    const resultContainer = document.getElementById('resultContainer');
    const item = document.createElement('div');
    item.className = 'result-item';

    const urlSpan = document.createElement('span');
    urlSpan.className = 'url';
    urlSpan.textContent = url;
    item.appendChild(urlSpan);

    if (showButton) {
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
    }
    
    resultContainer.appendChild(item);
}
