import { Link } from "react-router-dom";
function Card(props) {
  const { id, name, brand, price } = props.product;
  return (
    <>
      <Link to={`product/${id}`} style={{ textDecoration: 'none' }}>
        <div className="card m-2" style={{ color: 'white', backgroundColor: 'rgb(60,60,60,60)' }}>
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">{brand}</p>
            <p className="card-text">{id}</p>
            <p className="card-text">{price}</p>
            <button className="btn btn-outline-light">
              Add To Cart
            </button>
          </div>
        </div>
      </Link>
    </>
  );
}

export default Card;
