import React, { Fragment } from 'react'
import './CardHistory.css'

const CardHistory = (props) => {
    const { img, productName, desc, price, amount, date } = props;
    return (
        <Fragment>
            <div className="card my-2 px-2 py-2" style={{ width: "100%" }}>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-2">
                            <img src={require(`../../assets/img/${img}`).default} alt="" style={{ width: "100%", objectFit: "cover" }} />
                        </div>
                        <div className="col-md-10">
                            <div className="row">
                                <div className="col-md-8">
                                    <font style={{ fontSize: "16px", fontWeight: "bold" }}>{productName}</font>
                                </div>
                                <div className="col-md-4">
                                    <font style={{ fontSize: "14px", fontWeight: "bold" }}>

                                        {new Intl.DateTimeFormat('en-GB', {
                                            weekday: 'long',
                                            month: 'long',
                                            day: '2-digit',
                                            year: 'numeric',
                                            hour: 'numeric',
                                            minute: 'numeric',
                                        }).format(new Date(date))}
                                    </font>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-8">
                                    <font style={{ fontSize: "12px" }}>{desc}</font>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <table>
                                        <tr>
                                            <td><font style={{ fontSize: "14px" }}>Rp {price} &nbsp;</font></td>
                                            <td><font style={{ fontSize: "14px" }}>X &nbsp; <strong>{amount}</strong></font></td>
                                        </tr>
                                    </table>
                                </div>
                                <div className="col-md-4">
                                    <table>
                                        <tr>
                                            <td><font style={{ fontSize: "14px" }}>Total &nbsp;</font></td>
                                            <td><font style={{ fontSize: "14px", fontWeight: "bold" }}>Rp &nbsp;{amount * price}</font></td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}

export default CardHistory;