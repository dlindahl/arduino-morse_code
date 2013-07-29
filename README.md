# Live Arduino-based Morse Code Encoder

Encodes keyboard input into Morse code on the fly by blinking an LED in the
correct sequences.

## Installation

    npm install

Then wire an LED into pin 13.

If you want a different pin, then modify the source code.

## Usage

    node morse.js

Then type into the REPL. As you type, watch the LED flash your message in morse
code!

**Note:** Only `a-z`, `0-9`, and spaces are supported.

## Why?

I made this during International NodeBots Day 2013 as a way to level up my
Arduino LED blinking skills.