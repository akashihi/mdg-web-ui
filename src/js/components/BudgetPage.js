import React, {Component, Fragment} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import ClipLoader from 'react-spinners/ClipLoader';

import BudgetEntry from './BudgetEntry'
import BudgetSelector from '../containers/BudgetSelector'
import BudgetOverviewPanel from './BudgetOverviewPanel'

const styles = {
  hiddenButtonStyle: {
      'float': 'right'
  }
};

class HiddenEntriesButtonStyle extends Component {
  render() {
    return (<Button onClick={this.props.handlerFunc}>{this.props.text}</Button>)
  }
}

var HiddenEntriesButton = withStyles(styles)(HiddenEntriesButtonStyle)

export default class BudgetPage extends Component {
    onHiddenEntriesClick() {
        this.props.actions.toggleHiddenEntries(!this.props.emptyVisible)
    }

    mapEntry(item) {
        const props = this.props;

        const account = props.accounts.get(item.attributes.account_id);

        const currency = props.currencies.get(account.get('currency_id'));

        return (
            <BudgetEntry entry={item} key={item.id} currency={currency}
                         saveBudgetEntryChange={props.entryActions.updateBudgetEntry}/>
        )
    }

    render() {
        var props = this.props;

        var hiddenButton;
        if (props.emptyVisible) {
            hiddenButton = <HiddenEntriesButton text='Hide empty entries' handlerFunc={this.onHiddenEntriesClick.bind(this)}/>
        } else {
            hiddenButton = <HiddenEntriesButton text='Show empty entries' handlerFunc={this.onHiddenEntriesClick.bind(this)}/>
        }


        var loader;
        var errorMessage;
        var incomeCard;
        var expenseCard;
        if (props.loading) {
            loader = <ClipLoader sizeUnit={'px'} size={150} loading={true}/>
        } else if (props.error) {
            errorMessage = <h1>Unable to load budget entries</h1>
        } else {
            var nonEmptyEntries = props.entries
            if (!props.emptyVisible) {
                nonEmptyEntries = props.entries.filter((item) => item.attributes.actual_amount !== 0 || item.attributes.expected_amount !== 0);
            }
            var incomeEntries = nonEmptyEntries.filter((item) => props.accounts.filter((item) => item.get('account_type') === 'income').map((item) => item.get('id')).includes(item.attributes.account_id)).map(::this.mapEntry);
            var expenseEntries = nonEmptyEntries.filter((item) => props.accounts.filter((item) => item.get('account_type') === 'expense').map((item) => item.get('id')).includes(item.attributes.account_id)).map(::this.mapEntry);

            incomeCard = (
              <Card>
                <CardHeader title='Incomes'/>
                <CardContent>{incomeEntries}</CardContent>
              </Card>
            );

            expenseCard = (
              <Card>
                <CardHeader title='Expenses'/>
                <CardContent>{expenseEntries}</CardContent>
              </Card>
            )
        }

        var content =
        (<Fragment>
            {loader}
            {errorMessage}
            {incomeCard}
            {expenseCard}
        </Fragment>)

        return (
            <div>
                <BudgetSelector/>
                <Card>
                    <CardActions>
                        {hiddenButton}
                    </CardActions>
                    <BudgetOverviewPanel budget={props.budget}/>
                </Card>
                <Divider/>
                {content}
            </div>
        )
    }
}
