---
title: "Интересный софт и библиотеки"
---

# Набор программ и библиотек, которые показались мне интересными

Поытка записать софт, на развитие которого хочется поглядывать или же нужно раз
в сто лет его запустить и никогда не можешь запомнить, что использовать.

## Тулинг

- [ImHex](https://imhex.werwolv.net/) [опенсорсный](https://github.com/WerWolv/ImHex) HEX-редактор
- [MailPit](https://mailpit.axllent.org/) для тестирования отправки имейлов, заместо устаревшего MailHog'a
- [Tokei](https://github.com/XAMPPRocky/tokei) TUI подсчёт строчек кода
- [Dust](https://github.com/bootandy/dust) TUI анализатор используемого диского просранства
- [Bottom](https://github.com/ClementTsang/bottom) консольный анализатор потребляемых компьютером ресурсов
- [Bandwhich](https://github.com/imsnif/bandwhich) консольный анализатор сетевого трафика

### Консольные проводники

- [Yazi](https://github.com/sxyazi/yazi) на текущий момент (05.01.2025) в альфе
- [Broot](https://dystroy.org/broot/)

### Хорошие консольные альтернативы для родных юниксовых команд

- [bat](https://github.com/sharkdp/bat) cat/less с подсветкой синтаксиса
- [fzf](https://github.com/junegunn/fzf) Нечёткий поиск файлов.
  Помимо непосредственно поиска файлов, может также применяться в качестве общего
  поиска и выбора с выполнением действий из вывода другой программы, например выбор веток в гите для удаления:

```sh
git branch --format="%(refname:short)" | fzf -m --bind 'enter:become(git branch -D {+})'
```

- [fd](https://github.com/sharkdp/fd) Более удобный find
- [eza](https://github.com/eza-community/eza) Красивенький ls

### Прочее

- [https://ratatui.rs/] TUI-фреймворк для раста
