import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux';
import { State } from '../reducers'
import { Login } from './LoginPage'
import { setUser } from '../ChatPage/actions'
import { AddUser, getUsers } from './actions'


const mapStateToProps = (state: State) => ({
    users: state.users.users
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    ...bindActionCreators(
        {
            setUser,
            getUsers
        },
        dispatch,
    ),
    AddUser
});

export const LoginPageContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Login)