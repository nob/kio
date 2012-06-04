<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/*
|--------------------------------------------------------------------------
| Ordersheets upload dir path 
|--------------------------------------------------------------------------
|
*/
$config['ordersheets_dir'] = '/Users/nob/projects/kioto/src/ordersheets/';

/*
|--------------------------------------------------------------------------
| inquiry notification email  
|--------------------------------------------------------------------------
|
*/
$config['notice_from'] = 'google-apps-admin@kiotoinc.com';
$config['notice_from_name'] = 'kiotoinc.com website';
$config['notice_to'] = 'noboruthedragon@gmail.com';

/*
|--------------------------------------------------------------------------
| customer confirmation email  
|--------------------------------------------------------------------------
|
*/
$config['confirmation_from'] = 'contact@kiotoinc.com';
$config['confirmation_from_name'] = 'Kioto, Inc.';

/*
|--------------------------------------------------------------------------
| Email class preference 
|--------------------------------------------------------------------------
*/
$config['protocol'] = 'smtp';
$config['smtp_host'] = 'ssl://smtp.gmail.com';
$config['smtp_port'] = 465;
$config['smtp_user'] = 'google-apps-admin@kiotoinc.com';
$config['smtp_pass'] = 'mt5iEOJh';
$config['mailtype'] = 'html';
