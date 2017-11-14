import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

const displayState = (val) => {
  let result = ''
  if (val === undefined) result = 'undefined'
  else if (val === null) result = 'null'
  else if (typeof vall === 'object') result = 'object'
  else result = val
  return result.toString()
}

class App extends Component {
  state = {
    refetching: false,
    errorTriggered: false,
    canRefetch: false
  }

  triggerError = () => {
    this.setState({errorTriggered: true})
    this.refetch()
  }

  refetch = () => {
    this.setState({refetching: true})
    this.props.data
      .refetch()
      .then(() => {
        this.setState({refetching: false, canRefetch: true})
      })
      .catch(() => {
        this.setState({refetching: false, canRefetch: true})
      })
  }

  render() {
    const { data: { loading, error, people } } = this.props;
    const {refetching, errorTriggered, canRefetch} = this.state
    console.log('this.props: ', this.props);
    return (
      <main>
        <header>
          <h1><i>apollo-client</i> ISSUE #2513</h1>
          <p>Trigger error then click refetch, error is not cleared - props also logged to console</p>
          <p><button disabled={loading || refetching || errorTriggered} onClick={this.triggerError}>TRIGGER ERROR</button></p>
          <p><button disabled={loading || refetching || !canRefetch} onClick={this.refetch}>REFETCH</button></p>
        </header>
        <div>
          <p>loading: <b>{displayState(loading)}</b><br />
          refetching: <b>{displayState(refetching)}</b><br />
          error: <b>{displayState(error)}</b><br />
          people: <b>{displayState(people)}</b></p>
        </div>
      </main>
    );
  }
}

export default graphql(
  gql`
    query ErrorTemplate {
      people {
        id
        name
      }
    }
  `, {
  options: props => ({
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
  }),
}
)(App);
