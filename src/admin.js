import React   from 'react'
import {  Link  } from 'react-router'

const AdminComponent = React.createClass({
        render() {
            return  <div>
                <h3>Панель администратора</h3>
                <ul>
                    <li><Link to="/add_kitchen">Добавить Кухню</Link></li>
                </ul>
                {this.props.children}
            </div>
        }
})

export default AdminComponent