//props: numberOfStars
const Stars = (props) => {
	return (
  	<div className="col-4"> 
    	{ _.range(props.numberOfStars).map( x => <i className="fa fa-star"/>) }
    </div>
  )
}

//props: disabled
const Button = (props) => {
	return (
  	<div className="col-2 answerButton">
    	<button disabled={props.disabled}>
      	=
      </button>
    </div>
  )
}

//props: selectedNumbers, onClickCallback
const Answer = (props) => {
	return (
  	<div className="col-4">
    	{ props.selectedNumbers.map(x => 
      	<span onClick={() => props.onClickCallback(x)}>
        	{x}
        </span> ) }
    </div>
  )
}

//props: disabledNumbers, onClickCallback
class Numbers extends React.Component {
	
  classNameForNumber = (number) => {
  	if (this.props.disabledNumbers.indexOf(number) >= 0) {
    	return "disabled";
    }
  };
  
  handleClick = (number) => {
    const isEnabled = this.props.disabledNumbers.indexOf(number) === -1
  	if (isEnabled) {
    	this.props.onClickCallback(number);
    }
  }

	render() {
  	return (
  		<div className="card text-center">
    		<div>
    			{ _.range(1, 10).map(x => 
          	<span className={this.classNameForNumber(x)}
            	onClick={() => this.handleClick(x) } > 
            	{x} 
            </span> 
          )}
      	</div>
    </div>
  )
  }
}

class Game extends React.Component {
	constructor(props) {
  	super(props)
    this.state = { 
    		selectedNumbers: [],
    		numberOfStars: Math.floor(Math.random() * 10) + 1
      }
  };
  
  selectNumber = (number) => {
    this.setState(prevState => ({
    	selectedNumbers: prevState.selectedNumbers.concat(number)
    }));
  };
  
  deselectNumber = (number) => {
  	this.setState(prevState => ({
    	selectedNumbers: prevState.selectedNumbers.filter((x) => x !== number)
    }));
  }
  
	render() {
		return (
    	<div className="container-fluid">
      	<h3>Play Nine</h3>
        <hr />
        <div className="row">
    	  	<Stars numberOfStars={this.state.numberOfStars}/>
          <Button disabled={this.state.selectedNumbers.length === 0}/>
          <Answer selectedNumbers={this.state.selectedNumbers}
          onClickCallback={this.deselectNumber}/>
        </div>
        <br/>
        <Numbers disabledNumbers={this.state.selectedNumbers} 
          	onClickCallback={this.selectNumber}/>
    	</div>
    )
	}
}

class App extends React.Component {
  render() {
  	return (
    	<Game/>
    )
  }
}

ReactDOM.render(<App/>, mountNode);
