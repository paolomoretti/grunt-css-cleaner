pos = {}

cleanIt = ($junk)->
  $junk.html $junk.text().replace(/([\S])/g,'<span>$1</span>')
  $junk.css "position", "relative"

  pos = $junk.offset()

  $junk.find("span").css
    position: "relative"
    top: ->
      Math.random() * $(this).height()
    left: ->
      -$(this).offset().left + (Math.random() * pos.left)

keyframe = (time, callback)->
  setTimeout ->
    callback()
  , time * 1000


$(document).ready ->

  $.ajax
    url: "http://bitterbrown.com/grunt-css-cleaner/readme.php"
    method: "get"
    success: (content)->
      $(".content .slide.slide2").html content

  # Content enter the screen
  keyframe 1, -> $(".content").css("opacity", 1).addClass "lightSpeedIn"
  keyframe 1.1, -> cleanIt $(".intro pre")

  # Switch to slide 2
  keyframe 3, ->
    $(".content").removeClass("lightSpeedIn").addClass "flip"
    $(".intro").css "left", "#{-pos.left*5}px"
  keyframe 3.25, ->
    do $(".content .slide1").hide
    do $(".content .slide2").show

  # Move up second slide
  keyframe 3.4, -> $(".content").css top: 10, margin: 0
  keyframe 3.7, -> $(".content .slide2 .slide-content").css "opacity", 1
