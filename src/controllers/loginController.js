const Login = require('../models/LoginModel');

exports.index = (req, res) =>{
    res.render('login');
};

//cadastro login
exports.register = async function(req, res){
    try {
        const login = new Login(req.body);
        await login.register();
    
        if(login.errors.length > 0){
            req.flash('erros', login.errors);
            req.session.save(function(){
                return res.redirect('back');
            });
            return;
        }

        req.flash('sucess', 'Seu usuario foi criado com sucesso!');
        req.session.save(function(){
            return res.redirect('back');
        });

        return res.send(login.errors);
        
    } catch (error) {
        console.log(e);
        return res.render('404');
    } 
};