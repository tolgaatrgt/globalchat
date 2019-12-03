import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux';
import { State } from '../reducers'
import { Chat } from './ChatPage'

import { getMessages, sendMessage, sendDm, getDm } from './actions'
import { getUsers } from '../LoginPage/actions'


const mapStateToProps = (state: State) => ({
    messages: state.messages.messages,
    user: state.messages.currentUser,
    personalmessages: state.messages.personalmessages,
    users: state.users.users
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    ...bindActionCreators(
        {
            getMessages, getDm, getUsers
        },
        dispatch,
    ),
    sendMessage, sendDm
});

export const ChatPageContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Chat)