exports.Category = {
  products: ({ id }, { filter }, { db }) => {
    const categoryProducts = db.products.filter(
      product => product.categoryId === id
    );
    let filteredProducts = categoryProducts;

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
};
