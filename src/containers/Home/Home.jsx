import React, { Component, Fragment } from 'react'
import './Home.css'
import Header from '../../components/Header/Header.jsx'
import axios from 'axios'
import Card from '../../components/Card/Card.jsx'

class Home extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            username: '',
            customer: [],
            saldo: 0,
            customerId: 0,
            dataCustomer: []
        };
    }

    authHeader = () => {
        const user = JSON.parse(localStorage.getItem('data_customer'));
        console.log(user)

        if (user && user.data.token) {
            return {
                'authorization': `Bearer ${user.data.token}`
            }
        }
        else {
            return null;
        }
    }

    async componentDidMount() {

        if (this.authHeader() == null) {
            this.props.history.push('/')
        }

        if (localStorage.getItem('data_customer') == null) {
            this.props.history.push('/')
        }
        else {
            await console.log("user")
            await console.log(localStorage.getItem('data_customer'))
            const customerJson = JSON.parse(localStorage.getItem('data_customer'));
            console.log(customerJson.data.username);
            this.setState({
                customer: customerJson,
                username: customerJson.data.username
            })

            console.log(this.state.customer)
            console.log(this.state.username)

            await this.getData();
            await this.getCustomer();
        }
    }

    getData = () => {
        axios.get("http://localhost:8002/product/getAll")
            .then(res => {
                this.setState({
                    data: res.data
                })
                console.log("Data Product")
                console.log(this.state.data);
            })
    }

    getCustomer = () => {
        axios.get("http://localhost:8001/customer/get-customer/" + this.state.username)
            .then(res => {
                console.log(res.data.saldo)
                this.setState({
                    saldo: res.data.saldo,
                    customerId: res.data.customerId,
                    dataCustomer: res.data
                })
            })
    }

    render() {
        const { data, username, saldo, customerId, dataCustomer } = this.state;

        return (
            <Fragment>

                <Header
                    username={username}
                    saldo={saldo}
                />

                <div className="container">
                    <div className="location">
                        <div className="row justify-content-center">
                            <h3 className="pageTitle"> S&nbsp;H&nbsp;O&nbsp;P</h3>
                        </div>

                        <div className="container1 mt-3">
                            <div className="d-flex flex-wrap ml-5">
                                {
                                    data.map((val) => {
                                        return (
                                            <Card
                                                key={val.productId}
                                                img={val.imgSrc}
                                                productId={val.productId}
                                                productName={val.productName}
                                                price={val.price}
                                                desc={val.description}
                                                stock={val.stock}
                                                saldo={saldo}
                                                customerId={customerId}
                                                dataCustomer={dataCustomer}
                                            />
                                        )
                                    })
                                }
                                {/* <div className="row justify-content-center">
                                <div className="col-md-3 mx-4 my-3">
                                    <div className="card cardItem px-2 py-2" style={{ width: "18rem" }}>
                                        <div className="row justify-content-center">
                                            <img className="card-img-top imgShop" src={pencil} alt="Cardcap" />
                                            <div className="card-body">
                                                <h5 className="card-title">Card title</h5>
                                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                            </div>
                                            <div className="card-body">

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3 mx-4 my-3">
                                    <div className="card cardItem px-2 py-2" style={{ width: "18rem" }}>
                                        <div className="row justify-content-center">
                                            <img className="card-img-top imgShop" src={pencil} alt="Cardcap" />
                                            <div className="card-body">
                                                <h5 className="card-title">Card title</h5>
                                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                            </div>
                                            <div className="card-body">

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3 mx-4 my-3">
                                    <div className="card cardItem px-2 py-2" style={{ width: "18rem" }}>
                                        <div className="row justify-content-center">
                                            <img className="card-img-top imgShop" src={pencil} alt="Cardcap" />
                                            <div className="card-body">
                                                <h5 className="card-title">Card title</h5>
                                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                            </div>
                                            <div className="card-body">

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Home;
