import { findActionRouteAndModifier } from './';

describe("**Feature**: when provided one argument, splits it into a route array and modifier string", () => {

  describe("GIVEN a string, 'app/with/some/ACTION'", () => {
    const string = "app/with/some/ACTION"

    describe("WHEN the string is passed to findActionRouteAndModifier", () => {
      const result = findActionRouteAndModifier(string)

      test("THEN it returns an object with route ['app', 'with', 'some'] and modifier 'ACTION'", () => {
        expect(result.route).toEqual(['app', 'with', 'some'])
        expect(result.modifier).toEqual('ACTION')
      })
    })
  })

  describe("GIVEN a string, 'app/ACTION'", () => {
    const string = "app/ACTION"

    describe("WHEN the string is passed to findActionRouteAndModifier", () => {
      const result = findActionRouteAndModifier(string)

      test("THEN it returns an object with route ['app'] and modifier 'ACTION'", () => {
        expect(result.route).toEqual(['app'])
        expect(result.modifier).toEqual('ACTION')
      })
    })
  })

  describe("GIVEN a string, 'ACTION'", () => {
    const string = "ACTION"

    describe("WHEN the string is passed to findActionRouteAndModifier", () => {
      const result = findActionRouteAndModifier(string)

      test("THEN it returns an object with route [] and modifier 'ACTION'", () => {
        expect(result.route).toEqual([])
        expect(result.modifier).toEqual('ACTION')
      })
    })
  })

  describe("GIVEN a string, '/ACTION/'", () => {
    const string = "/ACTION/"

    describe("WHEN the string is passed to findActionRouteAndModifier", () => {
      const result = findActionRouteAndModifier(string)

      test("THEN it returns an object with route [] and modifier 'ACTION'", () => {
        expect(result.route).toEqual([])
        expect(result.modifier).toEqual('ACTION')
      })
    })
  })
})

describe("**Feature**: when provided two arguments, uses the second to append to the route", () => {
  describe("GIVEN string = 'app/with/some/ACTION", () => {
    const string = "app/with/some/ACTION"

    describe("WHEN it is called with string and a second argument, 'meta/path/for'", () => {
      const result = findActionRouteAndModifier(string, 'meta/path/for')

      test("THEN it returns route ['app', 'with', 'some', 'meta', 'path', 'for'] and modifier ACTION", () => {
        expect(result.route).toEqual(['app', 'with', 'some', 'meta', 'path', 'for'])
        expect(result.modifier).toEqual("ACTION")
      })
    })
  })
})