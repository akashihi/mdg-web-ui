import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import TransactionsOverviewPanel from '../components/TransactionsOverviewPanel'
import * as TransactionActions from '../actions/TransactionActions'

const mapStateToProps = (state) => {
    return {
        accounts: state.account.assetAccountList.concat(state.account.incomeAccountList, state.account.expenseAccountList),
        transactions: state.transaction.get('transactionList'),
    }
};

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(TransactionActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsOverviewPanel)
