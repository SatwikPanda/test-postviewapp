import express from 'express';

const app = express();


app.get('/', (req, res) => {
    res.send("Server is Ready");j
})

app.listen(5000, () => {
    console.log('Server listening at http://localhost:5000');
});