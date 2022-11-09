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

        req.flash('success', 'Seu usuario foi criado com sucesso!');
        req.session.save(function(){
            return res.redirect('back');
        });

        return res.send(login.errors);
        
    } catch (error) {
        console.log(e);
        return res.render('404');
    } 
};

exports.login = async function(req, res){
    try {
        const login = new Login(req.body);
        await login.login();
    
        if(login.errors.length > 0){
            req.flash('erros', login.errors);
            req.session.save(function(){
                return res.redirect('back');
            });
            return;
        }

        req.flash('success', 'Você logou no sistema');
        req.session.user = login.user;
        req.session.save(function(){
            return res.redirect('back');
        });

        return res.send(login.errors);
        
    } catch (error) {
        console.log(e);
        return res.render('404');
    } 
};