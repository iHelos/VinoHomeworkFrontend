import React   from 'react'
import t from 'tcomb-form';

const Form = t.form.Form;

var Name = t.refinement(t.String, function (str) { return str.length >= 3 &&  str.length <= 16});
Name.getValidationErrorMessage = function (value, path, context) {
    return 'неверный формат логина';
};
var Description = t.refinement(t.String, function (str) {});
var Price = t.refinement(t.Number, function (str) {});


var Person = t.struct({
    name: Name,
    description: Description,
    price: Price
});

var options = {

    fields: {
        name: {
            label: 'Название:',
            placeholder:'Название'
        },
        description: {
            label: 'Описание:',
            placeholder:'Описание'
        },
        price: {
            label: 'Цена в руб.:',
            placeholder:'Цена'
        }
    }
};
const divStyle = {
    padding:20,
    backgroundColor: 'grey'
};
const AddKitchen = React.createClass({
    getInitialState() {
        return {
            value: {
                name: 'Сало',
                description: 'Свиной жир в специях любимая еда хохлов',
                price: 200
            }
        };
    },
    onChange(value) {
        this.setState({ value });
    },
    render() {
        return (
            <div style={divStyle}>
                <h3>Добавление блюда</h3>
                    <Form
                        ref="form"
                        type={Person}
                        options={options}
                        value={this.state.value}
                        onChange={this.onChange.bind(this)}
                        />
                    <div>
                        <button onClick={this.onPress.bind(this)}>
                            Добавить
                        </button>
                    </div>
            </div>


        );
    },
    onPress() {
        var value = this.refs.form.getValue();

        if (value) {
            fetch('https://hardteddy.ru/api/user/login', {
                method: 'POST',

                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: value.name,
                    description: value.description,
                    price: value.price
                })
            }).then((response) => response.json())
                .then((responseJson) => {
                    if(responseJson.status === 0){
                        // Все хорошо
                        console.log('логин ок')
                    }
                    else{
                        console.log('логин не ок');
                        console.log(responseJson);
                    }
                })
                .catch((error) => {
                    console.log('логин ошибка');
                    console.log(error)
                });
        }
    }
});

export default AddKitchen

