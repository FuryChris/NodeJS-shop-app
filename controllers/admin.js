const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  const product = new Product(
    {
      // po lewej - nazwy ze schema, a po prawej - przypisanie do danych powyżej
      title: title,
      price: price,
      description: description,
      imageUrl: imageUrl,
      userId: req.user._id
      // lub req.user._id
    // wczesniej w vanilla mongo nie mongoose - było tworzenie obiektu
     });
  product
    .save() // mongoose ma swoją metodę save
    .then(result => {
      // console.log(result);
      console.log('Created Product');
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product
      });
    })
    .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  Product
    .findById(prodId)
    .then( product => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.imageUrl = updatedImageUrl;
      product.description = updatedDesc;
      //save to metoda z mongoose bo product będzie nie js obiektem, ale obiektem z basy danych. .save użyty na istniejącym obiekcie nie stworzy nowego ale zaktualizuje stary
      product.save()
    })
    .then(result => {
        console.log('UPDATED PRODUCT!');
        res.redirect('/admin/products');
      })
    .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.find()
  //  !!!! BARDZO WAŻNE
    // .select('title price -_id')
    // .populate('userId')
    .then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByIdAndRemove(prodId)
    .then(() => {
      console.log('DESTROYED PRODUCT');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};
