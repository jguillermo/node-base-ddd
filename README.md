# BASE DDD
----
Conjunto de herramientas para poder implementar en el desarrollo con node.
``` bash
npm i base-ddd
```
## value object
Estas clases asbtractas ayudan a modelar el negocio.
- Boolean
- Date
- Number
- String
- Uuid
- Id
- Enum

### Boolean

```jsx
export class BooleanTypeImp extends ArrayType {
}
```

### Date
```jsx
export class DateTypeImp extends DateType {}
```

### Number
```js
export class NumberTypeImp extends NumberType {}
```

### String
```js
export class StringTypeImp extends StringType {}
```

### Uuid

```js
export class UuidTypeImp extends UuidType {
}
```

### Id
```jsx
export class IdTypeImp extends IdType {}
```

### Enum
```jsx
enum StatusString {
  UP = 'up',
  DOWN = 'down',
}

export class EnumTypeImp extends EnumType<StatusString> {
  constructor(value: keyof typeof StatusString | null | undefined = null) {
    super(EnumType.create<StatusString>(value, Object.values(StatusString)));
  }
}
```
## Tools
- https://github.com/conventional-changelog/commitlint

