﻿/**
 * gnmenu.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
(function (window) {

    'use strict';



    // http://stackoverflow.com/a/11381730/989439
    function mobilecheck() {
        var check = false;


        (function (a) { if (/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true })(navigator.userAgent || navigator.vendor || window.opera);
        if (check == false) {
            $('#menu-button').hide()
        }
        return check;

    }

    function gnMenu(el, options) {
        this.el = el;
        this._init();
    }


    gnMenu.prototype = {
        _init: function () {
            this.trigger = this.el.querySelector('a.gn-icon-menu');
            this.menu = this.el.querySelector('nav.gn-menu-wrapper');
            this.isMenuOpen = false;
            this.eventtype = mobilecheck() ? 'touchstart' : 'click';
            this._initEvents();
            this._setSelected();
            var self = this;
            if (mobilecheck()) {
                classie.remove(this.menu, 'gn-open-part');
            } else {
                classie.add(this.menu, 'gn-open-part');
            }
            this.bodyClickFn = function () {
                self._closeMenu();
                this.removeEventListener(self.eventtype, self.bodyClickFn);
            };
        },
        _initEvents: function () {
            var self = this;

            if (!mobilecheck()) {
                this.trigger.addEventListener('mouseover', function (ev) { self._openIconMenu(); });
                this.trigger.addEventListener('mouseout', function (ev) { self._closeIconMenu(); });

                this.menu.addEventListener('mouseover', function (ev) {
                    self._openMenu();
                    document.addEventListener(self.eventtype, self.bodyClickFn);
                });
            }

            //test----



            $(this.menu).find(".gn-search").on("keyup paste input", function () {
                console.log($(this).val().toLowerCase());
                var searchText = $(this).val().toLowerCase();
                Window.keys.length = 0;
                $("nav.gn-menu-wrapper").find("li:not(.gn-search-item)").toggle(false);
                $("nav.gn-menu-wrapper").find("li:not(.gn-search-item)>a").filter(function () {
                    var item = $(this);
                    var founded = item.text().toLowerCase().indexOf(searchText) > -1;
                    if (!founded) return;
                    if (searchText == '') {

                        $("nav.gn-menu-wrapper").find("li:not(.gn-search-item) ul").toggle(false);
                        $("nav.gn-menu-wrapper").find("li:not(.gn-search-item)").toggle(true);

                        return
                    }

                    item.parents("ul:not(.gn-menu-main):not(.gn-menu)").toggle(founded);
                    item.parents("li").toggle(founded);

                    Window.keys.push(item.closest('a:not(.menuitem)'));

                    Window.searched = item

                });



            });


            $("nav.gn-menu-wrapper").find("li:not(.gn-search-item)>a").next().css({
                "background-color": "#25272B"
            });



            $('a:not(.menuitem)').click(function () {

                self._setSelected(false, $(this));

            });

            //getting the results of search and making an array for button control 
            Window.keys = [];
            $(this.menu).find(".gn-search").on("keyup paste input", function () {


                Window.keys_ = [];
                console.log(Window.keys);


                (Window.keys).forEach(function (value) {

                    if (value.text() != '') {
                        Window.keys_.push(value);
                    }

                });

                if (Window.keys_[0] == null) {
                    return
                }

            });


            //up-down-tab-enter button usage
            var count = -1;
            $(".gn-search").on('keydown', function (e) {

                if (e.keyCode == 9 || e.which == 40 || e.which == 38) {
                    e.preventDefault();
                }
                if (e.which == 13) {

                    if (count == -1) {
                        $(Window.keys_[0])[0].click();
                    } else {
                        $(Window.keys_[count])[0].click();

                    }
                }

                if (e.which == 40 || e.which == 9) {
                    if (Window.keys_.length > count + 1) {
                        count++;
                        $(Window.keys_[0]).removeClass('focusing');
                        $(Window.keys_[count]).addClass('focusing');
                        $(Window.keys_[count - 1]).removeClass('focusing');

                    }

                } else if (e.which == 38) {
                    if (count > 0) {
                        count--;
                        $(Window.keys_[count]).addClass('focusing');
                        $(Window.keys_[count + 1]).removeClass('focusing');
                    }
                } else if (e.which == 8 || e.which == 46) {
                    $("a").removeClass('focusing');
                    count = -1;
                }



            });

            //------------------------------------

            $(this.menu).find(".menuitem").on("click", function () {


                var isRootMenu = $(this).closest("ul").hasClass("gn-menu");
                var menuItemContainer = $(this).parent().children("ul");

                if (isRootMenu && !menuItemContainer.is(":visible")) {
                    var allRootMenus = $(".gn-menu .gn-menu-scroll>li>ul");

                    for (var i = 0; i < allRootMenus.length; i++) {
                        menuitemToggle($(allRootMenus[i]).parent().children("a"), false);
                    }

                }
                menuitemToggle($(this));
            });


            var menuitemToggle = function (clickedElement, toggle = null) {
                if (toggle == null)
                    toggle = !clickedElement.parent().children("ul").is(":visible");



                _toggle(clickedElement.parent().children("ul"), toggle, function () {
                    var menuItem = $(this).parent().children("a");
                    var arrowIcon = menuItem.children("i");

                    if ($(this).parent().children("ul").is(":visible")) {

                        arrowIcon.removeClass("fa fa-chevron-down").addClass("fa fa-chevron-up");
                    } else {

                        arrowIcon.removeClass("fa fa-chevron-up").addClass("fa fa-chevron-down");
                    }



                });
            };

            function _toggle(element, toggle, callback) {
                var isVisible = element.is(":visible");
                if (isVisible == toggle) {
                    callback();
                    return;
                }

                element.toggle(100, callback);

            }
//-------------------------------------------
 
            $(window).keydown(function (event) {
                if (event.ctrlKey && (event.which == 13)) {
                    $('#gn-menu > li > nav').addClass('gn-open-all');
                    $('#gn-menu > li > nav > ul > li > div > input')[0].focus();
                    $(window).on('click', function () {
                        $('#gn-menu > li > nav').removeClass('gn-open-all'); 
                    });

                }
            });

//-------------------------------------------

            //test--

            this.trigger.addEventListener(this.eventtype, function (ev) {
                ev.stopPropagation();
                ev.preventDefault();
                if (self.isMenuOpen) {
                    self._closeMenu();
                    document.removeEventListener(self.eventtype, self.bodyClickFn);
                }
                else {
                    self._openMenu();
                    document.addEventListener(self.eventtype, self.bodyClickFn);
                }
            });
            this.menu.addEventListener(this.eventtype, function (ev) { ev.stopPropagation(); });
        },

        _openIconMenu: function () {
            if (mobilecheck())
                classie.add(this.menu, 'gn-open-part');
        },
        _setSelected: function (openMenu = false, selectedItem = null) {


            if (selectedItem == null)
                selectedItem = $(".gn-menu a[href='" + location.pathname + "']");

            if (openMenu)
                selectedItem.parents("ul:not(.gn-menu,.gn-menu-main)").toggle(true);

            $(".gn-menu .menuitem.selected").removeClass('selected');
            $(".gn-menu a.focused").removeClass('focused');

            selectedItem.addClass("focused");
            selectedItem.addClass('focused').parentsUntil(".gn-menu").children("a.menuitem").last().addClass("selected");
            selectedItem.parentsUntil(".gn-menu").children("a.menuitem").find("i").removeClass("fa fa-chevron-down").addClass("fa fa-chevron-up");
        }
        ,
        _closeIconMenu: function () {
            if (mobilecheck())
                classie.remove(this.menu, 'gn-open-part');
        },
        _openMenu: function () {
            if (this.isMenuOpen) return;
            classie.add(this.trigger, 'gn-selected');
            this.isMenuOpen = true;
            classie.add(this.menu, 'gn-open-all');
            this._openIconMenu();
            this._setSelected(true);
        },
        _closeMenu: function () {
            if (!this.isMenuOpen) return;
            classie.remove(this.trigger, 'gn-selected');
            $('#gn-menu ul.gn-menu a.menuitem').next().toggle(false);

            if ($('ul.gn-menu li a.menuitem i').hasClass("fa fa-chevron-up")) {
                $('ul.gn-menu li a.menuitem i').removeClass("fa fa-chevron-up").addClass("fa fa-chevron-down");
                console.log("close1")
            };
            $('#gn-menu > li > nav > ul > li > div >input').val('');
            this.isMenuOpen = false;
            classie.remove(this.menu, 'gn-open-all');
            this._closeIconMenu();

        }


    }



    // add to global namespace
    window.gnMenu = gnMenu;

})(window);