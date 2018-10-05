var express = require('express')
var app = express()
var request = require('request')

//Read 'api_key.md' for instrucitons
var keys = require('./api_key')
var APIkey = keys['api_key'];




app.get('/', function (req, res) {
    //get the user agent
    ua = req.get('user-agent');

    //initialize POST request options and body
    options = {
        url: 'https://api.whatismybrowser.com/api/v2/user_agent_parse',
        body: { "user_agent": ua },
        json: true,
        headers: { 'X-API-KEY': APIkey },
    }

    //send POST request to the api
    request.post(options, (err, message, bod) => {
        if (err) return console.log(err)

        //Create the HTML body (not the best way to do it but whatever)
        htmlbody = `<html>
                        <head>
                            <meta name="viewport" content="width=device-width, initial-scale=1">
                            <style>
                                body{font-family:Arial; color:#eee; background:#303030;width:100%;}
                                .container{width:100%; max-width:500px; margin:auto; text-align:center;}
                                .output{width:100%; max-width:900px; margin:auto;}
                            </style>
                        </head>
                        <div class="container">
                        <bR>
                        <h1> Your browser is `+ bod["parse"]["simple_software_string"] + `</h1>

                        </div>

                        <div class="output">
                            <pre>
                            `+ JSON.stringify(bod.parse, null, 4) + `
                            </pre>
                        </div>
                    
                    </html>`;


        res.send(htmlbody);
    });

})


app.listen(3000);