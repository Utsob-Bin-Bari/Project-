import Product from '../models/product';

const PRODUCTS = [
  new Product(
    'p1',
    'u1',
    'Make your Photo Album',
    require('../assets/AlbumImage.png'),
    'A red t-shirt, perfect for days with non-red weather.',
    1
  ),
  new Product(
    'p2',
    'u1',
    'Baby Monthly Album',
    require('../assets/Baby.jpeg'),
    'Fits your red shirt perfectly. To stand on. Not to wear it.',
    2
  ),
  new Product(
    'p3',
    'u2',
    'Wedding Story Album',
    require('../assets/Wedding.png'),
    'Can also be used for tea!',
    3
  ),
];

export default PRODUCTS;
