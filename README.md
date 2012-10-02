The Game of Life
================
This repo currently contains 2 different implementations of capable of calculating a cycle in the game of life:
# One that is more appropriate as the core of the system that runs the game
# One that is more appropriate as a component in a larger system (it does the calculation and gets out)

Core Implementation
-------------------
This was the original implementation. It is decently tested although some tests could be added at a more granular level to problems more specifically.
The reason for this implementation is to make displaying the actual game simpler. LifeCell can be extended to initiate events or to understand how to update a UI (I plan to do this as I find time).

Core Files:
* lib/js/GridFactory.js
* lib/js/LifeCell.js
* lib/js/LifeGrid.js

Example: index.html (actual user interface page)

Component Implementation
------------------------
This is the piece that more accurately solves the problem as stated. It uses algorithms lifted from the core implementation but doesn't do anything to make it simpler to iterate through multiple cycles like the core implementation does.

Component File:
lib/js/SimpleLifeCycle.js

Example: tests/spec/SimpleLifeCycleSpec.js (it will be run with the rest of the tests if you open tests/SpecRunner.html in a browser)