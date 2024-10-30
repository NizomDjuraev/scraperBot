import express from 'express'
import { supabase } from './config.js';

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('./src/public'));

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: 'public'});
});

app.get('/message', (req, res) => {
    res.send("message");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})


