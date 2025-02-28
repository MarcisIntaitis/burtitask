const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

app.get('/api', async (req, res) => {
    try{
        const response = await axios.get('https://static.burti.lv/f/sample.json');
        res.json(response.data)
    } catch (error) {
        res.status(500).json({ error: 'error fetching data'})
    }
})

app.listen(5000, () => console.log('listening on port 5000'))