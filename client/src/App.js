import React, { Component } from 'react';
import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface,
} from 'react-apollo';
import logo from './logo.svg';
import './App.css';
import UserList from './components/userList';

class App extends Component {
    render() {
        const uri = 'https://api.ottolearn-beta.io/v1/graphql';

        var networkInterface = createNetworkInterface({
            uri: uri,
            mode: 'cors'
        })
        networkInterface.use([{
          applyMiddleware(req, next) {
            if (!req.options.headers) {
              req.options.headers = {};  // Create the header object if needed.
            }
            req.options.headers['authorization'] = localStorage.getItem('sessionToken') ? localStorage.getItem('sessionToken') : null;
            next();
          }
        }]);

        var client = new ApolloClient({
          networkInterface,
        });

        const url = 'https://api.ottolearn-beta.io/authenticate/login';
        const loginForm = JSON.stringify({
            organizationId: 1,
            username: '2-Greenholt_Ransom@hotmail.com',
            password: 'password'
        });

        fetch(url, {
            method: 'POST',
            body: loginForm
        })
        .then((response) => response.json())
        .then(function(data) {
            localStorage.setItem('sessionToken', data.sessionToken);
            // this.setState({hasSessionToken: true});
        })
        .catch((error) => {
            console.log(error);
        });

        return (
            <ApolloProvider client={client}>
                <div className="App">
                    <div className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h2>Apollo</h2>
                    </div>
                    <UserList />
                </div>
            </ApolloProvider>
        );
    }
}

export default App;
