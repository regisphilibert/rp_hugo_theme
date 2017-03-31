<?php

require "loc.php";
header("Access-Control-Allow-Origin: *");

if(isset($_POST)){
	rp_process_contact($_POST);
}

function rpSendMail($args){
    foreach($args as $key=>$arg){
        $prefixed_args['rpContact_' . $key] = $arg;
    }
    extract($prefixed_args);
    $to = implode(",", $rpContact_Addresses);
    $message = get_include_contents($rpContact_BodyTemplate, $rpContact_BodyVars);
    $headers = "";
    if($rpContact_FromName){
        $headers .= "From: ".$rpContact_FromName." <" . $rpContact_From . ">\r\n";
    }
    else{
        $headers .= "From: " .$rpContact_From . "\r\n";
    }
    $headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
    if(mail($to, $rpContact_Subject, $message,$headers)){
        print_r(array($prefixed_args, $to, $headers, $message));
    }
    else{
        echo "Could not send";
    }
}

function get_include_contents($filename, $variablesToMakeLocal) {
    extract($variablesToMakeLocal);
    if (is_file($filename)) {
        ob_start();
        include $filename;
        return ob_get_clean();
    }
    return false;
}

function rp_process_contact($data){
    $userEmailArgs = array(
        'From'=>'bonjour@regisphilibert.com',
        'FromName'=>'Regis Philibert',
        'Addresses'=>array(
            $data['rpContactEmail']
        ),
        'Subject'=>_loc("mail_string_4"),
        'BodyTemplate'=>dirname(__FILE__) . '/templates/mail-notice.php',
        'BodyVars'=>array(
            'email'=>$data['rpContactEmail'],
            'message'=>utf8_decode($data['rpContactMessage'])
        )
    );
    $adminEmailArgs = array(
        'From'=>'bonjour@regisphilibert.com',
        'FromName'=>'Regis Philibert',
        'Addresses'=>array(
            'regis@regisphilibert.com'
        ),
        'Subject'=>"Contact depuis regisphilibert.com",
        'BodyTemplate'=>dirname(__FILE__) . '/templates/mail-notice-admin.php',
        'BodyVars'=>array(
            'email'=>$data['rpContactEmail'],
            'message'=>utf8_decode($data['rpContactMessage'])
        )
    );
    rpSendMail($userEmailArgs);
    rpSendMail($adminEmailArgs);
    die();
}