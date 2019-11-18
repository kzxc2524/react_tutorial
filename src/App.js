import React from 'react';
import logo from './logo.svg';
import './App.css';
import Customer from './components/customer.js'
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
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
  }
})


const customers = [
{
  'id':1,
  'image': 'http://placeimg.com/64/64/1',
  'name' : '홍길동',
  'birthday' : '961222',
  'gender' : '남자',
  'job' : '대학생'
},
{
  'id':2,
  'image': 'http://placeimg.com/64/64/2',
  'name' : '나동빈',
  'birthday' : '961222',
  'gender' : '남자',
  'job' : '프로그래머'
},
{
  'id':3,
  'image': 'http://placeimg.com/64/64/3',
  'name' : '이순신',
  'birthday' : '101222',
  'gender' : '남자',
  'job' : '장군'
}

]


class App extends React.Component{
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
              {customers.map(c => {
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
                })
              }
            </TableBody>
          </Table>

        </paper>
      )
    }
}

export default withStyles(styles)(App);
