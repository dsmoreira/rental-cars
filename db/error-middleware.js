module.exports = (req, res, next) => {
  //   res.status(500).jsonp({
  //     error: "error message here"
  //   })
  setTimeout(() => {
    next();
  }, 2000);
}
