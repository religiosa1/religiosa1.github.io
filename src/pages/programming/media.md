---
title: "Работа с медиа-файлами"
layout: $/components/ArticleLayout.astro
---

Рекомендованные программы для оптимизаций или преобразования различных форматов медиа-файлов для веба. Все команды даны в синтаскисе CMD, но работают так же и под линуксом.

## Содержание

## Изображения

### Оптимизация png
Наилучшие результаты (по уровню сжатия с потерями) выдаёт [pngquant](https://pngquant.org/).


### Сборка png-секвенций

Несмотря на то, что в imagemagick'е есть специальная команда montage, простые анимированные секвенций легче собирать при помощи
```shell
$ convert .\*.png +append sprite.png
```

### Оптимизация JPG'ов
```shell
$ jpegoptim --strip-all --all-progressive -tm85 *.jpg
```

### Оптимизация SVG

Если необходимо ужать SVG файл, или исправить проблему с дубликатами в ID при инлайне, то можно воспользоваться пакетом svgo.

```shell
$ svgo --enable=prefixIds --disable=removeViewBox some.svg
```

prefixIds имеет параметр prefixClassNames, только непонтяно как его вызвать через консоль. Без viewBox инлайны не скейлятся по нормальному, так что эту опцию отключаем.

### Создание/ужатие WebP

Референсная имплементация от Google cwebp/dwebp. Ссылка на репозиторий с бинарниками доступна в их [документации](https://developers.google.com/speed/webp/docs/precompiled)

## Кодировка видео

### Генерация тамбнейлов

Превью можно сгенерировать командой (не забыв указать нужный размер у scale):

```shell
$ for %f in (*.mp4) do ffmpeg -i "%f" -vf "thumbnail,scale=1920:1012" -vframes 1 -y "out/%~nf.jpg"
```

### Кодировка webm/vp9 в два прохода

Без звука:

```shell
$ mkdir out
$ for %f in (*.mp4) do ffmpeg -i "%f" -vf scale="1920:-1" -c:v libvpx-vp9 -b:v 1M -an -pass 1 -y -f webm NUL && ffmpeg -i "%f" -vf scale="1920:-1" -c:v libvpx-vp9 -b:v 1M -an -pass 2 -y "out/%~nf.webm"
```

[Документация](https://trac.ffmpeg.org/wiki/Encode/VP9#variableb)

### Кодировка mp4/h264 в два прохода:

Без звука:

```shell
for %f in (*.mp4) do ffmpeg -y -i "%f" -vf scale="1920:1012" -c:v libx264 -b:v 1300k -pass 1 -an -f mp4 -y NUL && ffmpeg -i "%f" -vf scale="1920:1012" -c:v libx264 -b:v 1300k -pass 2 -an -y "out/%~nf.mp4"
```

[Документация](https://trac.ffmpeg.org/wiki/Encode/H.264#twopass)

## Преобразование шрифтов

Для компресии шрифтов в woff2 лучше использовать [референсную имплементацию](https://github.com/google/woff2)
от Google. Бинарников там нет, сборка под windows x64 лежит [тут](/media/woff2_1.02.zip)

