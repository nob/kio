<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
$config = array(
           'inquiry/index' => array(
                                    array(
                                            'field' => 'inquiry-type',
                                            'label' => 'Inquiry Type',
                                            'rules' => 'greater_than[0]|less_than[5]'
                                         ),
                                    array(
                                            'field' => 'r-name',
                                            'label' => 'Retailer name',
                                            'rules' => 'required|max_length[255]'
                                         ),
                                    array(
                                            'field' => 'r-url',
                                            'label' => 'Retailer website address',
                                            'rules' => 'max_length[255]'
                                         ),
                                    array(
                                            'field' => 'email',
                                            'label' => 'Email address',
                                            'rules' => 'required|valid_email|max_length[255]'
                                         ),
                                    array(
                                            'field' => 'firstname',
                                            'label' => 'first name',
                                            'rules' => 'required|max_length[255]'
                                         ),
                                    array(
                                            'field' => 'lastname',
                                            'label' => 'last name',
                                            'rules' => 'required|max_length[255]'
                                         ),
                                    array(
                                            'field' => 'note',
                                            'label' => 'Note',
                                            'rules' => 'max_length[20000]'
                                         ),
                                    array(
                                            'field' => 'message',
                                            'label' => 'Message',
                                            'rules' => 'required|max_length[20000]'
                                         ),
                                    )
               );
