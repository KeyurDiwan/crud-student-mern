import { Button, CircularProgress, Container, FormControl, FormControlLabel, Grid, makeStyles, Paper, Radio, RadioGroup, Slider, TextField, Typography } from '@material-ui/core'
import {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate, useLocation, useParams  } from 'react-router-dom';
import StudentCard from '../components/StudentCard';
import Pagination from '../components/Pagination';


const useStyles = makeStyles( {
    root: {
        marginTop: '20px',
    },
    loader: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    paper: {
        marginBottom: '1rem',
        padding: '13px',
    },
    filters: {
        padding: "0 1.5rem"
    },
    markRangeInputs: {
        display: 'flex',
        justifyContent: 'space-between',
    },
})

const StudentPage = (  ) => {
    
    // 
    const match = { params: useParams() };
  const pageNumber = match.params.pageNumber || 1

    // Material ui styles 
    const classes = useStyles();

    let navigate = useNavigate();
    const location = useLocation();

    const params = location.search ? location.search : null;

    // components state
    const [students, setStudents] = useState( [] );
    const [loading, setLoading] = useState( false );
    const [pages, setPages] = useState( 1 );
    const [numPage, setNumPage] = useState( pageNumber );

    const [sliderMax, setSliderMax] = useState( 100 );
    const [markRange, setMarkRange] = useState( [0, 100] );
    const [markOrder, setMarkOrder] = useState( "descending" );


    const [filter, setFilter] = useState( "" );
    const [sorting, setSorting] = useState( "" );
    const[filterForPagination, setFilterForPagination] = useState( "" );

    const updateUIValues = ( uiValues ) => {
        setSliderMax( uiValues.maxMark );

        if ( uiValues.filtering.testMark ) {
            let markFilter = uiValues.filtering.testMark;

            setMarkRange( [Number( markFilter.gte ), Number( markFilter.lte )] );
            
        }

        if ( uiValues.sorting.testMark ) {
            let markSort = uiValues.sorting.testMark;
            setMarkOrder( markSort );
        }
        

    }

    // side effects 
    useEffect( () => {

        let cancel;
        const fetchData = async () => {
            setLoading( true );
            try {
                let query;
               

                if (params && !filter) {
                    query = params;
                } else {
                    query = filter;
                }

                if ( sorting ) {
                    if ( query.length === 0 ) {
                        query = `?sort=${sorting}`
                    } else {
                        query = query + "&sort=" + sorting;
                    }
                }

                if ( numPage ) {
                     if ( query.length === 0 ) {
                        query = `?page=${numPage}`
                    } else {
                        query = query + "&page=" + numPage;
                    }
                }
              
                const { data } = await axios( {
                    method: 'GET',
                    url: `http://localhost:3001/api/v1/student${query}`,
                    cancelToken: new axios.CancelToken( ( c ) => cancel = c )
                } );

                setStudents( data.data );
                setPages( data.pages );
                // console.log( data.pages );

                setLoading( false );
                updateUIValues( data.uiValues );
                
            } catch ( error ) {
                if ( axios.isCancel( error ) ) return;
                console.log(error.response.data)
            }
        }
        fetchData();

        return () => cancel();

    }, [filter, params, sorting, numPage,filterForPagination] );

    const handleMarkInputChange = ( e, type ) => {
        
        let newRange;

        if ( type === 'lower' ) {
            //    if ( Number( e.target.value ) > markRange[1] ) {
            //        return;
            //    }

            newRange = [...markRange];
            newRange[0] = Number( e.target.value );

            setMarkRange( newRange );
        }

        if ( type === 'upper' ) {
              
            newRange = [...markRange];
            newRange[1] = Number( e.target.value );

            setMarkRange( newRange );
        }
    };

    const onSliderCommitHandler = ( e, newValue ) => {
        buildRangeFilter( newValue );
    };

    const onTextfieldCommitHandler = () => {

        buildRangeFilter( markRange );

        // console.log( markRange );
        
    };

    const buildRangeFilter = ( newValue ) => {
        const urlFilter = `?testMark[gte]=${ newValue[0] }&testMark[lte]=${ newValue[1] }&page=${numPage}`;
        
        setFilter( urlFilter );
        
        navigate( urlFilter );
    };


    const handleSortChange = ( e ) => {
        setMarkOrder( e.target.value );

        if ( e.target.value === 'ascending' ) {
            setSorting( "testMark" );
        } else if ( e.target.value === 'descending' ) {
            setSorting( "-testMark" );
        }
           
        
    };

    const clearAllFilters =  () => {
        setFilter( "" );
        setSorting( "" );
        setMarkRange( [0, 100] );
        navigate( "/" );
    };

    const paginationFun = () => {

      console.log("fjfffj")

        const urlFilter = `?page=${ numPage }`;
        setFilterForPagination( urlFilter );
        navigate( urlFilter );

    }
    

 



  return (
    
     
      <Container className={classes.root}>

          {/* Pagination */}
        
          {/* Filtering and sorting */}
          <Paper className = {classes.paper}>
              <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                 
                      <Typography gutterBottom> Filters </Typography>
                 
                      <div className = {classes.filters}>
                          <Slider
                              min={0}
                              max={sliderMax}
                              value={markRange}
                              valueLabelDisplay="auto"
                              disabled={loading}
                              onChange={( e, newValue ) => setMarkRange( newValue )}
                              onChangeCommitted={onSliderCommitHandler}
                          />

                          <div className = {classes.markRangeInputs}>
                              <TextField
                                  size="small"
                                  id='lower'
                                  label="Min Marks"
                                  variant="outlined"
                                  type="number"
                                  disabled={loading}
                                  value={markRange[0]}
                                  onChange = {(e) => handleMarkInputChange(e, 'lower')}
                                  onBlur={onTextfieldCommitHandler}
                              />

                              {/* ------ */}

                                <TextField
                                  size="small"
                                  id='upper'
                                  label="Max Marks"
                                  variant="outlined"
                                  type="number"
                                  disabled={loading}
                                  value={markRange[1]}
                                  onChange = {(e) => handleMarkInputChange(e, 'upper')}
                                  onBlur={onTextfieldCommitHandler}
                              />
                          </div>
                      </div>
                      
                  </Grid>

                  <Grid item xs={12} sm={6}>
                      <Typography gutterBottom> Sort By </Typography>
                      <FormControl components = 'fieldset' className = {classes.filters}>
                          <RadioGroup
                              aria-label="mark-order"
                              name="mark-order"
                              value={markOrder}
                              onChange={handleSortChange}
                          >
                              <FormControlLabel
                                  value="descending"
                                  disabled={loading}
                                  control={<Radio />}
                                  label="Mark: Highest - Lowest" />

                              <FormControlLabel
                                  value="ascending"
                                  disabled={loading}
                                  control={<Radio />}
                                  label="Mark: Lowest - Highest" />
                              
                          </RadioGroup>
                        </FormControl>
                      
                  </Grid>
                </Grid>

              <Button size='small' color="primary" onClick = {clearAllFilters} > Clear All Filters </Button>
              
        </Paper>


          <Pagination numPage={numPage} pages={pages} changePage={setNumPage} />



          {/* student listing */}

          <Grid container spacing={2} >
             
              {loading ? (
                  <div className={classes.loader}>
                    <CircularProgress size='3rem' thickness={5}/>
                  </div>
              ) : (
                      students.map( s => (
                          <Grid item key={s._id} xs={ 12 } sm = {6} md={4} lg={3} >
                              <StudentCard  student = {s} />
                         </Grid>
                      ) )
              )}
          </Grid>


           <Pagination numPage = {numPage} pages = {pages}  changePage = {setNumPage} onClick = {paginationFun} />

      </Container>
      

  )
}

export default StudentPage