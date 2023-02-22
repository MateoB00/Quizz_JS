let express = require('express');
let session = require('express-session');

let app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/assets', express.static('public'))

app.set('trust proxy', 1)
app.use(session({
  secret: '12345ihn45874kkkk6m', //clé unique
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, expires: new Date('2023-12-31')}  // false si http , true si https
}))

app.get("/", (req, res) => {

    res.render("home");
  });

app.listen(8080);