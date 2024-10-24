import { Link } from "react-router-dom";
function Card(props) {
  const { id, name, brand, price } = props.product;
  return (
    <>
      <Link to={`product/${id}`} style={{ textDecoration: 'none' }}>
        <div className="card m-2">
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">{brand}</p>
            <p className="card-text">{id}</p>
            <p className="card-text">{price}</p>
            <Link to="/" className="btn btn-outline-dark">
              Add To Cart
            </Link>
          </div>
        </div>
      </Link>
    </>
  );
}

export default Card;
