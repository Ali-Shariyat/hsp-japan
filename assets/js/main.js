//==================
// rail
//==================
var set_rail = function (e) {
    var $this = $(this);
    var $this_select_parent = $this.parents("[data-add-rail]");
    var $this_select_rail = $this_select_parent.find(".rail");
    var $this_select_active = $this_select_parent.find(".active");
    $this_select_rail.width($this_select_active.width());
    $this_select_rail.css({
        top: $this_select_active.position().top + $this_select_active.height(),
        left: $this_select_active.position().left
    })
};
$("[data-add-rail] .header-item.active").trigger("mouseover");
$("[data-add-rail] .header-item").mouseenter(function (e) {
    var $this = $(this);
    var $this_select_parent = $this.parents("[data-add-rail]");
    var $this_select_rail = $this_select_parent.find(".rail");
    $this_select_rail.width($this.width());
    $this_select_rail.css({
        top: $this.position().top + $this.height(),
        left: $this.position().left
    })
});
$("[data-add-rail] .header-item").mouseleave(set_rail);
$("[data-add-rail] .header-item").each(set_rail);

//==================
// hover item
//==================
$("[data-hover] .item").hover(function () {
    var $this = $(this);
    $this.addClass("active").siblings(".item").removeClass("active");
    $this.parents("[data-hover]").siblings("[data-hover-main]").find(".item-main").eq($this.index()).addClass("active").siblings(".item-main").removeClass("active")
});