import React, { Component, Fragment } from 'react'
import './History.css'
import Header from '../../components/Header/Header.jsx'
import axios from 'axios'
import CardHistory from '../../components/CardHistory/CardHistory.jsx'

class History extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            username: '',
            customer: [],
            saldo: 0,
            customerId: 0,
            dataCustomer: [],
            home: false
        }
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
        axios.get("http://localhost:8083/transaction/get-all")
            .then(res => {
                this.setState({
                    data: res.data
                })
                console.log("Data Transaction")
                console.log(this.state.data);
            })
    }

    getCustomer = () => {
        axios.get("http://localhost:8082/customer/get-customer/" + this.state.username)
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
        const { data, username, saldo, home } = this.state;
        const filterData = data.sort((a, b) =>
            new Date(b.transactionDate) - new Date(a.transactionDate)
        );

        return (
            <Fragment>
                <Header
                    home={home}
                    username={username}
                    saldo={saldo}
                />

                <div className="container mt-3">
                    <div className="d-flex flex-wrap ml-5">
                        {
                            filterData.map((val) => {
                                return (
                                    <CardHistory
                                        key={val.transactionId}
                                        img={val.productEntity.imgSrc}
                                        productName={val.productEntity.productName}
                                        desc={val.productEntity.description}
                                        price={val.productEntity.price}
                                        amount={val.amount}
                                        date={val.transactionDate}
                                    />
                                )
                            })
                        }
                    </div>
                </div>

            </Fragment>
        )
    }

}

export default History;