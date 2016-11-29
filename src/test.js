import React   from 'react'
import t from 'tcomb-form';

const Form = t.form.Form;
let inputKitchen = [{"id":5,"name":"asd","description":"нет описания"},
    {"id":6,"name":"123213213","description":"нет описания"}];

import Select from 'react-select';

/*
 * assuming the API returns something like this:
 *   const json = [
 *     { value: 'one', label: 'One' },
 *     { value: 'two', label: 'Two' }
 *   ]
 */

const getOptions = (input) => {
    return fetch("//207.154.200.43/ann/kitchen")
        .then(response => response.json())
        .then(json => {
            let sourcedata = json.result;
            console.log(json.result)
            let data = [];
            for (var key in sourcedata) {
                let item = sourcedata[key];
                data.push(item)
            }
            let res=[]
            let result = {}
            data.filter(function(value, index, arr) {
                result['value']=value.id;
                result['label']=value.name
                res.push(result)
            });
console.log(res)
            complete: true
            return { options: res}

        });
}



class MyForm extends React.Component {
    constructor() {
        super();
        this.state = {
            schema: this.generateSchema(),
            value: {
                formfields: []
            }
        };
        this.addFilter = this.addFilter.bind(this);
        this.generateSchema = this.generateSchema.bind(this);
        this.addMeta = this.addMeta.bind(this);
        this.onChange = this.onChange.bind(this);

    }
//    componentWillMount(){
//
//    fetch("//207.154.200.43/ann/kitchen")
//        .then(response => response.json())
//        .then(json => {
//            let sourcedata = json.result;
//            console.log(json.result)
//            let data = [];
//            for (var key in sourcedata) {
//                let item = sourcedata[key];
//                data.push(item)
//            }
//            inputKitchen = data
//
//
//        });
//
//}
    generateSchema() {
        var clearKitchen = {};
        console.log(inputKitchen)
        inputKitchen.filter(function(value, index, arr) {
            clearKitchen[value.id]=value.name
        });

        let kitchen = t.enums(clearKitchen);

        const Fields = t.list(kitchen);
        console.log(Fields)

        const Schema = t.struct({
            title: t.String,
            description: t.String,
            longName: t.String,
            canAddProducts: t.Boolean,
            formfields: Fields
        });
        return Schema;



    }

    onChange(value) {
        this.setState({value});
    }

    render() {
        return (
            <div>
                <t.form.Form ref="form" type={this.state.schema} value={this.state.value} onChange={this.onChange} />
                <Select.Async
                    name="form-field-name"
                    value="one"
                    loadOptions={getOptions}
                    />
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Save</button>
                    <button className="btn btn-primary" onClick={this.addFilter} >Add Filter Field</button>
                    <button className="btn btn-primary" onClick={this.addMeta} >Add Metadata Field</button>
                </div>
            </div>
        );
    }

    addFilter() {
        this.setState({
            value: t.update(this.state.value, {
                formfields: {
                    $push: [undefined]
                }
            })
        });
    }

    addMeta() {
        this.setState({
            value: t.update(this.state.value, {
                formfields: {
                    $push: [{}]
                }
            })
        });
    }

}
export default MyForm

