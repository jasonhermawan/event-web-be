const jwt = require("jsonwebtoken");

module.exports = {
    validateUser: (req, res, next) => {
        jwt.verify(req.token, process.env.SCRT_TKN, (err, decoded) => {
        if (err) {
            return res.status(401).send({
            message: "User not authorized to feature",
            });
        }
        req.user = decoded;
        next();
        });
    },
    validatePromotor: (req, res, next) => {
        jwt.verify(req.token, process.env.SCRT_TKN, (err, decoded) => {
        if (err) {
            return res.status(401).send({
            message: "User not authorized to feature",
            });
        }
        if (decoded.role !== "promotor") {
            return res.status(401).send({
            message: "User not authorized to feature",
            });
        }
        req.user = decoded;
        next();
        });
    },
    validateToken: async (req, res, next) => {
        if (req.token) {
          try {
            if (!req.token) {
              return res.status(400).send({
                succes: false,
                message: "You not have a token",
              });
            } else {
              const verifyData = jwt.verify(req.token, process.env.SCRT_TKN);
              if (!verifyData) {
                return res.status(401).send({
                  succes: false,
                  message: "Unautohrized request",
                });
              } else {
                console.log("masuk");
                req.userData = verifyData;
                console.log("verifiy", verifyData);
                console.log("test userData", req.userData);
                next();
              }
            }
          } catch (error) {
            console.log(error);
            return res.status(400).send("Invalid token");
          }
        } else {
          return res.status(400).send({
            succes: false,
            message: "You not have a token",
          });
        }
      }, 

}