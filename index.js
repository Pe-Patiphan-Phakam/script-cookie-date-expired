const app = require("express")
const mongoose = require("mongoose")
const config = require('./config')
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
    .select('createdAt cookieId')
    .exec(function(err, result) {
        if (err) {
            return next(err);
        }else{
            var dn = new Date();
            var tm = dn.toTimeString().slice(0, 5);
            var sixA = "06:00";
            var sixB = "18:00";
            // console.log(tm)
            if (tm === sixA || tm === sixB) {
                for (var i=0; i<result.length; i++) {
                    const TIME_LIMIT = process.env.TIMEL || 90;
                    var date1 = new Date(result[i].createdAt); 
                    var date2 = new Date();
                    var Difference_In_Time = date2.getTime() - date1.getTime(); 
                    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
                    // var cookieID = result[i].cookieId
                    var cookieID = "1612839829386";
                    console.log(Difference_In_Days)
                    if (Difference_In_Days>=TIME_LIMIT) {
                        ModelAgree.deleteMany({cookieId: cookieID})
                        .exec(function(err, resultA) {
                            if (err) {
                                return next(err);
                            }else{
                                console.log("1")
                            }
                        })
                        ModelData.deleteOne({cookieId: cookieID})
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
        }
    });
}, 60000);
