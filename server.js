const express = require('express');
const bodyParser = require('body-parser');
const serveStatic = require("serve-static");
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const mongolink = process.env.MONGODB_URI || 'mongodb://localhost:27017/eng-family';

mongoose.connect(mongolink).then(
    () => { console.log('Database connection is successful') },
    err => { console.log('Error when connecting to the database' + err) }
);
mongoose.set('useFindAndModify', false);

const app = express();

app.use(serveStatic(path.join(__dirname, 'dist')));

//Middleware
app.use(bodyParser.json());
app.use(cors());


const User = require('./models/User');
const Sentences = require('./models/Sentences');
const Essay = require('./models/Essay');



app.get('/sentences/:user', (req, res) => {
    let user = req.params.user
    if (user === "mama") {
        Sentences.find({ mamaVersion: "" }, (err, sets) => {
            if (err) {
                console.log(err);
            } else {
                res.json(sets);
                // console.log(res.json(notes))
            }
        }).limit(7);
    } else if (user === "papa") {
        Sentences.find({ papaVersion: "" }, (err, sets) => {
            if (err) {
                console.log(err);
            } else {
                res.json(sets);
                // console.log(res.json(notes))
            }
        }).limit(7);
    } else {
        Sentences.find((err, sets) => {
            if (err) {
                console.log(err);
            } else {
                res.json(sets);
                // console.log(res.json(notes))
            }
        })
    }

})



app.get('/pastsentences/:user', (req, res) => {
    let user = req.params.user
    console.log(user)
    if (user === "mama") {
        Sentences.find({ mamaVersion: { "$ne": "" } },
            (err, sets) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json(sets);
                }
            })
    } else if (user === "papa") {
        Sentences.find({
            papaVersion: { "$ne": "" },

        }, (err, sets) => {
            if (err) {
                console.log(err);
            } else {
                res.json(sets);
            }
        })
    } else {
        Sentences.find({
            '$or': [
                { papaVersion: { "$ne": "" }, },
                { mamaVersion: { "$ne": "" }, }
            ]
        }, (err, sets) => {
            if (err) {
                console.log(err);
            } else {
                res.json(sets);
            }
        })
    }

})


app.post('/sentences', (req, res) => {
    console.log(req.body)
    let sent = new Sentences(req.body)
    sent.save().then(sent => {
            res.status(200).json({ 'message': 'Sentence successfully added ', "sentence": sent });
        })
        .catch(err => {
            res.status(400).send("Error when saving to database");
        });
})
app.delete("/sentences", (req, res) => {
    Sentences.findByIdAndRemove({ _id: req.body._id }, (err, sent) => {
        if (err) res.json(err);
        else res.json({ 'message': 'Sentence successfully removed', 'sentence': sent });
    });
})

app.put('/sentences', (req, res) => {
    const sent = req.body.data.data
    const user = req.body.data.user
    console.log(sent)
    console.log(user)
    if (user === "mama") {
        Sentences.findByIdAndUpdate({ _id: sent._id }, { mamaVersion: sent.mamaVersion }, (err, todores) => {
            if (err) res.json(err);
            else res.json({ 'message': 'Todo successfully updated', 'todo': todores });
        });
    } else if (user === "papa") {
        Sentences.findByIdAndUpdate({ _id: sent._id }, { papaVersion: sent.papaVersion }, (err, todores) => {
            if (err) res.json(err);
            else res.json({ 'message': 'Todo successfully updated', 'todo': todores });
        });
    } else {
        Sentences.findByIdAndUpdate({ _id: sent._id }, { papaVersion: sent.papaVersion, mamaVersion: sent.mamaVersion, mamaCheck: sent.mamaCheck, papaCheck: sent.papaCheck }, (err, todores) => {
            if (err) res.json(err);
            else res.json({ 'message': 'Todo successfully updated', 'todo': todores });
        });
    }


});



app.use('/*', express.static(path.join(__dirname, 'dist/index.html')));



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server on port ${port}`));