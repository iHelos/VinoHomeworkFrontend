import React   from 'react'
import t from 'tcomb-form';

const Form = t.form.Form;



var Name = t.refinement(t.String, function (str) { return str.length >= 3 &&  str.length <= 16});
Name.getValidationErrorMessage = function (value, path, context) {
    return 'неверный формат логина';
};




var Person = t.struct({
    name: Name,
    description: t.String
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
        }
    }
};
const divStyle = {
    padding:20,
    backgroundColor: 'yellow'
};
const AddIngredient = React.createClass({
    getInitialState() {
        return {
            value: {
                name: 'Ботат',
                description: 'Сладкий картофель'
            }
        };
    },
    onChange(value) {
        this.setState({ value });
    },
    render() {
        return (
            <div style={divStyle}>
                <h3>Добавление ингрeдиента</h3>
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
            fetch('http://207.154.200.43/oleg/ingredient/create', {
                method: 'POST',

                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: value.name,
                    description: value.description
                })
            }).then((response) => response.json())
                .then((responseJson) => {
                    if(responseJson.status === 1){
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

export default AddIngredient

