---
id: standard-actions
title: Leaf-Standard-Actions
hide_title: true
sidebar_label: Leaf-Standard-Actions
---

# Leaf-Standard-Actions (LSA)

Redux-Leaves builds upon the '[Flux Standard Action](https://github.com/redux-utilities/flux-standard-action)' (FSA) framework.

## Background
The common Redux standard for reducers is that they [use an action's `type` property](https://redux.js.org/faq/reducers#do-i-have-to-use-the-switch-statement-to-handle-actions) to decide which logic to trigger.

It is advised that [`type` should be a string, or at least serializable](https://redux.js.org/faq/actions#why-should-type-be-a-string-or-at-least-serializable-why-should-my-action-types-be-constants).

`type` is also used prominently in [Redux DevTools](http://extension.remotedev.io/) on that assumption.

Although Redux doesn't require that actions be FSA, it is [given as a recommendation](https://redux.js.org/glossary#action).

### Recap of FSA
[Definition of a FSA](https://github.com/redux-utilities/flux-standard-action/blob/master/README.md#actions):
> An action MUST
> 
> * be a plain JavaScript object.
> * have a `type` property.
> 
> An action MAY
> 
> * have an `error` property.
> * have a `payload` property.
> * have a `meta` property.
> 
> An action MUST NOT include properties other than `type`, `payload`, `error`, and `meta`.


## Motivation

There *can* be a conflict between:
- `type` being maximally useful for Redux DevTools debugging ('the *descriptive* imperative'); and
- `type` being maximally useful as a director of reducer logic ('the *procedural* imperative').

However, there is no intrinsic reason why reducers *have* to look at `type` to decide what to do.

As such, Redux-Leaves takes the design decision to separate out the *descriptive* and the *procedural* imperative, by:

- reserving the `type` property for the descriptive imperative; and
- introducing a `leaf` property for the procedural imperative.

### The descriptive imperative: `type`

The roadmap for Redux-Leaves includes adding a [configuration key](../leafReducers.md#configuration-keys) so that developers can customise the `type` used by a given [action creator](../create/README.md).

The default (and, for now, only) behaviour is such that:

```js
const action = actions.foo.bar.create.creatorKey()
console.log(action.type)  // foo/bar/CREATOR_KEY
```

### The procedural imperative: `leaf`

WIP here