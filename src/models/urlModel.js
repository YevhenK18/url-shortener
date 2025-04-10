const pool = require('../config/db');

class UrlModel {
    async createdUrl(originalUrl,shortCOde){
        const query = 'INSERT INTO urls (original_url, short_code) VALUES ($1,$2) RETURNING *'
        const values = [originalUrl,shortCode];
        const resault = await pool.query(query, values);
        return resault.rows[0];
    }
    async getUrlByCode(shortCode){
        const query = 'SELECT * FROM urls WHERE short_code = $1';
        const resault = await pool.query(query, [shortCod]);
        return resault.rows[0];
    }
}

module.exports = new UrlModel();
