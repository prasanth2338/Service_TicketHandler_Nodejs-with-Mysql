

let authtest = {};
const verifyToken = (req, res, next) => {
  
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
      console.log("token"+token)
      
      if (!token) {
        return res.status(403).send("A token is required for authentication");
      }
      try {
        const decoded =  jwt.verify(token,process.env.JWT_KEY);
        console.log("decode"+decoded)
        
      } catch (err) {
        return res.status(401).send("Invalid Token");
      }
      return next();
    };


    authtest.verifyToken = (username) => {
        return new Promise((resolve, reject) => {
            var sql = `SELECT * FROM mark_color_sort.login_db where User_Name = ("${username}")`;
            pool.query(sql, (error, details) => {
                if (error) {
                    return reject(error);
                }
                return resolve(details);
            });
        });
    };

module.exports = authtest;