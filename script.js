function shiftnavbar() {
    const navTransform = document.getElementById("shiftnav").style.transform
    const isExpanded = navTransform == "translateX(0px)"

    document.getElementById("shiftnav").style.transform = `translateX(${isExpanded * -290}px)`
    document.getElementById("content").style.transform = `translateX(${isExpanded ? 0 : 1 * 290}px)`

    document.getElementById("owg-text").classList.toggle("notExpanded")
    document.getElementById("owg-text").classList.toggle("isExpanded")
}
