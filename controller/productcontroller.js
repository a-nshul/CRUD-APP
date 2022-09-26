const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Product = mongoose.model('Product');

router.get('/', (req, res) => {
    res.render("Product/addOrEdit", {
        viewTitle: "Insert Product"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var Product = new Product();
    Product.ProductId = req.body.ProductId;
    Product.ProductName = req.body.ProductName;
    Product.CategoryName = req.body.CategoryName;
    Product.CategoryId = req.body.CategoryId;
    Product.save((err, doc) => {
        if (!err)
            res.redirect('Product/list');
        else {
            if (err.ProductId == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("Product/addOrEdit", {
                    viewTitle: "Insert Product",
                    Product: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Product.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('product/list'); }
        else {
            if (err.ProductId == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("product/addOrEdit", {
                    viewTitle: 'Update Product',
                    product : req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Product.find((err, docs) => {
        if (!err) {
            res.render("product/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving product list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'ProductId':
                body['ProductIdError'] = err.errors[field].message;
                break;
            case 'ProductName':
                body['ProductNameError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Product.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("product/addOrEdit", {
                viewTitle: "Update Product",
                product: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Product.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/product/list');
        }
        else { console.log('Error in product delete :' + err); }
    });
});

module.exports = router;
