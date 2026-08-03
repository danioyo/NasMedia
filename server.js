const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const bcrypt = require("bcryptjs");
const sqlite3 = require("sqlite3").verbose();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/videos', express.static('C:/Users/danis/Desktop/videoss'));

const ALLOWED_EXTENSIONS = ['.mp4', '.mkv', '.avi', '.mov', '.webm'];
const API_KEY = '8b1e43728b1c17cc47afd3fde208e6b4';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
const HERO_IMAGE_URL = 'https://image.tmdb.org/t/p/w1280';

app.get("/api/nas-movies", (req, res)=>{
    fs.readdir("C:/Users/danis/Desktop/videoss", (err, files)=>{
        if(err){
            console.log("file reading error", err);
            return res.json({message:"file reading error", success:false});
        }
        else{
            const movieFiles = files.filter(file =>{
                const ext = path.extname(file).toLowerCase();
                return ALLOWED_EXTENSIONS.includes(ext);
            })
            res.json({
            success: true,
            total: movieFiles.length,
            movies: movieFiles
        });
        }
        
    })
})



const db = new sqlite3.Database(".dataBase.db");
db.run(
    `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    )`
)
app.post("/login", async(req, res)=>{
    const password = req.body.password;
    const username = req.body.username;

    if(username && password){
            db.get(`
                SELECT * FROM users WHERE username=?
                `, [username], async (err, row)=>{
                    if(!row){
                        return res.json({success: false,message: "username not found"});
                    }
                    if(!(await bcrypt.compare(password, row.password))){
                        return res.json({success: false,message: "wrong password"});
                    }
                    else{
                        return res.json({success: true,message: "all good"});
                        
                    }
                })
    }
    else{
        
        if(!username && password){return res.json({success:false,message: "empty fields", id: 1})};
        if(username && !password){return res.json({success:false,message: "empty fields", id: 2})};
        if(!username && !password){return res.json({success:false,message: "empty fields", id: 3})}
    }
    
})
app.post("/register", async(req,res)=>{
    const username = req.body.username;
    const id = req.body.id;
    if(username && req.body.password && id){
        const password = await bcrypt.hash(req.body.password,10);
        if(username.length<30){
        if(id==="1234"){
            db.run(`
                INSERT INTO users(username, password) VALUES (?,?)
                `, [username, password], (err)=>{
                    if (err) {
                        if (err.message.includes("UNIQUE")) {
                            return res.json({ message: "unavailable username", err: err, success: false });
                        }
                        return res.json({ message: "db error", success: false });
                    }
                    return res.json({message:"registered successfully",success:true});
                });
            
        }
        else{
            return res.json({message: "incorrect id", success: false, id:"i"});
        }
        }
        else return res.json({message: "the username is too long", success: false, id:"u"})
    }
    else{
        let missing = [];
        if(!username)missing.push("u");
        if(!req.body.password)missing.push("p");
        if(!id)missing.push("i");
        res.json({success: false, message:"empty fields", missing: missing});
    }

    
})

















app.listen(3000, () => {
    console.log("http://localhost:3000/");
});