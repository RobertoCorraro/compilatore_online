const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Endpoint to get template files
app.get('/api/templates', (req, res) => {
    const templatesDir = path.join(__dirname, 'templates');

    fs.readdir(templatesDir, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to list templates.' });
        }

        const templates = files.filter(file => file.endsWith('.html')); // or any other template extensions
        res.json(templates);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});