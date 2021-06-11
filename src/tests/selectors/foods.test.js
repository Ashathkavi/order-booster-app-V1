import selectFoods from '../../selectors/foods'
import sampleFoods from '../../fixtures/sampleFoods'

const sample_foods = sampleFoods()

test('should filter by name value', () => {
    const filters = {
        name:'ch',
        catText:'',
        boundryAmount:2000,
        size:''
    }
    const result = selectFoods(sample_foods, filters)
    expect(result).toEqual([sample_foods[2], sample_foods[3], sample_foods[0]])
})


test('should filter by category text value', () => {
    const filters = {
        name:'',
        catText:'fri',
        boundryAmount:2000,
        size:''
    }
    const result = selectFoods(sample_foods, filters)
    expect(result).toEqual([sample_foods[2], sample_foods[1], sample_foods[0]])
})

test('should filter by boundry amount value', () => {
    const filters = {
        name:'',
        catText:'',
        boundryAmount:500,
        size:''
    }
    const result = selectFoods(sample_foods, filters)
    expect(result).toEqual([sample_foods[3], sample_foods[1], sample_foods[0]])
})


test('should filter by size amount value', () => {
    const filters = {
        name:'',
        catText:'',
        boundryAmount:2000,
        size:'regular'
    }
    const result = selectFoods(sample_foods, filters)
    expect(result).toEqual([sample_foods[3], sample_foods[1], sample_foods[0]])
})