const { accounts } = require("../models")

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


module.exports = {
    getData: async (req, res, next) => {
        try {
            const result = await accounts.findAll({
                where: req.query,
                order: [["id", "ASC"]]

            });
            return res.status(200).send(result)
        } catch (error) {
            console.log(error);
            return res.status(500).send(error)
        }
    },
    register: async (req, res, next) => {
        try {
            console.log(req.body)
            const checkUser = await accounts.findOne({
                where: { username: req.body.username }
            });
            console.log(checkUser)
            if (checkUser) {
                throw {
                    rc: 400,
                    succes: false,
                    message: "account is exist"
                }
            } else if (req.body.password.length >= 8 && req.body.password === req.body.confirmPassword) {
                const salt = await bcrypt.genSalt(10)
                const hashPassword = await bcrypt.hash(req.body.password, salt)
                console.log("output hash", hashPassword)
                req.body.password = hashPassword
                delete req.body.confirmPassword
                const result = await accounts.create(req.body)
                // const token = jwt.sign({
                //     id : result.id , 
                //     email : result.email ,
                // } , process.env.SCRT_TOKEN ,{
                //     expiresIn:"1h"
                // })
                return res.status(201).send({
                    succes: true,
                    message: "register succesfully",
                    result: result
                })
            } else {
                return res.status(400).send({
                    sucess:false , 
                    message : "Password must be same"
                })
            }
        } catch (error) {
            console.log(error)
            return res.status(error.rc || 500).send(error)
        }
    },

    login: async (req , res , next) => {
        try {
            const result = await accounts.findOne({
                where : {
                    email : req.body.email
                } ,
                raw : true
            });
            const isValid = await bcrypt.compare(req.body.password , result.password);
            if(isValid){
                const { id , username , email, password , role} = result;
                const token = jwt.sign(
                    {
                        id ,
                        username , 
                        email , 
                        password ,
                        role
                    } ,
                    process.env.SCRT_TKN , 
                    {
                        expiresIn : "1h" ,
                    }
                );
                return res.status(200).send({
                    sucess : true , 
                    result : {
                        token , 
                        role,
                    }
                })
            }else {
                return res.status(400).send({
                    success: false,
                    message: "Account not available",
                  });
            }
            
        } catch (error) {
            res.status(500).send(error)
            console.log(error)
        }
    }, 
     
    resetPass: async (req , res , next ) => {
        try {
            const token = req.token; 
            const accountData = jwt.verify(token , process.env.SCRT_TKN);
            if(req.body.password == req.body.confirmPassword ) { 
                delete req.body.confirmPassword;
                const salt = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(req.body.password , salt);
                req.body.password = hashPassword;
                await accounts.update(
                    {
                      password: req.body.password,
                    },
                    {
                      where: {
                        id: accountData.id,
                      },
                    }
                  );
                  return res.status(201).send("Password has been updated")
            }else {
                return res.status(500).send("Password invalid")
            }
            
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    }, 
    

    // login: async (req, res, next) => {
    //     try {
    //         const result = await accounts.findOne({
    //             where: {
    //                 email: req.body.email,
    //             },
    //             raw : true , 
    //         })

    //         const isValid = await bcrypt.compare(req.body.password, result.password)
    //         console.log(isValid);
    //         if (isValid) {
    //             //GENERATAE TOKEN : payload  
    //             const { id , username , email } =result 
    //             const token = jwt.sign({
    //                id , 
    //                email ,
    //                username
    //             } , 
    //             process.env.SCRT_TOKEN ,
    //             {
    //             expiresIn : "1h",
    //             }
    //             )
    //             return res.status(200).send({
    //                 succes : true ,
    //                 result : {
    //                     username , 
    //                     email , 
    //                     token 
    //                 }
    //             })
    //         } else {
    //             return res.status(401).send({
    //                 succes: false,
    //                 message: "account tidak ada"
    //             })
    //         }
    //     } catch (error) {
    //         console.log(error)
    //         return res.staus(500).send(error)
    //     }
    // }
}
