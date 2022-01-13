import jwt from 'jsonwebtoken';
// import mg from 'mailgun-js';

export const generateToken= (user) => {
  return jwt.sign({
    _id: user._id,
    name: user.name,
    email: user.email,
    role:  user.role
  },
  process.env.JWT_SECRET || "somethingsecret", 
  {
    expiresIn: "30d"
  }
  )
}

// middle-wares
export const isAuth = (req, res, next) => {
    const authorization= req.headers.authorization
    if(authorization){
        const token = authorization.slice(7, authorization.length)
        jwt.verify(token, process.env.JWT_SECRET || "somethingsecret", (err, decode) => {
          if(err){
            res.status(401).send({message: "You must be logged in to do that"})
          } else {
            req.user= decode
            next()
          }
        })

    } else {
      res.status(401).send({message: "You must be logged in to do that"})
    }
}

export const isUserAdmin=(userRole) => {
    return userRole == "admin"
}

export const isUserSuperAdmin=(req, res, next) => {
  if( req.user.role == "superAdmin"){
    next()
  } else {
    res.status(401).send({message: "you need to be a super admin to do that"})
  }
}

export const isUserAuthor=(userId, authorId) => {
  return userId == authorId
}

export const isAuthorAdmin=(authorRole) => {
  return authorRole == "admin"
}

export const isAuthorSuperAdmin=(authorRole) => {
  return authorRole == "superAdmin"
}