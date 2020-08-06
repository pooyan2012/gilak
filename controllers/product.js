const formidable = require("formidable"); //A Node.js module for parsing form data, especially file uploads.|https://www.npmjs.com/package/formidable
const _ = require("lodash");
const fs = require("fs");
const Product = require("../models/product");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.productById = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err || !product) {
      return res.status(400).json({
        error: "محصولی یافت نشد",
      });
    }
    req.product = product;
    next();
  });
};

exports.read = (req, res) => {};

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "عکس قابل آپلود نیست",
      });
    }

    //check for all fields
    const { name, description, price, category, quantity, shipping } = fields;

    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({
        error: "تمام فیلد ها باید پر شوند",
      });
    }

    let product = new Product(fields);

    if (files.photo) {
      if (files.photo.size > 1000000 /* 1mb */) {
        return res.status(400).json({
          error: "Image should be less than 1mb",
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }
    product.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(result);
    });
  });
};
