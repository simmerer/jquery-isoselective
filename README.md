jquery-isoselective
===================

An update to Gatsby's isoSelective isotope plugin for jQuery 1.9+ compatibility.


- - - -

[David DeSandro](http://desandro.com)'s lovely [isotope](http://isotope.metafizzy.co) does the job for most filtering and sorting applications, but sometimes you need **combining/toggling** filters. [Alexander 'Gatsby' Jones](http://gatsbyart.com) came up with [isoSelective](http://www.gatsbyart.com/plugins/isoSelective/), which accomplishes exactly that.

However, isoSelective's last release still relied on jQuery's <code>.live()</code> method, which was deprecated as of jQuery 1.7 and removed altogether in jQuery 1.9. If you're running jQuery 1.9+, isoSelective won't work for you.

Fortunately, replacing <code>.live()</code> with <code>.on()</code> in one spot does the trick.

