const db = require("../db");
const express = require("express");
const ExpressError = require("../expressError");
const db = require("../db");

let router = new express.Router();
/** Get companies: [{code, name}, {code, name}, {code, name}] */

router.get("/", async function (req, res, next) {
    const results = await db.query(
        `SELECT * FROM companies`);

    return res.json({"companies": results.rows});
});

router.get("/:code", async function (req, res, next) {
    try{
        let code = req.params.code;
        const result = await db.query(
            `SELECT * FROM companies WHERE code = $1`, [code] //sanitizes
        );

        if (result.rowCount.length === 0){
            throw new ExpressError(`No such company: ${code}`, 404)
        }

        const company = result.rows[0];

    return res.json({"company": company});

    } catch (err) {
        return next(err);
    }
});

router.post("/", async function (req, res, next) {
    try{
        let {name, description} = req.body; //docs use slugify on code
        let code = req.params.code;
        const company = await db.query(
            `INSERT INTO companies (code, name, description) VALUES ($1, $2, $3) RETURNING code, name, description`, [code, name, description]);

        return res.status(201).json({"comapny": company.rows[0]});
    } catch (err) {
        return next(err);
    }
});

router.put("/:code", async function (req, res, next) {
    try{
        let {name, description} = req.body;
        let code = req.params.code;

        const result = await db.query(
            `UPDATE companies SET name=$1, description = $2 WHERE code = $3 RETURNING code, name, description` [name, description, code] //sanitizes
        );

        if (result.rowCount.length === 0){
            throw new ExpressError(`No such company: ${code}`, 404)
        } else {
            return res.status(201).json({"company": result.rows[0]});
        }

    } catch (err) {
        return next(err);
    }
});


router.delete("/:code", async function (req, res, next) {
    try {
      let code = req.params.code;
  
      const result = await db.query(
            `DELETE FROM companies
             WHERE code=$1
             RETURNING code`,
          [code]);
  
      if (result.rows.length == 0) {
        throw new ExpressError(`No such company: ${code}`, 404)
      } else {
        return res.json({"status": "deleted"});
      }
    }
  
    catch (err) {
      return next(err);
    }
  });
  
  
  module.exports = router;