const urlModel = require("../model/urlModel")
var validUrl = require('valid-url');
const shortid = require('shortid')



let isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}



const baseUrl = ' http://localhost:3000'


let createUrl = async function (req, res) {
    try {
        let requestBody = req.body
        if (!isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, message: "Enter valid Parameters" })
        }

        if (validUrl.isUri(baseUrl)) {
            return res.status(400).send({ status: false, message: "Invalid base URL" })
        }
        const urlCode = shortid.generate()
        const shortUrl = baseUrl + '/' + urlCode

        const { longUrl } = requestBody

        if (!longUrl) { return res.status(400).send({ status: false, message: "LongUrl required" }) }

        let lUrl = await urlModel.findOne({ longUrl })
        if (lUrl) {
            return res.status(200).send({ status: true, data: { longUrl: lUrl.longUrl, shortUrl: lUrl.shortUrl, urlCode: lUrl.urlCode } })
        }
       

        let urlData = {
            longUrl,
            shortUrl,
            urlCode
        }

        let data = await urlModel.create(urlData)
        return res.status(201).send({ status: true, data: { longUrl: data.longUrl, shortUrl: data.shortUrl, urlCode: data.urlCode } })

    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}



let getOriginalUrl=async function(req,res){
    try{
       
        let urlCode=req.params.urlCode


        if(!urlCode){return res.status(400).send({status:false,message:"urlCode Required"})}

         let findUrlCode=await urlModel.findOne({urlCode})
         if(!findUrlCode){return res.status(400).send({status:false,message:"urlCode not found"})}

         let longUrl=findUrlCode.longUrl
         return res.status(200).send({status:true,data:longUrl})
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

module.exports.createUrl = createUrl
module.exports.getOriginalUrl=getOriginalUrl























