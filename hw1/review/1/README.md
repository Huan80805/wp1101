# hw1

Static photo album site with HTML & CSS.

## Usage

- On the Home Page, click on an album image to browse its content
- On an album page, click on an image to view it in full size in a separate tab

## CSS

- Layout done mainly with `display: grid` `display: flex` and by setting `margin`
  - With `display: grid` on the Home Page, the number of columns is dynamic (Try changing your browser window's size)
  - With `display: flex` the footer stretches in height when there's extra space
- On the Home Page, album titles are made more readible with a `background-image: linear-gradient` overlay
  - Reduces overlay opacity and increases title text brightness on hover
- On an album page, the images zoom slightly on hover via `transform: scale`
- The whole image is clickable by styling an `<a>` tag with `display: block; height: 100%`