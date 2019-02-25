import React, {Component, Fragment} from 'react';
import MuiTreeView from 'material-ui-treeview';
import ClipLoader from 'react-spinners/ClipLoader';
import Button from '@material-ui/core/Button';
import CategoryEditor from '../containers/CategoryEditor.js';

export default class CategoryViewerWidget extends Component {

  onAddClick() {
    this.props.actions.createCategory()
  }

  categoryToTree(category) {
    if ('attributes' in category) {
      var attr = category.attributes
    } else {
      attr = category
    }
    if ('children' in attr) {
      return {
        id: attr.id,
        value: attr.name,
        nodes: attr.children.map(::this.categoryToTree)
      }
    } else {
        return {id: attr.id, value: attr.name}
    }
  }

  render() {
    var props = this.props

    if (props.error) {
      return (<h1>Error loading category list</h1>)
    }

    if (props.loading) {
      return (<ClipLoader sizeUnit={'px'} size={150} loading={true}/>)
    }

    var tree = props.categoryList.map(::this.categoryToTree)

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