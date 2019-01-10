const express = require('express');
const mongoose  = require('mongoose');
const bodyParser = require('body-parser');
const Users = require('./models/users');
const Refferal = require('./models/refferal');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost:27017/testing', {useNewUrlParser: true})
        .then(() => console.log('Database connected'))


app.get('/', (req, res) => {
    res.json({'message': 'it is working'});
})

app.post('/signIn', (req, res) => {
    console.log(req.body);
    Users.findOne({'name': req.body.name, 'password': req.body.password}, function(err, data) {
        res.setHeader('Content-Type', 'application/json');
        
        if(err) {
            res.status(404);
            res.json({message :'failed'})
        }
        res.json({message: 'success'})
    })
})

app.post('/signUp', async (req, res) => {
    console.log(req.body.name);
    const user = new Users({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        refferal_id: req.body.refferal_id
    })
    res.setHeader('Content-Type', 'application/json');
  
    try {
        //console.log('saved user is ', users)
        const refferal = new Refferal();
        refferal.refferal_code = req.body.refferal_id;
        const refferalResponse = await refferal.save();
        console.log('refferal id is ', refferalResponse._id);
        user.refferal_id = refferalResponse._id;
        const users = await user.save();
        const refferalUser = new Refferal();
        if(req.body.isRefferal) {
            console.log('isRefferal Value is ', req.body.isRefferal);
            //refferalUser.users_id.push(users._id);
            Refferal.findOneAndUpdate({'refferal_code':req.body.isRefferal}, { $push: {'users_id': users._id} }, { new: true }, function(err, doc) {
                console.log('doc is ', doc);
            })
        }
        // refferal.save()
        console.log('user added ', users)
        res.json({'message': 'user added'})
    } catch {
        res.status(404);
        res.json({'message': 'Not added'})
    }
    
    
    // res.send('sign Up')
})

app.listen(3000, () => {
    console.log('server listening on port 3000')
})