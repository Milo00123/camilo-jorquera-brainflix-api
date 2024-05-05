const express = require('express');
const app = express();
const PORT = 8080;
const videoRoute = require ('./Routes/videoRoute');
const cors = require('cors');


app.use(express.static('public'));

app.use(cors({
    origin: 'http://localhost:3000'
}));


app.use(express.json());
app.use('/videos', videoRoute);
 
app.listen(PORT, () =>{
    console.log('server running')
});
