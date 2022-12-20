exports.Query = {
  hello: () => 'Hello world!',
  products: (parents, { filter }, { db }) => {
    let filteredProducts = db.products;

    if (filter) {
      const { onSale, avgRating } = filter;

      if (onSale !== null) {
        filteredProducts = filteredProducts.filter(
          product => product.onSale === onSale
        );
      }

      if (avgRating !== null && [1, 2, 3, 4, 5].includes(avgRating)) {
        filteredProducts = filteredProducts.filter(product => {
          let sumRating = 0;
          let numOfReviews = 0;
          db.reviews.forEach(review => {
            if (review.productId === product.id) {
              sumRating += review.rating;
              numOfReviews++;
            }
          });

          const avgProductRating = sumRating / numOfReviews;
          return avgProductRating >= avgRating;
        });
      }
    }

    return filteredProducts;
  },
  product: (parent, { id }, { db }) => {
    return db.products.find(product => product.id === id);
  },
  categories: (parent, args, { db }) => db.categories,
  category: (parent, { id }, { db }) => {
    return db.categories.find(category => category.id === id);
  },
};
