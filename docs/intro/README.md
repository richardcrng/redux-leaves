---
id: overview
title: Overview
hide_title: true
---

# Overview

The guiding philosophy of Redux-Leaves is *"write once, reduce anywhere"*.

This page explains more about the motivation of Redux-Leaves and how its design philosophy is put into practice.

> **Just want to see some code? Check out the [30 second demo](demo.md) or [Code Sandbox](https://codesandbox.io/s/reduxleaves-iwc4f).**

## Motivation

### Why?

Redux is great, but some developers complain about the boilerplate being [tedious, cumbersome and convoluted](https://medium.com/@Charles_Stover/no-boilerplate-global-state-management-in-react-41e905944eb7).

> **Redux-Leaves aims to make Redux easier to learn *and* quicker to scale**.

### How?

One of the three core principles of Redux is: "[Changes \[to global state\] are made with pure \[reducer\] functions"](https://redux.js.org/introduction/three-principles#changes-are-made-with-pure-functions).

This can be easier said than done.

Achieving this can feel like it requires a lot of boilerplate in:
- action types;
- action creators; and
- switch/case logic...

... for *every single slice of state*.

> **What if we could write reducer logic and have it available *throughout our state tree?***

### What?

Redux-Leaves lets you *write once, reduce anywhere* with:
- [Quick setup](features.md#quick-setup);
- [Intuitive API](features.md#intuitive-api); and
- [Advanced customisation](features.md#advanced-customisation).