import React, { Component } from 'react';
import axios from "axios";
import {Button, Card, CardGroup, FormGroup, FormControl, FormLabel, Table } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {   Alert, Input, Modal , ModalHeader, ModalBody, ModalFooter, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import validator from 'validator';



let data4 = [];
let data3 = [];
let data2 = [];
let data5 = [];
export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
          bank_api: [],
          recipient_api: [],
          transfer_api: [],
          name: "",
          account_no: '',
          bank_code: '',
          source: "",
          currency: 'NGN',
          description: "",
          job: "",
          address: "",
          modal: false,
          mode: false,
          suppliers: [],
          amount: '',
          reason: '',
          visible: false,
          message: '',
          color: '',
          errors: {
            email: null,
            first_name: null,
            amount: null,
            reason: null
          }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeCode = this.handleChangeCode.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.changeModal = this.changeModal.bind(this);
        this.createRecipient = this.createRecipient.bind(this);
        this.deleteRecipient = this.deleteRecipient.bind(this);
        this.initiateTransfer = this.initiateTransfer.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
    }
    // curl -X POST -H "Authorization: Bearer SECRET_KEY" -H "Content-Type: application/json" -d '{ 
    //     "type": "nuban",
    //     "name": "Zombie",
    //     "description": "Zombier",
    //     "account_number": "01000000010",
    //     "bank_code": "044",
    //     "currency": "NGN",
    //     "metadata": {
    //        "job": "Flesh Eater"
    //      }
    //   }' "https://api.paystack.co/transferrecipient"

    componentDidMount() {
        axios({
            method: 'get',
            url: 'https://api.paystack.co/bank',
            headers: {"Authorization": "Bearer sk_test_cf0b6c9b594ac046346e8cb39ec4bb824c7c726e"}
          })
          .then(
              res => {
                  let codeArray = [res.data.data];
                  console.log(res.data)
                  console.log(codeArray);
                  this.setState({
                    bank_api: res.data.data
                  })
                 data3 = res.data.data;
              })
              .catch(err => {
                console.log(err);
            })

              axios({
                method: 'get',
                url: 'https://api.paystack.co/transferrecipient',
                headers: {"Authorization": "Bearer sk_test_cf0b6c9b594ac046346e8cb39ec4bb824c7c726e"}
              })
              .then(
                  res => {
                   this.setState({
                     recipient_api: res.data.data
                   })
                   data2  = res.data.data
                   console.log(data2)
                  }
              )
              .catch(err => {
                  console.log(err);
              })

              axios({
                method: 'get',
                url: 'https://api.paystack.co/transfer',
                headers: {"Authorization": "Bearer sk_test_cf0b6c9b594ac046346e8cb39ec4bb824c7c726e"}
              })
              .then(
                  res => {
                   this.setState({
                     transfer_api: res.data.data
                   })
                   data4  = res.data
                   data5 = data4.recipient
                   console.log(data4)
                   console.log(data5)
                  }
              )
              .catch(err => {
                  console.log(err);
              })
    }

    handleChange = event => {
      // function handleChange(e){
      //   const {name, value} = http://e.target;
      
      //   this.setState({[name]: value})
      
      //   switch(name){
      //     case "email":
      //       if(!validator.isEmail(value)){
      //         this.setState({errors: {...this.state.errors, email: "Please enter a valid email"}})
      //       } else{
      //         // Clear the email error if the email is valid
      //         this.setState({errors: {...this.state.errors, email: null}})
      //       }
      //     case "first_name":
      //       if(!value){
      //         // Set the error indicating that the first name is missing
      //       }
      //     default:
      //       return;
      //   }
      // }
      const {id, value} = event.target;
        this.setState({
            [id]: value
        });
        switch(id){
          case "job":
            if(!validator.isEmail(value)){
              this.setState({
                errors: {...this.state.errors, email:
                'Please enter a valid email'}
              })
            }
            else{
              this.setState({
                errors: {...this.state.errors, email: null}
              })
            }
            break;
          case "name":
            if(!value){
              this.setState({
                errors: {...this.state.errors, first_name:
                'Name is missing'}
              })
            }
            else{
              this.setState({
                errors: {...this.state.errors, first_name: null}
              })
            }
            break;
            case "account_no":
                if(!validator.isNumeric(value)){
                  this.setState({
                    errors: {...this.state.errors, amount:
                    'Please type in a correct Account Number'}
                  })
                }
                else{
                  this.setState({
                    errors: {...this.state.errors, amount: null}
                  })
                }
                break;
          default:
           return;
            
        }
    }
    
    onDismiss() {
      this.setState({ visible: false });
    }
    
    
    initiateTransfer = event => {
      event.preventDefault();
      console.log(this.state.reason, this.state.bank_code,  this.state.amount)
      axios({
          method: "post",
          url: "https://api.paystack.co/transfer",
          data: {
               source: "balance",
               amount: this.state.amount,
               currency: 'NGN',
               reason: this.state.reason,
               recipient: this.state.bank_code
          },
          headers: {"Authorization": "Bearer sk_test_cf0b6c9b594ac046346e8cb39ec4bb824c7c726e"}
      })
      .then(
          res => {
              console.log(res.data);
              this.setState(prevState => ({
                mode: !prevState.mode,
                visible: true,
                message: this.state.amount + 'has been successfully transferred. Please refresh page to view changes',
                color: 'info'
              }))
          }
      )
      .catch(err => {
          console.log(err);
          this.setState(prevState => ({
            mode: !prevState.mode,
            visible: true,
            message: "BAD REQUEST. PLEASE TRY AGAIN",
            color: 'warning'
          }))
      })
    }

    createRecipient = event => { 
        event.preventDefault();
        console.log(this.state.name, this.state.bank_code, this.state.description, this.state.account_no, this.state.job, this.state.address)
        if (this.state.errors.name == null && this.state.errors.email == null & this.state.errors.amount == null ) {
        axios({
            method: "post",
            url: "https://api.paystack.co/transferrecipient",
            data: {
                 "type": "nuban",
                 "name": this.state.name,
                 "description": this.state.description,
                 "account_number": this.state.account_no,
                 "bank_code": this.state.bank_code,
                 "currency": "NGN",
                 "metadata": {
                      "e-mail": this.state.job,
                      "address": this.state.address
                 }

            },
            headers: {"Authorization": "Bearer sk_test_cf0b6c9b594ac046346e8cb39ec4bb824c7c726e"}

        })
        .then(
            res => {
                console.log(res.data)
                this.setState(prevState => ({
                    modal: !prevState.modal,
                    visible: true,
                    message: "Recipient Created Succesfully. Please Refresh Page",
                    color: 'info'
                  }))

            }
        )
        
        .catch(
            err => {
                console.log(err)
                this.setState(prevState => ({
                  modal: !prevState.modal,
                  visible: true,
                  message: 'BAD REQUEST. PLEASE TRY AGAIN',
                  color: 'warning'
                }))
            }
        )
          }
        else {
          alert("Please fill in the required fields correctly");
        }
    }

    deleteRecipient(crtId) {
      console.log(crtId) 
      for (let item in data3){
        if(data3[item].id === crtId){
          console.log(data3[item])
          debugger;
          data3.splice(item, 1);
          debugger;
    
    axios({
      method: "delete",
          url: "https://api.paystack.co/recipient" + crtId,
          headers: {"Authorization": "Bearer sk_test_cf0b6c9b594ac046346e8cb39ec4bb824c7c726e"}
    })
    .then(
      res => {
        console.log(res.message)
        this.setState({
          message: "Recipient Deleted. Please Refresh Page",
          visible: true,
          color: "info"
        })
      }
    )
    .catch(
      err => {
        this.setState({
          message: 'Not Successful. Try again Later',
          visible: true,
          color: 'warning'
        })
      }
    )

    }

  }

}
    
