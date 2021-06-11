import moment from 'moment'
import {setBoundryAmount, setCatTextFilter, setSize, setNameFilter} from '../../actions/foodFilters'

test ('should generate set name filter action object', ()=>{
    const action = setNameFilter('chicken briyani')
    expect(action).toEqual({
        type:'SET_NAME_FILTER',
        name:'chicken briyani'
    })
})


test ('should generate set size filter action object', ()=>{
    const action = setSize('regular')
    expect(action).toEqual({
        type:'SET_SIZE',
        size:'regular'
    })
})


test ('should generate set boundry amount action object', ()=>{
    const action = setBoundryAmount(2000)
    expect(action).toEqual({
        type:'SET_BOUNDRY_AMOUNT',
        boundryAmount:2000
    })
})



test ('should generate set category text action object', ()=>{
    const action = setCatTextFilter('soup')
    expect(action).toEqual({
        type:'SET_CAT_TEXT_FILTER',
        catText:'soup'
    })
})
