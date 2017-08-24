import jwt from 'jsonwebtoken'

const test = {
  locked (req, res) {
    const user = {
      username: req.body.name,
      email: req.body.email
    }
    const token = jwt.sign(user, process.env.SECRET_KEY, {
      expiresIn: 4000
    })
    res.json({
      success: true,
      token: token
    })
  },

  all (re, res) {
    // const cur = new Date()
    // const nextDay = cur.setDate(cur.getDate() + 7); // get 24 days after borrowed date 
    res.send('welcome Admin')
  }

}

export default test
