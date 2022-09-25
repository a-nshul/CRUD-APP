const mongoose=require('mongoose');
var productSchema=new mongoose.Schema({
    yourName:{
        type:String
    },
    email:{
        type:String
    },
    mobile:{
        type:String
    },
    city:{
        type:String
    }
});
productSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');
mongoose.model('Product',productSchema);