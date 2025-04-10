const {nanoid} = require('nanoid');
const urlModel = require('../models/urlModel');
const { Router } = require('express');

class UrlController{
    async shortenUrl(req,res){
        try {
            const { originalUrl}= req.body;

            if (!originalUrl){
                return res.status(400).json({error: 'URL is required'});
            }

            const urlPattern = new RegExp('^(https?:\\/\\/)?'+ 
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ 
                '((\\d{1,3}\\.){3}\\d{1,3}))'+ 
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ 
                '(\\?[;&a-z\\d%_.~+=-]*)?'+ 
                '(\\#[-a-z\\d_]*)?$','i'); 

                if (!urlPattern.test(originalUrl)){
                    return res.status(400).json({error: 'Invalid URL'});
                }
                const shortCode=nanoid(7);
                const url = await urlModel.createdUrl(originalUrl,shortCode);

                const shortUrl = '${process.env.BASE_URL}/${shortCode}';
                res.status(201).json({originalUrl, shortUrl});

        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async redirectUrl(req,res){
        try{
            const {code} = req.params;
            const url = await urlModel.getUrlByCode(code);

            if (!url) {
                return res.status(400).json({ error: ' URL not found'});
            }

            res.redirect(url.original_url);
        } catch (error) {
            res.status(500).json({ error: error.message});
        }
    }
}

module.exports = new UrlController();
