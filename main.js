const App = React.createClass({
  getInitialState() {
    return {
      items: [],
      totalCredits: 0,
      totalDebits: 0,
      balance: 0
    }
  },

  addNewItem(newItem) {
    const { items } = this.state;

    this.setState({
      items: [...items, newItem]
    })

  },

  removeItem(id) {
    const { items } = this.state;
    console.log("delete button clicked");
    console.log('id:', id);

    this.setState({
      items: items.filter(item => item.id !== id)
    });

  },

  edit(newState) {
    this.setState({
      items: newState
    })
    console.log('state after edit:', this.state.items);
  },

  // while editing
  // onChange(value, index) {
  //   const { items } = this.state;
  //   let newItems = items;
  //
  //   //newItems[index][value] =
  //   // console.log('newItems[index][value]', newItems[index][value]);
  //   // console.log('this.refs.value.value', this.refs.value.value)
  //
  //
  //   this.setState({
  //     items: newItems
  //   })
  //   // console.log('onChange value, index:', value, index);
  //   console.log('this.state', this.state);
  // },

  editState(e) {
    console.log('editState value, id', value, id);
  },

  // editItem(item) {
  //   //const { items } = this.state;
  //   console.log("edit button clicked");
  //
  //   console.log('item:', item.amount);
  //
  //   // document.getElementById(amount).value = "XX";
  //   //console.log("amount", this.refs.amount);
  //   //console.log('amount', document.getElementById(amount));
  //   // this.refs.amount.value = "XX";
  // },

  render() {
    const { items } = this.state;
    return (
      <div className="container">
      <h1>Banking App</h1>
      <NewItemForm addNewItem={this.addNewItem}/>
      <ItemList items={items} removeItem={this.removeItem} editItem={this.editItem} editState={this.editState} edit={this.edit}/>
      </div>
    )
  }

})

// list
const ItemList = React.createClass({
  getInitialState() {
    return {
      editing: ""
    }
  },

  // onChange(e) {
  //   console.log('change!');
  // },

  editItem (item) {
    this.setState({
      editing: item
    })
    console.log('item', item);
    // console.log('parent state', )
  },

  endEdit() {
    this.setState({
      editing: ""
    })


  },

  onChange (name, index) {
    const { amount, description, credit, debit } = this.refs;
    let newItems = this.props.items;



    // console.log('name, index', name, index);
    // console.log('newItems[index][name]', newItems[index][name]);
    if (name === "amount") {
      newItems[index][name] = amount.value;
    } else if (name === "description"){
      newItems[index][name] = description.value;
    }

    if (credit.checked) {
      newItems[index]["type"] = "credit";
      console.log('crdit:', credit.value);
    } else if (debit.checked) {
      newItems[index]["type"] = "debit";
      console.log('debit', debit.value);
    }
    this.props.edit(newItems);

  },

  render() {
    const { items, removeItem, editState } = this.props;
    // const { onChange } = this;
    // console.log('items[0]', items[0].amount.value);
    // let { amount } = this.refs;

    let Items = items.map((item, index) => {

      // if editing
      if (item.id === this.state.editing) {
        return (
        <tr key={item.id}>
          <td>
            <input ref="amount" onChange={this.onChange.bind(this, "amount", index)} type="number" min='0' step='0.01' value={item.amount}/>
          </td>
          <td>
            <input ref="credit" onChange={this.onChange.bind(this, "credit", index)} type="radio" name="type" required />Credit
            <input ref="debit" onChange={this.onChange.bind(this, "debit", index)} type="radio" name="type" />Debit
          </td>
          <td>
            <input ref="description" onChange={this.onChange.bind(this, "description", index)} type="text" value={item.description} />
          </td>
          <td>{item.submitted}</td>
          <td>
            <button onClick={() => {this.endEdit()}} className="btn btn-sm btn-success">X</button>
          </td>
          <td>
            <button onClick={removeItem.bind(null, item.id)}  className="btn btn-sm btn-danger">X</button>
          </td>
        </tr>
      )
      } else {

        // if not editing
        return (

          <tr key={item.id}>
          <td>{item.amount}</td>
          <td>{item.type}</td>
          <td>{item.description}</td>
          <td>{item.submitted}</td>
          <td>
          <button onClick={() => {this.editItem(item.id)}} className="btn btn-sm btn-success">X</button>
          </td>
          <td>
          <button onClick={removeItem.bind(null, item.id)}  className="btn btn-sm btn-danger">X</button>
          </td>
          </tr>

        )
      }
    })

    return (
      <div>

      <table className="table">
      <thead>
      <tr>
      <th>Available Balance</th>
      <th>Total Credits</th>
      <th>Total Debits</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td>00</td>
      <td>00</td>
      <td>00</td>
      </tr>
      </tbody>

      </table>

      <h3>Transactions:</h3>
      <table className="table">
      <thead>
      <tr>
      <th>Amount</th>
      <th>Type</th>
      <th>Discription</th>
      <th>Submitted</th>
      <th>Edit</th>
      <th>Delete</th>
      </tr>
      </thead>
      <tbody>

      {Items}

      </tbody>
      </table>
      </div>
    )
  }
})

// form
const NewItemForm = React.createClass({
  submitForm(e) {
    e.preventDefault();

    let { amount } = this.refs; // ????

    function creditOrDebit () {
      if (document.getElementById("credit").checked) {
        return "credit";
      } else {
        return "debit";
      }
    }

    let item = {
      amount: amount.value,
      description: description.value,
      credit: document.getElementById("credit").checked,
      debit: document.getElementById("debit").checked,
      type: creditOrDebit(),
      submitted: moment().format('MMM Do, h:mm a'),
      id: uuid()
    }
    // console.log('item', item);
    this.props.addNewItem(item);

    amount.value = "";
    description.value = "";
    credit.checked = false;
    debit.checked = false;

  },

  render() {
    return (
      <form onSubmit={this.submitForm}>
      <div className="form-group">
      <label htmlFor="newItem" >Amount</label>
      <input ref="amount" type="number" className="form-control" id="amount" min='0' step='0.01' required/>
      </div>
      <div className="form-group">
      <label htmlFor="description">Description</label>
      <input type="text" className="form-control" id="description"/>
      </div>
      <div className="form-group">
      <input type="radio" name="type" id="credit" value="credit" required/>Credit
      <input type="radio" name="type" id="debit" value="debit"/>Debit
      <button className="btn btn-default">Submit</button>
      </div>
      </form>
    )
  }

})

ReactDOM.render(
  <App/>,
  document.getElementById('root')
)