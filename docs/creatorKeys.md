---
id: creator-keys
title: Creator Keys
hide_title: true
sidebar_label: Creator keys
---

# Creator keys

A creator key (`creatorKey`) serves two roles:

1. In a [`reducersDict`](README.md#reducersdict), it uniquely identifies a given [leaf reducer](leafReducers.md); and
2. In the `actions` API, it is an action creator available at a given [leaf](leaf/README.md) through [`.create[creatorKey]`](create/README.md).