import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import AccountsOverviewPanel from '../components/account/AccountsOverviewPanel'
import * as AccountActions from '../actions/AccountActions'


const mapStateToProps = (state) => {
    return {
        currencies: state.currency.get('currencies'),
        assetAccounts: state.account.get('assetAccountList'),
    }
};

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(AccountActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountsOverviewPanel)
