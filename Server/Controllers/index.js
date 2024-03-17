const User = require('../Models/user');

/**
 * This function will display the home page
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function DisplayHome(req, res, next)
{
  /* Now Render the ejs page */
  res.render('index', {title: 'Home', page: 'home'});
}

function DisplayAbout(req, res, next){
  console.log("DisplayAbout function called")
  res.render('about', {title: "About", page: 'about'})
}

module.exports = {
 DisplayHome: DisplayHome,
 DisplayAbout: DisplayAbout,  
}

  