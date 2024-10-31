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

app.get('/queryDB', async (req, res) => {
    console.log("test");
    const { data, error } = await supabase
        .from('default')
        .select('*')
    
    console.log(data);
    if (error) {
        console.error('Error querying DB', error);
        return res.status(500).json({error: 'Failed to query'});
    }
    else {    
        res.status(200).json(data)
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})


