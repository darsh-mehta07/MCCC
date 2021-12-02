var item_length = $('.wrrpperHomeSlider > .homeSliders').length - 1;
var slider = $('.wrrpperHomeSlider').slick({
    fade:true,
    dots:true,
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: false,
    speed: 1000,
    fade: true,
    slide: '.homeSliders',
    cssEase: 'linear'
})
// On before slide change
slider.on('afterChange', function(event, slick, currentSlide, nextSlide){
	//check the length of total items in .slide container
  //if that number is the same with the number of the last slider
  //Then pause the slider
  if( item_length === slider.slick('slickCurrentSlide') ){
    //this should do the same thing -> slider.slickPause();
    slider.slickSetOption("autoplay",false,false)
    slider.slickSetOption("dots",false,false)
  };
});

$('#password').keyup(function() {
  var password = $('#password').val();
  if (checkStrength(password) == false) {
      $('#sign-up').attr('disabled', true);
  }
});

function checkStrength(password) {
  var strength = 0;


  //If password contains both lower and uppercase characters, increase strength value.
  if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
      strength += 1;
      $('.low-upper-case').addClass('text-success');
      $('.low-upper-case i').removeClass('fa-circle').addClass('fa-check-circle');
  } else {
      $('.low-upper-case').removeClass('text-success');
      $('.low-upper-case i').addClass('fa-circle').removeClass('fa-check-circle');
  }

  //If it has numbers and characters, increase strength value.
  if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) {
      strength += 1;
      $('.one-number').addClass('text-success');
      $('.one-number i').removeClass('fa-circle').addClass('fa-check-circle');

  } else {
      $('.one-number').removeClass('text-success');
      $('.one-number i').addClass('fa-circle').removeClass('fa-check-circle');
  }

  //If it has one special character, increase strength value.
  if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
      strength += 1;
      $('.one-special-char').addClass('text-success');
      $('.one-special-char i').removeClass('fa-circle').addClass('fa-check-circle');

  } else {
      $('.one-special-char').removeClass('text-success');
      $('.one-special-char i').addClass('fa-circle').removeClass('fa-check-circle');
  }

  if (password.length > 7) {
      strength += 1;
      $('.eight-character').addClass('text-success');
      $('.eight-character i').removeClass('fa-circle').addClass('fa-check-circle');

  } else {
      $('.eight-character').removeClass('text-success');
      $('.eight-character i').addClass('fa-circle').removeClass('fa-check-circle');
  }




  // If value is less than 2

  if (strength < 2) {
      $('#result').removeClass()
      $('#password-strength').addClass('progress-bar-danger');

      $('#result').addClass('text-danger').text('Very Week');
      $('#password-strength').css('width', '10%');
  } else if (strength == 2) {
      $('#result').addClass('good');
      $('#password-strength').removeClass('progress-bar-danger');
      $('#password-strength').addClass('progress-bar-warning');
      $('#result').addClass('text-warning').text('Week')
      $('#password-strength').css('width', '60%');
      return 'Week'
  } else if (strength == 4) {
      $('#result').removeClass()
      $('#result').addClass('strong');
      $('#password-strength').removeClass('progress-bar-warning');
      $('#password-strength').addClass('progress-bar-success');
      $('#result').addClass('text-success').text('Strength');
      $('#password-strength').css('width', '100%');

      return 'Strong'
  }

}

$('#ConfirmPassword').keyup(function() {
  var ConfirmPassword = $('#ConfirmPassword').val();
  console.log(ConfirmPassword)
  if (confirm_checkStrength(ConfirmPassword) == false) {
      $('#sign-up').attr('disabled', true);
  }
});

function confirm_checkStrength(ConfirmPassword) {
  var confirmstrength = 0;


  //If password contains both lower and uppercase characters, increase strength value.
  if (ConfirmPassword.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
    confirmstrength += 1;
      $('.confirm-low-upper-case').addClass('text-success');
      $('.confirm-low-upper-case i').removeClass('fa-circle').addClass('fa-check-circle');
  } else {
      $('.confirm-low-upper-case').removeClass('text-success');
      $('.confirm-low-upper-case i').addClass('fa-circle').removeClass('fa-check-circle');
  }

  //If it has numbers and characters, increase strength value.
  if (ConfirmPassword.match(/([a-zA-Z])/) && ConfirmPassword.match(/([0-9])/)) {
    confirmstrength += 1;
      $('.confirm-one-number').addClass('text-success');
      $('.confirm-one-number i').removeClass('fa-circle').addClass('fa-check-circle');

  } else {
      $('.confirm-one-number').removeClass('text-success');
      $('.confirm-one-number i').addClass('fa-circle').removeClass('fa-check-circle');
  }

  //If it has one special character, increase strength value.
  if (ConfirmPassword.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
    confirmstrength += 1;
      $('.confirm-one-special-char').addClass('text-success');
      $('.confirm-one-special-char i').removeClass('fa-circle').addClass('fa-check-circle');

  } else {
      $('.confirm-one-special-char').removeClass('text-success');
      $('.confirm-one-special-char i').addClass('fa-circle').removeClass('fa-check-circle');
  }

  if (ConfirmPassword.length > 7) {
    confirmstrength += 1;
      $('.confirm-eight-character').addClass('text-success');
      $('.confirm-eight-character i').removeClass('fa-circle').addClass('fa-check-circle');

  } else {
      $('.confirm-eight-character').removeClass('text-success');
      $('.confirm-eight-character i').addClass('fa-circle').removeClass('fa-check-circle');
  }




  // If value is less than 2

  if (confirmstrength < 2) {
      $('#result').removeClass()
      $('#password-strength').addClass('progress-bar-danger');

      $('#result').addClass('text-danger').text('Very Week');
      $('#password-strength').css('width', '10%');
  } else if (confirmstrength == 2) {
      $('#result').addClass('good');
      $('#password-strength').removeClass('progress-bar-danger');
      $('#password-strength').addClass('progress-bar-warning');
      $('#result').addClass('text-warning').text('Week')
      $('#password-strength').css('width', '60%');
      return 'Week'
  } else if (confirmstrength == 4) {
      $('#result').removeClass()
      $('#result').addClass('strong');
      $('#password-strength').removeClass('progress-bar-warning');
      $('#password-strength').addClass('progress-bar-success');
      $('#result').addClass('text-success').text('Strength');
      $('#password-strength').css('width', '100%');

      return 'Strong'
  }

}

function getCodeBoxElement(index) {
    return document.getElementById('codeBox' + index);
  }
  function onKeyUpEvent(index, event) {
    const eventCode = event.which || event.keyCode;
    if (getCodeBoxElement(index).value.length === 1) {
       if (index !== 4) {
          getCodeBoxElement(index+ 1).focus();
       } else {
          getCodeBoxElement(index).blur();
          // Submit code
          console.log('submit code ');
       }
    }
    if (eventCode === 8 && index !== 1) {
       getCodeBoxElement(index - 1).focus();
    }
  }
  function onFocusEvent(index) {
    for (item = 1; item < index; item++) {
       const currentElement = getCodeBoxElement(item);
       if (!currentElement.value) {
            currentElement.focus();
            break;
       }
    }
  }