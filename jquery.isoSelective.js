// jQuery isoSelective
// created by Alexander Buddy 'Gatsby' Jones
// http://www.gatsbyart.com

// update for jQuery 1.9+ and IE8 compatibility by David Simmer
// http://simmerdesigns.com

function commonAncestor(ident) {
    var parents = [];
    var minlen = Infinity;

    $(ident).each(function() {
        var curparents = $(this).parents();
        parents.push(curparents);
        minlen = Math.min(minlen, curparents.length);
    });

    for (var i in parents) {
        // NOTE: IE8 chokes on .slice() with this data
        parents[i] = parents[i].slice(parents[i].length - minlen);
    }

    // Iterate until equality is found
    for (var i in parents[0]) {
        var equal = true;
        for (var j in parents) {
            if (parents[j][i] != parents[0][i]) {
                equal = false;
                break;
            }
        }
    
        if (equal) return parents[0][i];
    }
    return [];
}

(function($){
    $.fn.isoSelective = function(options){
    // build main options before element iteration
        var opts = $.extend({}, $.fn.isoSelective.defaults, options);// iterate and reformat each matched element
        return this.each(function(){
            $this = $(this);// build element specific options
            var o = $.meta ? $.extend({}, opts, $this.data()): opts;// update element styles
            $.fn.isoSelective.initializeFiltering(o.linkSelector, o.attrSelector, o.activeClass, o.preventEmpty, o.linkParentID, $this);
        });
    };

    //
    // define and expose our format function
    //
     
    $.fn.isoSelective.initializeFiltering = function(ulinkSelector, uattrSelector, uactiveClass, upreventEmpty, uparentID, ucontainerSelector){
        var container = ucontainerSelector;
        var filterSelections = new Array();
        var totalCount = $(ulinkSelector).length;
        var thistag = $(ulinkSelector).get(0).tagName;
        var parentID = (uparentID == undefined) ? commonAncestor(ulinkSelector) : uparentID;

        for (i = 0;i < totalCount;i++){
            if ($(parentID).find(thistag).eq(i).hasClass(uactiveClass)){
                filterSelections[i] = $(parentID).find(thistag).eq(i).attr(uattrSelector) +", ";
            }
            else {
                filterSelections[i] = " ";
            }
        }
        
        if (filterSelections.indexOf("*, ") != -1){
            var starc = filterSelections.indexOf("*, ");
            for(g=0; g<filterSelections.length; g++){
                filterSelections[g] = "";
            }
            filterSelections[starc] = "*"
        }

        $(ulinkSelector).on('click', function(){
            var thisSelectorVal = $(this).attr(uattrSelector);
            var thisCount = $(parentID).find(thistag).index(this);
            if ($(this).attr(uattrSelector) != "*"){
                var starindex = filterSelections.indexOf("*");
                if (starindex != -1){
                    filterSelections[starindex] = "";
                    $(parentID).find(thistag).eq(starindex).toggleClass(uactiveClass);
                }
                if (filterSelections[thisCount] == $(this).attr(uattrSelector) + ", "){  
                    filterSelections[thisCount] = "";
                }
                else {
                    filterSelections[thisCount] = $(this).attr(uattrSelector) + ", ";
                }
                $(this).toggleClass(uactiveClass);
            }
            else {
                if ((filterSelections[thisCount] == "*, ") || (filterSelections[thisCount] == "*")){
                    filterSelections[thisCount] = "";
                    $(ulinkSelector).removeClass(uactiveClass);
                }
                else {
                    for (n = 0;n < totalCount;n++){
                        filterSelections[n] = "";
                    }
                    filterSelections[thisCount] = "*";
                    $(ulinkSelector).removeClass(uactiveClass);
                    $(this).addClass(uactiveClass);
                }
            }
            var filterStatement = filterSelections.join("");
            var newfilterStatement = filterStatement.replace(/\s/g, "");
            if (newfilterStatement != "*"){
                newfilterStatement = newfilterStatement.slice(0, -1);
            }
            
            if (newfilterStatement == ""){
                if (upreventEmpty){
                    // reset filter to show all
                    newfilterStatement = "*";
                }
                else {
                    // show none
                    newfilterStatement = "#nulldiviwthoutapropername";
                }
            }
            
            $(container).isotope( {filter: newfilterStatement});
            return false;
        });
    };//
        // plugin defaults
        //
    $.fn.isoSelective.defaults =  {linkSelector:'.filter', attrSelector: 'rel', activeClass: 'selected' };//
    // end of closure
    //
})(jQuery); // JavaScript Document
