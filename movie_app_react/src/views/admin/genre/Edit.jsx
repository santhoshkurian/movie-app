import React, { Component } from "react";
import { Grid, Row, Col, Button } from "react-bootstrap";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import axios from 'axios';

class EditCategory extends Component {

  constructor(props) {
    super(props);
    console.log(this.props)
    this.state = {
      item: {
        genre: "",
        tags: ["handwash"]
      }
    }
    this.save = this.save.bind(this);
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    axios.get("http://localhost:4000/api/genres/" + this.props.match.params.id)
      .then(res => {
        const item = res.data;
        this.setState({ item });
        console.log(this.state)
      })
  }


  handleChange(e) {
    console.log("check", e.target.value)
    const data = this.state.item;
    data[e.target.name] = e.target.value
    this.setState({ item: data });
    console.log(this.state.item)

  }

  save() {
    const item = this.state.item;
    axios.put(`http://localhost:4000/api/genres/` + this.props.match.params.id + "/" + item.genre)
      .then(res => {
        console.log(res.data);
        this.props.history.push('/admin/category/genre')
      })
      .catch(error => {
        console.log(error.response.data)
      });
  }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col>
              <h4>Edit  Item</h4>
              <form >
                <FormInputs
                  ncols={["col-md-6"]}
                  properties={[
                    {
                      label: "Genre",
                      type: "text",
                      name: "genre",
                      onChange: this.handleChange,
                      bsClass: "form-control ",
                      placeholder: "Enter genre",
                      defaultValue: this.state.item.genre,
                    }
                  ]}
                />
                <Button bsStyle="info" onClick={this.save}>Save</Button>
                <div className="clearfix" />
              </form>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default EditCategory;