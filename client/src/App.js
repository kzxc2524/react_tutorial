import React from 'react';
import logo from './logo.svg';
import './App.css';
import Customer from './components/customer.js'
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';
import {withStyles} from '@material-ui/core/styles';
import paper from '@material-ui/core/Paper';


const styles = theme => ({
  root : {
    width: '100%',
    marginTop:theme.spacing.unit*3,
    overflowX:"auto"
  },
  table:{
    minWidth:1080
  },
  progress:{
    marginTop:theme.spacing.unit*2,
  }
})

class App extends React.Component{
    state = {
      customers:"",
      completed:0
    }

    componentDidMount() {
      this.timer = setInterval(this.progress, 20);
      
    }

    callApi = async () => {
      const response = await fetch('/api/customers');
      const body  = await response.json();
      return body;
    }

    progress = () => {
      const {completed} = this.state;
      this.setState({completed : completed >= 100 ? 0 : completed + 1});
    }

    render(){
      const {classes} = this.props;
      return(
        <paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell>image</TableCell>
                <TableCell>name</TableCell>
                <TableCell>birthday</TableCell>
                <TableCell>gender</TableCell>
                <TableCell>job</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.customers ? this.state.customers.map(c => {
                  return(
                    <Customer
                      id={c.id}
                      image={c.image}
                      name={c.name}
                      birthday={c.birthday}
                      gender={c.gender}
                      job={c.job}
                    />
                  )
                }) : 
                <TableRow>
                  <TableCell colSpan='6' align="center">
                    <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}/>
                  </TableCell>  
                </TableRow>
              }
            </TableBody>
          </Table>

        </paper>
      )
    }
}

export default withStyles(styles)(App);
