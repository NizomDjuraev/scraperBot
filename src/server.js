import express from 'express'
import { config as configDotenv } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

configDotenv();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);


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
        .from('table1')
        .select()
    console.log("data: ", data)
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


