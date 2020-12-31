const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const bodyParser = require('body-parser');
const serveStatic = require("serve-static");
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

process.env.MONGODB_URI = "mongodb+srv://katerinushka2603:Pillow17031997@diary-app-db.nwsp0.mongodb.net/eng-family?retryWrites=true&w=majority"

const mongolink = process.env.MONGODB_URI || 'mongodb://localhost:27017/eng-family';

mongoose.connect(mongolink).then(
    () => { console.log('Database connection is successful') },
    err => { console.log('Error when connecting to the database' + err) }
);
mongoose.set('useFindAndModify', false);
mongoose.set("useCreateIndex", true)

const store = new MongoDBStore({
    uri: mongolink,
    collection: 'sessions'
});
store.on('error', function(error) {
    console.log('Session sotrage error', error);
});


const app = express();

app.use(serveStatic(path.join(__dirname, 'dist')));

//Middleware
app.use(bodyParser.json());
app.use(cors());

app.use(session({
    secret: 'hh2387234iuhf98234oiwqeufHRIWE1iuh((',
    cookie: {
        sameSite: true,
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    store: store,
    resave: false,
    saveUninitialized: true
}));

app.use((req, res) => {
    console.log('Checking request for', req.path)
    console.log('               ', JSON.stringify(req.session))
    if (req.path === '/') return req.next();
    if (!req.session) {
        console.log('No session.')
        return res.redirect('/');
    }
    if (req.path === '/login') {
        console.log('Login called with body', req.body);
        console.log('Old session was', JSON.stringify(req.session));
        req.session.user = req.body.name;
        req.session.save((err) => {
                if (err) console.err('Session save failed', err)
                else console.log('Session saved')
            }) // Just to be sure
        console.log(" New session is", JSON.stringify(req.session));
    }
    if (!req.session.user) {
        console.log('No username.')
        return res.redirect('/');
    }
    if (!['Katya', 'Stiopa', 'mama', 'papa', 'admin'].includes(req.session.user)) {
        console.log('Not a matching user name.')
        res.status(300);
        return res.redirect('/');
    }
    console.log("User", req.session.user, 'allowed')
    req.next();
});

const User = require('./models/User');
const Sentences = require('./models/Sentences');
const Essay = require('./models/Essay');
const Review = require('./models/Review')

app.post('/login', (req, res) => {
    console.log('Katya is right')
    res.sendStatus(200);
})

app.get("/userinfo", (req, res) => {
    res.json({
        user: req.session.user
    });
})

app.get("/user/:user", (req, res) => {
    let user = req.params.user
    User.find({ name: user }, (err, usr) => {
        if (err) {
            console.log(err);
        } else {
            res.json(usr);
        }
    })
})

app.put('/user', (req, res) => {
    let datastrikes = req.body.data.strikes
    let dataname = req.body.data.name
    console.log(dataname)
    console.log(datastrikes)
    User.findOneAndUpdate({ name: dataname }, { strikes: datastrikes }, (err, str) => {
        if (err) res.json(err);
        else res.json({ 'message': 'Strikes successfully updated', 'strikes': str });
    });
})
app.get('/sentences/:user', (req, res) => {
    let user = req.session.user
    if (user === "mama") {
        Sentences.find({ mamaVersion: "" }, (err, sets) => {
            if (err) {
                console.log(err);
            } else {
                res.json(sets);
            }
        })
    } else if (user === "papa") {
        Sentences.find({ papaVersion: "" }, (err, sets) => {
            if (err) {
                console.log(err);
            } else {
                res.json(sets);
            }
        })
    } else {
        Sentences.find((err, sets) => {
            if (err) {
                console.log(err);
            } else {
                res.json(sets);
            }
        })
    }

})



app.get('/essay/:user', (req, res) => {
    let user = req.session.user
    let now = new Date();
    let onejan = new Date(now.getFullYear(), 0, 1);
    let week = Math.ceil((((now.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7);
    console.log(week)
    if (user === "mama") {
        Essay.findOne({ mamaVersion: "" }, (err, essay) => {
            if (err) {
                console.log(err);
            } else {
                res.json(essay);
            }
        })
    } else if (user === "papa") {
        Essay.findOne({ papaVersion: "" }, (err, essay) => {
            if (err) {
                console.log(err);
            } else {
                res.json(essay);
            }
        })
    } else {
        Essay.findOne((err, essay) => {
            if (err) {
                console.log(err);
            } else {
                res.json(essay);
            }
        })
    }

})

app.get('/review/:user', (req, res) => {
    let user = req.session.user
    let now = new Date();
    let onejan = new Date(now.getFullYear(), 0, 1);
    let week = Math.ceil((((now.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7);
    console.log(week)
    if (user === "mama") {
        Review.findOne({ mamaVersion: "" }, (err, essay) => {
            if (err) {
                console.log(err);
            } else {
                res.json(essay);
            }
        })
    } else if (user === "papa") {
        Review.findOne({ papaVersion: "" }, (err, essay) => {
            if (err) {
                console.log(err);
            } else {
                res.json(essay);
            }
        })
    } else {
        Review.findOne((err, essay) => {
            if (err) {
                console.log(err);
            } else {
                res.json(essay);
            }
        })
    }

})

app.get('/pastsentences/:user', (req, res) => {
    let user = req.session.user
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

app.get('/pastessay/:user', (req, res) => {
    let user = req.session.user
    if (user === "mama") {
        Essay.find({ mamaVersion: { "$ne": "" } },
            (err, essay) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json(essay);
                }
            })
    } else if (user === "papa") {
        Essay.find({
            papaVersion: { "$ne": "" },
        }, (err, essay) => {
            if (err) {
                console.log(err);
            } else {
                res.json(essay);
            }
        })
    } else {
        Essay.find({
            '$or': [
                { papaVersion: { "$ne": "" }, },
                { mamaVersion: { "$ne": "" }, }
            ]
        }, (err, essay) => {
            if (err) {
                console.log(err);
            } else {
                res.json(essay);
            }
        })
    }

})

app.get('/pastreview/:user', (req, res) => {
    console.log("pastreviews called")
    let user = req.session.user
    if (user === "mama") {
        Review.find({ mamaVersion: { "$ne": "" } },
            (err, essay) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json(essay);
                }
            })
    } else if (user === "papa") {
        Review.find({
            papaVersion: { "$ne": "" },
        }, (err, essay) => {
            if (err) {
                console.log(err);
            } else {
                res.json(essay);
            }
        })
    } else {
        Review.find({
            '$or': [
                { papaVersion: { "$ne": "" }, },
                { mamaVersion: { "$ne": "" }, }
            ]
        }, (err, essay) => {
            if (err) {
                console.log(err);
            } else {
                console.log(essay)
                res.json(essay);
            }
        })
    }

})

app.post('/sentences', (req, res) => {
    let sent = new Sentences(req.body)
    sent.save().then(sent => {
            res.status(200).json({ 'message': 'Sentence successfully added ', "sentence": sent });
        })
        .catch(err => {
            res.status(400).send("Error when saving to database");
        });
})

app.post('/essay', (req, res) => {
    let essay = new Essay(req.body)
    console.log("essay is added", essay)
    essay.save().then(sent => {
            res.status(200).json({ 'message': 'Essay topic successfully added ', "sentence": sent });
        })
        .catch(err => {
            res.status(400).send("Error when saving to database");
        });
})

app.post('/review', (req, res) => {
    let review = new Review(req.body)
    console.log("review is added", review)
    review.save().then(rev => {
            res.status(200).json({ 'message': 'Essay topic successfully added ', "review": rev });
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
app.delete("/essay", (req, res) => {
    Essay.findByIdAndRemove({ _id: req.body._id }, (err, sent) => {
        if (err) res.json(err);
        else res.json({ 'message': 'Sentence successfully removed', 'sentence': sent });
    });
})
app.delete("/review", (req, res) => {
    Review.findByIdAndRemove({ _id: req.body._id }, (err, sent) => {
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
        Sentences.findByIdAndUpdate({ _id: sent._id }, { mamaVersion: sent.mamaVersion, mamaResolved: sent.mamaResolved }, (err, todores) => {
            if (err) res.json(err);
            else res.json({ 'message': 'Todo successfully updated', 'todo': todores });
        });
    } else if (user === "papa") {
        Sentences.findByIdAndUpdate({ _id: sent._id }, { papaVersion: sent.papaVersion, papaResolved: sent.papaResolved }, (err, todores) => {
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

app.put('/essay', (req, res) => {
    const sent = req.body.data.data
    const user = req.body.data.user

    if (user === "mama") {
        Essay.findByIdAndUpdate({ _id: sent._id }, { mamaVersion: sent.mamaVersion, mamaResolved: sent.mamaResolved }, (err, ess) => {
            if (err) res.json(err);
            else res.json({ 'message': 'Todo successfully updated', 'todo': ess });
        });
    } else if (user === "papa") {
        Essay.findByIdAndUpdate({ _id: sent._id }, { papaVersion: sent.papaVersion, papaResolved: sent.papaResolved }, (err, ess) => {
            if (err) res.json(err);
            else res.json({ 'message': 'Todo successfully updated', 'todo': ess });
        });
    } else {
        Essay.findByIdAndUpdate({ _id: sent._id }, { papaVersion: sent.papaVersion, mamaVersion: sent.mamaVersion, mamaCheck: sent.mamaCheck, papaCheck: sent.papaCheck }, (err, ess) => {
            if (err) res.json(err);
            else res.json({ 'message': 'Todo successfully updated', 'todo': ess });
        });
    }
});
app.put('/review', (req, res) => {
    const sent = req.body.data.data
    const user = req.body.data.user

    if (user === "mama") {
        Review.findByIdAndUpdate({ _id: sent._id }, { mamaVersion: sent.mamaVersion, mamaResolved: sent.mamaResolved }, (err, ess) => {
            if (err) res.json(err);
            else res.json({ 'message': 'Todo successfully updated', 'todo': ess });
        });
    } else if (user === "papa") {
        Review.findByIdAndUpdate({ _id: sent._id }, { papaVersion: sent.papaVersion, papaResolved: sent.papaResolved }, (err, ess) => {
            if (err) res.json(err);
            else res.json({ 'message': 'Todo successfully updated', 'todo': ess });
        });
    } else {
        Review.findByIdAndUpdate({ _id: sent._id }, { papaVersion: sent.papaVersion, mamaVersion: sent.mamaVersion, mamaCheck: sent.mamaCheck, papaCheck: sent.papaCheck }, (err, ess) => {
            if (err) res.json(err);
            else res.json({ 'message': 'Todo successfully updated', 'todo': ess });
        });
    }
});


app.use('/*', express.static(path.join(__dirname, 'dist/index.html')));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server on port ${port}`));