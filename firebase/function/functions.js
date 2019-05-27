const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const app = express();

admin.initializeApp();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

app.get('/funch/sy/left/:strong', (req, res) => {
    // left 펀치 강도와 시간 등록

    console.log('entered  in left punch');
    let dt = new Date().getTime();
    let strong = parseInt(req.params.strong);
    admin.database().ref('/funch/sy/').push(
        {
            side:"left",
            strong: strong,
            createdTime: dt
        }, function (error) {
            if (error) {
                console.log('something wrong', error);
                res.send(error);
            } else {
                console.log('entered success');
                res.send(`entered success ${strong}`);
            }
        })
})

app.get('/funch/sy/right/:strong', (req, res) => {
    // right 펀치 강도와 시간 등록
    console.log('entered  in right punch');
    let dt = new Date().getTime();
    let strong = parseInt(req.params.strong);
    admin.database().ref('/funch/sy/').push(
        {
            side:"right",
            strong: strong,
            createdTime: dt
        }, function (error) {
            if (error) {
                console.log('something wrong', error);
                res.send(error);
            } else {
                console.log('entered success');
                res.send(`entered success ${strong}`);
            }
        })
})

exports.widgets = functions.https.onRequest(app);

