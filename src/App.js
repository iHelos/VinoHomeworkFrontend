import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, browserHistory  } from 'react-router'
import MainComponent from './main'
import Admin from './admin'
import AddKitchen from './addKitchen'
import AddIngredient from './addIngredient'
import AddDish from './addDish'
import DeleteDish from './deleteDish'
import Test from './test'
const App = React.createClass({
    render() {
        return (
            <div>
                <h1>Выберите тип пользователя:</h1>
                <ul>
                    <li><Link to="/admin">Администратор</Link></li>
                    <li><Link to="/user">Пользователь</Link></li>
                </ul>
                {this.props.children}
            </div>
        )
    }
});




class Greeting extends React.Component {
    render() {
        return <Router history={browserHistory}>
            <Route path="/" component={App}>
                <Route path="admin" component={Admin}>
                    <Route path="/add_kitchen" component={AddKitchen}/>
                    <Route path="/add_ingredient" component={AddIngredient}/>
                    <Route path="/add_dish" component={AddDish}/>
                    <Route path="/delete_dish" component={DeleteDish}/>
                    <Route path="/test" component={Test}/>
                </Route>
                <Route path="user" component={MainComponent}/>
            </Route>
        </Router>
    }
}
export default Greeting