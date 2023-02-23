let Functions = require("./functions");
let express = require("express");
let session = require("express-session");

let Question = require("./models/question");
let User = require("./models/User");
let Answer = require("./models/Answer");
let Result = require("./models/Result");

let app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/assets", express.static("public"));

let MWAdmin = require('./middlewares/userAdmin')

app.set("trust proxy", 1);
app.use(
  session({
    secret: "12345ihn45874kkkk6m", //clé unique
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, expires: Functions.expiresCookies() }, // false si http , true si https
  })
);

app.get("/", (req, res) => {

  res.render("home", {
    username: session.username,
  });
});

app.get("/quizz", (req, res) => {
  if (session.username) {
  let quizzStep = session.quizzStep;

  Question.allRand((callbackQuestions) => {

    if (quizzStep === 0) {
    session.questions = callbackQuestions;
    }

    if (quizzStep > 0) {
      session.questions.shift();
    }

    if (session.questions.length === 0) {

      res.redirect("/leaderboard");
    } else {
    Answer.allWhereQuestion(session.questions[0].id, (callbackAnswer) => {
        res.render("quizz", {
          answers: callbackAnswer,
          question: session.questions[0],
          username: session.username,
        });
    });
  }});
} else {
  res.redirect('/')
}});

app.post("/quizz", (req, res) => {
  session.quizzStep++;
  let answerId = req.body.answer

  Answer.OneById(answerId, (answer) => {
    if (answer.correct) {
      session.quizzResult++
    }
  });

  res.redirect("/quizz");
});

app.post("/test", (req, res) => {
  if (!Functions.isEmpty(req.body.username)) {
    session.username = req.body.username;
  } else {
    session.username = session.username || "Anonymous";
  }
  session.quizzStep = 0;
  session.quizzResult = 0;

  res.redirect("/quizz");
});

app.get("/leaderboard", (req, res) => {
  if (session.quizzResult || session.quizzStep) {
    Result.create(session.username, session.quizzStep, session.quizzResult)
    session.quizzResult = null;
    session.quizzStep = null;
  }

  Result.all((callbackResults) => {

  res.render("leaderboard", {
    username: session.username,
    results: callbackResults
  });
});
});

app.get('/contribution', (req, res) => {

  res.render('contribution')
})

app.post('/contribution', (req, res) => {

  if((req.body.question === undefined || req.body.question === '') && (req.body.theme === undefined || req.body.theme === '') && (req.body.answer.length !== 4)) {
    req.flash('error', 'Champs invalide')
  } else {
  Question.createByContribution(req.body.question, req.body.categorie, 0, (result) => {

    //console.log(req.body.answer.length)
    for (let i = 0; i < req.body.answer.length; i++) {
      const answer = req.body.answer[i];
      if (i === 0) {
      Answer.addOne(result.insertId, req.body.answer[0], 1)
    } else {
      Answer.addOne(result.insertId, req.body.answer[i], 0)
    }
    }

  });

}
res.redirect('/')
})

app.get('/dashboard', (req, res) => {

  if (MWAdmin){
    Question.allNoValidate((callback) => {

      res.render('dashboard', {
        questions: callback
      })
      });
  }
})

app.post('/dashboard', (req, res) => {

  Question.validateQuestion(req.body.questionId)
  res.redirect('/dashboard')
})

app.get("/*", (req, res) => {
  res.redirect("/");
});

app.listen(8080);