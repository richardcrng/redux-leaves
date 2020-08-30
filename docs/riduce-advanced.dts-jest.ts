import riduce from '../src'

// @dts-jest:group shorthand examples
{
  const restaurantState = {
    tables: [
      { persons: 4, hasOrdered: false, hasPaid: false },
      { persons: 3, hasOrdered: true, hasPaid: false }
    ],
    stock: {
      ramen: {
        beef: 5,
        veg: 2
      },
      sushi: {
        nigiri: 10,
        sashimi: 4
      }
    }
  }

  type Table = typeof restaurantState['tables'][0]

  const finishTable = (tableState: Table) => ({
    ...tableState,
    hasOrdered: true,
    hasPaid: true
  })

  const decreaseValuesBy = (leafState: Record<string, number>, action: any) => {
    const keys = Object.keys(leafState)
    return keys.reduce((acc, key) => ({
      ...acc,
      [key]: leafState[key] - action.payload
    }), {})
  }

  const [reducer, actions] = riduce(restaurantState, {
    finishTable,
    decreaseValuesBy
  })

  // @dts-jest:pass
  actions.tables[0].create.finishTable()

  // @dts-jest:fail
  actions.stock.ramen.create.finishTable()

  // @dts-jest:pass
  actions.stock.ramen.create.decreaseValuesBy(1)

  // @dts-jest:pass
  actions.stock.sushi.create.decreaseValuesBy(4)

  // @dts-jest:fail
  actions.tables.create.decreaseValuesBy()
}

