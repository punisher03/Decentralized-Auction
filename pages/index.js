import React, { Component } from 'react';
import web3 from '../ethereum/web3';
import lottery from '../ethereum/lottery';
import Layout from '../ethereum/layout';
import { Form, Button, Message, Input } from 'semantic-ui-react';
import {Router,Link} from '../routes';

class RequestNew extends Component {
  state = {
    name: '',
    timeLimit:'',
    loading: false,
    errorMessage: ''
  };


  onSubmit = async event => {
    event.preventDefault();
    const { name,timeLimit} = this.state;

    this.setState({ loading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      await lottery.methods
        .startAuction(name, timeLimit)
        .send({ from: accounts[0] });
        Router.pushRoute('/auction3');
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  render() {
    return (
    <div>
      <Layout>
        <h3>Create an Auction</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Name</label>
            <Input
              value={this.state.name}
              onChange={event =>
                this.setState({ name: event.target.value })}
            />
          </Form.Field>

          <Form.Field>
            <label>timeLimit</label>
            <Input
              value={this.state.timeLimit}
              onChange={event => this.setState({ timeLimit: event.target.value })}
            />
          </Form.Field>

          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button primary loading={this.state.loading}>
            Create!
          </Button>
          <Link route="/auction1">
              <a>
               <Button
                floated="middle"
                content="view auction 1"

                secondary
               />
              </a>
          </Link>

          <Link route="/auction2">
                  <a>
                   <Button
                    floated="middle"
                    content="view auction 2"

                    secondary
                   />
                  </a>

          </Link>
        </Form>
      </Layout>
    </div>
    );
  }
}

export default RequestNew;
