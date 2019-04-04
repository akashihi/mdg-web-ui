import {checkApiError, parseJSON, dataToMap, mapToData} from '../util/ApiUtils';
import {loadTransactionList} from './TransactionActions';
import {loadBudgetEntryList} from './BudgetEntryActions';

import {
    GET_ACCOUNTLIST_REQUEST,
    GET_ACCOUNTLIST_SUCCESS,
    GET_ACCOUNTLIST_FAILURE,
    TOGGLE_HIDDEN_ACCOUNTS,
    ACCOUNT_DIALOG_OPEN,
    ACCOUNT_DIALOG_CLOSE,
    ACCOUNT_DIALOG_CHANGE
} from '../constants/Account'

import {loadTotalsReport} from './ReportActions'

export function loadAccountList() {
    return (dispatch) => {
        dispatch({
            type: GET_ACCOUNTLIST_REQUEST,
            payload: true
        });

        var url = '/api/account';

        fetch(url)
            .then(parseJSON)
            .then(checkApiError)
            .then(dataToMap)
            .then(function (data) {
                dispatch({
                    type: GET_ACCOUNTLIST_SUCCESS,
                    payload: data
                })
            })
            .then(() => dispatch(loadTransactionList()))
            .catch(function (response) {
                dispatch({
                    type: GET_ACCOUNTLIST_FAILURE,
                    payload: response.json
                })
            });
    }
}

export function toggleHiddenAccounts(visible) {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_HIDDEN_ACCOUNTS,
            payload: visible
        });
    };
}

export function updateAccount(id, account) {

    return (dispatch, getState) => {
        dispatch({
            type: GET_ACCOUNTLIST_REQUEST,
            payload: true
        });

        var state=getState();
        var selectedBudgetId = state.budgetentry.currentBudget.id;

        var url = '/api/account';
        var method = 'POST';
        if (id != -1) {
            url = url + '/' + id;
            method = 'PUT';
        }

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/vnd.mdg+json'
            },
            body: JSON.stringify(mapToData(id, account))
        })
            .then(parseJSON)
            .then(checkApiError)
            .then(()=>dispatch(loadAccountList()))
            .then(()=>dispatch(loadTotalsReport()))
            .then(()=>{if (selectedBudgetId) { dispatch(loadBudgetEntryList(selectedBudgetId))}})
            .catch(()=>dispatch(loadAccountList()))
    }
}

export function createAccount() {
  return(dispatch, getState) => {
    var state = getState();

    dispatch({
      type: ACCOUNT_DIALOG_OPEN,
      payload: {
        full: true,
        account: { attributes: {account_type: 'asset', balance: 0, currency_id: state.setting.primaryCurrency} }
      }
    })
  }
}

export function editAccount(account) {
    return {
        type: ACCOUNT_DIALOG_OPEN,
        payload: {
            full: false,
            account: account
        }
    }
}

export function editAccountCancel() {
    return {
        type: ACCOUNT_DIALOG_CLOSE,
        payload: true
    }
}

export function editAccountChange(account) {
    return {
        type: ACCOUNT_DIALOG_CHANGE,
        payload: account
    }
}

export function editAccountSave() {
    return (dispatch, getState) => {
        dispatch({
            type: ACCOUNT_DIALOG_CLOSE,
            payload: true
        });

        var state = getState();
        var account = state.account.dialog.account;
        dispatch(updateAccount(account));
    }
}