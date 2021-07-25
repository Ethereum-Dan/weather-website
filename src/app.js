const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// Setup hbs engine and views location
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Dan"
    })
})

app.get("/weather", (req, res) => {
    if (!req.query.adress) {
        return res.send({
            error: "You must provide an adress!"
        })
    }

    geocode(req.query.adress, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecastdata) => {
            if(error) {
                return res.send({
                    error
                })
            }
            res.send({
                forecast: forecastdata,
                location,
                adress: req.query.adress
            })
        })
    })
})

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term!"
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About me",
        name: "Dan"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        name: "Dan",
        helpMsg: "Here you can find help"
    })
})

app.get("/help/*", (req, res) => {
    res.render("error", {
        title: "Error 404",
        name: "Dan",
        errorMSG: "Help article not found."
    })
})

app.get("*", (req, res) => {
    res.render("error", {
        title: "Error 404",
        name: "Dan",
        errorMSG: "Page not found"
    })
})

app.listen(3000, () => {
    console.log("Server is up on port 3000.")
})

