import React, {Component, Fragment} from 'react';
import MuiTreeView from 'material-ui-treeview';
import ClipLoader from 'react-spinners/ClipLoader';
import Button from '@material-ui/core/Button';
import CategoryEditor from '../../containers/CategoryEditor.js';

export default class CategoryViewerWidget extends Component {

  onAddClick() {
    this.props.actions.createCategory()
  }

  categoryFormatName(category) {
      return category.get('name') + '(' + category.get('account_type') + ')';
  }

  categoryToTree(category, id) {
    
    if (category.has('children')) {
      return {
        id: id,
        value: this.categoryFormatName(category),
        nodes: category.get('children').map(::this.categoryToTree).valueSeq()
      }
    } else {
        return {id: id, value: this.categoryFormatName(category)}
    }
  }

  render() {
    const props = this.props;

    if (props.error) {
      return (<h1>Error loading category list</h1>)
    }

    if (props.loading) {
      return (<ClipLoader sizeUnit={'px'} size={150} loading={true}/>)
    }

    const tree = props.categoryList.map(::this.categoryToTree).valueSeq().toJS();

    return (
      <Fragment>
        Categories:
        <MuiTreeView tree={tree} onLeafClick={node => props.actions.editCategory(node.id)}/>
        <Button color='primary' onClick={::this.onAddClick}>Add new category</Button>
        <CategoryEditor/>
      </Fragment>
    )
  }
}
