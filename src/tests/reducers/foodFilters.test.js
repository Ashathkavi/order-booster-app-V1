import foodFiltersReducer from '../../reducers/foodFilters'

test('should setup default filter value', () => {
    const state = foodFiltersReducer(undefined, {type:'@@INIT'})
    expect(state).toEqual({
        name:'',
        catText:'',
        boundryAmount:2000,
        size:''
    })
})

test('should set food name', () => {
    const action = {
        type:'SET_NAME_FILTER',
        name:'ash'
    }
    const state = foodFiltersReducer(undefined, action)
    expect(state).toEqual({
        name:'ash',
        catText:'',
        boundryAmount:2000,
        size:''
    })
})

test('should set food category text', () => {
    const action = {
        type:'SET_CAT_TEXT_FILTER',
        catText:'bri'
    }
    const state = foodFiltersReducer(undefined, action)
    expect(state).toEqual({
        name:'',
        catText:'bri',
        boundryAmount:2000,
        size:''
    })
})


test('should set boundry amount', () => {
    const action = {
        type:'SET_BOUNDRY_AMOUNT',
        boundryAmount:500
    }
    const state = foodFiltersReducer(undefined, action)
    expect(state).toEqual({
        name:'',
        catText:'',
        boundryAmount:500,
        size:''
    })
})


test('should set size', () => {
    const action = {
        type:'SET_SIZE',
        size:'regular'
    }
    const state = foodFiltersReducer(undefined, action)
    expect(state).toEqual({
        name:'',
        catText:'',
        boundryAmount:2000,
        size:'regular'
    })
})

