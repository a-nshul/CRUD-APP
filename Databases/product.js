const mongoose=require('mongoose');
var productSchema=new mongoose.Schema({
    ProductId:{
        type:String
    },
    ProductName:{
        type:String
    },
    CategoryName:{
        type:String
    },
    CategoryId:{
        type:String
    }
});
mongoose.model('Product',productSchema);
