const express = require('express');
const app = express();


// set view engine ejs
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('home')
})


app.listen(3000, () => {
    console.log(`server running on port...`);
})