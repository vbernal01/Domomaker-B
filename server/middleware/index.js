const requiresLogin = (req, res, next) => {
  if (!req.session.account) {
    return res.redirect('/');
  }
  return next();
};

const requiresLogout = (req, res, next) => {
  if (req.session.account) {
    console.log("requires logout");
    return res.redirect('/maker');
  }

  return next();
};

const requiresSecure = (req, res, next) => {
  console.log("requires secure");
  if (req.headers['x-fowarded-proto'] !== 'https') {
    console.log("requires https");
    return res.redirect(`https://${req.hostname}${req.url}`);
  }
  return next();
};

const bypassSecure = (req, res, next) => {
  next();
};

module.exports.requiresLogin = requiresLogin;
module.exports.requiresLogout = requiresLogout;
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
  console.log("production");
  module.exports.requiresSecure = requiresSecure;
} else {
  console.log("bypass");
  module.exports.requiresSecure = bypassSecure;
}
