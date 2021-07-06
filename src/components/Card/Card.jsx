import React from 'react'
import { useState } from 'react'
import './Card.css'
import rating from '../../assets/img/star.png'
import { Modal, Button } from 'react-bootstrap'
import axios from 'axios'
import swal from 'sweetalert';
import { useHistory } from 'react-router';


const Card = (props) => {
    const history = useHistory();

    const { img, productName, price, desc, stock, saldo, productId, customerId, dataCustomer } = props;

    const [show, setShow] = useState(false);

    const [oShow, setOShow] = useState(false);

    const [amount, setAmount] = useState(0);

    const handleClose = () => {
        setShow(false)
    }

    const handleShow = () => {
        setShow(true)
    }

    const handleCloseO = () => {
        setOShow(false)
    }

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
        console.log(e.target.value);
    }

    const handleSubmit = () => {
        setShow(false)
        setOShow(true)
    }

    const handleSubmitO = async () => {
        await setOShow(false);

        const transaction = {
            customerId: customerId,
            productId: productId,
            amount: amount
        }

        await console.log(transaction)
        await console.log(saldo)

        await axios.post("http://localhost:8003/transaction/add-transaction", transaction)
            .then(res => {
                console.log(res)
            })
            .catch(function (error) {
                console.log(error.message)
            })

        // swal("Successfully!", "Check your email for more information", "success");
        await swal({
            title: "Transaction Successfully!",
            text: "Check your email for more information",
            icon: "success",
            button: "OK!",
        });

        await window.location.reload();
    }

    return (
        <>
            <div className="card cardProduct mx-4 my-4 px-2 py-2" style={{ width: "18rem" }}>
                <img className="card-img-top imgShop" src={require(`../../assets/img/${img}`).default} alt="" />
                <div className="card-body">
                    <div className="row judul">
                        <div className="col-md-12">
                            <div className="card-title"><strong>{productName}</strong></div>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-md-10">
                            <img className="rating" src={rating} alt="" />
                            <label className="greyFont">&nbsp;4,5 &nbsp; | &nbsp; Stock ({stock})</label>
                        </div>
                    </div>
                    <div className="row mt-1">
                        <div className="col-md-5">
                            <label className="priceLabel"><strong className="priceLabel2">Rp {price}</strong></label>
                        </div>
                        <div className="col-md-7">
                            <button className="btn btn-dark btnBuy" onClick={handleShow}> Buy Now </button>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{productName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{desc}</p>
                    <form>
                        <div className="row">
                            <div className="col-md-6">
                                <label>Stock</label>
                                <input type="number" className="form-control" id="stock" value={stock} readOnly />
                            </div>
                            <div className="col-md-6">
                                <label>Amount</label>
                                <input type="number" step="1" min="0" max={stock} className="form-control" id="amount" onChange={handleAmountChange} value={amount} required />
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-6">
                                <label>Price</label>
                                <input type="number" className="form-control" id="price" value={price} readOnly />
                            </div>
                            <div className="col-md-6">
                                {
                                    (amount * price) > saldo ?
                                        <>
                                            <label>Cost</label>
                                            <input type="number" className="form-control" style={{ color: "red" }} id="cost" value={amount * price} readOnly />
                                            <span style={{ fontSize: "10px", color: "red" }}>Not enough saldo!</span>
                                        </>
                                        :
                                        <>
                                            <label>Cost</label>
                                            <input type="number" className="form-control" id="cost" value={amount * price} readOnly />
                                        </>
                                }
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {
                        ((amount * price) > saldo || amount > stock || amount === 0) ?
                            <Button variant="primary" onClick={handleSubmit} disabled>
                                Buy Now
                            </Button> :
                            <Button variant="primary" onClick={handleSubmit}>
                                Buy Now
                            </Button>
                    }
                </Modal.Footer>
            </Modal>

            <Modal show={oShow} onHide={handleCloseO}>
                <Modal.Header closeButton>
                    <Modal.Title>Order Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>amount : {amount}</p>
                    <p>cost : {amount * price}</p>
                    <p>email : {dataCustomer.email}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseO}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmitO}>
                        Confirmation
                    </Button>
                </Modal.Footer>
            </Modal>


        </>
    )
}

export default Card;