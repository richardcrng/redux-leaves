---
id: creators
title: Action Creators
hide_title: true
sidebar_label: Action creators
---

# Action Creators

## User-defined
Every user-defined action creator has a unique [creator key](../creatorKeys.md) (`creatorKey`) such that:
- it uniquely identifies a leaf reducer in [`reducersDict`](../README.md#reducersdict);
- `create[creatorKey]` is an action creator function available at every single [leaf](../leaf/README.md) on our `actions` object; and
- an action created by said action creator will trigger the matching leaf reducer.

## Defaults

Redux-Leaves also ships with some [default action creators](defaults.md) available.