jquery-isoselective
===================

An update to Gatsby's isoSelective isotope plugin for jQuery 1.9+ compatibility.

- - - -

[David DeSandro](http://desandro.com)'s lovely [isotope](http://isotope.metafizzy.co) does the job for most filtering and sorting applications, but sometimes you need to **combine filter selections** or **toggle filters**.

[Alexander 'Gatsby' Jones](http://gatsbyart.com) smartly came up with [isoSelective](http://www.gatsbyart.com/plugins/isoSelective/), which accomplishes exactly that.

However, isoSelective's last release still relied on jQuery's <code>.live()</code> method, which was deprecated as of jQuery 1.7 and removed altogether in jQuery 1.9. If you're running jQuery 1.9 or newer, isoSelective won't work for you.

Fortunately, replacing `.live()` with `.on()` in one spot does the trick.

Download the updated isoSelective plugin here:
----------------------------------------------
* [jquery.isoSelective.js](https://raw.github.com/simmerdesign/jquery-isoselective/master/jquery.isoSelective.js), 4.641 kb
* [jquery.isoSelective.min.js](https://raw.github.com/simmerdesign/jquery-isoselective/master/jquery.isoSelective.min.js), 1.721 kb

- - - -

Complete documentation for using isoSelective is still available here: http://www.gatsbyart.com/plugins/isoSelective/

The basic isotope setup is something like this:

    $container = $('#container');
    $container.isotope({
        // options
        itemSelector : '.item'
    });
    
**You'll do that first whether using isotope or isoSelective filtering.**
    
To enable isotope filtering you'd do something like this:

    // set up isotope filters
    $('a.filter').click(function(){
        var selector = $(this).attr('data-filter');
        $container.isotope({filter:selector});
        return false;
    })
    
If you're using isoSelective, however, you'll do something like this instead:

    // set up isoSelective filters
    $container.isoSelective({
        linkSelector: 'a.filter',
        attrSelector: 'data-filter',
        activeClass: 'toggledOn'
    });
