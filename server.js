const express = require('express');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve frontend
app.use(express.static(__dirname));

// Prediction endpoint
app.get('/api/predict', (req, res) => {
    const messages = [
        "Today's Safe Bet: Under 2.5 Goals",
        "Strong Signal: Home Win 65%",
        "AI Pick: BTTS NO High Confidence",
        "Risky Market – Avoid Over 2.5"
    ];

    const msg = messages[Math.floor(Math.random() * messages.length)];

    // Save to file
    fs.writeFileSync(path.join(__dirname, 'prediction.txt'), msg);

    // Optional: OneSignal push
    // sendPush(msg);

    res.send({ prediction: msg });
});

// Optional: OneSignal push function
async function sendPush(msg) {
    try {
        await axios.post(
            'https://onesignal.com/api/v1/notifications',
            {
                app_id: 'YOUR_ONESIGNAL_APP_ID',
                included_segments: ['All'],
                contents: { en: msg }
            },
            {
                headers: {
                    'Authorization': 'Basic YOUR_REST_API_KEY',
                    'Content-Type': 'application/json'
                }
            }
        );
    } catch (err) {
        console.error('OneSignal Error:', err.message);
    }
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
