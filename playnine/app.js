//props: numberOfStars
const Stars = (props) => {
	return (
  	<div className="col-4"> 
    	{ _.range(props.numberOfStars).map( x => <i className="fa fa-star"/>) }
    </div>
  )
}

//props: disabled: bool, onClickCallback: function, isCorrectAnswer: bool/null
const Button = (props) => {
	let className
  let text
  switch (props.isCorrectAnswer) {
  	case true:
    	className = "btn btn-success";
      text = <i className="fa fa-check"/>
    	break;
    case false:
    	className = "btn btn-danger";
      text = <i className="fa fa-times"/>
    	break;
    default:
    	className = "btn btn-secondary"
      text = "="
    	break;
  }
  
	return (
  	<div className="col-2">
    	<button className={className} onClick={() => props.onClickCallback() } disabled={props.disabled}>
      	{text}
      </button>
    </div>
  )
}
//props onClickCallback, attemptsLeft, disabled
const Refresh = (props) => {
	return (
  	<div className="col-2">
    	<button className="btn btn-warning" 
      	disabled={props.attemptsLeft < 1}
      	onClick={() => props.onClickCallback() }>
      	<i className="fa fa-sync-alt"/> { props.attemptsLeft }
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

//props: consumedNumbers, disabledNumbers, onClickCallback
class Numbers extends React.Component {
	
  classNameForNumber = (number) => {
  	if (this.props.consumedNumbers.indexOf(number) >= 0) {
    	return "consumed";
    }
  	if (this.props.disabledNumbers.indexOf(number) >= 0) {
    	return "selected";
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
	static randomNumberOfStars = () => Math.floor(Math.random() * 10) + 1
  
	constructor(props) {
  	super(props)
    this.state = { 
    		numberOfStars: Game.randomNumberOfStars(),
        isCorrectAnswer: null,
    		selectedNumbers: [],
        consumedNumbers: [],
        attemptsLeft: 5
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
  
  refreshGame = () => {
  	if (this.state.attemptsLeft < 1) { return }
    
    this.setState((prevState) => ({
    	numberOfStars: Game.randomNumberOfStars(),
      isCorrectAnswer: null,
      selectedNumbers: [],
    	attemptsLeft: this.state.attemptsLeft - 1
    }))
  }
  
  handleAnswerSubmitted = () => {
  	if (this.state.isCorrectAnswer === true) {
    	this.setState((prevState) => ({
      	numberOfStars: Game.randomNumberOfStars(),
        isCorrectAnswer: null,
        consumedNumbers: prevState.consumedNumbers.concat(this.state.selectedNumbers),
      	selectedNumbers: []
      }));
    } else {
    	const sum = this.state.selectedNumbers.reduce((accumulator, current) => accumulator + current, 0);
    	const isCorrectAnswer = this.state.numberOfStars === sum;
    	this.setState({
    		isCorrectAnswer:isCorrectAnswer
    	})
    }
  }
  
	render() {
		return (
    	<div className="container-fluid">
      	<h3>Starz</h3>
        <hr />
        <div className="row">
    	  	<Stars numberOfStars={this.state.numberOfStars}/>
          
          <div className="column">
          	<Button disabled={this.state.selectedNumbers.length === 0}
          		isCorrectAnswer={this.state.isCorrectAnswer}
          		onClickCallback={this.handleAnswerSubmitted}/>
            <br/>
          	<Refresh attemptsLeft={this.state.attemptsLeft}
          		onClickCallback={this.refreshGame}/>
          </div>
          
          <Answer selectedNumbers={this.state.selectedNumbers}
          onClickCallback={this.deselectNumber}/>
        </div>
        <br/>
        
        {
        this.state.attemptsLeft > 0 ?
        	<Numbers consumedNumbers={this.state.consumedNumbers}
        			disabledNumbers={this.state.selectedNumbers} 
          		onClickCallback={this.selectNumber}/>
              : 
              <h4>Game over</h4>
        }
        
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
