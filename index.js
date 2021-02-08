const app = require("express")
const mongoose = require("mongoose")
// const bodyParser = require("body-parser")
const config = require('./config')
// app.use(bodyParser.json())
const ModelAgree = require("./model/agreeModel")
const ModelData = require("./model/dataModel")
const {
    PORT = process.env.PORT || 5000,
    NODE_ENV,
    MONGO_URI,
    MONGO_USER,
    MONGO_PSW,
} = process.env

mongoose.connect(
    NODE_ENV === "production" ? config.DB_URI_PROD : config.DB_URI_PROD,
    { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },
    () => console.log("mongo connected")
)

const intervalObj = setInterval(() => {
    ModelData.find({})
    // .where('age').gt(18).lt(60)
    // .where(interests).in(['games', 'movies'])
    .select('createdAt cookieId')
    .exec(function(err, result) {
        if (err) {
            return next(err);
        }else{
            console.log(result.length)
            for (var i=0; i<result.length; i++) {
                const TIME_LIMIT = process.env.TIMEL || 90;
                var date1 = new Date(result[i].createdAt); 
                var date2 = new Date();
                var Difference_In_Time = date2.getTime() - date1.getTime(); 
                var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
                // var cookieID = result[i].cookieId
                var cookieID = "1610433427330";
                
                if (Difference_In_Days>=TIME_LIMIT) {
                    ModelAgree.remove({cookieId: cookieID})
                    .exec(function(err, resultA) {
                        if (err) {
                            return next(err);
                        }else{
                            console.log("1")
                        }
                    })
                    ModelData.remove({cookieId: cookieID})
                    .exec(function(err, resultD) {
                        if (err) {
                            return next(err);
                        }else{
                            console.log("2")
                        }
                    })
                }
            }
        }
    });
}, 10000);
