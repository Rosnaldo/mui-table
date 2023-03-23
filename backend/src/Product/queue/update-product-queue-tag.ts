export const UpdateProductQueue = {
  exchange: 'PRODUCT',
  routingKey: 'update-product',
  queue: 'update-product-queue',
  nackOnError: true,
};
