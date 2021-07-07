import React from 'react'
import { useState } from 'react'
import './Card.css'
import rating from '../../assets/img/star.png'
import { Modal, Button } from 'react-bootstrap'
import axios from 'axios'
import swal from 'sweetalert';


const Card = (props) => {

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
                            {
                                (stock <= 0) ?
                                    <>
                                        <img className="rating" src={rating} alt="" />
                                        <label className="greyFont">&nbsp;4,5 &nbsp; | &nbsp; <font style={{ color: "red" }}>Out of Stock</font></label>
                                    </>
                                    : (stock < 4) ?
                                        <>
                                            <img className="rating" src={rating} alt="" />
                                            <label className="greyFont">&nbsp;4,5 &nbsp; | &nbsp; <font style={{ color: "red" }}>Stock ({stock})</font></label>
                                        </>
                                        :
                                        <>
                                            <img className="rating" src={rating} alt="" />
                                            <label className="greyFont">&nbsp;4,5 &nbsp; | &nbsp; Stock ({stock})</label>
                                        </>
                            }
                        </div>
                    </div>
                    <div className="row mt-1">
                        <div className="col-md-5">
                            <label className="priceLabel"><strong className="priceLabel2">Rp {price}</strong></label>
                        </div>
                        <div className="col-md-7">
                            {
                                (stock <= 0) ? <button className="btn btn-dark btnBuy" disabled> Buy Now </button>
                                    : <button className="btn btn-dark btnBuy" onClick={handleShow}> Buy Now </button>
                            }
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <font style={{ fontSize: "16px", fontWeight: "bold" }}>{productName}</font>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-3">
                            <img style={{ width: "100px" }} src={require(`../../assets/img/${img}`).default} alt="" />
                        </div>
                        <div className="col-md-9">
                            <font style={{ fontSize: "12px" }}>{desc}</font>
                        </div>
                    </div>

                    <form>
                        <div className="row mt-2">
                            <div className="col-md-6">
                                <label>Stock</label>
                                <input type="number" className="form-control" id="stock" value={stock - amount} readOnly />
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
                        Cancel
                    </Button>
                    {
                        (amount < 1) ?
                            <Button variant="info" disabled>
                                Buy Now
                            </Button> :
                            ((amount * price) > saldo) ?
                                <Button variant="info" disabled>
                                    Buy Now
                                </Button>
                                :
                                <Button variant="info" onClick={handleSubmit}>
                                    Buy Now
                                </Button>
                    }
                </Modal.Footer>
            </Modal>

            <Modal show={oShow} onHide={handleCloseO}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <font style={{ fontSize: "16px", fontWeight: "bold" }}>
                            Order Details
                        </font>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-10">
                            <font style={{ fontSize: "14px", fontWeight: "bold" }}>{dataCustomer.name}</font> <br />
                            <font style={{ fontSize: "12px", fontWeight: "bold" }}>{dataCustomer.email}</font> <br />
                            <font style={{ fontSize: "12px" }}>{dataCustomer.address}</font>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-md-3">
                            <img style={{ width: "100px" }} src={require(`../../assets/img/${img}`).default} alt="" />
                        </div>
                        <div className="col-md-9">
                            <font style={{ fontSize: "12px" }}>{desc}</font><br />
                            <table>
                                <tr>
                                    <td><font style={{ fontSize: "12px" }}>Amount</font></td>
                                    <td>&nbsp;:&nbsp;</td>
                                    <td><badge className="badge badge-dark" style={{ fontSize: "12px", fontWeight: "bold" }}>{amount}</badge></td>
                                </tr>
                                <tr>
                                    <td><font style={{ fontSize: "12px" }}>Cost</font></td>
                                    <td>&nbsp;:&nbsp;</td>
                                    <td><badge className="badge badge-dark" style={{ fontSize: "12px", fontWeight: "bold" }}>Rp {amount * price}</badge></td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseO}>
                        Close
                    </Button>
                    <Button variant="info" onClick={handleSubmitO}>
                        Confirmation
                    </Button>
                </Modal.Footer>
            </Modal>


        </>
    )
}

export default Card;