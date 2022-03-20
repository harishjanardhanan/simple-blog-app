const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const db = require('./dbconfig')

const app = express()
app.use(express.json())

const connection = mysql.createConnection(db.config)

connection.connect(err => {
    if (err) {
        return err;
    }
})

app.use(cors())

app.post('/blogs', (req, res) => {
    const SELECT_ALL_BLOGS_QUERY = 'SELECT * FROM blogs'
    connection.query(SELECT_ALL_BLOGS_QUERY, (err, result) => {
        if (err) {
            return res.send(err)
        } else {
            return res.json({
                data: result
            })
        }
    })
})

app.post('/add-blog', (req, res) => {
    const { title, body } = req.body
    const ADD_BLOG_QUERY = `INSERT INTO blogs(title, body) VALUES('${title}', '${body}')`
    connection.query(ADD_BLOG_QUERY, (err, result) => {
        if (err) {
            return res.send(err)
        } else {
            return res.json({
                message: 'Blog added successfully'
            })
        }
    })
})

app.post('/edit-blog', (req, res) => {
    const { title, body, id } = req.body
    const ADD_BLOG_QUERY = `UPDATE blogs SET title = '${title}', body = '${body}'  WHERE blog_id = ${id};`
    connection.query(ADD_BLOG_QUERY, (err, result) => {
        if (err) {
            return res.send(err)
        } else {
            return res.json({
                message: 'Blog updated successfully'
            })
        }
    })
})

app.post('/delete-blog', (req, res) => {
    const { id } = req.body
    const DELETE_BLOG_QUERY = `DELETE FROM blogs WHERE blog_id = ${id}`
    connection.query(DELETE_BLOG_QUERY, (err, result) => {
        if (err) {
            return res.send(err)
        } else {
            return res.json({
                message: 'Blog deleted successfully'
            })
        }
    })
})

app.post('/blog/:id', (req, res) => {
    const SELECT_BLOG_QUERY = `SELECT * FROM blogs where blog_id = ${req.params.id}`
    connection.query(SELECT_BLOG_QUERY, (err, result) => {
        if (err) {
            return res.send(err)
        } else {
            return res.json({
                data: result[0]
            })
        }
    })
})

app.post('/login', (req, res) => {
    const { username, password } = req.body
    const GET_USER_DATA = `SELECT * FROM users WHERE name = '${username}' AND password = '${password}'`
    connection.query(GET_USER_DATA, (err, result) => {
        if (err) {
            return res.send(err)
        } else {
            if (result.length > 0) {
                return res.json({
                    message: 'Login Success',
                    user: username,
                    isLoggedin: true
                })
            } else {
                return res.json({
                    message: 'Login Error',
                    isLoggedin: false
                })
            }
        }
    })
})

app.listen(4000, () => {
    console.log('Listening on port 4000')
})