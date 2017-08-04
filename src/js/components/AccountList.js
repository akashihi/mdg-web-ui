import React, {Component} from 'react';

import Account from './Account'

export default class AccountsList extends Component {
    render() {
        var props = this.props;

        var onSwitchFavoriteClick = function (account, value) {
            account.attributes.favorite = value;
            props.actions.updateAccount(account);
        };

        var onSwitchOperationalClick = function (account, value) {
            account.attributes.operational = value;
            props.actions.updateAccount(account);
        };

        var onSwitchHiddenClick = function (account, value) {
            account.attributes.hidden = value;
            props.actions.updateAccount(account);
        };

        var onEditAccountClick = function (account) {
            props.actions.editAccount(account)
        };

        var accounts = props.accounts.map(function (item) {
            return (
                <div key={item.id}><Account account={item} currencies={props.currencies}
                                            switchFavoriteFunc={onSwitchFavoriteClick}
                                            switchOperationalFunc={onSwitchOperationalClick}
                                            switchHiddenFunc={onSwitchHiddenClick}
                                            editAccountFunc={onEditAccountClick}/></div>
            )
        });
        return (
            <div>{accounts}</div>
        )
    }
}
