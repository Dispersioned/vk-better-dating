// Используется если в ответах ничего не пришло для явного выделения "недостаточной информации" о данных
export type UnknownType = unknown

// example "0001-01-01T00:00:00Z"
export type DateString = string

// example "2024-11-05T19:30:21.707487315Z"
export type ServerTime = string

// Например пол 'male' | 'female' это полный enum. А статус может быть 'ready' | ???
export type UnidentifiedStringEnum = string