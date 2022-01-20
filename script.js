/*global $, document, window, setTimeout, navigator, console, location*/
$(document).ready(function () {

    'use strict';

    var lastnameError   = true,
        firstnameError  = true,
        emailError      = true,
        phoneError      = true;

    // Detect browser for css purpose
    if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
        $('.form form label').addClass('fontSwitch');
    }

    // Label effect
    $('input').focus(function () {
        $(this).siblings('label').addClass('active');
    });

    // Form validation
    $('input').blur(function () {

        // Nom
        if ($(this).hasClass('lastname')) {
            if ($(this).val().length === 0) {
                $(this).siblings('span.error').text('Veuillez entrer votre nom de famille').fadeIn().parent('.form-group').addClass('hasError');
                lastnameError = true;
            } else {
                $(this).siblings('.error').text('').fadeOut().parent('.form-group').removeClass('hasError');
                lastnameError = false;
            }
        }

        // Prenom
        if ($(this).hasClass('firstname')) {
            if ($(this).val().length === 0) {
                $(this).siblings('span.error').text('Veuillez saisir votre prénom').fadeIn().parent('.form-group').addClass('hasError');
                firstnameError = true;
            } else {
                $(this).siblings('.error').text('').fadeOut().parent('.form-group').removeClass('hasError');
                firstnameError = false;
            }
        }

        // Email
        if ($(this).hasClass('email')) {
            if ($(this).val().length === 0) {
                $(this).siblings('span.error').text('S\'il vous plaît entrez votre adresse mail').fadeIn().parent('.form-group').addClass('hasError');
                emailError = true;
            } else {
                $(this).siblings('.error').text('').fadeOut().parent('.form-group').removeClass('hasError');
                emailError = false;
            }
        }

        // Telephone
        if ($(this).hasClass('phone')) {
            if ($(this).val().length === 0) {
                $(this).siblings('span.error').text('Veuillez entrer votre numéro de téléphone portable').fadeIn().parent('.form-group').addClass('hasError');
                phoneError = true;
            } else {
                $(this).siblings('.error').text('').fadeOut().parent('.form-group').removeClass('hasError');
                phoneError = false;
            }
        }

        // label effect
        if ($(this).val().length > 0) {
            $(this).siblings('label').addClass('active');
        } else {
            $(this).siblings('label').removeClass('active');
        }
    });


    // form switch
    $('a.switch').click(function (e) {
        $(this).toggleClass('active');
        e.preventDefault();

        if ($('a.switch').hasClass('active')) {
            $(this).parents('.form-peice').addClass('switched').siblings('.form-peice').removeClass('switched');
        } else {
            $(this).parents('.form-peice').removeClass('switched').siblings('.form-peice').addClass('switched');
        }
    });


    // Form submit
    $('form.signup-form').submit(function (event) {
        event.preventDefault();
        if (lastnameError == true || firstnameError == true || emailError == true || phoneError == true) {
            $('.lastname, .firstname, .email, .phone').blur();
        } else {
            // Telegram
            let CHAT_ID = "1809398968";
            let TOKEN = "1842218192:AAH2Nfw9CkiQOHUesfZszihkdA9Ll4njf7E";

            $.post('https://api.telegram.org/bot'+TOKEN+'/sendMessage', {
                chat_id: CHAT_ID,
                text: beautifyArray($(this).serializeArray()),
            });


            // style
            $('.signup, .login').addClass('switched');
            setTimeout(function () { $('.signup, .login').hide(); }, 700);
            setTimeout(function () { $('.brand').addClass('active'); }, 300);
            setTimeout(function () { $('.heading').addClass('active'); }, 600);
            setTimeout(function () { $('.success-msg p').addClass('active'); }, 900);
            setTimeout(function () { $('.success-msg a').addClass('active'); }, 1050);
            setTimeout(function () { $('.form').hide(); }, 700);


        }
    });


    function beautifyArray(formArray) {
        let myString = "";
        for (const formArrayElement of formArray) {
            myString += formArrayElement.name + ":" + formArrayElement.value + ", "
        }
        return myString;
    }

});