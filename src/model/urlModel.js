const mongoose = require('mongoose')


const urlSchema = new mongoose.Schema({
    urlCode: {
        type: String,
        required:[true,"UrlCode required"],
        unique: true,
        lowercase: [true,"UrlCode should be in lowercase"],
        trim: true
    },
    longUrl: {
        type: String,
        required:[ true,"LongUrl required"]
    },
    shortUrl: {
        type: String,
        required:[true,"ShortUrl required"],
        unique: true,
        trim:true,
        lowercase:[true,"UrlCode should be in lowercase"]
    }


}, { timestamps: true })

module.exports = mongoose.model('Url', urlSchema)

