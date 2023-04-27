

const mapCartItemOutput = (product) => {
  if (!product) return {};
  return {
    id: product.id,
    title: product.attributes.title,
    price: product.attributes.price,
    key: product.attributes.key,
    imgURL: product.attributes.image.data.attributes.url,
  };
}

export default mapCartItemOutput;