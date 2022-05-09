var express = require('express');
var app = express();
var dotenv = require('dotenv');
var path = require('path');
const cors = require('cors');
var cookieParser = require('cookie-parser')
dotenv.config();
const port = process.env.PORT || 3000;
global.__basedir = __dirname;
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({
    extended: true
}));


app.use(cors({ credentials: true, origin: ["http://192.168.1.9:4000", "http://10.0.132.51:4000"] }));


app.get('/', function (req, res) {
    return res.send({ messenger: 'Hỗ trợ du lịch' })
});
app.get('/public/images/:filename', (req, res) => {
    res.sendFile(path.join(__dirname, './public/image', req.params.filename))
})
//import route
const userRoutes = require('./src/routes/user_route');
const adminRoutes = require('./src/routes/admin_route');
const placeRoutes = require('./src/routes/place_route');
const serviceRoutes = require('./src/routes/service_route');

const notificationRoutes = require('./src/routes/notification_route')
const commentRoutes = require('./src/routes/comment_route')
//create user
app.use('/api/v1/user', userRoutes);
// route cho place
app.use('/api/v1/place', placeRoutes);
// route cho service
app.use('/api/v1/service', serviceRoutes);
// route cho admin
app.use('/api/v1/admin', adminRoutes);

app.use('/api/v1/notification', notificationRoutes)
app.use('/api/v1/comment', commentRoutes)
app.listen(port, function () {
    console.log(`Node server running @ http://localhost:${port}`)
});

module.exports = app;