---
id: overview
title: Default action creators
hide_title: true
sidebar_label: Overview
---

# Default action creators

All of the below action creators are availble through the [`create`](../api/create.md) API at any arbitrary leaf of [`actions`](../api/actions.md).

Some are more useful depending on the type of leaf state you are operating with:

## any
- [`.apply(callback)`](apply.md)
- [`.clear([toNull = false])`](clear.md)
- [`.reset()`](reset.md)
- [`.update(value)`](update.md)

## array
- [`.concat(array)`](concat.md)
- [`.drop([n = 1])`](drop.md)
- [`.filter(callback)`](filter.md)
- [`.push(element, [index = -1], [replace = false])`](push.md)

## boolean
- [`.off()`](off.md)
- [`.on()`](on.md)
- [`.toggle()`](toggle.md)

# number
- [`.increment([n = 1])`](increment.md)

## object
- [`.assign(...sources)`](assign.md)
- [`.path(path, value)`](path.md)
- [`.set(key, value)`](set.md)

## string
- [`.concat(string)`](concat.md)

