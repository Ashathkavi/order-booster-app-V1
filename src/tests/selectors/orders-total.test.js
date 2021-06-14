import selectOrdersTotal from '../../selectors/orders-total'
import sampleOrders from '../../fixtures/sampleOrders'

test('should return 0 if no orders', () => {
    const res = selectOrdersTotal([])
    expect(res).toBe(0)
})

test('should correctly add up a single order', () => {
    const res = selectOrdersTotal([sampleOrders()[0]])
    expect(res).toBe(1810)
})


test('should correctly add up multiple orders ', () => {
    const res = selectOrdersTotal(sampleOrders())
    expect(res).toBe(5610)
})