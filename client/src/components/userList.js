import React from 'react';
import {
    gql,
    graphql,
} from 'react-apollo';

const UserList = ({ data: {loading, error, users }}) => {
    if (loading) {
        return <p>Loading ...</p>;
    }

    if (error) {
        return <p>{error.message}</p>;
    }

    return (
        <div>
            <table>
                <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Summary</th>
                    <th>Last Login</th>
                </tr>
                {
                    users.map( usr => (
                        <tr key={usr.id}>
                            <td>{usr.id}</td>
                            <td>{usr.attribute.personalEmail}</td>
                            <td>{usr.attribute.summary}</td>
                            <td>{usr.attribute.lastLogin}</td>
                        </tr>
                    ))
                }
            </table>
        </div>
    );
};

export const usersListQuery = gql`
    query ListUsers {
        users {
            id
            attribute
        }
    }
`;

export default graphql(usersListQuery, {
  options: { pollInterval: 5000 },
})(UserList);
