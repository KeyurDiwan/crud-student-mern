import { Avatar, Button, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, TablePagination, Typography } from '@material-ui/core'
import React from 'react'



// for formatting any number
const formatter = new Intl.NumberFormat( 'en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
} );
// formatter.formate(num)

const StudentCard = ({student}) => {
  return (
      <Card>


          <CardHeader
            avatar={<Avatar />}
            title={<Typography variant="h6">{student.name}</Typography>}
          
          />

          <CardContent>
             
              <Typography variant="caption"> Test Mark :  {student.testMark} </Typography>
              <Typography variant="h6"> Name Of Test :  {student.testName} </Typography>

          </CardContent>

          <CardActions>
            
              <Button variant="contained" size='small' color="primary"> Check Status </Button>
              <Button  size='small' color="primary">  More </Button>

          </CardActions>

     

      </Card>
      
     
  )
}

export default StudentCard