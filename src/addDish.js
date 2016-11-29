import React   from 'react'
import t from 'tcomb-form';
import ReactSelect from 'react-select'
const Form = t.form.Form;


const divStyle = {
    padding:20,
    backgroundColor: 'grey'
};
const AddDish = React.createClass({
    getInitialState() {
        return {
            value: {
                name: 'Сало',
                description: 'Свиной жир в специях любимая еда хохлов',
                price: 200
            },
            canShowForm:false
    };
    },
    componentWillMount(){
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
                let inputKitchen = data;
                let clearKitchen = {};
                let kitchen = t.enums(clearKitchen);
                inputKitchen.filter(function(value, index, arr) {
                    clearKitchen[value.id]=value.name
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

                        let inputIngredient = data;
                        let clearIngredient = {};

                        inputIngredient.filter(function(value, index, arr) {
                            clearIngredient[value.id]=value.name
                        });
                        let ingredient = t.enums(clearIngredient);

                        let Person = t.struct({
                            name: t.String,
                            description: t.String,
                            price: t.Number,
                            kitchen: t.list(kitchen),
                            ingredient: t.list(ingredient)
                        });

                        let options = {

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
                                },
                                kitchen: {
                                    label: 'Кухня'
                                },
                                ingredient: {
                                    label: 'Инградиенты'
                                }
                            }
                        };
                        this.setState({canShowForm:true, type: Person, options: options});


                    });





            });

    },
    onChange(value) {
        this.setState({ value });
    },
    render() {
        return (
            <div style={divStyle}>
                <h3>Добавление блюда</h3>
                {this.state.canShowForm ?
                    <div>
                        <Form
                            ref="form"
                            type={this.state.type}
                            options={this.state.options}
                            value={this.state.value}
                            onChange={this.onChange}
                        />
                        <div className="form-group">
                            <button onClick = {this.onPress} className="btn btn-primary"> Добавить блюдо</button>
                        </div>
                    </div>
                    :null
                }
            </div>


        );
    },
    onPress() {

        var value = this.refs.form.getValue();

        if (value) {
            console.log(value)
            fetch('http://207.154.200.43/oleg/dish/create', {
                method: 'POST',

                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: value.name,
                    description: value.description,
                    price: value.price,
                    kitchen: value.kitchen,
                    ingredient: value.ingredient
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

export default AddDish

