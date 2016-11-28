import React   from 'react'
import {  Link  } from 'react-router'

const AdminComponent = React.createClass({
        render() {
            return  <div>
                <h3>Панель администратора</h3>
                <ul>
                    <li><Link to="/add_kitchen">Добавить кухню</Link></li>
                    <li><Link to="/add_ingredient">Добавить ингредиент</Link></li>
                    <li><Link to="/add_dish">Добавить блюдо</Link></li>
                </ul>
                {this.props.children}
            </div>
        }
});

export default AdminComponent