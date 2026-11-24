let authController = {
    login: (req,res)=>{
        res.send(
            {
                status: true,
                message: 'Login Done'
            }
        )
    }
}

module.exports = authController