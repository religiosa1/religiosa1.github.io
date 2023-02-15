---
title: "Кросс-компиляция Rust для raspberry pi"
---

В этой статье описан процесс кросскомпиляции из под Windows на raspberry pi/raspbian как он был на 2017 год.
Вероятно часть с OpenSSL уже поменялась, но можно использовать статью как основу для процесса.


Кросскомпиляция для pi из под винды не представляет сложности, пока вам не понадобится openssl.

Для начала, настройка кросскомпиляции в самом cargo. Для начала сам тулчейн rust'а:

```
> rustup target add armv7-unknown-linux-gnueabihf
```

Также нужно скачать и установить arm-toolchain [отсюда](http://gnutoolchains.com/raspberry/)

Дальше создаём папку и файл .cargo/config со следующим содержимым:

```toml
[build]
target = "armv7-unknown-linux-gnueabihf"

[target.armv7-unknown-linux-gnueabihf]
linker = "arm-linux-gnueabihf-gcc"
```

Поле target раздела build задаёт платформу по умолчанию, можно не указывать и запускать сборку руками при желании:

`cargo build --target=arm-unknown-linux-gnueabihf`

Если openssl не нужен, то этого достаточно. В противном случае у нас будет проблема -- линкер не сможет найти бибилиотеку (если она у вас не кросскомпилированна до этого). Чтобы не кросскомпилировать самостоятельно openssl можно сделать хитррость -- добавить в зависимости:

`openssl = { version = "0.10", features = ["vendored"] }`

Таким образом openssl будет скомпилирован внутри cargo и прилинкован статически к проекту.
Есть одно но -- чтобы его собрать все равно надо настроить некий инструментарий.
Потребуется perl (c dmake), т.к. openssl использует самописную систему конфигурации. При этом обычный perl для винды
(вроде ActivePerl) нам не подходит, т.к. он использует слэши не туда куда положено. Нужно ставить perl конкретно из
msys2, так что предварительно скачиваем и устанавливаем его согласно инструкции или же используем chocolatey,
если доступен. После этого нам ещё нужен его dmake:

```shell
> choco install msys2
```

И в консоли msys

```shell
> pacman -S perl
```

Перед самой компиляцией, необходимо дополнительно выставить переменные среды:

```shell
> set PERL5LIB=/C/tools/msys64/usr/share/perl5/core_perl # чтобы perl поймал либы из под винды
> set CARGO_TARGET_ARM_UNKNOWN_LINUX_GNUEABIHF_LINKER=arm-linux-gnueabihf-gcc
> set CC=arm-linux-gnueabihf-gcc
> set CC_armv7-unknown-linux-gnueabihf=arm-linux-gnueabihf-gcc
```

Кстати, ещё неплохо бы было убедиться, что PATH ничего не перебивает наши исполняемые файлы dmake, сс и т.п.

```shell
> set PATH=C:\SysGCC\raspberry\bin;%PATH%
```

### Ultima Ratio

Вроде бы всё это в теории верно, но у меня компиляция вываливается на make depend. Тогда компилируем бибилотеку физически на pi (делаем ./config и make, без make install, разумеется требуется установленный пакет build-essential), скачиваем, подкладываем внутрь C:\SysGCC\raspberry и выставляем переменные среды, чтобы cargo использовал её:

```shell
> set OPENSSL_LIB_DIR=C:\SysGCC\raspberry\openssl-1.1.1a
> set OPENSSL_INCLUDE_DIR=C:\SysGCC\raspberry\openssl-1.1.1a\include
> set OPENSSL_STATIC=1
```