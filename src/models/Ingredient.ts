export interface Ingredient {
  /** Название */
  name: string;
  /** Количество с ед. измерения */
  quant?: string;
  /** Альтернативная единица измерения */
  alt?: string;
  /** Описание или пояснение */
  desc?: string;
}