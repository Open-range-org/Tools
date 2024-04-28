import { Component } from '@angular/core';
import * as $ from "jquery";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  constructor() { }

  ngOnInit() {
    $('#username').blur(function () {
      CheckName()
    }).on('keypress',function(e) {
      if(e.which == 13) {
        CheckName()
      }
  });
  function CheckName(){
      let str=$.trim($('#username').val() as string);
      var xstr = /[a-zA-Z\s]+/;
      var ck = xstr.exec(str);
      if(str.length>0){
      if ((!ck || ck[0] != str)||str.length<4) {
        $('.name-error').show();
        $('#email-box').hide();
        $('#message-box').hide();
        $('#btn-submit').hide();
      }
      else{
        $('.name-error').hide();
        $('#email-box').show();
      }
    }
   }
   $('#useremail').blur(function () {
    CheckEmail()
    }).on('keypress',function(e) {
    if(e.which == 13) {
      CheckEmail()
    }
   });
   function CheckEmail(){
    let str=$.trim($('#useremail').val()  as string);
    var xstr = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
    var ck = xstr.exec(str);
    if(str.length>0){
    if ((!ck || ck[0] != str)) {
      $('.email-error').show();
      $('#message-box').hide();
      $('#btn-submit').hide();
    }
    else{
      $('.email-error').hide();
      $('#message-box').show();
    }
  }
   }
   $('#usermessage').blur(function () {
    CheckMessage()
    }).on('keypress',function(e) {
    if(e.which == 13) {
      CheckMessage()
    }
   });
   function CheckMessage(){
    let str=$.trim($('#usermessage').val()  as string);
    if(str.length>0){
    if (str.length<10) {
      $('.message-error').show();
      $('#btn-submit').hide();
    }
    else{
      $('.message-error').hide();
      $('#btn-submit').show();
    }
  }
   }
  }


}
