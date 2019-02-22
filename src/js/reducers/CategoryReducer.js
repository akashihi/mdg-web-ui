import {
    GET_CATEGORYLIST_REQUEST,
    GET_CATEGORYLIST_SUCCESS,
    GET_CATEGORYLIST_FAILURE,
    CATEGORY_DIALOG_OPEN,
    CATEGORY_DIALOG_CLOSE,
    CATEGORY_DIALOG_CHANGE
} from '../constants/Category'

const initialState = {
    categoryList: [],
    ui: {
        categoryListLoading: true,
        categoryListError: false
    },
    dialog: {
        open: false,
        full: false,
        category: {attributes: {}},
        valid: false,
        errors: { }
    }
};

/*function validateAccountForm(account) {
    var attributes = account.attributes;
    var errors = {};
    if (!attributes.name) {
        errors.name = 'Name is empty'
    }

    if (!attributes.account_type) {
        errors.account_type = 'Type is not selected'
    }

    if (!attributes.currency_id) {
        errors.currency_id = 'Currency is not selected'
    }

    if ((attributes.favorite || attributes.operational) && attributes.account_type != 'asset') {
        errors.account_type = 'Only asset accounts can be favorite or operational'
    }

    return {valid: Object.keys(errors).length == 0, errors: errors}
}*/

function validateCategoryForm() {
  return {valid: true, errors: []}
}

export default function categoryReducer(state = initialState, action) {
    var ui = state.ui;
    var dialog = state.dialog;
    switch (action.type) {
        case CATEGORY_DIALOG_OPEN:
            var validInitial = validateCategoryForm(action.payload.account);
            dialog = {...dialog, open: true, full: action.payload.full, category: action.payload.category, valid: validInitial.valid, errors: validInitial.errors};
            return {...state, dialog: dialog};
        case CATEGORY_DIALOG_CLOSE:
            dialog = {...dialog, open: false};
            return {...state, dialog: dialog};
        case CATEGORY_DIALOG_CHANGE:
            var valid = validateCategoryForm(action.payload);
            dialog = {...dialog, account: action.payload, valid: valid.valid, errors: valid.errors};
            return {...state, dialog: dialog};
        case GET_CATEGORYLIST_REQUEST:
            ui = {...ui, categoryListLoading: true, categoryListError: false};
            return {...state, ui: ui};
        case GET_CATEGORYLIST_SUCCESS:
            ui = {...ui, categoryListLoading: false, categoryListError: false};
            return { ...state, categoryList: action.payload, ui: ui };
        case GET_CATEGORYLIST_FAILURE:
            ui = {...ui, categoryListLoading: false, categoryListError: true};
            return { ...state, categoryList: [], ui: ui };
        default:
            return state;
    }
}
