import _ from 'lodash'

export const atIndex = (array, index) => array[positiveIndex(array, index)];

export const deleteAtIndex = (arr, idx) => [
  ...arr.slice(0, positiveIndex(arr, idx)),
  ...arr.slice(positiveIndex(arr, idx) + 2)
]

export const insertAtIndex = (arr, idx, newVal) => (
  idx < 0
    ? insertAfterIndex(arr, idx, newVal)
    : insertBeforeIndex(arr, idx, newVal)
)

export const replaceAtIndex = (arr, idx, newVal) =>
  _.map(arr, (value, index) =>
    positiveIndex(arr, idx) === index ? newVal : value
  );

const insertAfterIndex = (arr, idx, newVal) => [
  ...arr.slice(0, positiveIndex(arr, idx) + 1),
  newVal,
  ...arr.slice(positiveIndex(arr, idx) + 1)
];

const insertBeforeIndex = (arr, idx, newVal) => [
  ...arr.slice(0, positiveIndex(arr, idx)),
  newVal,
  ...arr.slice(positiveIndex(arr, idx))
];

const positiveIndex = (array, index) =>
  index < 0 ? array.length + parseInt(index) : index;