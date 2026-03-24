const express = require("express");
const router = express.Router();

const db = require("../db");


// GET all subscriptions
router.get("/", (req, res) => {

    db.query("SELECT * FROM subscription", (err, result) => {

        if (err) {
            console.log("DATABASE ERROR:", err);
            return res.status(500).json(err);
        }

        res.json(result);

    });

});


// CREATE subscription
router.post("/", (req, res) => {

    const {
        user_email,
        plan_name,
        start_date,
        end_date,
        monthly_cost,
        status
    } = req.body;

    const sql = `
    INSERT INTO subscription
    (user_email,plan_name,start_date,end_date,monthly_cost,status)
    VALUES (?,?,?,?,?,?)
    `;

    db.query(sql,
        [user_email,plan_name,start_date,end_date,monthly_cost,status],
        (err,result)=>{

            if(err){
                console.log(err);
                res.status(500).send("Insert failed");
            }else{
                res.send("Subscription Created");
            }

        });

});


// UPDATE subscription
router.put("/:id", (req, res) => {

    const id = req.params.id;

    const {
        user_email,
        plan_name,
        start_date,
        end_date,
        monthly_cost,
        status
    } = req.body;

    const sql = `
    UPDATE subscription
    SET user_email = ?, 
        plan_name = ?, 
        start_date = ?, 
        end_date = ?, 
        monthly_cost = ?, 
        status = ?
    WHERE subscription_id = ?
    `;

    db.query(
        sql,
        [user_email, plan_name, start_date, end_date, monthly_cost, status, id],
        (err, result) => {

            if (err) {
                console.log("UPDATE ERROR:", err);
                return res.status(500).json(err);
            }

            res.json({ message: "Subscription updated successfully" });
        }
    );

});

// DELETE subscription
router.delete("/:id",(req,res)=>{

    const id=req.params.id;

    db.query(
        "DELETE FROM subscription WHERE subscription_id=?",
        [id],
        (err,result)=>{

            if(err){
                console.log(err);
                res.status(500).send("Delete failed");
            }else{
                res.send("Subscription Deleted");
            }

        });

});

module.exports = router;