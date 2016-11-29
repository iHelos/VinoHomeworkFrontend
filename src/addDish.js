import React   from 'react'
import t from 'tcomb-form';
import ReactSelect from 'react-select'
const Form = t.form.Form;

var Name = t.refinement(t.String, function (str) { return str.length >= 3 &&  str.length <= 16});
Name.getValidationErrorMessage = function (value, path, context) {
    return 'неверный формат логина';
};


var inputKitchen = [{"id":5,"name":"asd","description":"нет описания"},
    {"id":6,"name":"123213213","description":"нет описания"}];

var clearKitchen = {};

inputKitchen.filter(function(value, index, arr) {
   clearKitchen[value.id]=value.name
});

let kitchen = t.enums(clearKitchen);

var Person = t.struct({
    name: Name,
    description: t.String,
    price: t.Number,
    kitchen: t.list(kitchen)
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
        },
        kitchen: {
            label: 'Кухня'
        }
    }
};
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
                price: 200,
                options: options
            },
            canShowForm:false
    };
    },
    componentWillMount(){
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
                inputKitchen = data;
                console.log(inputKitchen);
                console.log(kitchen);
                inputKitchen.filter(function(value, index, arr) {
                    clearKitchen[value.id]=value.name
                });
                Person = t.struct({
                    name: Name,
                    description: t.String,
                    price: t.Number,
                    kitchen: t.list(kitchen)
                });
                this.setState({kitchen : data, canShowForm:true});


                //-------------------ИЗМЕНЕНИЯ ТУТ!---------------------
                // var resultoptions = [];
                // for (var id in inputKitchen){
                //     resultoptions.push({value: inputKitchen[id].id, text: inputKitchen[id].name})
                // }
                // options.fields = {
                //     kitchen: {
                //         factory: t.form.Select,
                //         options: resultoptions
                //     }
                // };
                // console.log(resultoptions)
                // this.setState({ options: options });

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
                    type={Person}
                    options={this.state.options}
                    value={this.state.value}
                    onChange={this.onChange}
                />
                < div >
                < button onClick = {this.onPress}>
                    Добавить
                    </button>
                    </div></div>
                    :<b></b>
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
                    kitchen: value.kitchen
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

