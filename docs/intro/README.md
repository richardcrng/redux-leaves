---
id: overview
title: Overview
hide_title: true
---

# Overview

The guiding philosophy of Redux-Leaves is *write once, reduce anywhere*.

**Just want to see some code? Check out the [30 second demo](demo.md).**

This page explains more about the motivation of Redux-Leaves and how its design philosophy is put into practice.

## Motivation

### Why?

Redux is great, but some developers complain about the boilerplate being [tedious, cumbersome and convoluted](https://medium.com/@Charles_Stover/no-boilerplate-global-state-management-in-react-41e905944eb7).

With a *write once, reduce anywhere* philosophy, Redux-Leaves aims to make Redux **easier to learn *and* quicker to scale**.

Redux-Leaves aims to provide:
- Quick setup;
- Intuitive API; and
- Advanced customisation.

### How?

One of the three core principles of Redux is: **"[Changes \[to global state\] are made with pure \[reducer\] functions"](https://redux.js.org/introduction/three-principles#changes-are-made-with-pure-functions)**.

This is typically supported by a lot of boilerplate in action types, action creators and switch/case logic for *every single slice of state*.

**What if we could just write some reducer logic and have it instantly available throughout our state tree?**

### What?

