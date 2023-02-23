module.exports = (req, res, next) => {
  //transfert de tous les éléments de la session vers la vue en cours
  if (req.session.flash) {
    res.locals.flash = req.session.flash;

    req.session.flash = [];
  }

  // fonction de sauvegarde (typologie, content)
  req.flash = (type, content) => {
    if (req.session.flash == undefined) req.session.flash = [];

    req.session.flash.push([type, content]);
  };

  next();
};
