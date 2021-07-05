import React from 'react'
import './Card.css'
import rating from '../../assets/img/ratinglima.png'
import foto from '../../assets/img/p1.jpg'

const Card = (props) => {
    const { img, productName, price, desc } = props;

    return (
        // <div className="col-md-3 mx-4 my-3">
        <div className="card mx-4 my-4 px-2 py-2" style={{ width: "18rem" }}>
            <img className="card-img-top imgShop" src={require(`../../assets/img/${img}`).default} alt="" />
            <div className="card-body">
                <div className="card-title"><strong>{productName}</strong></div>
                <img className="rating" src={rating} alt="" />
                <div className="row">
                    <div className="col-md-5">
                        <label className="priceLabel">Price</label>
                        <label className="priceLabel2"><strong>Rp {price}</strong></label>
                    </div>
                    <div className="col-md-7">
                        <button className="btn btn-dark btnBuy"> Buy Now </button>
                    </div>

                </div>
            </div>
        </div>
        // </div>
    )
}

export default Card;