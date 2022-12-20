const { v4: uuidv4 } = require('uuid');

const dataNotFound = (id, data, returnVal) => {
  if (!id || !data.some(item => item.id === id)) {
    return returnVal;
  }
};

exports.Mutation = {
  addCategory: (parent, { input }, { db }) => {
    const { name } = input;

    const newCategory = {
      id: uuidv4(),
      name,
    };

    db.categories.push(newCategory);

    return newCategory;
  },
  addProduct: (parent, { input }, { db }) => {
    const { name, description, quantity, price, onSale, categoryId } = input;

    const newProduct = {
      id: uuidv4(),
      name,
      description,
      quantity,
      price,
      onSale,
      categoryId,
    };

    db.products.push(newProduct);

    return newProduct;
  },
  addReview: (parent, { input }, { db }) => {
    const { date, title, comment, rating, productId } = input;

    const newReview = {
      id: uuidv4(),
      date,
      title,
      comment,
      rating,
      productId,
    };

    db.reviews.push(newReview);

    return newReview;
  },
  deleteCategory: (parent, { id }, { db }) => {
    dataNotFound(id, db.categories, false);

    db.categories = db.categories.filter(category => category.id !== id);
    db.products = db.products.map(product => {
      return product.categoryId === id
        ? { ...product, categoryId: null }
        : product;
    });
    return true;
  },
  deleteProduct: (parent, { id }, { db }) => {
    dataNotFound(id, db.products, false);

    db.products = db.products.filter(product => product.id !== id);
    db.reviews = db.reviews.filter(review => review.productId !== id);
    return true;
  },
  deleteReview: (parent, { id }, { db }) => {
    dataNotFound(id, db.reviews, false);

    db.reviews = db.reviews.filter(review => review.id !== id);
    return true;
  },
  updateCategory: (parent, { id, input }, { db }) => {
    dataNotFound(id, db.categories, null);
    const { name } = input;

    const updatedCategory = {
      id,
      name,
    };

    db.categories = db.categories.map(category => {
      return category.id === id ? updatedCategory : category;
    });

    return updatedCategory;
  },
  updateProduct: (parent, { id, input }, { db }) => {
    dataNotFound(id, db.products, null);
    const { name, description, quantity, price, onSale, categoryId } = input;

    const updatedProduct = {
      id,
      name,
      description,
      quantity,
      price,
      onSale,
      categoryId,
    };

    db.products = db.products.map(product => {
      return product.id === id ? updatedProduct : product;
    });

    return updatedProduct;
  },
  updateReview: (parent, { id, input }, { db }) => {
    dataNotFound(id, db.reviews, null);
    const { date, title, comment, rating, productId } = input;

    const updatedReview = {
      id,
      date,
      title,
      comment,
      rating,
      productId,
    };

    db.reviews = db.reviews.map(review => {
      return review.id === id ? updatedReview : review;
    });

    return updatedReview;
  },
};
