import React, { Component } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import lottery from '../ethereum/lottery';
import Layout from '../ethereum/layout';
import web3 from '../ethereum/web3';
import { Link } from '../routes';

class CampaignShow extends Component {
  state = {
    value: '',
    message:''
  };
  onSubmit = async (event) =>  {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    // Prepare state messages for user
    this.setState({ message: 'Waiting on transaction success...'});

    await lottery.methods.placeBid(0).send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    });

    this.setState({ message: 'your bid has been placed' })
  };

  onendauction = async () => {
    const accounts= await web3.eth.getAccounts();
    await lottery.methods.endAuction(0).send({
      from:accounts[0]
    });
  };

  static async getInitialProps(props) {


    const summary = await lottery.methods.getAuction(0).call();

    return {summary};
  }



  renderCards() {

    const items = [
      {
        header: this.props.summary[0],
        meta: 'Highest bid',
        description:
          'This is the highest bid as of now . it keeps updating',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: this.props.summary[1],
        meta: 'Address of the highest bidder',
        description:
          'This guy just bid the highest bid'
      },
      {
        header: this.props.summary[2],
        meta: 'Address of the benificiary',
        description:
          'Address of the person who is going to recieve the highest bid'
      },
      {
        header: this.props.summary[3],
        meta: 'Item under auction',
        description:
          'This item is being auctioned'
      }
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
    <div>
      <Layout>
        <Grid>
          <Grid.Row>

            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>

            <Grid.Column width={6}>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>

            </Grid.Column>
          </Grid.Row>
        </Grid>

      <hr />

      <form onSubmit={this.onSubmit}>
      <h4>Want to place a bid?</h4>
      <div>
        <label>Amount of ether to bid </label>
        <input
          value={this.state.value}
          onChange={event => this.setState({ value: event.target.value })}
        />
      </div>
    <button>Enter</button>
    </form>

     <button onClick={this.onendauction}>Benificiary can click here and end the auction</button>
    <hr />

    </Layout>
  </div>
    );
  }
}

export default CampaignShow;
