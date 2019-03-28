import { connect } from 'react-redux'

import FinanceOverviewPanel from '../components/FinanceOverviewPanel'

const mapStateToProps = (state) => {
    return {
        currencies: state.currency.currencies,
        totals: state.report.totalsReport,
        primaryCurrency: state.setting.primaryCurrency
    }
};

export default connect(mapStateToProps)(FinanceOverviewPanel)
