---
id: motivation
title: Motivation
hide_title: true
sidebar_label: Motivation
---

# Motivation

## Problem

[Redux](https://redux.js.org/) and [Redux DevTools](https://github.com/zalmoxisus/redux-devtools-extension) both work great for following what is happening in your app.<sup>1</sup>

However, there are three pain points that at least one developer has encountered:

1. **Ugly boilerplate maintenance**: one more slice of state =  another load of action types, creators and reducers to write.
2. **Unhelpfully named constants**: what was `NONTRIVIAL_THING_HAPPENED` meant to do, again...?
3. **Repetitive reducer logic**: an action that updates some slice of state to `true`? *How novel!*

<sup>1</sup> *cf. what you* intended *to happen in your app...*

## Solution

`redux-leaves` is a library that is written to provide:

1. **Pleasingly little boilerplate**: set up your reducer and actions in one line
```js
const [reducer, actions] = riduce(initialState)
```

2. **Precise updates**: easily increment that counter, no matter how deeply you nested it
```js
dispatch(actions.distressingly.and.foolishly.deeply.nested.counter.create.increment(2))
```
3. **Predictable changes**: understand exactly what's happening with clear and consistently named action types:
```js
// action type dispatched above:
'distressingly/and/foolishly/deeply/nested/counter/asNumber.INCREMENT'
``` 
