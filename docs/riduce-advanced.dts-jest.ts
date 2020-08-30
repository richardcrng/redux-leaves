import riduce from '../src/riduce'
import { Riducer } from '../src/types'

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

// @dts-jest:group longhand examples
{
  const bookstoreState = {
    books: {
      9780007925568: {
        title: 'Moby Dick',
        authorName: 'Herman Melville',
        stock: 7
      },
      9780486280615: {
        title: 'The Adventures of Huckleberry Finn',
        authorName: 'Mark Twain',
        stock: 10
      },
      9780764502231: {
        title: 'JavaScript for Dummies',
        authorName: 'Emily A. Vander Veer',
        stock: 5
      }
    },
    visitor: {
      count: 2,
      guestbook: []
    }
  }

  type BookstoreState = typeof bookstoreState

  interface BookReview {
    id: keyof BookstoreState['books'],
    stars: number,
    comment?: string
  }

  const addBookReviews: Riducer<{
    treeState: BookstoreState,
    leafState: string[],
    args: BookReview[],
    payload: BookReview[]
  }> = {
    argsToPayload: (...reviews) => reviews,
    reducer: (leafState, { payload: reviews = [] }, treeState) => {
      return reviews.reduce((acc, { stars, id, comment }) => ([
        ...acc,
        `${stars} stars for ${treeState.books[id].title}! ${comment}`
      ]), leafState)
    }
  }

  const [reducer, actions] = riduce(bookstoreState, { addBookReviews })

  // @dts-jest:fail
  actions.create.addBookReviews([])

  // @dts-jest:fail
  actions.visitor.guestbook.create.addBookReviews({ id: '9780007925568', stars: 4.5 })

  actions.visitor.guestbook.create.addBookReviews(
    { id: 9780007925568, stars: 4.5 },
    { id: 9780764502231, stars: 5, comment: 'so great!!' }
  )
}

