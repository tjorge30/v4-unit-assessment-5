//endpoint handeler functions

const bcrypt = require('bcryptjs');

module.exports = {
// register
// Should check to see if the user already exists
// If it does, it should send an error message
// If it doesn't, then a new user should be created 
// and saved to the req.session object. The username and password 
// should come from the req.body, and for the profile picture 
// you can use `https://robohash.org/${username}.png`
// This is a website that provides randomized profile pictures of robots
// Remember to use bcrypt (you'll need to require it at the top) 
// to salt and hash your user's passwords
register: async (req, res) => {
    // bring in the db
    const db = req.app.get('db');

    // receive the information to eventually add a new user
    const { username, password, profile_pic} = req.body;

    // check if an existing user matches the email trying to be registered with. if so, reject
    try {
        const [existingUser] = await db.get_user_by_username(username)

        if (existingUser) {
            return res.status(409).send('User already exists')
        }

        // hash and salt the password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt)

        // add the user to the db and get back their id
        const [ newUser ] = await db.register_user(username, hash, profile_pic);

        // create a session for the user using the db response
        req.session.user = newUser;

        // send a response that includes the user session info
        res.status(200).send(newUser);

    } catch(err) {
        console.log(err);
        return res.sendStatus(500);
    }
},



// login
// Should make sure that user exists, if not, send an error
// If the user exists, should make sure that the
// username and password entered match what's in the 
// database (if they don't match, send an error)
// If all is well, set the user to the session
login: (req, res) => {
    // get db instance
    const db = req.app.get('db'); 

    // get necessary info from req.body
    const { username, password } = req.body;
    
    // check if that user exists, if they do NOT, reject request
    db.get_user_by_username(username)
        .then(([existingUser]) => {
            if (!existingUser) {
                return res.status(403).send('Incorrect Username or Password')
            }

            // compare the password from req.body with the stored hash..if mismatch, reject
            const isAuthenticated = bcrypt.compareSync(password, existingUser.hash)

            if (!isAuthenticated) {
                return res.status(403).send('Incorrect Username or Password')
            }
            // set up session and be sure to not include the hash in the session
            delete existingUser.hash;

            req.session.user = existingUser;

            // send the response and session to the front
            res.status(200).send(req.session.user)
        })
},


// logout
// Destroy the session
// Send a 200 status to communicate that everything went well
logout: (req, res) => {
    req.session.destroy();
    res.redirect('http://localhost:3000')
  },

// getUser
// Check req.session for a logged in user.  If a user is logged in, 
// send their information.  Otherwise, send a 404 status code. 
getUser: (req, res) => {
    if (req.session.user) { 
        res.status(200).send(req.session.user)
    } else {
      res.redirect('http://localhost:3000');
    }
  }

}