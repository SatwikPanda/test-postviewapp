import express from 'express';

const app = express();


app.get('/details', (req, res) => {

    //Create a database that from which it will fetch user details.
    res.send("Server is Ready");
})

app.listen(5000, () => {
    console.log('Server listening at http://localhost:5000');
});