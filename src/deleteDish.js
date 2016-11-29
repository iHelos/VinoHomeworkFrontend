import React   from 'react'
import t from 'tcomb-form';
import { ListGroup,ListGroupItem, Grid, Row, Col, Label } from 'react-bootstrap';
const divStyle = {
    padding:20,
    backgroundColor: 'teal'
};
let onDelete = function(id) {
    fetch("//207.154.200.43/oleg/dish/delete/"+id, {
        method: 'POST',

        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        })
    }).then((response) => response.json())
        .then((responseJson) => {
            if(responseJson.status === 1){
                // Все хорошо
                console.log('удаление ок')
            }
            else{
                console.log('удаление не ок');
                console.log(responseJson);
            }
        })
        .catch((error) => {
            console.log('удаление ошибка');
            console.log(error)
        });

};
let onChange = function(id) {
    alert('Изменяю',id);
    //fetch("//207.154.200.43/oleg/dish/delete/"+id, {
    //    method: 'POST',
    //
    //    headers: {
    //        'Accept': 'application/json',
    //        'Content-Type': 'application/json'
    //    },
    //    body: JSON.stringify({
    //    })
    //}).then((response) => response.json())
    //    .then((responseJson) => {
    //        if(responseJson.status === 1){
    //            // Все хорошо
    //            console.log('удаление ок')
    //        }
    //        else{
    //            console.log('удаление не ок');
    //            console.log(responseJson);
    //        }
    //    })
    //    .catch((error) => {
    //        console.log('удаление ошибка');
    //        console.log(error)
    //    });

}
var ProperListRender = React.createClass({
    render: function() {
        return (
            <ListGroup>
                {this.props.list.map(function(listValue){

                    let val = listValue.name;
                    console.log(val)
                    return <ListGroupItem>
                        <Grid>
                        <Row>
                            <Col xs={3} md={3}>
                                <Label>Название:</Label>
                                <p>{listValue.name}</p>
                            </Col>
                            <Col xs={5} md={7}>
                                <Label>Описание:</Label>
                                <p>{listValue.description}</p>
                            </Col>
                            <Col xs={2} md={1}>
                                <button onClick = {()=>onDelete(listValue.id)}>Удалить</button>
                            </Col>
                            <Col xs={2} md={1}>
                                <button onClick = {()=>onChange(listValue.id)}>Изменить</button>
                            </Col>
                            </Row>
                            </Grid>

                    </ListGroupItem>;
                })}
            </ListGroup>
        )
    }
});
const AddDish = React.createClass({
    getInitialState() {
        return {
            value: {

            }
    };
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
                console.log(data)
                this.setState({ingredient : data, canShowForm:true});
            });



    },
    onChange(value) {

    },

    render() {
        return (

            <div style={divStyle}>
                <h3>Удаление блюда</h3>

                {this.state.canShowForm ?

                    <ProperListRender list={this.state.ingredient} />
                    :null}


            </div>



        );
    }
});

export default AddDish

