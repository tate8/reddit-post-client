require('dotenv').config()
const express = require('express');

const PORT = process.env.PORT || 3001;

const app = express();

app.route('/account-details/:id')
.get((req, res) => {
    let id = req.params.id
    // TODO: get user info from databse based off of the id

    res.json({ contents: {
        id: id,
        accountName: 'Example Account Name'
    } })
})


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})