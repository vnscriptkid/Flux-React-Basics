## Flux

- Store needs a `action handler` that checks matching actions and execute changes to store
- Store need to register `action handler` of a `store` to `dispatcher` who will call `action handler` every time
  someone dispatch an action to `dispatcher`
- Store need to emit `event` to reflect changes to components (Store is an object that extends EventEmitter)
- Component need to listen for events from store to make changes to its content

#### Roles of each piece

#### Flux vs Redux