handleChangeCode = ({ target }) =>{
    this.setState({ [target.name]: target.value });

    
  }
    toggleModal() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }))
      }
      
      changeModal() {
        this.setState(prevState => ({
          mode: !prevState.mode
        }))
      }
      
    render() {
        return (
            <div>
       <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="navbar-header">
      <a className="navbar-brand" href="#">BAKERY PAYMENTS</a>
    </div>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="nav navbar-nav navbar-right">
    </ul>
    </div>
    </nav>
    <Alert color={this.state.color} toggle={this.onDismiss} isOpen={this.state.visible} fade={true}>{this.state.message}</Alert>
    <CardGroup>
    <Card className="text-center">
      <Card.Body>
    <Card.Title>Suppliers</Card.Title>
    <Card.Text>
      
    </Card.Text>
    <Button variant="primary" onClick={this.toggleModal}>Create a Recipient</Button>
  </Card.Body>
  <Card.Footer className="text-muted">Powered by Paystack</Card.Footer>
</Card>
<Card className="text-center">
      <Card.Body>
    <Card.Title>Payments</Card.Title>
    <Card.Text>
      
    </Card.Text>
    <Button variant="primary" onClick={this.changeModal}>Make a Transfer</Button>
  </Card.Body>
  <Card.Footer className="text-muted">Powered by Paystack</Card.Footer>
</Card>
</CardGroup>
<Breadcrumb>
        <BreadcrumbItem active>Suppliers List</BreadcrumbItem>
</Breadcrumb>
<table className="table table-striped">
  <thead className="thead-dark">
    <tr>
      <th>Supplier Code</th>
      <th>Supplier Name</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
  {
         this.state.recipient_api.map(data => {
      return (
           <tr key={data.recipient_code}>
              <td>{data.recipient_code}</td>
              <td>{data.name}</td>
             <td><button className="btn btn-danger" onClick={e => this.Deletecipient(data.recipient_code)}>Delete</button></td> 
           </tr>
         )})
       }
  </tbody>
</table>

<Breadcrumb>
        <BreadcrumbItem active>Transactions List</BreadcrumbItem>
      </Breadcrumb>
<table className="table table-striped">
  <thead className="thead-dark">
    <tr>
    <th>Transfer Code</th>
    <th>Amount</th>
      <th>Reason</th>
      <th>Status of Transfer</th>
    </tr>
  </thead>
  <tbody>
  {
         this.state.transfer_api.map(data => {
      return (
           <tr key={data.transfer_code}>
               <td>{data.transfer_code}</td>
               <td>{data.amount}</td>
              <td>{data.reason}</td>
              <td>{data.status}</td>
           </tr>
         )})
       }
  </tbody>
</table>


<Modal isOpen={this.state.modal} toggle={this.toggleModal} >
                   <ModalHeader toggle={this.toggleModal}>Provide Supplier Information</ModalHeader>
                   <ModalBody>
                    <form>
                    <FormGroup controlId="name" >
                        <FormLabel>Name</FormLabel>
                    <FormControl
                    type="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                    />
                    </FormGroup>
                    <p style={{'color': 'red'}}>{this.state.errors.first_name}</p>
                    <FormGroup controlId="description">
                        <FormLabel>Description</FormLabel>
                        <FormControl
                        value={this.state.description}
                        onChange={this.handleChange}
                        type="name"
                        />
                    </FormGroup>
                    <FormGroup controlId="bank_code" >
                        <FormLabel>Bank of Recipient</FormLabel>
                        <Input type="select"  name="bank_code"  onChange={this.handleChangeCode}>
                        {
                       this.state.bank_api.map(data => {
                    return (
                       <option key={data.code} value={data.code}>{data.name}</option>
 
                       )})
                         }
                         </Input>
                    </FormGroup>
                    <FormGroup controlId="account_no">
                        <FormLabel>Account No</FormLabel>
                        <FormControl
                        value={this.state.account_no}
                        onChange={this.handleChange}
                        type="name"
                        />
                    </FormGroup>
                    <p style={{'color': 'red'}}>{this.state.errors.amount}</p>
                    <FormGroup controlId="job">
                        <FormLabel>E-mail</FormLabel>
                        <FormControl
                        value={this.state.job}
                        onChange={this.handleChange}
                        type="e-mail"
                        />
                    </FormGroup>
                    <p style={{'color': 'red'}}>{this.state.errors.email}</p>
                    <FormGroup controlId="address">
                        <FormLabel>Address Details</FormLabel>
                        <FormControl
                        value={this.state.address}
                        onChange={this.handleChange}
                        type="name"
                        />
                    </FormGroup>
                    </form>
                  </ModalBody>
              <ModalFooter>
              <Button onClick={this.createRecipient} color="primary">
                Save
              </Button>
             <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
            </ModalFooter>
             </Modal>
             <Modal isOpen={this.state.mode} toggle={this.changeModal} >
                   <ModalHeader toggle={this.changeModal}>Provide Payment Information</ModalHeader>
                   <ModalBody>
                    <form>
                    <FormGroup controlId="source" >
                        <FormLabel>Recipient</FormLabel>
                        <Input type="select"  name="bank_code"  onChange={this.handleChangeCode}>
                        {
                       this.state.recipient_api.map(data => {
                    return (
                       <option key={data.recipient_code} value={data.recipient_code}>{data.name}</option>
                       )})
                         } 
                        </Input>
                    </FormGroup>
                    <FormGroup controlId="source" >
                        <FormLabel>Bank Code</FormLabel>
                        <Input type="select"  onChange={this.handleChange}>
                          <option value="balance">Paystack Balance</option>
                          
                        </Input>
                    </FormGroup>
                    <FormGroup controlId="amount">
                        <FormLabel>Amount to be Transferred (kobo)</FormLabel>
                        <FormControl
                        value={this.state.amount}
                        onChange={this.handleChange}
                        type="number"
                        />
                    </FormGroup>
                    <FormGroup controlId="reason" >
                        <FormLabel>Reason for Transfer</FormLabel>
                        <FormControl
                        value={this.state.reason}
                        onChange={this.handleChange}
                        type="name"
                        />
                    </FormGroup>
                    </form>
                  </ModalBody>
              <ModalFooter>
              <Button onClick={this.initiateTransfer} color="primary">
                Save
              </Button>
             <Button color="secondary" onClick={this.changeModal}>Cancel</Button>
            </ModalFooter>
             </Modal>
        </div>
        );
    }
}
