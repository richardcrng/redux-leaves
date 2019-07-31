export const atIndex = (array: any[], index: number) => array[positiveIndex(array, index)];

export const deleteAtIndex = (arr: any[], idx: number) => [
  ...arr.slice(0, positiveIndex(arr, idx)),
  ...arr.slice(positiveIndex(arr, idx) + 2)
]

export const insertAtIndex = (arr: any[], idx: number, newVal: any) => (
  idx < 0
    ? insertAfterIndex(arr, idx, newVal)
    : insertBeforeIndex(arr, idx, newVal)
)

export const replaceAtIndex = (arr: any[], idx: number, newVal: any) =>
  arr.map((value, index) => positiveIndex(arr, idx) === index ? newVal : value);

const insertAfterIndex = (arr: any[], idx: number, newVal: any) => [
  ...arr.slice(0, positiveIndex(arr, idx) + 1),
  newVal,
  ...arr.slice(positiveIndex(arr, idx) + 1)
];

const insertBeforeIndex = (arr: any[], idx: number, newVal: any) => [
  ...arr.slice(0, positiveIndex(arr, idx)),
  newVal,
  ...arr.slice(positiveIndex(arr, idx))
];

const positiveIndex = (array: any[], index: number | string) =>
  index < 0 ? array.length + parseInt(`${index}`) : parseInt(`${index}`);