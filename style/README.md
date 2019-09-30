# Page Styling

Note that we are still using CSS to style our pages. Less is just a development tool used to reduce the amount of work required to style pages. In the end, Less just compiles down to CSS rules. Therefore, any standard CSS styling rules should work. W3Schools has a decent reference site and curiculum for CSS [here](https://www.w3schools.com/css/css_intro.asp).

Plain CSS has essentially no logic to it and Less.js lets us add that logic. [Full Less.js documentation](http://lesscss.org/features/) is here, but we'll primarly just be using basic variables for color and sizing values which is detailed below. Should you be trying to style something that seems like it could benifit with some sort of logic, refer to the documentation to see if you can make your life easier with a function.

### Importing From Other Files
To keep things organized we will probably want to create different styling files for different on-screen elements. With Less, you'd use the `@import 'path/to/file.less'` key to accomplish this.
```less
@import 'chat/chat_box.less';
@import 'chat/chat_message.less';
```

### Variables
Variables will be replaced by their raw values when Less is compiled so you can use a variable for litterly anything; selectors, values, urls, etc. Just be sure to use "quotes" around the value if it is not a CSS value like a measurement or styling rule. IE, a url needs to be in quotes because it is not a CSS value, but `auto` does not need quotes because that is a CSS key for things like `margin: auto;`.

```less
@special_orange: #FFCE27;
@@other_orange: special_orange;
body{
    background-color: @special_orange;
}

section{
    background-color: @@other_orange;
}

Here, element types will receive the same shade of Orange.
```
Less also lets you create [maps](http://lesscss.org/features/#maps-feature) or associtive arrays.
```less
@colors: {
  black: #000;
  white: #FFF;
  grey: #DDD;
}

body{
    background-color: @colors[grey];
}

The body element would be the #DDD shade of grey.
```

### Functions
Less has a lot of [functions](http://lesscss.org/functions/), primarly for size and color manipulation. See the official reference linked above for examples on specific usage.

### Media Queries
[Media queries](https://www.w3schools.com/css/css3_mediaqueries.asp) are apart of standard CSS, and work well with Less maps. Media queries let you define specific CSS rules to apply when the (display) media meets whatever parameters are set. Usually these parameters are size constraints. IE: when the screen is < 960px, we want to apply different styling rules that shrink the elements so they're easier to read on a small screen.

```CSS
span.navLink{
    display: inline;
}

@media screen and (max-width: 960px){
    span.navLink{
        display: block;
    }
}
Here we're changing the display rule to be `inline` when the screen is greater than 960px wide, but `block` when the screen is 960px or less. In this example that would likley shift the elements to display in a horizontal list on a wide screen, but as a vertical list on a smaller screen - albeit in a rather crude fashion.
```

### Compilation Note
There are two ways to integrate Less into a project. One involves pre-compiling Less code into static CSS files, and then <link>ing to those CSS files. The second involves <link>ing directly to the Less files, and then <script> including the Less library onto the page where the Less code is compiled to CSS by the browser as the page loads. To simplify our build process and reduce the number of libraries in the package.json file, I've opted to just <script> link in the library.