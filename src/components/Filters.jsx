import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

import FormControlLabel from '@mui/material/FormControlLabel';
import { useState } from 'react';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import { Box, Chip, Divider, Rating, Slider, Stack } from '@mui/material';
import Refresh from '@mui/icons-material/Refresh';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { filterProducts, resetFilters, setFilters } from '../redux/productsSlice';

const Filters = () => {

    const dispatch = useDispatch();
    const { filters } = useSelector(state => state.products);

    // Categories
    const handleChangeCategory = (event) => {
        dispatch(setFilters({ category: event.target.value }))
    };

    // Price
    const handleChangePrice = (event, newValue) => {
        dispatch(setFilters({ priceRange: newValue }))
    };

    // Rating
    const [ratingValue, setRatingValue] = useState(2);
    // Rating label
    const labelsRating = {
        0: 'Useless',
        0.5: 'Useless',
        1: 'Useless+',
        1.5: 'Poor',
        2: 'Poor+',
        2.5: 'Ok',
        3: 'Ok+',
        3.5: 'Good',
        4: 'Good+',
        4.5: 'Excellent',
        5: 'Excellent+',
    };
    const colorsLabelsRating = {
        0: '#e2e8f0',
        0.5: '#e2e8f0',
        1: '#e2e8f0',
        1.5: '#fecaca',
        2: '#fecaca',
        2.5: '#bfdbfe',
        3: '#bfdbfe',
        3.5: '#a7f3d0',
        4: '#a7f3d0',
        4.5: '#fde68a',
        5: '#fde68a',
    };
    const [ratingLabelHover, setRatingLabelHover] = useState(-1);
    const handleChangeRating = (event, newValue) => {
        setRatingValue(newValue);
        dispatch(setFilters({ rating: newValue }))
    };
    const handleHoverRating = (event, newHover) => {
        setRatingLabelHover(newHover);
    };

    // handle Reset
    const handleReset = () => {
        dispatch(resetFilters());
    }

    // listen filters
    useEffect(() => {
        dispatch(filterProducts());
    }, [filters, dispatch])


    return (
        <>
            {/* FILTERS */}
            <div >
                <div className="w-full" >
                    {/* ACCORDION */}
                    <div className='mt-6' >
                        <Accordion defaultExpanded elevation={0} >
                            <AccordionSummary
                                className='border border-solid border-slate-50'
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <strong>CATEGORIES</strong>
                            </AccordionSummary>
                            <Divider variant="middle" />
                            <AccordionDetails >
                                <FormControl>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        name="radio-buttons-group"
                                        value={filters.category}
                                        onChange={handleChangeCategory}
                                    >
                                        <FormControlLabel value="" control={<Radio />} label="All Products" />
                                        {filters.categories.map((category) => (
                                            <FormControlLabel key={category} value={category} control={<Radio />} label={category.charAt(0).toUpperCase() + category.slice(1)} />
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion defaultExpanded elevation={0} >
                            <AccordionSummary
                                className='border border-solid border-slate-50'
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2-content"
                                id="panel2-header"
                            >
                                <strong>PRICE</strong>
                            </AccordionSummary>
                            <Divider variant="middle" />
                            <AccordionDetails >
                                <Box sx={{ width: '100%' }}>
                                    <Stack spacing={2} direction="row" sx={{ alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                                        <p className='text-sm text-gray-500 ' >min</p>
                                        <Slider
                                            getAriaLabel={() => 'Price range'}
                                            value={filters.priceRange}
                                            onChange={handleChangePrice}
                                            valueLabelDisplay="auto"
                                            min={filters.minPrice}
                                            max={filters.maxPrice}
                                        />
                                        <p className='text-sm text-gray-500 ' >max</p>
                                    </Stack>
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion defaultExpanded elevation={0} >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel3-content"
                                id="panel3-header"
                            >
                                <strong>RATING</strong>
                            </AccordionSummary>
                            <Divider variant="middle" />
                            <AccordionDetails sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                                {/* TODO: Agregar estado (Good, excelent ... ) */}
                                <Rating name="size-large" value={filters.rating} onChange={handleChangeRating} onChangeActive={handleHoverRating} precision={0.5} size="large" />

                                {ratingValue !== null && (
                                    <>
                                        <Chip
                                            // icon={<Face />}
                                            label={labelsRating[ratingLabelHover !== -1 ? ratingLabelHover : filters.rating]}
                                            // color={colorsLabelsRating[ratingLabelHover !== -1 ? ratingLabelHover : ratingValue]}
                                            size='small'
                                            sx={{ bgcolor: colorsLabelsRating[ratingLabelHover !== -1 ? ratingLabelHover : filters.rating] }}
                                        />
                                    </>
                                )}

                            </AccordionDetails>
                        </Accordion>
                    </div>

                    <div className='mx-3 mt-6 ' >
                        <Button variant='contained' color='primary' size='large' startIcon={<Refresh />} onClick={handleReset} >Reset Filters</Button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Filters
