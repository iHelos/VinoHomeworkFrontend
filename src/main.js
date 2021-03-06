import React   from 'react'
import Cart  from './CartStarterKit.jsx';
import Griddle from 'griddle-react'
import items   from './sampledata'

const MainComponent = React.createClass({
    getInitialState() {
        return {
            canOrder: true,
            isFetching : true,
            data : {},
            orderID:0
        }
    },
    componentWillMount(){
        fetch("//207.154.200.43/ann/dish")
            .then(response => response.json())
            .then(json => {
                let sourcedata = json.result;
                console.log(json.result)
                let data = [];
                for (var key in sourcedata) {
                    let item = sourcedata[key];
                    data.push(item)
                }
                this.setState({data : data});
            });
        fetch("//207.154.200.43/ann/ingredient")
            .then(response => response.json())
            .then(json => {
                let sourcedata = json.result;
                console.log(json.result)
                let data = [];
                for (var key in sourcedata) {
                    let item = sourcedata[key];
                    data.push(item)
                }
                this.setState({ingredient : data});
            });
        fetch("//207.154.200.43/ann/kitchen")
            .then(response => response.json())
            .then(json => {
                let sourcedata = json.result;
                console.log(json.result)
                let data = [];
                for (var key in sourcedata) {
                    let item = sourcedata[key];
                    data.push(item)
                }
                this.setState({kitchen : data});
            });

    },
    handleRowClick(row) {
        this.refs.cart.addItem(row.props.data.id, 1, row.props.data)
    },
    handleIngredientClick(row) {
        console.log(row);
        fetch("//207.154.200.43/ann/dish/ingredient/"+row.props.data.id)
            .then(response => response.json())
            .then(json => {
                let sourcedata = json.result;
                console.log(json.result)
                let data = [];
                for (var key in sourcedata) {
                    let item = sourcedata[key];
                    data.push(item)
                }
                this.setState({data : data});
            });
    },
    handleKitchenClick(row) {
        fetch("//207.154.200.43/ann/dish/kitchen/"+row.props.data.id)
            .then(response => response.json())
            .then(json => {
                let sourcedata = json.result;
                console.log(json.result)
                let data = [];
                for (var key in sourcedata) {
                    let item = sourcedata[key];
                    data.push(item)
                }
                this.setState({data : data});
            });
    },
    notifyItemAdded(item) {
        console.log('--------------------------------------------------')
        console.log('item added')
        console.log(item)
    },
    notifyItemRemoved(item) {
        console.log('--------------------------------------------------')
        console.log('item removed')
        console.log(item)
    },
    notifyQtyChanged(item, quantity, oldQty) {
        console.log('--------------------------------------------------')
        console.log('item quantity changed')
        console.log(item)
        console.log('New quantity : ' + quantity)
        console.log('Old quantity : ' + oldQty)
    },
    handleSubmit() {
        //"//127.0.0.1:3001/order/"
        fetch("//207.154.200.43/ann/order/",
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    order: this.refs.cart.getSelection()
                })
            }
            ).then(result => result.json()).then(result => {
                console.log(result);
                this.setState(
                    {
                        canOrder : false,
                        orderID:result.result
                    }
                    )
            }).catch(error => console.log(error));

        console.log(this.refs.cart.getSelection())
    },
    handleEmptyCart() {
        this.refs.cart.emptyCart()
    },
    handleReset() {
        //this.refs.cart.reset()
        fetch("//207.154.200.43/ann/dish")
            .then(response => response.json())
            .then(json => {
                let sourcedata = json.result;
                console.log(json.result)
                let data = [];
                for (var key in sourcedata) {
                    let item = sourcedata[key];
                    data.push(item)
                }
                this.setState({data : data});
            });
    },
    refresh() {
        this.setState({
            buttonsVisible : !this.refs.cart.isEmpty()
        })
    },
    componentDidMount() {
        this.refresh()
    },
    rowIterator(context, row) {
        if (!context) {
            return {
                total : 0
            }
        } else {
            const price = Number(row.data['price'])
            return {
                total : context.total + row.quantity * price
            }
        }
    },
    render() {
        return (
            <div>
                <h1>Ингредиенты:</h1>
                <Griddle
                    showFilter        = {false}
                    columns           = {['name', 'description']}
                    useGriddleStyles  = {true}
                    onRowClick        = {this.handleIngredientClick}
                    results           = {this.state.ingredient} />
                <h1>Кухни:</h1>
                <Griddle
                    showFilter        = {false}
                    columns           = {['name', 'description']}
                    useGriddleStyles  = {true}
                    onRowClick        = {this.handleKitchenClick}
                    results           = {this.state.kitchen} />
                <h1>Блюда:</h1>
                <Griddle
                    showFilter        = {false}
                    columns           = {['name', 'description', 'price']}
                    useGriddleStyles  = {true}
                    onRowClick        = {this.handleRowClick}
                    results           = {this.state.data} />
                <hr />
                {this.state.canOrder ?
                <Cart
                    ref               = 'cart'
                    onItemAdded       = {this.notifyItemAdded}
                    onItemRemoved     = {this.notifyItemRemoved}
                    onItemQtyChanged  = {this.notifyQtyChanged}
                    onChange          = {this.refresh}
                    columns           = {['name', 'description', 'price']}
                    iterator          = {this.rowIterator}
                    cartEmptyMessage  = {'No items.'} />
                    : <a>Ваш заказ принят! Номер заказа: {this.state.orderID}</a> }
                <hr />
                {this.state.buttonsVisible ? (
                    <div>
                        <button onClick={this.handleSubmit}>
                            Submit
                        </button>
                        <button onClick={this.handleEmptyCart}>
                            Clear cart
                        </button>
                    </div>
                ) : <span />}
                <button onClick={this.handleReset}>
                    Reset
                </button>
            </div>
        )
    }
})

export default MainComponent
