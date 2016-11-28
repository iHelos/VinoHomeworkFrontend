import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, browserHistory  } from 'react-router'
import MainComponent from './main'
const App = React.createClass({
    render() {
        return (
            <div>
                <h1>Выберите тип пользователя:</h1>
                <ul>
                    <li><Link to="/admin">Администроатр</Link></li>
                    <li><Link to="/user">Пользователь</Link></li>
                </ul>
                {this.props.children}
            </div>
        )
    }
})

const About = React.createClass({
    render() {
        return <h3>About</h3>
    }
})

class Greeting extends React.Component {
    render() {
        return  <Router history={browserHistory}>
            <Route path="/" component={App}>
                <Route path="admin" component={About} />
                <Route path="user" component={MainComponent}/>
            </Route>
        </Router>
    }
}
export default Greeting