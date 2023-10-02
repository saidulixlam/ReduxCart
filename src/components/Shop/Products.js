import ProductItem from './ProductItem';
import classes from './Products.module.css';

const dummy = [
  { id: 'p1', price: 6, title: 'my 1st book', description: '1st book spcl' },
  { id: 'p2', price: 8, title: 'my 2nd book', description: '2nd book spcl' },
  { id: 'p3', price: 10, title: 'my 3rd book', description: '3rd book spcl' }
]
const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {dummy.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
