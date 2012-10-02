The Game of Life
================
This repo currently contains 2 different implementations of capable of calculating a cycle in the game of life:
* One that is more appropriate as the core of the system that runs the game
* One that is more appropriate as a component in a larger system (it does the calculation and gets out)

I will be updating the core implementation to actually run the game as I have time.

Core Implementation
-------------------
This was the original implementation its reason for existing is to make displaying the actual game simpler. LifeCell can be extended to initiate events or to understand how to update a UI (I plan to do this as I find time).

I also implemented an optional world-wrapping feature in this version as that's how most versions I've played with work. With wrapping turned on, a cell at the top of the grid/world is adjacent the the same cell at the bottom and similarly for the sides.

Core Files:
* lib/js/GridFactory.js
* lib/js/LifeCell.js
* lib/js/LifeGrid.js

Example: index.html (user facing interface -- feel free to play with it)

Component Implementation
------------------------
This is the piece that more accurately solves the problem as stated. It uses algorithms lifted from the core implementation but doesn't do anything to make it simpler to iterate through multiple cycles like the core implementation does. This allows for a slightly more efficient run through a single iteration with the given input and output (for multiple iterations, the core implementation is better though).

Component File:
lib/js/SimpleLifeCycle.js

Example: tests/spec/SimpleLifeCycleSpec.js (it will be run with the rest of the tests if you open tests/SpecRunner.html in a browser)