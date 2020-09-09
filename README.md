# ⚙️ RCCT

-- a **R**eact **C**omponent **C**ommand-line **T**ool

## What is this 🤔

- rcct is a tool work for generating a specific pattern of react component

- a quick demo like below

![demo](https://s1.ax1x.com/2020/09/09/w3q0GF.gif)

## How to use 🤔

- `npm install rcct -g`

- use in command-line (like bash / cmd / ...)

  `rcct g -c MyComponent -t`

## Commands

- basic command

`rcct g -c <componentName>`

`"g": "Generate a react component template"`

`"-c": "Name of your new component"`

- options

```js
"-m" or "--with-mobx":
    "Flag true will create a mobx wrapped component"
"-t" or "--with-ts":
    "Create tsx file instead of jsx"
"-u" or "--unique-class":
    "Unique style wrapper class name"
"-s <styleFileType>" or "--style-file-type <styleFileType>":
    "enter <styleFileType> Like scss / less / css, default using scss"
```

## About developing

- `git clone https://github.com/caperso/rcct`

- `npm i` or `yarn` (yarn recommended and we provided yarn.lock)

- remember `tsc` after finished code in typescript;
