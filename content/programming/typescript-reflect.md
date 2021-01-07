---
title: "Примеры использования декораторов с reflect-metadata в typescript'е"
---

## Декорирование методов c добавлением их в список

Можно применять, чтобы отметить поля как какие-то "особенные", чтобы
выполнять с ними какую-то обработку потом.

Храним в метаданных класса Set таких ключей и потом можем опрашивать, как описано в функции getDecorated()

```typescript
// Не храним как static readonly класса, потому что класс будет undefined в момент
// вызова декоратора.
export const SPECIAL_FIELDS_META_KEY = "some_key";

export function specialField(target: Foo, propertyKey: string | symbol): void {
  const fields: Set<string | symbol> = Reflect.getOwnMetadata(SPECIAL_FIELDS_META_KEY, target)
    ?? new Set<string | symbol>()
  ;
  fields.add(propertyKey);
  Reflect.defineMetadata(SPECIAL_FIELDS_META_KEY, fields, target);
}

class Foo {
  @specialField
  decoratedField = "bar";

  getDecorated(): (string|symbol)[] {
    const fields: Set<string | symbol> =  Reflect.getMetadata(Foo.fieldsMetaKey, this) || [];
    return Array.from(fields.entries); // ну или можно сразу fields.forEach перебрать что надо
  }
}

```