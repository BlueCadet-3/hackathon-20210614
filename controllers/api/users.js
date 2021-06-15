const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
  create,
  login,
  checkToken,
  findAll,
  findOne,
};

function checkToken(req, res) {
  // req.user will always be there for you when a token is sent
  console.log('req.user', req.user);
  res.json(req.exp);
}

async function create(req, res) {
  try {
    // Add the user to the database
    const user = await User.create(req.body);
    // token will be a string
    const token = createJWT(user);
    // Yes, we can use res.json to send back just a string
    // The client code take this into consideration
    res.json(token);
  } catch (err) {
    // Client will check for non-2xx status code 
    // 400 = Bad Request
    res.status(400).json(err);
  }
}

async function findAll(req, res) {
  try {
    // show index of all users for testing
    const users = await User.find({}).select('-password');

    res.json({ success: true, users});

  } catch {
    res.status(400).json('Couldn`t find users');
  }
}

async function findOne(req, res) {
  const _id = req.params.id
  try {
    // show one user - we are using id for params?
    const user = await User.find({_id}).select('-password');
    
    res.json({ success: true, user});

  } catch {
    res.status(400).json('Couldn`t find user');
  }
}



async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error();
    await bcrypt.compare(req.body.password, user.password);
    const token = createJWT(user);
    res.json(token);
  } catch {
    res.status(400).json('Bad Credentials');
  }
}

/*-- Helper Functions --*/

function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: '24h' }
  );
}